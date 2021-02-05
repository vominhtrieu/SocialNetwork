import React from 'react';
import { Box, Avatar, Typography, Card, CardContent, IconButton } from '@material-ui/core';
import Skeleton from 'react-loading-skeleton';

import { makeStyles } from '@material-ui/core/styles';
import MoreIcon from '@material-ui/icons/MoreHoriz';
import PostInteraction from './PostInteraction';
import moment from 'moment/moment';

import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { API_HOST } from '../../config/constant';
import TrackVisibility from 'react-on-screen';
import PostMenu from './PostMenu';

const useStyle = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  name: {
    fontWeight: 'bold',
    fontSize: 16,
    color: 'black',
    textDecoration: 'none',
  },
  date: {
    fontSize: 14,
    cursor: 'default',
    lineHeight: '1em',
  },
  cardBody: {
    marginTop: 20,
    marginBottom: 20,
    whiteSpace: 'pre-line',
  },
  avatar: {
    width: 40,
    marginRight: 10,
    float: 'left',
    textDecoration: 'none',
  },
  moreButton: {
    marginTop: -45,
    float: 'right',
    position: 'relative',
  },
  interaction: {
    flexGrow: 1,
    marginTop: 20,
    marginBottom: 0,
  },
  icon: {
    marginRight: 5,
  },
}));

function Post(props) {
  const classes = useStyle();
  const [post, setPost] = React.useState({});
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [menuOpened, setMenuOpened] = React.useState(false);

  React.useEffect(() => {
    fetch(`${API_HOST}/post/${props.id}`, {
      method: 'GET',
      credentials: 'include',
    })
      .then((res) => res.json())
      .then((post) => {
        setPost(post);
      });

    props.socket.emit('joinPost', { postId: props.id });

    props.socket.on('newLike', ({ userId, postId }) => {
      if (postId !== props.id) return;
      if (userId === props.user.id) {
        setPost((post) =>
          Object.assign({}, post, {
            liked: true,
            likeCount: post.likeCount + 1,
          })
        );
      } else {
        setPost((post) =>
          Object.assign({}, post, {
            likeCount: post.likeCount + 1,
          })
        );
      }
    });

    props.socket.on('removeLike', ({ userId, postId }) => {
      if (postId !== props.id) return;
      if (userId === props.user.id) {
        setPost((post) =>
          Object.assign({}, post, {
            liked: false,
            likeCount: post.likeCount - 1,
          })
        );
      } else {
        setPost((post) =>
          Object.assign({}, post, {
            likeCount: post.likeCount - 1,
          })
        );
      }
    });
  }, [props.id, props.socket, props.user.id]);

  const openMenu = (e) => {
    setMenuOpened(true);
    setAnchorEl(e.currentTarget);
  };

  return (
    <Box flexGrow={1} display='flex' justifyContent='center' paddingTop={1} paddingBottom={1}>
      <Card variant='outlined' className={classes.root}>
        <CardContent>
          {!post.user ? (
            <Skeleton count={5} />
          ) : (
            <React.Fragment>
              <Avatar
                component={Link}
                to={`/${post.user.Id}`}
                src={`${API_HOST}/image/${post.user.avatar}`}
                className={classes.avatar}
              >
                {post.user.firstName[0]}
              </Avatar>
              <Box>
                <Typography component={Link} to={`/${post.user.Id}`} className={classes.name} variant='h5'>
                  {post.user.firstName + ' ' + post.user.lastName}
                </Typography>
                <Typography className={classes.date} color='textSecondary'>
                  {moment(post.date).fromNow()}
                </Typography>
              </Box>
              <Box className={classes.moreButton}>
                <IconButton onClick={openMenu} size='small' disableFocusRipple disableRipple>
                  <MoreIcon />
                </IconButton>
                <PostMenu
                  postId={post._id}
                  open={menuOpened}
                  anchorEl={anchorEl}
                  closeMenu={() => setMenuOpened(false)}
                />
              </Box>
              <Typography className={classes.cardBody} variant='body2'>
                {post.textContent}
              </Typography>

              <TrackVisibility partialVisibility>
                <PostInteraction
                  postId={post.postId}
                  liked={post.liked}
                  likeCount={post.likeCount}
                  commentCount={post.commentCount}
                />
              </TrackVisibility>
            </React.Fragment>
          )}
        </CardContent>
      </Card>
    </Box>
  );
}

const mapStateToProps = (state) => ({
  user: state.user,
  socket: state.socket,
});

export default connect(mapStateToProps)(Post);
