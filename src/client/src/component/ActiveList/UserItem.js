import React from "react";
import { List, Skeleton } from "antd";
import UserAvatar from "../Common/UserAvatar";
import { API_HOST } from "../../config/constant";
import { Link } from "react-router-dom";

export default function UserItem({ userId }) {
  const [user, setUser] = React.useState(null);

  React.useEffect(() => {
    fetch(`${API_HOST}/${userId}`, {
      method: "GET",
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => setUser(data));
  }, [userId]);

  return (
    <Link to={`/${userId}`}>
      <List.Item>
        <Skeleton loading={Boolean(!user)}>
          {user && (
            <List.Item.Meta
              avatar={<UserAvatar imageId={user.avatar} />}
              title={`${user.firstName} ${user.lastName}`}
              description="Online now"
            />
          )}
        </Skeleton>
      </List.Item>
    </Link>
  );
}
