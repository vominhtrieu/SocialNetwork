import React, { useEffect } from "react";
import Post from "../Post/Post";
import { API_HOST } from "../../config/constant";
import axios from "axios";
import { message } from "antd";

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

  return posts.map((postId, index) => <Post key={index} id={postId} />);
}
