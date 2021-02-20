import React, { useEffect } from "react";
import Post from "../component/Post/Post";
import { API_HOST } from "../config/constant";
import { List } from "antd";
import Title from "../component/Common/Title";

function Home() {
  const [posts, setPosts] = React.useState([]);
  useEffect(() => {
    fetch(`${API_HOST}/feed`, {
      method: "GET",
      credentials: "include",
    })
      .then((res) => res.json())
      .then((newPosts) => {
        if (newPosts) setPosts(newPosts);
      });
  }, []);

  return (
    <div style={{ width: "100%" }}>
      <Title title="Home" />
      <List dataSource={posts} renderItem={(postId) => <Post key={postId} id={postId} />} />
    </div>
  );
}

export default Home;
