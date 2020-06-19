import React, { useEffect } from "react";
import PostAdd from "../Post/PostAdd";
import Post from "../Post/Post";
import { HOST } from "../../config/constant";

export default function ProfileHome(props) {
  const [posts, setPosts] = React.useState([]);

  useEffect(() => {
    fetch(`${HOST}/${props.profileUser.id}/posts`, {
      method: "GET",
      credentials: "include",
    })
      .then((res) => res.json())
      .then((posts) => {
        setPosts(posts);
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
