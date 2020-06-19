import React from "react";
import {
  Button,
  ButtonGroup,
  Box,
  Avatar,
  IconButton,
  InputBase,
} from "@material-ui/core";
import LikeIcon from "@material-ui/icons/ThumbUp";
import CommentIcon from "@material-ui/icons/Comment";
import ShareIcon from "@material-ui/icons/Share";
import SendIcon from "@material-ui/icons/Send";
import { fade, makeStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import CommentSection from "./CommentSection";
import { HOST } from "../../config/constant";

const useStyle = makeStyles((theme) => ({
  button: {
    background: "none",
    textTransform: "none",
    "&:hover": {
      background: fade(theme.palette.common.black, 0.07),
      boxShadow: "none",
    },
  },
  commentField: {
    padding: theme.spacing(0.4, 1, 0.4, 2.5),
    backgroundColor: fade(theme.palette.common.black, 0.07),
    borderRadius: 25,
  },
  avatar: {
    float: "left",
    width: 40,
    marginRight: 10,
  },
  commentInput: {
    width: "calc(100% - 40px)",
    height: 35,
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
  const [liked, setLiked] = React.useState(props.liked);
  const [textInput, setTextInput] = React.useState("");
  const onInput = (e) => {
    setTextInput(e.target.value);
  };

  const likeThisPost = () => {
    fetch(`${HOST}/like`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ postId: props.postId }),
    })
      .then((res) => res.json())
      .then((isLiked) => {
        setLiked(isLiked);
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
          startIcon={<LikeIcon color={liked ? "primary" : "inherit"} />}
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
          <Box
            marginLeft={6}
            display="relative"
            className={classes.commentField}
          >
            <InputBase
              className={classes.commentInput}
              onChange={onInput}
              value={textInput}
              placeholder="Add a comment"
              autoFocus
              fullWidth
              multiline
              inputProps={{ "aria-label": "comment" }}
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
