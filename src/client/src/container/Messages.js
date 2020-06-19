import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Box, IconButton, Divider, List, Card } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import SearchIcon from "@material-ui/icons/Search";
import NewMessageDialog from "../component/Dialog/NewMessage";
import { connect } from "react-redux";
import Room from "../component/Message/Room";
import RoomPreview from "../component/Message/RoomPreview";
import { HOST } from "../config/constant";
import { Switch, Route } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: 16,
  },
  avatar: {
    marginRight: 1,
  },
}));

function Messages(props) {
  const classes = useStyles();
  const [messageOpen, setMessageOpen] = React.useState(false);
  const [roomIds, setRoomIds] = React.useState([]);
  React.useEffect(() => {
    fetch(`${HOST}/chatrooms`, {
      method: "GET",
      credentials: "include",
    })
      .then((res) => res.json())
      .then((ids) => {
        setRoomIds(ids);
      });
  }, []);
  const renderRooms = roomIds.map((id, index) => (
    <RoomPreview key={index} id={id} userId={props.user.id} />
  ));

  return (
    <Switch>
      <Route exact path="/messages/:id" component={Room} />
      <Route exact path="/messages">
        <Card variant="outlined" className={classes.root}>
          <NewMessageDialog
            open={messageOpen}
            closeDialog={() => setMessageOpen(false)}
            userId={props.user.id}
          />
          <Box>
            <IconButton onClick={() => setMessageOpen(true)}>
              <AddIcon />
            </IconButton>
            <IconButton>
              <SearchIcon />
            </IconButton>
          </Box>
          <Divider />
          <List dense>{renderRooms}</List>
        </Card>
      </Route>
    </Switch>
  );
}

const mapStateToProps = (state) => ({
  user: state.user,
});

export default connect(mapStateToProps)(Messages);
