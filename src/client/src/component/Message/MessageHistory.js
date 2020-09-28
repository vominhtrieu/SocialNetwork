import React from "react";
import ReceiveMessage from "./ReceiveMessage";
import SentMessage from "./SentMessage";
import { Box, Divider } from "@material-ui/core";
import { HOST } from "../../config/constant";

export default function MessageHistory(props) {
  const { roomInfo, socket, user } = props;
  const messageHistory = React.useRef(null);
  const [messages, setMessages] = React.useState([]);

  //Fetch room's messages
  React.useEffect(() => {
    fetch(`${HOST}/room/${roomInfo._id}/messages`, {
      method: "GET",
      credentials: "include",
    })
      .then((res) => res.json())
      .then((messages) => {
        setMessages(messages);
        if (messageHistory.current !== null)
          messageHistory.current.scrollTop =
            messageHistory.current.scrollHeight;
      });
  }, [roomInfo._id]);

  //Listen to new message
  React.useEffect(() => {
    socket.on("message", (data) => {
      setMessages((messages) => [...messages, data]);
      if (messageHistory.current !== null)
        messageHistory.current.scrollTop = messageHistory.current.scrollHeight;
    });

    return () => {
      socket.removeAllListeners("message");
    };
  }, [socket]);

  //Listen to seen event
  React.useEffect(() => {
    socket.emit("seen", {
      roomId: roomInfo._id,
      messageSeen: messages.length,
    });
  }, [roomInfo._id, socket, messages.length]);

  const renderMessages = messages.map((message, index) => {
    if (message.sender === user.id) {
      return <SentMessage key={index} message={message} room={props.room} />;
    }
    let showAvatar =
      index === messages.length - 1 ||
      messages[index + 1].sender !== message.sender;
    return (
      <ReceiveMessage
        key={index}
        message={message}
        participants={roomInfo.participants}
        showAvatar={showAvatar}
      />
    );
  });

  return (
    <Box
      ref={messageHistory}
      flexGrow={1}
      flexBasis={0}
      padding={2}
      display="block"
      overflow="auto"      
    >
      {renderMessages}
    </Box>
  );
}
