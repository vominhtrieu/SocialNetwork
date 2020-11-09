import React from 'react';
import { Box, Avatar, IconButton, makeStyles } from '@material-ui/core';
import SendIcon from '@material-ui/icons/Send';
import CustimizedTextField from '../Common/CustimizedTextField';
import { HOST } from '../../config/constant';

const useStyle = makeStyles((theme) => ({
  avatar: {
    float: 'left',
    width: 40,
    marginRight: 10,
  },
  sendButton: {
    float: 'right',
    marginTop: 2,
    marginLeft: 10,
  },
}));

export default function CommentInput(props) {
  const classes = useStyle();
  const [textInput, setTextInput] = React.useState('');

  const onInput = (text) => {
    setTextInput(text);
  };

  const makeAComment = () => {
    setTextInput('');

    fetch(`${HOST}/comment`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        postId: props.postId,
        textContent: textInput,
        images: [],
      }),
    })
      .then((res) => {
        return res.json();
      })
      .then(({ commentId }) => {
        if (commentId) {
          props.socket.emit('comment', {
            postId: props.postId,
            commentId: commentId,
          });
        }
      });
  };
  return (
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
  );
}
