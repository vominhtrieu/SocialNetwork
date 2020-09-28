import React from "react";
import { List, ListItem, ListItemAvatar, Avatar, Typography } from "@material-ui/core";

export default function ActiveList() {
  return (
    <React.Fragment>
        <Typography variant="body1">Active</Typography>
      <List>
        <ListItem>
          <ListItemAvatar>
            <Avatar />
          </ListItemAvatar>
        </ListItem>
        <ListItem>
          <ListItemAvatar>
            <Avatar />
          </ListItemAvatar>
        </ListItem>
      </List>
    </React.Fragment>
  );
}
