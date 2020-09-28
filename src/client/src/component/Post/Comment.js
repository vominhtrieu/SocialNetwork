import React, { useEffect } from "react";
import {
  Card,
  Box,
  Typography,
  Avatar,
  makeStyles,
  IconButton,
} from "@material-ui/core";
import MoreIcon from "@material-ui/icons/MoreHoriz";
import { HOST } from "../../config/constant";
import { Link } from "react-router-dom";

const useStyle = makeStyles((theme) => ({
  avatar: {
    float: "left",
    width: 40,
  },
  user: {
    textDecoration: "none",
    fontWeight: "bold",
  },
  textContent: {
    border: "1px solid rgba(0,0,0,0.23)",
    borderRadius: "15px",
    padding: "8px 12px",
  },
}));

export default function Comment(props) {
  const classes = useStyle();
  const [commentData, setCommentData] = React.useState(null);

  useEffect(() => {
    fetch(`${HOST}/comment/${props.id}`, {
      method: "GET",
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => setCommentData(data));
  }, [props.id]);

  if (!commentData) return null;
  return (
    <Box marginTop={2}>
      <Link to={`/${commentData.user._id}`} className={classes.user}>
        <Avatar
          src={`${HOST}/image/${commentData.user.avatar}`}
          className={classes.avatar}
        >
          {commentData.user.firstName[0]}
        </Avatar>
      </Link>
      <Box display="flex" marginLeft={6} marginRight={5}>
        <Card variant="outlined" className={classes.textContent}>
          <Link to={`/${commentData.user._id}`} className={classes.user}>
            <Typography color="textPrimary" variant="body2">
              <b>
                {commentData.user.firstName + " " + commentData.user.lastName}
              </b>
            </Typography>
          </Link>
          <Typography style={{ lineHeight: 1 }}>
            {commentData.textContent}
          </Typography>
        </Card>
        <Box display="flex" alignItems="center">
          <IconButton size="small">
            <MoreIcon fontSize="small" />
          </IconButton>
        </Box>
      </Box>
    </Box>
  );
}
