import React from "react";
import { connect } from "react-redux";
import { API_HOST } from "../../config/constant";
import Title from "../Common/Title";
import { List, Space, Button } from "antd";
import RoomItem from "./RoomItem";
import { PlusOutlined } from "@ant-design/icons";
import NewMessageModal from "./NewMessageModal";

function Messages(props) {
  const [newMessageOpen, setNewMessageOpen] = React.useState(false);
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

  const title = (
    <div style={{ display: "flex", alignItems: "center" }}>
      <h3 style={{ marginBottom: 0 }}>Messages</h3>
      <Space style={{ marginLeft: "auto" }}>
        <Button onClick={() => setNewMessageOpen(true)} shape="circle">
          <PlusOutlined />
        </Button>
      </Space>
    </div>
  );

  return (
    <>
      <Title title="Messages" />
      <NewMessageModal visible={newMessageOpen} user={props.user} onClose={() => setNewMessageOpen(false)} />
      <List
        header={title}
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
