import React from 'react';
import { Box, Card, Avatar, Typography, makeStyles } from '@material-ui/core';
import { API_HOST } from '../../config/constant';

const useStyle = makeStyles((theme) => ({
  root: {
    width: '100%',
    padding: 5,
  },
  item: {
    padding: '10px 5px',
    borderRadius: 5,
    clear: 'left',
    '&:hover': {
      cursor: 'pointer',
      background: 'rgb(230,230,230)',
    },
  },
  avatar: {
    width: 25,
    height: 25,
    float: 'left',
    marginRight: 5,
  },
  name: {
    lineHeight: 1.1,
    fontSize: 18,
  },
}));

export default function MatchedFriends(props) {
  const classes = useStyle();
  const { friends } = props;
  const renderComponent = friends.map((friend, index) => (
    <Box key={index} display='flex' alignItems='center' className={classes.item} onClick={() => props.action(friend)}>
      <Avatar src={API_HOST + '/image/' + friend.avatar} className={classes.avatar} />
      <Typography className={classes.name} noWrap variant='body2'>
        {friend.fullName}
      </Typography>
    </Box>
  ));
  return (
    <Box marginBottom={2}>
      <Card raised className={classes.root}>
        {renderComponent}
      </Card>
    </Box>
  );
}
