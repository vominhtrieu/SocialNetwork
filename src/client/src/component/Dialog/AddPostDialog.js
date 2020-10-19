import React from "react";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Dialog from "@material-ui/core/Dialog";
import MuiDialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import EmojiPicker from "../Common/EmojiPicker";
import { InputBase, Button, Box, IconButton } from "@material-ui/core";
import {
  Image as ImageIcon,
  EmojiEmotions as EmojiIcon,
} from "@material-ui/icons";
import { HOST } from "../../config/constant";

const useStyles = makeStyles((theme) => ({
  input: {
    marginBottom: theme.spacing(1),
    fontSize: 18,
    overflowY: "auto",
  },
  title: {
    textAlign: "center",
  },
  content: {
    overflow: "visible",
  },
  paper: { margin: 0, width: "100%" },
}));

const DialogContent = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogContent);

export default function AddPostDialog(props) {
  const classes = useStyles();

  const [postText, setPostText] = React.useState("");
  const [isEmojiOpened, setIsEmojiOpened] = React.useState(false);
  const submitPost = () => {
    fetch(HOST + "/newpost", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ post: { textContent: postText } }),
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      return null;
    });
  };

  const addEmoji = (emoji) => {
    setPostText((text) => text + emoji);
  };

  return (
    <Dialog
      style={{ overflowY: "scroll", zIndex: 999999 }}
      classes={{
        paper: classes.paper,
      }}
      onClose={props.closeDialog}
      aria-labelledby="addPostDialogTitle"
      open={props.open}
    >
      <DialogTitle
        className={classes.title}
        id="addPostDialogTitle"
        onClose={props.closeDialog}
      >
        New post
      </DialogTitle>
      <DialogContent dividers className={classes.content}>
        <InputBase
          className={classes.input}
          autoFocus
          value={postText}
          placeholder="What are you thinking...?"
          multiline
          onChange={(e) => setPostText(e.target.value)}
          fullWidth
          rows={10}
          inputProps={{ "aria-label": "Add new post" }}
        />
        <Box display="flex" alignItems="center">
          <Box display="flex" flexGrow={1} flexDirection="row">
            <Box flexGrow={1} marginRight={2}>
              <Button
                onClick={submitPost}
                variant="contained"
                color="primary"
                fullWidth
              >
                Post
              </Button>
            </Box>

            <Box display="flex" alignItems="center">
              <IconButton onClick={() => setIsEmojiOpened(true)} size="small">
                <EmojiIcon color="primary" />
                {isEmojiOpened ? (
                  <EmojiPicker
                    isOpened={isEmojiOpened}
                    addEmoji={addEmoji}
                    onClose={() => setIsEmojiOpened(false)}
                  />
                ) : null}
              </IconButton>
            </Box>
            <IconButton size="small">
              <ImageIcon color="primary" />
            </IconButton>
          </Box>
        </Box>
      </DialogContent>
    </Dialog>
  );
}
