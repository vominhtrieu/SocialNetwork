import React from "react";
import { Avatar } from "@material-ui/core";
import { HOST } from "../../config/constant";

export default function UserAvatar(props) {
  if (props.imageId) return <Avatar src={`${HOST}/image/${props.imageId}`} />;
  return <Avatar />
}