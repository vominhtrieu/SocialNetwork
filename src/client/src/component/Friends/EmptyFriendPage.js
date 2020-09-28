import React from "react";
import { Card, CardContent, Typography, Box } from "@material-ui/core";
import { People as FriendIcon } from "@material-ui/icons";

export default function EmptyFriendPage() {
  return (
    <Box paddingTop={2}>
      <Card variant="outlined">
        <CardContent>
          <Box>
            <FriendIcon fontSize="large" />
            <Typography variant="body1">
              You have not received any friend request.
            </Typography>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
}
