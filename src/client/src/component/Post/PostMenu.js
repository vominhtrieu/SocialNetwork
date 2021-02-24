import React from "react";
import { Menu, MenuItem } from "@material-ui/core";
import { API_HOST } from "../../config/constant";

export default function PostMenu({ postId, open, anchorEl, closeMenu }) {
  const deletePost = () => {
    fetch(`${API_HOST}/${postId}`, {});
  };
  return (
    <Menu open={open} anchorEl={anchorEl}>
      <MenuItem onClick={deletePost}>Delete</MenuItem>
    </Menu>
  );
}
