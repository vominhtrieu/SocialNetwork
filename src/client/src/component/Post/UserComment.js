import React, { useEffect } from "react";
import { Comment, Tooltip, message, Skeleton, Typography } from "antd";
import { Link } from "react-router-dom";
import UserAvatar from "../Common/UserAvatar";
import { API_HOST } from "../../config/constant";
import axios from "axios";
import moment from "moment";

const { Paragraph } = Typography;

export default function UserComment({ commentId }) {
  const [comment, setComment] = React.useState({});

  useEffect(() => {
    axios
      .get(`${API_HOST}/comments/${commentId}`, {
        withCredentials: true,
      })
      .then(({ data }) => setComment(data))
      .catch((_err) => message.error("Cannot fetch a comment"));
  }, [commentId]);

  return (
    <Skeleton loading={Boolean(!comment.user)} active avatar>
      {comment.user && (
        <Comment
          author={
            <Link to={`/${comment.user._id}`}>
              <h3
                style={{ color: "rgba(255,255,255,0.85)", marginBottom: 0 }}
              >{`${comment.user.firstName} ${comment.user.lastName}`}</h3>
            </Link>
          }
          avatar={<UserAvatar imageId={comment.user.avatar} />}
          content={
            <Paragraph ellipsis={{ expandable: true, rows: 2 }} style={{ color: "rgba(255,255,255,0.6)" }}>
              {comment.textContent}
            </Paragraph>
          }
          datetime={
            <Tooltip title={moment(comment.date).fromNow()}>
              <span style={{ color: "rgba(255,255,255,0.5)" }}>{moment(comment.date).fromNow()}</span>
            </Tooltip>
          }
        />
      )}
    </Skeleton>
  );
}
