import React from "react";
import {
  Box,
  Avatar,
  Typography,
  Card,
  CardContent,
  IconButton,
} from "@material-ui/core";

import { makeStyles } from "@material-ui/core/styles";
import MoreIcon from "@material-ui/icons/MoreHoriz";
import PostInteraction from "./PostInteraction";
import moment from "moment/moment";
import { Link } from "react-router-dom";
import { HOST } from "../../config/constant";

const useStyle = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  name: {
    fontWeight: "bold",
    fontSize: 16,
    color: "black",
    textDecoration: "none",
  },
  date: {
    fontSize: 14,
    cursor: "default",
    lineHeight: "1em",
  },
  cardBody: {
    marginTop: 20,
    marginBottom: 20,
    whiteSpace: "pre-line"
  },
  avatar: {
    width: 40,
    marginRight: 10,
    float: "left",
    textDecoration: "none"
  },
  moreButton: {
    marginTop: -45,
    float: "right",
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

  React.useEffect(() => {
    fetch(`${HOST}/post/${props.id}`, {
      method: "GET",
      credentials: "include"
    }).then(res => res.json())
    .then(post => {
      setPost(post);
    })
  }, [props.id]);
  
  if(!post.user)
    return null;

  return (
    <Box
      width="100%"
      display="flex"
      justifyContent="center"
      paddingTop={1}
      paddingBottom={1}
    >
      <Card variant="outlined" className={classes.root}>
        <CardContent>
          <Avatar
            component={Link}
            to={`/${post.user.Id}`}
            src={`${HOST}/image/${post.user.avatar}`}
            className={classes.avatar}
          >
            {post.user.firstName[0]}
          </Avatar>
          <Box>
            <Typography
              component={Link}
              to={`/${post.user.Id}`}
              className={classes.name}
              variant="h5"
            >
              {post.user.firstName + " " + post.user.lastName}
            </Typography>
            <Typography className={classes.date} color="textSecondary">
              {moment(post.date).fromNow()}
            </Typography>
          </Box>
          <Box className={classes.moreButton}>
            <IconButton size="small" disableFocusRipple disableRipple>
              <MoreIcon />
            </IconButton>
          </Box>
          <Typography className={classes.cardBody} variant="body2">
            {post.textContent}
          </Typography>
          <PostInteraction postId={post.postId} liked={post.liked} likeCount={post.likeCount} comments={post.comments} />
        </CardContent>
      </Card>
    </Box>
  );
}

export default Post;
