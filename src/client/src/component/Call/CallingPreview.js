import { Modal, Space, Button } from "antd";
import React from "react";
import { connect } from "react-redux";
import { API_HOST } from "../../config/constant";
import PhoneCall from "../../audio/PhoneCall.mp3";
import UserAvatar from "../Common/UserAvatar";

const WINDOW_WIDTH = 900;
const WINDOW_HEIGHT = 450;

function CallingPreview({ visible, roomData, onClose, user, socket }) {
  const audio = React.useRef(null);
  React.useEffect(() => {
    if (audio.current === null) return;
    if (visible) {
      audio.current.play();
    } else audio.current.pause();
  }, [visible]);
  if (roomData === null) {
    return null;
  }

  const { roomId, caller } = roomData;

  const answerTheCall = () => {
    const w = Math.min(WINDOW_WIDTH, window.innerWidth);
    const h = Math.min(WINDOW_HEIGHT, window.innerHeight);
    const left = (window.innerWidth - w) / 2;
    const top = (window.innerHeight - h) / 2;
    const newWindow = window.open(
      `/call/${roomId}`,
      "_blank",
      `height=${h}, width=${w}, location=no, status=no, left=${left}, top=${top}`
    );
    if (window.focus) newWindow.focus();
    onClose();
  };

  const rejectTheCall = () => {
    onClose();
  };

  return (
    <>
      <audio ref={audio} style={{ display: "none" }} src={PhoneCall} autoPlay loop />
      <Modal closable={false} visible={visible} footer={null}>
        <div style={{ display: "flex", flexFlow: "column", alignItems: "center" }}>
          <UserAvatar size={200} imageId={caller ? caller.avatar : null} />
          <h1 style={{ marginTop: 10, marginBottom: 0, lineHeight: 1 }}>Võ Minh Triều</h1>
          <p style={{ fontSize: 16, color: "rgba(255,255,255,0.8)" }}>is calling</p>
          <Space>
            <Button style={{ display: "flex", alignItems: "center" }} onClick={answerTheCall} type="primary">
              Answer
            </Button>
            <Button danger style={{ display: "flex", alignItems: "center" }} onClick={rejectTheCall} type="primary">
              Reject
            </Button>
          </Space>
        </div>
      </Modal>
    </>
  );
}

const mapStateToProps = (state) => ({
  user: state.user,
  socket: state.socket,
});

export default connect(mapStateToProps)(CallingPreview);
