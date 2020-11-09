import React from 'react';
import { HOST } from '../../config/constant';
import Comment from './Comment';

function CommentSection({ isVisible, socket, postId }) {
  const [comments, setComments] = React.useState([]);

  React.useEffect(() => {
    if (isVisible) {
      fetch(`${HOST}/${postId}/comments`, {
        method: 'GET',
        credentials: 'include',
      })
        .then((res) => res.json())
        .then((comments) => {
          setComments(comments);
        });

      socket.on('newComment', (data) => {
        if (postId === data.postId) {
          setComments((comments) => [...comments, data.commentId]);
        }
      });
    } else {
      socket.off('newComment');
    }
    return () => {
      socket.off('newComment');
    };
  }, [isVisible, postId, socket]);

  const renderComments = comments.map((comment) => (
    <Comment key={comment} id={comment} />
  ));
  return renderComments;
}

export default CommentSection;
