import React from "react";
import Room from "../component/Message/Room";
import RoomList from "../component/Message/RoomList";
import { Switch, Route } from "react-router-dom";

function Messages() {
  return (
    <Switch>
      <Route exact path="/messages/:id" component={Room} />
      <Route exact path="/messages" component={RoomList} />
    </Switch>
  );
}

export default Messages;
