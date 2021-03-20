import React from "react";
import ReceiveMessage from "./ReceiveMessage";
import SentMessage from "./SentMessage";
import { API_HOST } from "../../config/constant";
import TypingMessage from "./TypingMessage";

export default function MessageHistory(props) {
  const { roomInfo, socket, user, updateRoomInfo } = props;
  const messageHistory = React.useRef(null);
  const [messages, setMessages] = React.useState([]);
  const [typingUsers, setTypingUsers] = React.useState({});

  //Scroll to bottom of component
  const scrollToBottom = () => {
    if (messageHistory.current !== null) messageHistory.current.scrollTop = messageHistory.current.scrollHeight;
  };

  //Join and leave room
  React.useEffect(() => {
    socket.emit("joinRoom", {
      roomId: roomInfo._id,
    });

    return () => {
      socket.emit("leaveRoom", {
        roomId: roomInfo._id,
      });
    };
  }, [socket, roomInfo._id]);

  //Fetch room's messages
  React.useEffect(() => {
    fetch(`${API_HOST}/room/${roomInfo._id}/messages`, {
      method: "GET",
      credentials: "include",
    })
      .then((res) => res.json())
      .then((messages) => {
        setMessages(messages);
        scrollToBottom();
      });
  }, [roomInfo._id]);

  //Listen to new message
  React.useEffect(() => {
    const removeATypingUser = (userId) => {
      setTypingUsers((typingUsers) => {
        const temp = { ...typingUsers };
        temp[userId] = null;
        return temp;
      });
    };

    const addNewTypingUser = (userId) => {
      clearTimeout(typingUsers[userId]);
      setTypingUsers((typingUsers) => {
        const temp = { ...typingUsers };
        temp[userId] = setTimeout(() => {
          removeATypingUser(userId);
        }, 500);
        return temp;
      });
    };

    socket.on("message", (data) => {
      socket.emit("seen", { roomId: roomInfo._id, messageSeen: roomInfo.messageCount + 1 });
      updateRoomInfo({ messageCount: roomInfo.messageCount + 1 });
      setMessages((messages) => [...messages, data]);
      scrollToBottom();
    });
    socket.on("typing", ({ sender }) => {
      addNewTypingUser(sender);
      scrollToBottom();
    });
    socket.on("seenMessage", ({ user, messageSeen }) => {
      console.log("seen");
      const newParticipants = [...roomInfo.participants];
      newParticipants.forEach((participant) => {
        if (user === participant.user._id) {
          participant.messageSeen = messageSeen;
        }
      });
      updateRoomInfo({ participants: newParticipants });
    });
    return () => {
      socket.removeAllListeners("message");
      socket.removeAllListeners("typing");
      socket.removeAllListeners("seenMessage");
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [socket, typingUsers]);

  //Listen to seen event
  React.useEffect(() => {
    socket.emit("seen", {
      roomId: roomInfo._id,
      messageSeen: messages.length,
    });
  }, [roomInfo._id, socket, messages.length]);

  const renderMessages = messages.map((message, index) => {
    if (message.sender === user.id) {
      return (
        <SentMessage
          key={index}
          message={message}
          room={props.room}
          roomInfo={roomInfo}
          last={index === messages.length - 1}
        />
      );
    }
    let showAvatar = index === messages.length - 1 || messages[index + 1].sender !== message.sender;
    return (
      <ReceiveMessage key={index} message={message} participants={roomInfo.participants} showAvatar={showAvatar} />
    );
  });

  const typingUserList = Object.keys(typingUsers).filter((key) => {
    return typingUsers[key] !== null;
  });

  return (
    <div style={{ padding: 4, height: "100%", overflow: "auto" }} ref={messageHistory}>
      {renderMessages}
      {typingUserList.length > 0 ? (
        <TypingMessage typingUsers={typingUserList} participants={roomInfo.participants} />
      ) : null}
    </div>
  );
}
