import React from 'react';
import { Card, CardContent, Typography, Avatar, Box, Button } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { API_HOST } from '../../config/constant';
import moment from 'moment/moment';

const useStyle = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  avatar: {
    width: 50,
    height: 50,
    float: 'left',
    marginRight: 10,
  },
  link: {
    color: 'inherit',
    textDecoration: 'none',
  },
  name: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  date: {
    fontSize: 14,
    cursor: 'default',
    lineHeight: '1em',
  },
  button: {
    marginRight: 5,
    textTransform: 'none',
  },
}));

function FriendRequest({ requestId, socket }) {
  const [request, setRequest] = React.useState(null);

  React.useEffect(() => {
    fetch(`${API_HOST}/friendrequest?id=${requestId}`, {
      method: 'GET',
      credentials: 'include',
    })
      .then((res) => res.json())
      .then((requestData) => setRequest(requestData));
  }, [requestId]);

  function respondRequest(response) {
    fetch(API_HOST + '/respondfriendrequest', {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(response),
    }).then((res) => {
      if (res.ok) {
        socket.emit('respondFriendRequest', response);
      }
    });
  }

  const classes = useStyle();
  if (!request) return null;
  console.log(request);
  return (
    <Box display='flex' justifyContent='center' marginBottom={2} width='100%'>
      <Card variant='outlined' className={classes.root}>
        <CardContent>
          <Box display='block' flexGrow={1}>
            <Link className={classes.link} to={'/' + request.user._id}>
              <Avatar
                src={request.user.avatar ? `${API_HOST}/image/${request.user.avatar}` : null}
                className={classes.avatar}
              />
            </Link>
            <Link className={classes.link} to={'/' + request.user._id}>
              <Typography className={classes.name} variant='h5'>
                {request.user.firstName + ' ' + request.user.lastName}
              </Typography>
            </Link>
            <Typography className={classes.date} color='textSecondary'>
              {moment(request.requestedDate).fromNow()}
            </Typography>
          </Box>
          <Box marginTop={1}>
            <Button
              className={classes.button}
              size='small'
              color='primary'
              variant='contained'
              onClick={() => {
                respondRequest({ accept: true, requestId: request._id });
              }}
            >
              Accept
            </Button>
            <Button
              className={classes.button}
              size='small'
              color='secondary'
              variant='outlined'
              onClick={() => {
                respondRequest({ accept: false, requestId: request._id });
              }}
            >
              Reject
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
}

export default FriendRequest;
