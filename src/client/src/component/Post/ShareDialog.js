import React from "react";
import Post from "./Post";
import { Modal, message } from "antd";
import TextArea from "antd/lib/input/TextArea";
import axios from "axios";
import { API_HOST } from "../../config/constant";

export default function ShareDialog({ id, visible, closeShare }) {
  const [text, setText] = React.useState("");
  const share = () => {
    axios
      .post(
        `${API_HOST}/posts/${id}/share`,
        {
          post: { textContent: text },
        },
        { withCredentials: true }
      )
      .then((res) => {
        message.success("Shared this post");
      })
      .catch((err) => {
        message.error("Error occur, please try again!");
      });
    closeShare();
  };

  return (
    <Modal title="Share this post" visible={visible} onCancel={closeShare} okText="Share" onOk={share}>
      <TextArea
        value={text}
        onChange={(e) => setText(e.target.value)}
        style={{ resize: "none", height: 100, marginBottom: 10 }}
        placeholder="Write something about this post..."
      />
      <Post id={id} hideAction />
    </Modal>
  );
}
