import React from "react";
import {
  Box,
  Typography,
  makeStyles,
  withStyles,
  Tooltip,
} from "@material-ui/core";
import moment from "moment/moment";

const useStyles = makeStyles((theme) => ({
  messageContentSent: {
    padding: "8px 15px",
    borderRadius: 25,
    whiteSpace: "pre-line",
    color: "white",
    backgroundColor: "#1e88e5",
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

export default function SentMessage({ message }) {
  const classes = useStyles();
  return (
    <Box
      display="flex"
      alignItems="center"
      marginBottom={0.5}
      justifyContent="flex-end"
    >
      <LightTooltip
        title={moment(message.date).format("DD-MM-YYYY hh:mm")}
        placement="left"
      >
        <Box className={classes.messageContentSent}>
          <Typography align="right">{message.textContent}</Typography>
        </Box>
      </LightTooltip>
    </Box>
  );
}
