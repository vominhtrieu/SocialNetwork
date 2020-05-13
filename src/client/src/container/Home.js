import React from "react";
import Post from "../component/Home/Post";
import PostAdd from "../component/Home/PostAdd";

function Home() {
  return (
    <div>
      <PostAdd />
      <Post />
      <Post />
    </div>
  );
}

export default Home;
