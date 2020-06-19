import React, { useEffect } from "react";
import Post from "../component/Post/Post";
import PostAdd from "../component/Post/PostAdd";
import { HOST } from "../config/constant";

function Home() {
  const [posts, setPosts] = React.useState([]);
  useEffect(() => {
    fetch(`${HOST}/feed`, {
      method: "GET",
      credentials: "include",
    })
      .then((res) => res.json())
      .then((newPosts) => {
        if (newPosts) setPosts(newPosts);
      });
  }, []);

  const renderPost = posts.map((postId, index) => {
    return (
      <Post
        key={index}
        id={postId}
      />
    );
  });

  return (
    <div>
      <PostAdd />
      {renderPost}
    </div>
  );
}

export default Home;
