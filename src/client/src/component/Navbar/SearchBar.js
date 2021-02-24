import React from "react";
import { AutoComplete, Input, message } from "antd";
import { API_HOST } from "../../config/constant";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";
import UserAvatar from "../Common/UserAvatar";

export default function SearchBar() {
  const history = useHistory();
  const [matchedUsers, setMatchedUsers] = React.useState([]);

  const searchForUser = (query) => {
    axios
      .get(`${API_HOST}/search?q=${query}`, {
        withCredentials: true,
      })
      .then(({ data }) => {
        setMatchedUsers(data);
      })
      .catch((_err) => {
        message.error("Cannot search, please try again!");
      });
  };

  const result = matchedUsers.map((user) => ({
    value: user._id,
    label: (
      <Link style={{ color: "inherit", width: "100%" }} to={`/${user._id}`}>
        <UserAvatar style={{ marginRight: 5 }} imageId={user.avatar} />
        <span>{user.fullName}</span>
      </Link>
    ),
  }));

  const onSelect = (value) => history.push(`/${value}`);

  return (
    <>
      <AutoComplete
        options={result}
        onSearch={searchForUser}
        onSelect={onSelect}
        style={{ width: 250, height: 30, margin: "auto 0" }}
      >
        <Input.Search value="123" placeholder="Search..." />
      </AutoComplete>
    </>
  );
}
