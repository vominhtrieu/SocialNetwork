import React, { useEffect } from "react";
import FriendInfo from "./FriendInfo";
import { HOST } from "../../config/constant";

export default function ProfileFriends(props) {
  const { profileUser } = props;
  const [friends, setFriends] = React.useState([]);
  useEffect(() => {
    fetch(`${HOST}/${profileUser.id}/friends`, {
      method: "GET",
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          data.sort((a, b) => {
            if (a.firstName > b.firstName) return -1;
            if (a.firstName < b.firstName) return 1;
            return 0;
          });
          setFriends(data);
        }
      });
  }, [profileUser.id]);

  const friendList = friends.map((friend, index) => {
    return <FriendInfo user={friend} key={index} />;
  });
  return friendList;
}
