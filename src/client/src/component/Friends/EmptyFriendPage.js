import React from 'react';
import { Card, Typography, makeStyles } from '@material-ui/core';
import { People as FriendIcon } from '@material-ui/icons';
import { Helmet } from 'react-helmet';

const useStyles = makeStyles((theme) => ({
  cardRoot: {
    marginTop: theme.spacing(2),
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    flexGrow: 1,
  },
  friendIcon: {
    fontSize: 80,
  },
}));

export default function EmptyFriendPage() {
  const classes = useStyles();

  return (
    <Card variant="outlined" className={classes.cardRoot}>
      <Helmet>
        <title>MTNET - Friend</title>
      </Helmet>
      <FriendIcon className={classes.friendIcon} />
      <Typography variant="h6">You don't have any friend request.</Typography>
    </Card>
  );
}
