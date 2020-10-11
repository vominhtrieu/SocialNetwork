import React from "react";
import { Box, TextField } from "@material-ui/core";
import { HOST } from "../../config/constant";

import { Search as SearchIcon } from "@material-ui/icons";
import MatchedFriends from "../Dialog/MatchedFriends";
import { useHistory } from "react-router-dom";

export default function SearchBar(props) {
  const history = useHistory();
  const [text, setText] = React.useState("");
  const [matchedUsers, setMatchedUsers] = React.useState([]);
  const wrapperRef = React.createRef();

  React.useEffect(() => {
    const checkCloseSearchResult = (e) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
        setMatchedUsers([]);
        setText("");
      }
    };

    document.addEventListener("mousedown", checkCloseSearchResult);
    return () =>
      document.removeEventListener("mousedown", checkCloseSearchResult);
  }, [wrapperRef]);

  const searchForUser = (e) => {
    setText(e.target.value);
    fetch(`${HOST}/search?q=${e.target.value}`, {
      method: "GET",
      credentials: "include",
    })
      .then((res) => res.json())
      .then((user) => {
        setMatchedUsers(user);
      })
      .catch((err) => {});
  };

  const redirectToUserProfile = (user) => {
    history.push(`/${user.id}`);
    setMatchedUsers([]);
    setText("");
  };

  const resultMenu =
    Array.isArray(matchedUsers) && matchedUsers.length > 0 ? (
      <Box position="absolute" top="100%" left={0} right={0} zIndex={99999}>
        <MatchedFriends friends={matchedUsers} action={redirectToUserProfile} />
      </Box>
    ) : null;

  return (
    <Box ref={wrapperRef} flexGrow={1} display="flex" alignItems="center">
      <SearchIcon />
      <Box position="relative" marginLeft={1} style={{flexGrow: 1}}>
        <TextField
          fullWidth
          placeholder="Search..."
          value={text}
          onFocus={searchForUser}
          onChange={searchForUser}
          inputProps={{ "aria-label": "search" }}
        />
        {resultMenu}
      </Box>
    </Box>
  );
}
