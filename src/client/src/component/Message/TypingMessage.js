import React from "react";
import { Link } from "react-router-dom";
import { Avatar } from "antd";
import UserAvatar from "../Common/UserAvatar";

export default function TypingMessage(props) {
  const { typingUsers, participants } = props;
  const users = typingUsers.map((user) => {
    let temp = null;
    for (const participant of participants) {
      if (participant.user._id === Number(user)) {
        temp = participant.user;
        break;
      }
    }
    return temp;
  });

  if (!users.length) return null;
  console.log(users);
  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "flex-start", marginBottom: 4 }}>
      <Avatar.Group>
        {users.map((user) => (
          <Link to={`/${user._id}`} key={user._id}>
            <UserAvatar imageId={user.avatar} />
          </Link>
        ))}
      </Avatar.Group>
      <div
        style={{ padding: "6px 12px", borderRadius: 20, background: "rgba(255,255,255,0.3)", marginLeft: 5 }}
        marginLeft={1}
      >
        Typing...
      </div>
    </div>
  );
}
