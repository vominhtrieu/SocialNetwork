import React, { useEffect } from "react";
import Post from "../Post/Post";
import { API_HOST } from "../../config/constant";
import axios from "axios";
import { List, message } from "antd";

export default function ProfileHome(props) {
  const [posts, setPosts] = React.useState([]);

  useEffect(() => {
    axios
      .get(`${API_HOST}/${props.profileUser.id}/posts`, {
        withCredentials: true,
      })
      .then(({ data }) => {
        setPosts(data);
      })
      .catch((_err) => message.error("Cannot fetch your posts"));
  }, [props.profileUser.id]);

  return (
    <List
      locale={{ emptyText: "This profile doesn't have any post" }}
      header={<h2 style={{ marginLeft: 10, marginBottom: 0 }}>Posts</h2>}
      dataSource={posts}
      renderItem={(postId) => <Post key={postId} id={postId} />}
    />
  );
}
