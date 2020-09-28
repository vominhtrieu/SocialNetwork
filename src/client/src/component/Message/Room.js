import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Box,
  IconButton,
  Divider,
  Card,
  Typography,
  Avatar,
} from "@material-ui/core";
import { AvatarGroup } from "@material-ui/lab";
import NavigateBeforeIcon from "@material-ui/icons/NavigateBefore";
import { connect } from "react-redux";
import { HOST } from "../../config/constant";
import MessageSection from "./MessageHistory";
import MessageInput from "./MessageInput";

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(2),
    flexGrow: 1,
  },
  backButton: {
    width: 48,
    height: 48,
    marginRight: 10,
  },
  avatar: {
    marginRight: 1,
  },
}));

function Room(props) {
  const classes = useStyles();
  const roomId = props.match.params.id;
  const [roomInfo, setRoomInfo] = React.useState(null);
  const [conversationName, setConversationName] = React.useState(null);
  //Fetch room's infomation
  React.useEffect(() => {
    fetch(`${HOST}/room/${roomId}`, {
      method: "GET",
      credentials: "include",
    })
      .then((res) => res.json())
      .then((roomData) => {
        //Get list of participants exclude the user
        const temp = roomData.participants.filter((participant) => {
          return participant.user._id !== props.user.id;
        });
        setRoomInfo(Object.assign(roomData, { participants: temp }));

        //Conversation name is calculated by concating all participant name
        setConversationName(
          temp
            .reduce((name, { user }) => {
              return user.firstName + " " + user.lastName + ", " + name;
            }, "")
            .slice(0, -2)
        );
      });
  }, [roomId, props.user.id]);

  if (!conversationName || !roomInfo) return null;
  return (
    <Card variant="outlined" className={classes.root}>
      <Box height="100%" display="flex" flexDirection="column">
        <Box display="flex" alignItems="center" borderBottom="1px solid rgba(0,0,0,0.12)">
          <IconButton
            className={classes.backButton}
            onClick={() => props.history.push("/messages")}
          >
            <NavigateBeforeIcon fontSize="large" />
          </IconButton>
          <Box marginX={1}>
            <AvatarGroup max={3} spacing="small">
              {roomInfo.participants.map(({ user }, index) => {
                if (user._id === props.user.id) return null;
                return (
                  <Avatar
                    key={index}
                    alt={`${user.firstName}'s avatar`}
                    src={user.avatar ? `${HOST}/image/${user.avatar}` : null}
                  />
                );
              })}
            </AvatarGroup>
          </Box>
          <Typography>{conversationName}</Typography>
        </Box>
        <MessageSection
          roomInfo={roomInfo}
          socket={props.socket}
          user={props.user}
        />
        <MessageInput roomInfo={roomInfo} socket={props.socket} />
      </Box>
    </Card>
  );
}

const mapStateToProps = (state) => ({
  user: state.user,
  socket: state.socket,
});

export default connect(mapStateToProps)(Room);
