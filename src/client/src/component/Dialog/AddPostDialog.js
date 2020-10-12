import React from "react";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Dialog from "@material-ui/core/Dialog";
import MuiDialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import { InputBase, Button, Box, IconButton } from "@material-ui/core";
import { Image as ImageIcon } from "@material-ui/icons";
import { HOST } from "../../config/constant";

const useStyles = makeStyles((theme) => ({
  input: {
    width: "min(500px, 90vw)",
    maxHeight: 500,
    marginBottom: 10,
  },
  title: {
    textAlign: "center",
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
        props.closeDialog();
      }
    });
  };

  return (
    <Dialog
      style={{ overflowY: "scroll"}}
      classes={{
        paper: classes.paper
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
      <DialogContent dividers>
        <InputBase
          className={classes.input}
          autoFocus
          placeholder="What are you thinking...?"
          multiline
          onChange={(e) => setPostText(e.target.value)}
          fullWidth
          rows={10}
          inputProps={{ "aria-label": "Add new post" }}
        />
        <Box display="flex" alignItems="center">
          <Box mr={1}>
            <IconButton size="small">
              <ImageIcon color="primary" fontSize="large" />
            </IconButton> 
          </Box>
          <Button
            onClick={submitPost}
            variant="contained"
            color="primary"
            fullWidth
          >
            Post
          </Button>
        </Box>
      </DialogContent>
    </Dialog>
  );
}
