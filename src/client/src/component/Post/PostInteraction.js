import React from 'react';
import { Button, ButtonGroup, Box } from '@material-ui/core';
import LikeIcon from '@material-ui/icons/ThumbUp';
import CommentIcon from '@material-ui/icons/Comment';
import ShareIcon from '@material-ui/icons/Share';
import { fade, makeStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import CommentSection from './CommentSection';
import CommentInput from './CommentInput';

const useStyle = makeStyles((theme) => ({
  button: {
    background: 'none',
    textTransform: 'none',
    '&:hover': {
      background: fade(theme.palette.common.black, 0.07),
      boxShadow: 'none',
    },
  },
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

function numToFixedLengthString(num) {
  let result = '';
  let dividend;
  let character;
  if (num < 1000) {
    character = '';
    dividend = 1;
  } else if (num < 1000000) {
    character = 'K';
    dividend = 1000;
  } else if (num < 1000000000) {
    character = 'M';
    dividend = 1000000;
  } else {
    character = 'B';
    dividend = 1000000000;
  }

  let number = num / dividend;
  if (number >= 10) result = Math.floor(number);
  else {
    result = number.toFixed(1);
    if (result[1] === '.' && result[2] === '0') result = result[0];
  }
  result += character;
  result = result.padEnd(4, ' ');
  return result;
}

function PostInteraction(props) {
  const classes = useStyle();
  const [openComment, setOpenComment] = React.useState(false);

  const likeThisPost = () => {
    props.socket.emit('like', {
      postId: props.postId,
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
          startIcon={<LikeIcon color={props.liked ? 'primary' : 'inherit'} />}
        >
          {numToFixedLengthString(props.likeCount)}
        </Button>
        <Button
          onClick={() => setOpenComment(!openComment)}
          className={classes.button}
          size="large"
          startIcon={<CommentIcon />}
        >
          {numToFixedLengthString(props.commentCount)}
        </Button>
        <Button
          className={classes.button}
          size="large"
          startIcon={<ShareIcon />}
        >
          0
        </Button>
      </ButtonGroup>

      {openComment ? (
        <React.Fragment>
          {/* Area shows comments from this post */}
          <CommentSection
            isVisible={props.isVisible}
            socket={props.socket}
            postId={props.postId}
          />

          {/* Field for user type their comments */}
          <CommentInput
            socket={props.socket}
            postId={props.postId}
            user={props.user}
          />
        </React.Fragment>
      ) : null}
    </Box>
  );
}

const mapStateToProps = (state) => ({
  user: state.user,
  socket: state.socket,
});

export default connect(mapStateToProps)(PostInteraction);
