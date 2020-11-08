import React from 'react';
import {
  Menu,
  MenuItem,
  Avatar,
  Typography,
  Box,
  makeStyles,
} from '@material-ui/core';
import {
  Person as PersonIcon,
  Settings as SettingsIcon,
  ExitToApp as LogoutIcon,
  Help as HelpIcon,
} from '@material-ui/icons';
import { HOST } from '../../config/constant';

const useStyles = makeStyles((theme) => ({
  avatarMenuItem: {
    width: theme.spacing(7),
    height: theme.spacing(7),
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    lineHeight: 1,
  },
  menuIcon: {
    fontSize: 30,
    marginRight: 5,
  },
}));

export default function NavbarMenu(props) {
  const classes = useStyles();

  const { anchorEl, closeMenu, user } = props;
  function SignOut() {
    props.signOut();
  }

  const open = Boolean(anchorEl);

  return (
    <Menu
      id="menu-appbar"
      anchorEl={anchorEl}
      getContentAnchorEl={null}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'right',
      }}
      disableScrollLock={true}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={open}
      onClose={closeMenu}
    >
      <MenuItem
        onClick={() => {
          closeMenu('/' + user.id);
        }}
      >
        <Box>
          <Avatar
            className={classes.avatarMenuItem}
            src={HOST + '/image/' + user.avatar}
            alt={user.firstName + "'s avatar"}
          />
        </Box>
        <Box marginLeft={1} minWidth={120}>
          <Typography className={classes.name}>
            {user.firstName + ' ' + user.lastName}
          </Typography>
          <Typography color="textSecondary" variant="body2">
            View your profile
          </Typography>
        </Box>
      </MenuItem>
      <MenuItem>
        <PersonIcon className={classes.menuIcon} />
        <Typography>Edit your detail</Typography>
      </MenuItem>
      <MenuItem
        onClick={() => {
          closeMenu('/');
        }}
      >
        <SettingsIcon className={classes.menuIcon} />
        <Typography>Setting</Typography>
      </MenuItem>
      <MenuItem
        onClick={() => {
          closeMenu('/about');
        }}
      >
        <HelpIcon className={classes.menuIcon} />
        <Typography>About</Typography>
      </MenuItem>
      <MenuItem onClick={SignOut}>
        <LogoutIcon className={classes.menuIcon} />
        <Typography>Sign out</Typography>
      </MenuItem>
    </Menu>
  );
}
