import React from "react";
import {
  Button,
  ButtonGroup,
  Box,
  Avatar,
  IconButton,
  Link,
  InputBase,
} from "@material-ui/core";
import LikeIcon from "@material-ui/icons/ThumbUp";
import CommentIcon from "@material-ui/icons/Comment";
import ShareIcon from "@material-ui/icons/Share";
import SendIcon from "@material-ui/icons/Send";
import { fade, makeStyles } from "@material-ui/core/styles";

const useStyle = makeStyles((theme) => ({
  buttonGroup: {
    boxShadow: "none",
    border: "none",
  },
  button: {
    background: "none",
    textTransform: "none",
    "&:hover": {
      background: fade(theme.palette.common.black, 0.07),
      boxShadow: "none",
    },
  },
  viewComment: {
    fontSize: 14,
    cursor: "pointer",
    margin: 10,
    userSelect: "none"
  },
  commentField: {
    padding: theme.spacing(0.4, 1, 0.4, 2.5),
    backgroundColor: fade(theme.palette.common.black, 0.07),
    borderRadius: 25,
  },
  avatar: {
      float: "left",
      width: 40,
      marginRight: 10
  },
  commentInput: {
    width: "calc(100% - 40px)"
  },
  sendButton: {
    float: "right",
    marginLeft: 10
  }
}));

function PostInteraction() {
  const classes = useStyle();
  return (
    <Box>
      <ButtonGroup
        className={classes.buttonGroup}
        fullWidth
        variant="contained"
        aria-label="outlined primary button group"
      >
        <Button className={classes.button} startIcon={<LikeIcon />}>
          Like
        </Button>
        <Button className={classes.button} startIcon={<CommentIcon />}>
          Comment
        </Button>
        <Button className={classes.button} startIcon={<ShareIcon />}>
          Share
        </Button>
      </ButtonGroup>
      <Box display="flex" justifyContent="center">
        <Link
          className={classes.viewComment}
          underline="none"
          color="textPrimary"
        >
          View Comments
        </Link>
      </Box>
      <Avatar className={classes.avatar}>
        </Avatar>
      <Box marginLeft={6} display="relative" className={classes.commentField}>
        <InputBase
            className={classes.commentInput}
          placeholder="Comment..."
          fullWidth
          multiline
          inputProps={{ "aria-label": "comment" }}
        />
        <IconButton className={classes.sendButton} size="small" variant="contained" color="secondary">
          <SendIcon />
        </IconButton>
      </Box>
    </Box>
  );
}

export default PostInteraction;
