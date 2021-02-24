import { Typography, Card, CardContent, Box } from '@material-ui/core';
import React from 'react';

export default function About() {
  return (
    <Box marginTop={2}>
      <Card variant='outlined'>
        <CardContent>
          <Typography variant='body1'>
            <b>MTNET</b> is a simple social network which built with MongoDB, ExpressJs, React, NodeJs and so on...
          </Typography>
          <Typography>
            In this social network, you can connect with other people in the world, communicate with them, upload
            status,...
          </Typography>
          <Typography>
            This social network is <b>still in development</b>.
          </Typography>
          <Typography>
            Features are currently working on: Notification, Sending Image, Notification, Audio and Video Call,...
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
}
