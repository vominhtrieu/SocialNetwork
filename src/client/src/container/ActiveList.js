import React from "react";
import {
  List,
  ListItem,
  ListItemAvatar,
  Avatar,
  Typography,
  Card,
  CardContent,
  Box,
} from "@material-ui/core";

export default function ActiveList() {
  return (
    <Card variant="outlined">
      <CardContent>
        <Box paddingLeft={2}>
          <Typography variant="body1">Active</Typography>
        </Box>
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
      </CardContent>
    </Card>
  );
}
