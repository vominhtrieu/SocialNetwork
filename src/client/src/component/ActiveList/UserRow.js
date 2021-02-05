import React from 'react';
import { ListItem, ListItemAvatar, ListItemText, makeStyles } from '@material-ui/core';
import UserAvatar from '../Common/UserAvatar';
import Skeleton from 'react-loading-skeleton';
import { API_HOST } from '../../config/constant';
import { Link } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  link: {
    color: 'inherit',
    textDecoration: 'none',
  },
  listItem: {
    '&:hover': {
      backgroundColor: theme.palette.grey[100],
    },
  },
}));

export default function UserRow({ userId }) {
  const classes = useStyles();
  const [user, setUser] = React.useState(null);

  React.useEffect(() => {
    fetch(`${API_HOST}/${userId}`, {
      method: 'GET',
      credentials: 'include',
    })
      .then((res) => res.json())
      .then((data) => setUser(data));
  }, [userId]);
  if (!user) return <Skeleton />;
  return (
    <Link to={`/${userId}`} className={classes.link}>
      <ListItem className={classes.listItem}>
        <ListItemAvatar>
          <UserAvatar imageId={user.avatar} />
        </ListItemAvatar>
        <ListItemText>{`${user.firstName} ${user.lastName}`}</ListItemText>
      </ListItem>
    </Link>
  );
}
