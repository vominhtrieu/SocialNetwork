import React from 'react';
import {
  List,
  Card,
  CardContent,
  Box,
  makeStyles,
  ListItem,
  ListItemAvatar,
  ListItemText,
  ListItemIcon,
  Typography,
} from '@material-ui/core';

import HomeIcon from '@material-ui/icons/Home';
import FriendIcon from '@material-ui/icons/People';
import MessageIcon from '@material-ui/icons/Message';
import NotificationsIcon from '@material-ui/icons/Notifications';
import {
  Person as PersonIcon,
  Settings as SettingsIcon,
  Help as HelpIcon,
} from '@material-ui/icons';
import { connect } from 'react-redux';
import UserAvatar from '../Common/UserAvatar';
import { Link } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  cardRoot: {
    flexGrow: 1,
    paddingTop: theme.spacing(6),
    width: 320,
    borderRight: 'none',
    borderRadius: 0,
    overflowY: 'auto',
    [theme.breakpoints.down('md')]: {
      width: 200,
    },
  },
  link: {
    color: 'inherit',
    textDecoration: 'none',
    '& > *:hover': {
      backgroundColor: theme.palette.grey[100],
      cursor: 'pointer',
    },
  },
}));

function LeftNavigation({ user }) {
  const classes = useStyles();

  return (
    <Box
      position="fixed"
      display="flex"
      height="100vh"
      top={0}
      left={0}
      overflow="hidden"
    >
      <Card className={classes.cardRoot} variant="outlined">
        <CardContent>
          <List>
            <Link className={classes.link} to={`/${user.id}`}>
              <ListItem>
                <ListItemAvatar>
                  <UserAvatar imageId={user.avatar} />
                </ListItemAvatar>
                <ListItemText>
                  <b>{`${user.firstName} ${user.lastName}`}</b>
                </ListItemText>
              </ListItem>
            </Link>

            <Link className={classes.link} to="/">
              <ListItem>
                <ListItemIcon>
                  <HomeIcon fontSize="large" />
                </ListItemIcon>
                <ListItemText>Home</ListItemText>
              </ListItem>
            </Link>

            <Link className={classes.link} to="/friends">
              <ListItem>
                <ListItemIcon>
                  <FriendIcon fontSize="large" />
                </ListItemIcon>
                <ListItemText>Friends</ListItemText>
              </ListItem>
            </Link>

            <Link className={classes.link} to="/messages">
              <ListItem>
                <ListItemIcon>
                  <MessageIcon fontSize="large" />
                </ListItemIcon>
                <ListItemText>Messages</ListItemText>
              </ListItem>
            </Link>

            <Link className={classes.link} to="/notifications">
              <ListItem>
                <ListItemIcon>
                  <NotificationsIcon fontSize="large" />
                </ListItemIcon>
                <ListItemText>Notifications</ListItemText>
              </ListItem>
            </Link>

            <Link className={classes.link} to="/">
              <ListItem>
                <ListItemIcon>
                  <PersonIcon fontSize="large" />
                </ListItemIcon>
                <ListItemText>Edit your detail</ListItemText>
              </ListItem>
            </Link>

            <Link className={classes.link} to="/">
              <ListItem>
                <ListItemIcon>
                  <SettingsIcon fontSize="large" />
                </ListItemIcon>
                <ListItemText>Setting</ListItemText>
              </ListItem>
            </Link>

            <Link className={classes.link} to="/about">
              <ListItem>
                <ListItemIcon>
                  <HelpIcon fontSize="large" />
                </ListItemIcon>
                <ListItemText>About</ListItemText>
              </ListItem>
            </Link>
          </List>
        </CardContent>
        <Box
          position="absolute"
          left={32}
          bottom={8}
          width="100%"
          display="flex"
        >
          <Typography>
            <b>© 2020 Võ Minh Triều</b>
          </Typography>
        </Box>
      </Card>
    </Box>
  );
}

const mapStateToProps = (state) => ({
  user: state.user,
});

export default connect(mapStateToProps)(LeftNavigation);
