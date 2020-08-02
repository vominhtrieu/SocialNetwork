import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Box,
  IconButton,
  Divider,
  Card,
  Typography,
  Avatar,
  InputBase,
} from "@material-ui/core";
import { AvatarGroup } from "@material-ui/lab";
import NavigateBeforeIcon from "@material-ui/icons/NavigateBefore";
import { connect } from "react-redux";
import ImageIcon from "@material-ui/icons/Image";
import SendIcon from "@material-ui/icons/Send";
import EmojiIcon from "@material-ui/icons/EmojiEmotions";
import EmojiPicker from "../General/EmojiPicker";
import io from "socket.io-client";
import { HOST } from "../../config/constant";

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: 16,
    height: "calc(100vh - 100px)",
  },
  backButton: {
    width: 48,
    height: 48,
    marginRight: 10,
  },
  avatar: {
    marginRight: 1,
  },
  messageContent: {
    padding: "8px 15px",
    borderRadius: 25,
    color: "white",
    whiteSpace: "pre-line",
  },
  messageContentReceive: {
    backgroundColor: "#f0f2f5",
    color: "black",
  },
  messageContentSent: {
    backgroundColor: "#1e88e5",
  },
  input: {
    border: "1px solid rgba(0,0,0,0.12)",
    marginLeft: 10,
    maxHeight: 100,
    overflow: "auto",
    padding: "2px 20px 2px 20px",
    borderRadius: 25,
    backgroundColor: "#f0f2f5",
    minHeight: 30,
    margin: "5px 0",
  },
}));

function SentMessage(props) {
  const { message } = props;
  const classes = useStyles();
  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="flex-end"
      marginBottom={1}
    >
      <Box
        className={`${classes.messageContent} ${classes.messageContentSent}`}
      >
        <Typography>{message.textContent}</Typography>
      </Box>
    </Box>
  );
}

function ReceiveMessage(props) {
  const { message } = props;
  const classes = useStyles();

  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="flex-start"
      marginBottom={1}
    >
      <Avatar src={`${HOST}/image/${message.senderAvatar}`}>
        {message.senderFirstName[0]}
      </Avatar>
      <Box
        marginLeft={1}
        className={`${classes.messageContent} ${classes.messageContentReceive}`}
      >
        <Typography>{message.textContent}</Typography>
      </Box>
    </Box>
  );
}

function Room(props) {
  const classes = useStyles();
  const [socket] = React.useState(io(HOST));
  const [room, setRoom] = React.useState(null);
  const [textContent, setTextContent] = React.useState("");
  const [messages, setMessages] = React.useState([]);
  const [isEmojiPickerOpened, setIsEmojiPickerOpened] = React.useState(false);
  const messageHistory = React.useRef(null);

  React.useEffect(() => {
    socket.emit("joinRoom", {
      roomId: props.match.params.id,
    });

    socket.on("message", (data) => {
      setMessages((messages) => [...messages, data]);
      if (messageHistory.current !== null)
        messageHistory.current.scrollTop = messageHistory.current.scrollHeight;
    });

    return () => {
      socket.emit("leaveRoom", {
        roomId: props.match.params.id,
      });
    };
  }, [props.match.params.id, socket]);

  React.useEffect(() => {
    fetch(`${HOST}/room/${props.match.params.id}`, {
      method: "GET",
      credentials: "include",
    })
      .then((res) => res.json())
      .then((roomData) => {
        roomData.participants = roomData.participants.filter(
          (participant) => participant.id !== props.user.id
        );
        roomData.conversationName = roomData.participants.reduce(
          (name, participant) => {
            return (
              participant.firstName + " " + participant.lastName + ", " + name
            );
          },
          ""
        );
        roomData.conversationName = roomData.conversationName.slice(0, -2);
        setRoom(roomData);
      });
  }, [props.match.params.id, props.user.id]);

  React.useEffect(() => {
    fetch(`${HOST}/room/${props.match.params.id}/messages`, {
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
  }, [props.match.params.id]);

  let sendMessage = () => {
    setTextContent("");
    socket.emit("message", {
      roomId: props.match.params.id,
      textContent: textContent,
    });
  };

  const addEmoji = (emoji) => {
    setTextContent((textContent) => {
      return textContent + emoji
    });
  };

  const closeEmojiPicker = () => {
    setIsEmojiPickerOpened(false);
  }

  if (!room) return null;
  return (
    <Card variant="outlined" className={classes.root}>
      <Box display="flex" alignItems="center">
        <IconButton
          className={classes.backButton}
          onClick={() => props.history.push("/messages")}
        >
          <NavigateBeforeIcon fontSize="large" />
        </IconButton>
        <Box marginX={1}>
          <AvatarGroup max={3} spacing="small">
            {room.participants.map((participant, index) => (
              <Avatar
                key={index}
                alt={`${participant.firstName}'s avatar`}
                src={`${HOST}/image/${participant.avatar}`}
              />
            ))}
          </AvatarGroup>
        </Box>
        <Typography>{room.conversationName}</Typography>
      </Box>
      <Divider />
      <Box
        ref={messageHistory}
        padding={2}
        height="calc(100% - 128px)"
        display="block"
        overflow="auto"
      >
        {messages.map((message, index) =>
          message.senderId === props.user.id ? (
            <SentMessage key={index} message={message} />
          ) : (
            <ReceiveMessage key={index} message={message} />
          )
        )}
      </Box>
      <Divider variant="fullWidth" />
      <Box display="flex" alignItems="center" paddingLeft={1}>
        <IconButton size="small">
          <ImageIcon />
        </IconButton>
        <Box position="relative">
          <IconButton onClick={() => setIsEmojiPickerOpened(true)} size="small">
            <EmojiIcon />
          </IconButton>
          <EmojiPicker isOpened={isEmojiPickerOpened} onClose={closeEmojiPicker} addEmoji={addEmoji} />
        </Box>
        <InputBase
          onChange={(e) => setTextContent(e.target.value)}
          value={textContent}
          className={classes.input}
          placeholder="..."
          multiline
          fullWidth
        />
        <IconButton onClick={() => sendMessage()}>
          <SendIcon />
        </IconButton>
      </Box>
    </Card>
  );
}

const mapStateToProps = (state) => ({
  user: state.user,
});

export default connect(mapStateToProps)(Room);
