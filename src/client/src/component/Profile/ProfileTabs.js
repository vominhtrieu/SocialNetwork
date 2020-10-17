import React from "react";
import { Link, withRouter } from "react-router-dom";
import { Tabs, Tab, makeStyles } from "@material-ui/core";
import TimelineIcon from "@material-ui/icons/Timeline";
import ImageIcon from "@material-ui/icons/Image";
import FriendIcon from "@material-ui/icons/People";
import PersonIcon from "@material-ui/icons/Person";

const useStyles = makeStyles((theme) => ({
  tab: {
    minWidth: 50,
  },
}));

function ProfileTabs({ profileUser, history }) {
  const classes = useStyles();
  const url = `/${profileUser.id}`;
  let path = history.location.pathname;
  path = path.substr(path.length - 1) === "/" ? path.slice(0, -1) : path;
  return (
    <Tabs value={path} variant="fullWidth">
      <Tab
        component={Link}
        to={`${url}`}
        value={`${url}`}
        className={classes.tab}
        label={<TimelineIcon />}
      />
      <Tab
        component={Link}
        to={`${url}/images`}
        value={`${url}/images`}
        className={classes.tab}
        label={<ImageIcon />}
      />
      <Tab
        component={Link}
        to={`${url}/friends`}
        value={`${url}/friends`}
        className={classes.tab}
        label={<FriendIcon />}
      />
      <Tab
        component={Link}
        to={`${url}/detail`}
        value={`${url}/detail`}
        className={classes.tab}
        label={<PersonIcon />}
      />
    </Tabs>
  );
}

export default withRouter(ProfileTabs);
