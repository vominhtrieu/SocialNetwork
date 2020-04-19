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
      paddingBottom: 0
    }
  },
  icon: {
    transition: "all 0.3s",
  },
}));

function indexToRoute(index) {
  switch (index) {
    case 0:
      return "/";
    case 1:
      return "/friends";
    case 2:
      return "/messages";
    case 3:
      return "/notifications";
    default:
      return "/";
  }
}

function routeToIndex(route) {
  switch (route) {
    case "/":
      return 0;
    case "/friends":
      return 1;
    case "/messages":
      return 2;
    case "/notifications":
      return 3;
    default:
      return -1;
  }
}

function NavigationTab(props) {
  const classes = useStyles();
  const [tabIndex, setTabIndex] = React.useState(
    routeToIndex(props.history.location.pathname)
  );

  const changeRoute = (event, newIndex) => {
    setTabIndex(newIndex);
    props.history.push(indexToRoute(newIndex));
  };
  return (
    <Box display="flex" justifyContent="center">
      <Tabs
        classes={{
          indicator: classes.bigIndicator,
        }}
        value={tabIndex}
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
            <Badge badgeContent={2} max={99} color="secondary">
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
            <Badge badgeContent={5} max={99} color="secondary">
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
            <Badge badgeContent={101} max={99} color="secondary">
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
