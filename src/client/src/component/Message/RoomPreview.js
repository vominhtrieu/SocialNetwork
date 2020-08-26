import React from "react";
import {
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Box,
  makeStyles,
} from "@material-ui/core";
import { Link } from "react-router-dom";
import { AvatarGroup } from "@material-ui/lab";
import { HOST } from "../../config/constant";

const useStyles = makeStyles((theme) => ({
  message: {
    color: "inherit",
    "&:hover": {
      cursor: "pointer",
    },
  },
  notSeen: {
    color: "blue",
    marginTop: 5,
  },
  seen: {
    color: "inherit",
    marginTop: 5,
  },
}));

export default function RoomPreview(props) {
  const [room, setRoom] = React.useState(null);
  React.useEffect(() => {
    fetch(`${HOST}/room/${props.id}`, {
      method: "GET",
      credentials: "include",
    })
      .then((res) => res.json())
      .then((roomData) => {
        roomData.participants = roomData.participants.filter((participant) => {
          if (participant.id === props.userId) {
            roomData.messageSeen = participant.messageSeen;
            return false;
          }
          return true;
        });
        roomData.conversationName = roomData.participants.reduce(
          (name, participant) => {
            return (
              participant.firstName + " " + participant.lastName + ", " + name
            );
          },
          ""
        );
        roomData.conversationName = roomData.conversationName.slice(0, -2);
        console.log(roomData);
        setRoom(roomData);
      });
  }, [props.id, props.userId]);

  const classes = useStyles();

  if (!room) return null;
  return (
    <ListItem
      component={Link}
      to={`/messages/${room.roomId}`}
      className={classes.message}
      alignItems="flex-start"
    >
      <ListItemAvatar>
        <Box marginX={2}>
          <AvatarGroup max={3} spacing="small">
            {room.participants.map((participant, index) => (
              <Avatar
                key={index}
                alt={`${participant.firstName}'s avatar`}
                src={`${HOST}/image/${participant.avatar}`}
              />
            ))}
          </AvatarGroup>
        </Box>
      </ListItemAvatar>
      <Box
        className={
          room.messageSeen === room.messageCount
            ? classes.seen
            : classes.notSeen
        }
      >
        <ListItemText
          primary={<b>{room.conversationName}</b>}
          secondary={room.messageCount===0?"Let start this conversation":room.recentMessage}
        />
      </Box>
    </ListItem>
  );
}
