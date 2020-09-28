import React from "react";
import {
  Button,
  ButtonGroup,
  Box,
  Avatar,
  IconButton,
  TextField,
  Divider,
} from "@material-ui/core";
import LikeIcon from "@material-ui/icons/ThumbUp";
import CommentIcon from "@material-ui/icons/Comment";
import ShareIcon from "@material-ui/icons/Share";
import SendIcon from "@material-ui/icons/Send";
import { fade, makeStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import CommentSection from "./CommentSection";
import { HOST } from "../../config/constant";
import io from "socket.io-client";
import CustimizedTextField from "../Common/CustimizedTextField";

const useStyle = makeStyles((theme) => ({
  button: {
    background: "none",
    textTransform: "none",
    "&:hover": {
      background: fade(theme.palette.common.black, 0.07),
      boxShadow: "none",
    },
  },
  avatar: {
    float: "left",
    width: 40,
    marginRight: 10,
  },
  sendButton: {
    float: "right",
    marginTop: 2,
    marginLeft: 10,
  },
}));

function numToFixedLengthString(num) {
  let result = "";
  let dividend;
  let character;
  if (num < 1000) {
    character = "";
    dividend = 1;
  } else if (num < 1000000) {
    character = "K";
    dividend = 1000;
  } else if (num < 1000000000) {
    character = "M";
    dividend = 1000000;
  } else {
    character = "B";
    dividend = 1000000000;
  }

  let number = num / dividend;
  if (number >= 10) result = Math.floor(number);
  else {
    result = number.toFixed(1);
    if (result[1] === "." && result[2] === "0") result = result[0];
  }
  result += character;
  result = result.padEnd(4, " ");
  return result;
}

function PostInteraction(props) {
  const classes = useStyle();
  const [openComment, setOpenComment] = React.useState(false);
  const [textInput, setTextInput] = React.useState("");
  const [socket] = React.useState(io(HOST));

  React.useEffect(() => {}, []);
  const onInput = (text) => {
    setTextInput(text);
  };

  const likeThisPost = () => {
    socket.emit("like", {
      postId: props.postId,
    });
  };

  const makeAComment = (e) => {
    fetch(`${HOST}/comment`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        postId: props.postId,
        textContent: textInput,
        images: [],
      }),
    }).then((res) => {
      setTextInput("");
    });
  };

  return (
    <Box>
      <ButtonGroup
        className={classes.buttonGroup}
        fullWidth
        variant="outlined"
        aria-label="outlined primary button group"
      >
        <Button
          onClick={likeThisPost}
          className={classes.button}
          size="large"
          startIcon={<LikeIcon color={props.liked ? "primary" : "inherit"} />}
        >
          {numToFixedLengthString(props.likeCount)}
        </Button>
        <Button
          onClick={() => setOpenComment(!openComment)}
          className={classes.button}
          size="large"
          startIcon={<CommentIcon />}
        >
          0
        </Button>
        <Button
          className={classes.button}
          size="large"
          startIcon={<ShareIcon />}
        >
          0
        </Button>
      </ButtonGroup>
      <CommentSection comments={props.comments} />
      {openComment ? (
        <Box marginTop={2}>
          <Avatar
            src={`${HOST}/image/${props.user.avatar}`}
            className={classes.avatar}
          ></Avatar>
          <Box marginLeft={6} marginBottom={2} display="flex">
            <CustimizedTextField
              className={classes.commentInput}
              onChange={onInput}
              onSubmit={makeAComment}
              value={textInput}
              variant="textField"
              autoFocus
            />
            <IconButton
              className={classes.sendButton}
              onClick={makeAComment}
              size="small"
              variant="contained"
              color="secondary"
            >
              <SendIcon />
            </IconButton>
          </Box>
        </Box>
      ) : null}
    </Box>
  );
}

const mapStateToProps = (state) => ({
  user: state.user,
});

export default connect(mapStateToProps)(PostInteraction);
