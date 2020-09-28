import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Box, IconButton, Divider, List, Card } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import SearchIcon from "@material-ui/icons/Search";
import NewMessageDialog from "../Dialog/NewMessage";
import { connect } from "react-redux";
import RoomItem from "./RoomItem";
import { HOST } from "../../config/constant";

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: 16,
    flexGrow: 1,
  },
  avatar: {
    marginRight: 1,
  },
}));

function Messages(props) {
  const classes = useStyles();
  const [messageOpen, setMessageOpen] = React.useState(false);
  const [rooms, setRooms] = React.useState([]);
  React.useEffect(() => {
    fetch(`${HOST}/chatrooms`, {
      method: "GET",
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        setRooms(data);
      });
  }, []);

  React.useEffect(() => {
    props.socket.on(
      "message",
      (message) => {
        setRooms((rooms) => {
          const index = rooms.findIndex((room) => room._id === message.roomId);
          if (index !== -1) {
            const newRoom = { ...rooms[index] };
            newRoom.recentMessage = message;
            newRoom.messageCount++;
            return [
              newRoom,
              ...rooms.slice(0, index),
              ...rooms.slice(index + 1),
            ];
          }
          return rooms;
        });

        return () => {
          props.socket.removeAllListeners("message");
        };
      },
      [props.socket]
    );

    return () => {
      props.socket.removeAllListeners("message");
    };
  }, [props.socket]);

  const renderedRooms = rooms.map((room, index) => (
    <RoomItem key={index} room={room} userId={props.user.id} />
  ));

  return (
    <Card variant="outlined" className={classes.root}>
      <NewMessageDialog
        open={messageOpen}
        closeDialog={() => setMessageOpen(false)}
        userId={props.user.id}
      />
      <Box>
        <IconButton onClick={() => setMessageOpen(true)}>
          <AddIcon />
        </IconButton>
        <IconButton>
          <SearchIcon />
        </IconButton>
      </Box>
      <Divider />
      <List dense>{renderedRooms}</List>
    </Card>
  );
}

const mapStateToProps = (state) => ({
  user: state.user,
  socket: state.socket,
});

export default connect(mapStateToProps)(Messages);
