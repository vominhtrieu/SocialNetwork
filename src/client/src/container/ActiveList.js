import React from "react";
import {
  List,
  ListItem,
  ListItemAvatar,
  Typography,
  Card,
  CardContent,
  Box, makeStyles
} from "@material-ui/core";
import { connect } from "react-redux";
import UserAvatar from "../component/Common/UserAvatar";

const useStyles = makeStyles((theme) => ({
  cardRoot: { flexGrow: 1, marginTop: theme.spacing(8), marginBottom: theme.spacing(2) }
}));

function ActiveList({ socket }) {
  const classes = useStyles();
  const [users, setUsers] = React.useState([]);
  
  React.useEffect(() => {
    socket.on("userList", (userList) => {
      setUsers(userList);
    });

    socket.on("newUser", (user) => {
      setUsers((users) => [...users, user]);
    });
  }, [socket]);

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
            {users.map((user) => (
              <ListItem>
                <ListItemAvatar>
                  <UserAvatar imageId={user.avatar} />
                </ListItemAvatar>
              </ListItem>
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
