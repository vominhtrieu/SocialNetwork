import React from "react";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Badge from "@material-ui/core/Badge";
import HomeIcon from "@material-ui/icons/Home";
import FriendIcon from "@material-ui/icons/People";
import MessageIcon from "@material-ui/icons/Message";
import NotificationsIcon from "@material-ui/icons/Notifications";
import Box from "@material-ui/core/Box";
import { useHistory, useLocation } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import { HOST } from "../../config/constant";

const useStyles = makeStyles((theme) => ({
  bigIndicator: {
    backgroundColor: theme.palette.common.black,
    height: 2,
    borderRadius: 2,
  },
  icon: {
    transition: "all 0.2s",
  },
  tab: {
    height: 50,
    minWidth: 0,
  }
}));

const routes = ["/", "/friends", "/messages", "/notifications"];

export default function NavigationTab(props) {
  const classes = useStyles();
  const history = useHistory();
  const location = useLocation();

  const [tabIndex, setTabIndex] = React.useState(
    routes.indexOf(location.pathname)
  );
  const [newFriendRequests, setNewFriendRequests] = React.useState(0);

  // List of rooms which  message(s) user have not read
  const [notSeenRooms, setNotSeenRooms] = React.useState(new Set());

  React.useEffect(() => {
    fetch(HOST + "/update", { method: "GET", credentials: "include" })
      .then((res) => res.json())
      .then((notifications) => {
        setNewFriendRequests(notifications.newFriendRequests);
        setNotSeenRooms(new Set(notifications.notSeenRooms));
      });

    props.socket.on("newFriendRequest", (data) => {
      setNewFriendRequests(data.newFriendRequests);
    });

    props.socket.on("newMessage", ({ roomId }) => {
      setNotSeenRooms((notSeenRooms) => new Set(notSeenRooms).add(roomId));
    });

    props.socket.on("seen", ({ roomId }) => {
      setNotSeenRooms((notSeenRooms) => {
        let temp = new Set(notSeenRooms);
        temp.delete(Number(roomId));
        return temp;
      });
    });
  }, [props.socket]);

  React.useEffect(() => {
    setTabIndex(routes.indexOf(location.pathname));
  }, [location.pathname]);

  const changeRoute = (event, newIndex) => {
    history.push(routes[newIndex]);
  };

  return (
    <Box height="50px" margin="auto" width="min(580px, 100%)">
      <Tabs
        value={tabIndex === -1 ? false : tabIndex}
        onChange={changeRoute}
        variant="fullWidth"
        centered
      >
        <Tab
          className={classes.tab}
          label={
            <Badge badgeContent={0} max={0} color="secondary">
              <HomeIcon
                className={classes.icon}
                fontSize={tabIndex === 0 ? "large" : "default"}
              />
            </Badge>
          }
        />
        <Tab
          className={classes.tab}
          label={
            <Badge badgeContent={newFriendRequests} max={99} color="secondary">
              <FriendIcon
                className={classes.icon}
                fontSize={tabIndex === 1 ? "large" : "default"}
              />
            </Badge>
          }
        />
        <Tab
          className={classes.tab}
          label={
            <Badge badgeContent={notSeenRooms.size} max={99} color="secondary">
              <MessageIcon
                className={classes.icon}
                fontSize={tabIndex === 2 ? "large" : "default"}
              />
            </Badge>
          }
        />
        <Tab
          className={classes.tab}
          label={
            <Badge badgeContent={0} max={99} color="secondary">
              <NotificationsIcon
                className={classes.icon}
                fontSize={tabIndex === 3 ? "large" : "default"}
              />
            </Badge>
          }
        />
      </Tabs>
    </Box>
  );
}
