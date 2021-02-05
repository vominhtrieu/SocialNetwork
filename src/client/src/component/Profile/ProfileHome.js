import React, { useEffect } from 'react';
import PostAdd from '../Post/PostAdd';
import Post from '../Post/Post';
import { API_HOST } from '../../config/constant';
import axios from 'axios';

export default function ProfileHome(props) {
  const [posts, setPosts] = React.useState([]);

  useEffect(() => {
    axios
      .get(`${API_HOST}/${props.profileUser.id}/posts`, {
        credentials: 'include',
      })
      .then(({ data }) => {
        setPosts(data);
      });
  }, [props.profileUser.id]);

  const renderPosts = posts.map((postId, index) => {
    return <Post key={index} id={postId} />;
  });

  return (
    <div>
      <PostAdd />
      {renderPosts}
    </div>
  );
}
