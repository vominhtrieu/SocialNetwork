import React from "react";
import { SendOutlined, CameraOutlined } from "@ant-design/icons";
import EmojiPicker from "../Common/EmojiPicker";
import { Button, Input } from "antd";

export default function MessageInput({ socket, roomInfo }) {
  //Text that user input
  const [textContent, setTextContent] = React.useState("");

  const onTyping = (e) => {
    if (e.target.value === "\n") return;
    setTextContent(e.target.value);
    if (textContent !== "") socket.emit("typing", { roomId: roomInfo._id });
  };

  let checkEnterKey = (e) => {
    if (e.keyCode === 13) {
      if (!e.shiftKey) {
        sendMessage();
      }
    }
  };

  let sendMessage = () => {
    if (textContent === "") return;
    setTextContent("");
    socket.emit("message", {
      roomId: roomInfo._id,
      textContent: textContent,
    });
  };

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        padding: "5px 0",
        width: "100%",
        borderTop: "1px solid rgba(255, 255, 255, 0.15)",
      }}
    >
      <Button style={{ marginRight: 5 }} shape="circle" icon={<CameraOutlined />} />
      <Input.TextArea
        placeholder="Type your message here..."
        style={{
          width: "100%",
          marginRight: 5,
          borderRadius: 16,
          backgroundColor: "rgba(255,255,255,0.1)",
          resize: "none",
        }}
        value={textContent}
        onChange={onTyping}
        onKeyDown={checkEnterKey}
      />
      <EmojiPicker
        style={{ marginRight: 5 }}
        placement="topRight"
        color="primary"
        addEmoji={(emoji) => {
          setTextContent(textContent + emoji);
        }}
      />
      <Button type="primary" shape="circle" onClick={() => sendMessage()} icon={<SendOutlined />} />
    </div>
  );
}
