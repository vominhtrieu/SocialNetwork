import React from 'react';
import {
  List,
  Typography,
  Card,
  CardContent,
  Box,
  makeStyles,
} from '@material-ui/core';
import { PeopleAlt } from '@material-ui/icons';
import { connect } from 'react-redux';
import UserRow from '../component/ActiveList/UserRow';

const useStyles = makeStyles((theme) => ({
  peopleIcon: {
    fontSize: 80,
  },
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
}));

function ActiveList({ socket }) {
  const classes = useStyles();
  const [users, setUsers] = React.useState([]);

  React.useEffect(() => {
    socket.on('onlineList', (userList) => {
      setUsers(userList);
    });

    socket.on('online', (friendId) => {
      setUsers((users) => {
        if (!users.includes(friendId)) return [...users, friendId];
        else return users;
      });
    });

    socket.on('offline', (friendId) => {
      setUsers((users) => users.filter((user) => user !== friendId));
    });
  }, [socket]);

  return (
    <Box
      position="fixed"
      display="flex"
      height="100vh"
      top={0}
      right={0}
      overflow="hidden"
    >
      <Card className={classes.cardRoot} variant="outlined">
        {users.length > 0 ? (
          <CardContent>
            <Box paddingLeft={2}>
              <Typography variant="body1">
                <b>Active</b>
              </Typography>
            </Box>

            <List>
              {users.map((user, index) => (
                <UserRow key={user} userId={user} />
              ))}
            </List>
          </CardContent>
        ) : (
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            flexDirection="column"
            width="100%"
            height="100%"
          >
            <PeopleAlt className={classes.peopleIcon} />
            <Typography variant="h6">No one is online</Typography>
          </Box>
        )}
      </Card>
    </Box>
  );
}

const mapStateToProps = (state) => ({
  socket: state.socket,
});

export default connect(mapStateToProps)(ActiveList);
