import React from 'react';
import { Box, Typography, makeStyles, withStyles, Tooltip, Avatar } from '@material-ui/core';
import { AvatarGroup } from '@material-ui/lab';
import { API_HOST } from '../../config/constant';

const useStyles = makeStyles((theme) => ({
  messageContentReceive: {
    padding: '8px 15px',
    borderRadius: 25,
    whiteSpace: 'pre-line',
    backgroundColor: '#f0f2f5',
    color: 'black',
  },
  bubble: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: theme.palette.common.black,
  },
}));

const LightTooltip = withStyles((theme) => ({
  tooltip: {
    backgroundColor: theme.palette.common.white,
    color: 'rgba(0, 0, 0, 0.87)',
    boxShadow: theme.shadows[1],
    fontSize: 12,
  },
}))(Tooltip);

export default function ReceiveMessage(props) {
  const { typingUsers, participants } = props;
  const classes = useStyles();
  console.log(typingUsers);

  const users = typingUsers.map((user) => {
    let temp = null;
    for (const participant of participants) {
      if (participant.user._id === Number(user)) {
        temp = participant.user;
        break;
      }
    }
    return temp;
  });

  if (!users.length) return null;

  return (
    <Box display='flex' alignItems='center' justifyContent='flex-start' marginBottom={0.5}>
      <Box>
        <AvatarGroup max={3} spacing='small'>
          {users.map((user, index) => (
            <Avatar key={index} src={user.avatar ? `${API_HOST}/image/${user.avatar}` : null} />
          ))}
        </AvatarGroup>
      </Box>
      <LightTooltip title={'Typing'} placement='right'>
        <Box marginLeft={1} className={classes.messageContentReceive}>
          <Typography>Typing...</Typography>
        </Box>
      </LightTooltip>
    </Box>
  );
}
