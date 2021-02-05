import React from 'react';
import { Box, Card, CardContent } from '@material-ui/core';

function ProfileDetail({ profileUser }) {
  return (
    <Box marginTop={2}>
      <Card variant='outlined'>
        <CardContent>
          <b>ID: </b> {profileUser.id}
          <br />
          <b>First Name: </b> {profileUser.firstName} <br />
          <b>Last Name: </b> {profileUser.lastName} <br />
          <b>Email: </b> {profileUser.email} <br />
        </CardContent>
      </Card>
    </Box>
  );
}

export default ProfileDetail;
