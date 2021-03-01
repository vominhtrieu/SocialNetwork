import "./CallingRoom.less";
import { Button, message } from "antd";
import React from "react";
import { connect } from "react-redux";
import PhoneCall from "../../audio/PhoneCall.mp3";
import Peer from "peerjs";
import { useParams } from "react-router-dom";
import { PEERJS_HOST, PEERJS_PORT } from "../../config/constant";

const PHONE_TIME_OUT = 60000; //1 minute

function CallingRoom({ user, socket }) {
  const container = React.useRef(null);
  const [deviceAvailable, setDeviceAvailable] = React.useState(true);
  const params = useParams();

  React.useEffect(() => {
    socket.on("error", (error) => {
      if (typeof error !== "string") {
        error = error.message;
      }
      message.error(error);
    });
  }, [params.id, socket]);

  const addVideoStream = (video, stream) => {
    const roomItemContent = document.createElement("div");
    roomItemContent.className = "room-item-content";
    const roomItem = document.createElement("div");
    roomItem.className = "room-item";
    video.srcObject = stream;

    roomItemContent.appendChild(video);
    roomItem.appendChild(roomItemContent);
    container.current.appendChild(roomItem);

    video.addEventListener("loadedmetadata", () => {
      video.play();
    });
  };

  React.useEffect(() => {
    const peer = new Peer(user.id.toString(), { host: PEERJS_HOST, port: PEERJS_PORT });
    const participants = {};
    navigator.mediaDevices
      .getUserMedia({
        video: true,
        audio: true,
      })
      .then((stream) => {
        const selfVideo = document.createElement("video");
        selfVideo.muted = true;
        addVideoStream(selfVideo, stream);

        socket.on("userJoined", ({ userId }) => {
          const call = peer.call(userId.toString(), stream);
          const video = document.createElement("video");

          call.on("stream", (userStream) => {
            if (participants[call.peer]) return;
            participants[call.peer] = true;
            addVideoStream(video, userStream);
          });
          call.on("close", () => {
            video.parentElement.parentElement.remove();
          });
        });
      })
      .catch((err) => {
        setDeviceAvailable(false);
      });

    peer.on("call", (call) => {
      navigator.mediaDevices
        .getUserMedia({
          video: true,
          audio: true,
        })
        .then((stream) => {
          call.answer(stream);
          const video = document.createElement("video");
          call.on("stream", (userStream) => {
            if (participants[call.peer]) return;
            participants[call.peer] = true;
            addVideoStream(video, userStream);
          });
          call.on("close", () => {
            video.parentElement.parentElement.remove();
          });
        });
    });

    peer.on("open", (id) => {
      socket.emit("joinCallingRoom", { roomId: params.id });
    });

    // eslint-disable-next-line
  }, [socket, params.id, user.id]);

  const closeWindow = () => {
    window.close();
  };

  if (deviceAvailable) {
    return (
      <div ref={container} className="room-container">
        <div style={{ position: "fixed", bottom: 10, left: 0, width: "100%" }}>
          <Button onClick={closeWindow} style={{ display: "flex", alignItems: "center" }} type="primary">
            Close
          </Button>
        </div>
      </div>
    );
  } else {
    return (
      <div
        style={{
          display: "flex",
          flexFlow: "column",
          alignItems: "center",
          justifyContent: "center",
          height: "100vh",
        }}
      >
        <h1 style={{ marginTop: 10, marginBottom: 10, lineHeight: 1 }}>Cannot access your microphone/camera</h1>
        <Button onClick={closeWindow} style={{ display: "flex", alignItems: "center" }} type="primary">
          Close
        </Button>
      </div>
    );
  }

  // } else if (isTimeout) {
  //   return (
  //     <div
  //       style={{
  //         display: "flex",
  //         flexFlow: "column",
  //         alignItems: "center",
  //         justifyContent: "center",
  //         height: "100vh",
  //       }}
  //     >
  //       <h1 style={{ marginTop: 10, marginBottom: 10, lineHeight: 1 }}>User is not available</h1>
  //       <Button onClick={closeWindow} style={{ display: "flex", alignItems: "center" }} type="primary">
  //         Close
  //       </Button>
  //     </div>
  //   );
  // } else {
  //   return (
  //     <div
  //       style={{
  //         display: "flex",
  //         flexFlow: "column",
  //         alignItems: "center",
  //         justifyContent: "center",
  //         height: "100vh",
  //       }}
  //     >
  //       <h1 style={{ marginTop: 10, marginBottom: 10, lineHeight: 1 }}>Waiting for user to answer</h1>
  //       <Button danger style={{ display: "flex", alignItems: "center" }} type="primary">
  //         Stop calling
  //       </Button>
  //       {/* <audio style={{ display: "none" }} src={PhoneCall} autoPlay loop /> */}
  //     </div>
  //   );
  // }
}

const mapStateToProps = (state) => ({
  user: state.user,
  socket: state.socket,
});

export default connect(mapStateToProps)(CallingRoom);
