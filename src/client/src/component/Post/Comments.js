import React from "react";
import { List, Input, Button, message } from "antd";
import { SendOutlined } from "@ant-design/icons";
import { API_HOST } from "../../config/constant";
import axios from "axios";
import UserComment from "./UserComment";

function Comments({ socket, postId }) {
  const [comments, setComments] = React.useState([]);
  const [textInput, setTextInput] = React.useState("");

  const onInput = (e) => {
    setTextInput(e.target.value);
  };

  const makeAComment = () => {
    setTextInput("");
    axios
      .post(
        `${API_HOST}/comments`,
        {
          postId: postId,
          textContent: textInput,
          images: [],
        },
        { withCredentials: true }
      )
      .then(({ data }) => {
        if (data.commentId) {
          socket.emit("comment", {
            postId: postId,
            commentId: data.commentId,
          });
        }
      })
      .catch((_err) => message.error("Cannot post this comment, please try again!"));
  };

  React.useEffect(() => {
    axios
      .get(`${API_HOST}/${postId}/comments`, {
        withCredentials: true,
      })
      .then(({ data }) => setComments(data))
      .catch((_err) => message.error("Cannot get comment list"));

    socket.on("newComment", (data) => {
      if (postId === data.postId) {
        setComments((comments) => [...comments, data.commentId]);
      }
    });

    return () => {
      socket.off("newComment");
    };
  }, [postId, socket]);

  return (
    <>
      <List
        className="comment-list"
        itemLayout="horizontal"
        style={{ height: 300, overflowY: "auto" }}
        dataSource={comments}
        renderItem={(comment) => (
          <li key={comment}>
            <UserComment commentId={comment} />
          </li>
        )}
      />

      <div style={{ display: "flex", marginTop: 20 }}>
        <Input
          onChange={onInput}
          value={textInput}
          onPressEnter={makeAComment}
          style={{ width: "100%", marginRight: 5 }}
          placeholder="Tell writer something..."
        />
        <Button onClick={makeAComment} type="primary">
          <SendOutlined />
        </Button>
      </div>
    </>
  );
}

export default Comments;
