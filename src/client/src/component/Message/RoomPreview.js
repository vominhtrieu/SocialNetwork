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
    "&:hover": {
      cursor: "pointer",
    },
  },
  conversationName: {
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
        roomData.participants = roomData.participants.filter(
          (participant) => participant.id !== props.userId
        );
        roomData.conversationName = roomData.participants.reduce(
          (name, participant) => {
            return (
              participant.firstName + " " + participant.lastName + ", " + name
            );
          },
          ""
        );
        roomData.conversationName = roomData.conversationName.slice(0, -2);
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
      <Box className={classes.conversationName}>
        <ListItemText
          primary={<b>{room.conversationName}</b>}
          secondary={room.recentMessage}
        />
      </Box>
    </ListItem>
  );
}
