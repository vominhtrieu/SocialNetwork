import React from 'react';
import { Avatar } from '@material-ui/core';
import { API_HOST } from '../../config/constant';

export default function UserAvatar(props) {
  if (props.imageId) return <Avatar src={`${API_HOST}/image/${props.imageId}`} />;
  return <Avatar />;
}
