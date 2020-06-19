import React from "react";
import Comment from "./Comment";

function CommentSection({ comments }) {
  const renderComments = comments.map((comment, index) => (
    <Comment key={index} id={comment} />
  ));
  return renderComments;
}

export default CommentSection;