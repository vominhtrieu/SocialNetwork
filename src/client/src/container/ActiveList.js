import React from 'react';
import {
  List,
  Typography,
  Card,
  CardContent,
  Box,
  makeStyles,
} from '@material-ui/core';
import { connect } from 'react-redux';
import UserRow from '../component/ActiveList/UserRow';

const useStyles = makeStyles((theme) => ({
  cardRoot: { flexGrow: 1, marginTop: theme.spacing(8) },
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
  }, [socket]);
  console.log(users);
  return (
    <Box display="flex" height="100vh" width="100%">
      <Card className={classes.cardRoot} variant="outlined">
        <CardContent>
          <Box paddingLeft={2}>
            <Typography variant="body1">
              <b>Active</b>
            </Typography>
          </Box>
          <List>
            {users.map((user, index) => (
              <UserRow key={index} userId={user} />
            ))}
          </List>
        </CardContent>
      </Card>
    </Box>
  );
}

const mapStateToProps = (state) => ({
  socket: state.socket,
});

export default connect(mapStateToProps)(ActiveList);
