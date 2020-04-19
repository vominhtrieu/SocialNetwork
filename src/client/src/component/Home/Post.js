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
  return (
    <Box
      display="flex"
      justifyContent="center"
      paddingTop={1}
      paddingBottom={1}
    >
      <Card variant="outlined" className={classes.root}>
        <CardContent>
          <Avatar className={classes.avatar}>T</Avatar>
          <Box>
            <Typography className={classes.poster} variant="h5">
              Võ Minh Triều
            </Typography>
            <Typography className={classes.date} color="textSecondary">
              Yesterday
            </Typography>
          </Box>
          <Box className={classes.moreButton}>
            <IconButton size="small" disableFocusRipple disableRipple>
              <MoreIcon />
            </IconButton>
          </Box>
          <Typography className={classes.cardBody} variant="body2">
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book. It has survived not
            only five centuries, but also the leap into electronic typesetting,
            remaining essentially unchanged. It was popularised in the 1960s
            with the release of Letraset sheets containing Lorem Ipsum passages,
            and more recently with desktop publishing software like Aldus
            PageMaker including versions of Lorem Ipsum.
          </Typography>
          <PostInteraction />
        </CardContent>
      </Card>
    </Box>
  );
}

export default Post;
