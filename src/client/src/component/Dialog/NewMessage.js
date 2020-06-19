import React from "react";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import { Avatar, IconButton } from "@material-ui/core";
import Dialog from "@material-ui/core/Dialog";
import MuiDialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import MatchedFriends from "./MatchedFriends";
import { InputBase, Button, Typography, Box } from "@material-ui/core";
import ClearIcon from "@material-ui/icons/Clear";
import normalizeString from "../../function/normalizeString";
import { HOST } from "../../config/constant";

const useStyles = makeStyles((theme) => ({
  input: {
    width: "min(500px, 90vw)",
  },
  title: {
    textAlign: "center",
  },
  avatar: {
    width: 25,
    height: 25,
  },
}));

const DialogContent = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogContent);

export default function NewMessage(props) {
  const classes = useStyles();

  const [recipient, setRecipient] = React.useState("");
  const [friendList, setFriendList] = React.useState(null);
  const [matchedFriends, setMatchedFriends] = React.useState(recipient);
  const [selectedRecipients, setSelectedRecipients] = React.useState([]);
  const [content, setContent] = React.useState("");

  const sendMessage = () => {
    fetch(HOST + "/message", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ post: { textContent: recipient } }),
    }).then((res) => {
      if (res.ok) {
        props.closeDialog();
      }
    });
  };

  const onRecipientChange = (e) => {
    const value = e.target.value;
    setRecipient(value);
    let data = friendList.filter((friend) =>
      normalizeString(friend.firstName + " " + friend.lastName).includes(
        normalizeString(value)
      )
    );
    setMatchedFriends(data);
  };

  const selectRecipient = (friend) => {
    setSelectedRecipients(selectedRecipients.concat(friend));
    setMatchedFriends([]);
    setRecipient("");
  };

  React.useEffect(() => {
    fetch(`${HOST}/${props.userId}/friends`, {
      method: "GET",
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          data.sort((a, b) => {
            if (a.firstName > b.firstName) return -1;
            if (a.firstName < b.firstName) return 1;
            return 0;
          });
          setFriendList(data);
        }
      });
  }, [props.userId]);

  const renderRecipients = selectedRecipients.map((selectRecipient, index) => (
    <Box key={index} display="flex" alignItems="center">
      <Avatar
        className={classes.avatar}
        src={`${HOST}/image/${selectRecipient.avatar}`}
      >
        {selectRecipient.firstName[0]}
      </Avatar>
      <IconButton size="small" display="inline">
        <ClearIcon />
      </IconButton>
    </Box>
  ));

  return (
    <Dialog
      onClose={props.closeDialog}
      aria-labelledby="newMessage"
      open={props.open}
    >
      <DialogTitle
        className={classes.title}
        id="newMessage"
        onClose={props.closeDialog}
      >
        New message
      </DialogTitle>
      <DialogContent dividers>
        <Box>
          <Typography display="inline">
            <b>To: </b>
          </Typography>
          <InputBase
            className={classes.input}
            autoFocus
            value={recipient}
            placeholder="Who will receive this message...?"
            onChange={onRecipientChange}
            fullWidth
            spellCheck="false"
            inputProps={{ "aria-label": "recipient name" }}
          />
          {matchedFriends && matchedFriends.length > 0 ? (
            <MatchedFriends
              friends={matchedFriends}
              selectRecipient={selectRecipient}
            />
          ) : null}
          <Box display="flex">{renderRecipients}</Box>
        </Box>
        <Box marginBottom={1}>
          <Typography display="inline">
            <b>Content: </b>
          </Typography>
          <InputBase
            className={classes.input}
            onChange={(e) => setContent(e.target.value)}
            value={content}
            placeholder="What do you want to say?"
            fullWidth
            multiline
            spellCheck="false"
            inputProps={{ "aria-label": "Message content" }}
          />
        </Box>
        <Button
          onClick={sendMessage}
          variant="outlined"
          color="primary"
          fullWidth
        >
          Send
        </Button>
      </DialogContent>
    </Dialog>
  );
}
