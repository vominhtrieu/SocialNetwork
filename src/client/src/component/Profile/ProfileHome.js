import React, { useEffect } from "react";
import PostAdd from "../Home/PostAdd";
import Post from "../Home/Post";
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
        setPosts(posts)
      });
  }, [props.profileUser.id]);

  const renderPosts = posts.map((post, index) => {
    return <Post key={index} user={post.user} textContent={post.textContent} images={post.images} date={post.date} />
  })

  return (
    <div>
      <PostAdd />
      {renderPosts}
    </div>
  );
}
