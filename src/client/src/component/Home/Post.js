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
import { HOST } from "../../config/constant";

const useStyle = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  poster: {
    fontWeight: "bold",
    fontSize: 16,
    cursor: "default",
  },
  date: {
    fontSize: 14,
    cursor: "default",
    lineHeight: "1em",
  },
  cardBody: {
    marginTop: 20,
    marginBottom: 20,
  },
  avatar: {
    width: 40,
    marginRight: 10,
    float: "left",
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

  const {user} = props;
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
          <Avatar src={`${HOST}/image?id=${user.avatar}`} className={classes.avatar}>{user.firstName[0]}</Avatar>
          <Box>
            <Typography className={classes.poster} variant="h5">
              {user.firstName + user.lastName}
            </Typography>
            <Typography className={classes.date} color="textSecondary">
              {moment(props.date).fromNow()}
            </Typography>
          </Box>
          <Box className={classes.moreButton}>
            <IconButton size="small" disableFocusRipple disableRipple>
              <MoreIcon />
            </IconButton>
          </Box>
          <Typography className={classes.cardBody} variant="body2">
            {props.textContent}
          </Typography>
          <PostInteraction />
        </CardContent>
      </Card>
    </Box>
  );
}

export default Post;
