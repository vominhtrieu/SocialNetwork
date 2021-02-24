import React from "react";
import { Avatar, Image } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { API_HOST } from "../../config/constant";

export default function UserAvatar(props) {
  if (props.imageId && props.preview)
    return <Avatar style={props.style} size={props.size} src={<Image src={`${API_HOST}/images/${props.imageId}`} />} />;
  else if (props.imageId)
    return <Avatar style={props.style} size={props.size} src={`${API_HOST}/images/${props.imageId}`} />;
  return <Avatar style={props.style} size={props.size} icon={<UserOutlined />} />;
}
