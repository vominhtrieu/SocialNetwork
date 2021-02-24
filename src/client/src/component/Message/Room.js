import React from "react";
import { ArrowLeftOutlined, PhoneOutlined, VideoCameraOutlined } from "@ant-design/icons";
import { Avatar, Button, Divider, Space } from "antd";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { API_HOST } from "../../config/constant";
import UserAvatar from "../Common/UserAvatar";
import MessageHistory from "./MessageHistory";
import MessageInput from "./MessageInput";

function Room(props) {
  const roomId = props.match.params.id;
  const [roomInfo, setRoomInfo] = React.useState(null);
  const [conversationName, setConversationName] = React.useState(null);
  //Fetch room's infomation
  React.useEffect(() => {
    fetch(`${API_HOST}/room/${roomId}`, {
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
    <div
      id="room"
      style={{
        display: "flex",
        height: "calc(100vh - 74px)",
        flexDirection: "column",
        width: "100%",
      }}
    >
      <div style={{ display: "flex", alignItems: "center" }}>
        <Link style={{ marginRight: 5 }} to="/messages">
          <ArrowLeftOutlined style={{ fontSize: 20, color: "white" }} />
        </Link>
        <Avatar.Group style={{ marginRight: 5 }} max={2}>
          {roomInfo.participants.map(({ user }) => (
            <UserAvatar key={user._id} imageId={user.avatar} />
          ))}
        </Avatar.Group>
        <h3 style={{ marginBottom: 0, marginRight: 5 }}>{conversationName}</h3>
        <div style={{ marginLeft: "auto" }}>
          <Button
            style={{ marginRight: 5 }}
            type="primary"
            shape="circle"
            title="Audio call"
            icon={<PhoneOutlined />}
          />
          <Button type="primary" shape="circle" title="Video call" icon={<VideoCameraOutlined />} />
        </div>
      </div>
      <Divider style={{ margin: 0, marginTop: 10 }} />
      <div style={{ height: "100%", overflowY: "auto", flexGrow: "1" }}>
        <MessageHistory roomInfo={roomInfo} socket={props.socket} user={props.user} />
      </div>

      <MessageInput roomInfo={roomInfo} socket={props.socket} />
    </div>
  );
}

const mapStateToProps = (state) => ({
  user: state.user,
  socket: state.socket,
});

export default connect(mapStateToProps)(Room);
