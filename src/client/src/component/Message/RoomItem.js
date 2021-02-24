import React from "react";
import { Link } from "react-router-dom";
import { API_HOST } from "../../config/constant";
import { List, Avatar } from "antd";
import UserAvatar from "../Common/UserAvatar";

export default function RoomItem({ room, userId }) {
  const [isSeen, setIsSeen] = React.useState(false);
  const [conversationName, setConversationName] = React.useState(null);

  React.useEffect(() => {
    const name = room.participants.reduce((name, participant) => {
      const { user } = participant;
      if (user._id === userId) {
        setIsSeen(participant.messageSeen === room.messageCount);
        return name;
      }
      return user.firstName + " " + user.lastName + ", " + name;
    }, "");

    setConversationName(name.substring(0, name.length - 2));
  }, [room.participants, room.messageCount, userId]);

  const avatar = (
    <Link to={`/messages/${room._id}`}>
      <Avatar.Group maxCount={2}>
        {room.participants.map((participant, index) =>
          participant.user._id === userId ? null : <UserAvatar key={index} imageId={participant.user.avatar} />
        )}
      </Avatar.Group>
    </Link>
  );
  if (!conversationName) return null;
  try {
    return (
      <List.Item>
        <List.Item.Meta
          avatar={avatar}
          title={<Link to={`/messages/${room._id}`}>{conversationName}</Link>}
          description={
            <Link
              style={{ color: isSeen ? "rgba(255,255,255,0.6)" : "rgba(255,255,255,0.8" }}
              to={`/messages/${room._id}`}
            >
              {room.messageCount === 0 ? "Let start this conversation" : room.recentMessage.textContent}
            </Link>
          }
        />
      </List.Item>
    );
  } catch (e) {
    console.log(room);
    return null;
  }
}
