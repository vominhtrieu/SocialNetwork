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

export default function RoomItem({ room, userId }) {
  const classes = useStyles();
  const [isSeen, setIsSeen] = React.useState(false);
  const [conversationName, setConversationName] = React.useState(null);

  React.useEffect(() => {
    const name = room.participants.reduce((name, participant) => {
      const { user } = participant;
      if (user._id === userId) {
        setIsSeen(participant.messageSeen === room.messageCount);
        return name;
      }
      return user.firstName + " " + user.lastName + ", " + name;
    }, "");

    setConversationName(name.substring(0, name.length - 2));
  }, [room.participants, room.messageCount, userId]);

  if (!conversationName) return null;
  try {
    return (
      <ListItem
        component={Link}
        to={`/messages/${room._id}`}
        className={classes.message}
        alignItems="flex-start"
      >
        <ListItemAvatar>
          <Box marginX={2}>
            <AvatarGroup max={3} spacing="small">
              {room.participants.map((participant, index) =>
                participant.user._id === userId ? null : (
                  <Avatar
                    key={index}
                    alt={`${participant.user.firstName}'s avatar`}
                    src={
                      participant.user.avatar
                        ? `${HOST}/image/${participant.user.avatar}`
                        : null
                    }
                  />
                )
              )}
            </AvatarGroup>
          </Box>
        </ListItemAvatar>
        <Box className={isSeen ? classes.seen : classes.notSeen}>
          <ListItemText
            primary={<b>{conversationName}</b>}
            secondary={
              room.messageCount === 0
                ? "Let start this conversation"
                : room.recentMessage.textContent
            }
          />
        </Box>
      </ListItem>
    );
  }
  catch (e) {
    console.log(room);
    return null;
  }
}
