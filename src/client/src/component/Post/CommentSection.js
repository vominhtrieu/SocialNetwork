import React from "react";
import Comment from "./Comment";

function CommentSection({ comments, isVisible, socket, id }) {
  React.useEffect(() => {
    console.log(id);
    return () => {
      socket.removeAllListeners("newLike");
    };
  }, [isVisible, id, socket]);
  const renderComments = comments.map((comment, index) => (
    <Comment key={index} id={comment} />
  ));
  return renderComments;
}

export default CommentSection;
