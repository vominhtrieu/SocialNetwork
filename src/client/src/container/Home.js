import React, { useEffect } from 'react';
import { Box } from '@material-ui/core';
import Post from '../component/Post/Post';
import PostAdd from '../component/Post/PostAdd';
import { API_HOST } from '../config/constant';
import { Helmet } from 'react-helmet';

function Home() {
  const [posts, setPosts] = React.useState([]);
  useEffect(() => {
    fetch(`${API_HOST}/feed`, {
      method: 'GET',
      credentials: 'include',
    })
      .then((res) => res.json())
      .then((newPosts) => {
        if (newPosts) setPosts(newPosts);
      });
  }, []);

  const addPost = (id) => {
    setPosts((posts) => [id, ...posts]);
  };

  const renderPost = posts.map((postId) => {
    return <Post key={postId} id={postId} />;
  });

  return (
    <Box width='100%'>
      <Helmet>
        <title>MTNET - Home</title>
      </Helmet>
      <PostAdd addPost={addPost} />
      {renderPost}
    </Box>
  );
}

export default Home;
