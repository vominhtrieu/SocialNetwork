import React from "react";
import { connect } from "react-redux";
import { API_HOST } from "../../config/constant";
import Title from "../Common/Title";
import { List } from "antd";
import RoomItem from "./RoomItem";

function Messages(props) {
  // const [messageOpen, setMessageOpen] = React.useState(false);
  const [rooms, setRooms] = React.useState([]);
  React.useEffect(() => {
    fetch(`${API_HOST}/chatrooms`, {
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
            return [newRoom, ...rooms.slice(0, index), ...rooms.slice(index + 1)];
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

  return (
    <>
      <Title title="Messages" />
      {/* <NewMessageDialog open={messageOpen} closeDialog={() => setMessageOpen(false)} userId={props.user.id} /> */}
      {/* <Space>
        <IconButton onClick={() => setMessageOpen(true)}>
          <AddIcon />
        </IconButton>
        <IconButton>
          <SearchIcon />
        </IconButton>
      </Space> */}
      <List
        header={<h3 style={{ marginBottom: 0 }}>Messages</h3>}
        dataSource={rooms}
        renderItem={(room) => <RoomItem key={room._id} room={room} userId={props.user.id} />}
      />
    </>
  );
}

const mapStateToProps = (state) => ({
  user: state.user,
  socket: state.socket,
});

export default connect(mapStateToProps)(Messages);
