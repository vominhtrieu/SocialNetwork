import React from "react";
import {
  Box,
  Typography,
  makeStyles,
  withStyles,
  Tooltip,
} from "@material-ui/core";
import { Link } from "react-router-dom";
import UserAvatar from "../Common/UserAvatar";
import moment from "moment/moment";

const useStyles = makeStyles((theme) => ({
  messageContentReceive: {
    padding: "8px 15px",
    borderRadius: 25,
    whiteSpace: "pre-line",
    backgroundColor: "#f0f2f5",
    color: "black",
  },
}));

const LightTooltip = withStyles((theme) => ({
  tooltip: {
    backgroundColor: theme.palette.common.white,
    color: "rgba(0, 0, 0, 0.87)",
    boxShadow: theme.shadows[1],
    fontSize: 12,
  },
}))(Tooltip);

export default function ReceiveMessage(props) {
  const { message, participants, showAvatar } = props;
  const classes = useStyles();

  const participant = participants.find(
    (participant) => participant.user._id === message.sender
  );
  if (!participant) return null;
  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="flex-start"
      marginBottom={0.5}
    >
      <Box visibility={showAvatar ? "visible" : "hidden"}>
        <Link to={`/${participant.user._id}`}>
          <UserAvatar imageId={showAvatar ? participant.user.avatar : null} />
        </Link>
      </Box>
      <LightTooltip
        title={moment(message.date).format("DD-MM-YYYY hh:mm")}
        placement="right"
      >
        <Box marginLeft={1} className={classes.messageContentReceive}>
          <Typography>{message.textContent}</Typography>
        </Box>
      </LightTooltip>
    </Box>
  );
}
