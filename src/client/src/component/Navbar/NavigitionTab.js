import React from "react";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Badge from "@material-ui/core/Badge";
import HomeIcon from "@material-ui/icons/Home";
import FriendIcon from "@material-ui/icons/People";
import MessageIcon from "@material-ui/icons/Message";
import NotificationsIcon from "@material-ui/icons/Notifications";
import Box from "@material-ui/core/Box";
import { makeStyles } from "@material-ui/core/styles";
import { HOST } from "../../config/constant";

const useStyles = makeStyles((theme) => ({
  tabsRoot: {
    width: "min(100%, 550px)",
  },
  bigIndicator: {
    height: 4,
    backgroundColor: "white",
    borderRadius: 2,
  },
  tab: {
    ...theme.mixins.toolbar,
    minWidth: 40,
    [theme.breakpoints.only("sm")]: {
      paddingTop: 0,
      paddingBottom: 0,
    },
  },
  icon: {
    transition: "all 0.3s",
  },
}));

const routes = ["/", "/friends", "/messages", "/notifications"];

function NavigationTab(props) {
  const classes = useStyles();
  const [tabIndex, setTabIndex] = React.useState(
    routes.indexOf(props.history.location.pathname)
  );
  const [newFriendRequests, setNewFriendRequests] = React.useState(0);
  const [newMessages, setNewMessages] = React.useState(0);

  React.useEffect(() => {
    fetch(HOST + "/update", { method: "GET", credentials: "include" })
      .then((res) => res.json())
      .then((notifications) => {
        setNewFriendRequests(notifications.newFriendRequests);
        setNewMessages(notifications.newMessages);
      });

    props.socket.on("newFriendRequest", (data) => {
      setNewFriendRequests(data.newFriendRequests);
    });

    props.socket.on("newMessage", (data) => {
      console.log("alo");
    });
  }, [props.socket]);

  React.useEffect(() => {
    setTabIndex(routes.indexOf(props.history.location.pathname));
  }, [props.history.location.pathname]);

  const changeRoute = (event, newIndex) => {
    props.history.push(routes[newIndex]);
  };

  return (
    <Box display="flex" justifyContent="center">
      <Tabs
        classes={{
          indicator: classes.bigIndicator,
        }}
        value={tabIndex === -1 ? false : tabIndex}
        className={classes.tabsRoot}
        onChange={changeRoute}
        variant="fullWidth"
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
            <Badge badgeContent={newMessages} max={99} color="secondary">
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

export default NavigationTab;
