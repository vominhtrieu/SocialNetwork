import React from "react";
import { AppBar, Typography, Box } from "@material-ui/core";
import { fade, makeStyles } from "@material-ui/core/styles";
import Badge from "@material-ui/core/Badge";
import HomeIcon from "@material-ui/icons/Home";
import FriendIcon from "@material-ui/icons/People";
import MessageIcon from "@material-ui/icons/Mail";
import NotificationsIcon from "@material-ui/icons/Notifications";
import SearchIcon from "@material-ui/icons/Search";
import AccountIcon from "@material-ui/icons/AccountCircle";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import InputBase from "@material-ui/core/InputBase";
import IconButton from "@material-ui/core/IconButton";
import Grid from "@material-ui/core/Grid";
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: "#1e88e5",
  },
  title: {
    flexGrow: 1,
    cursor: "default",
    paddingRight: 2,
  },
  searchBar: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.3),
    margin: theme.spacing(1),
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  searchField: {
    padding: theme.spacing(0.3, 1, 0.3, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
  },
  fullHeight: {
    ...theme.mixins.toolbar,
  },
  bigIndicator: {
    height: 4,
  },
  tab: {
    ...theme.mixins.toolbar,
    minWidth: 40,
  },
  tabsGrid: {
    order: 3,

    [theme.breakpoints.up(960)]: {
      order: 2,
    },
  },
  accountGrid: {
    order: 2,
    paddingRight: "1vw",
    [theme.breakpoints.up(600)]: {
      paddingRight: "4vw",
    },
    [theme.breakpoints.up(960)]: {
      order: 3,
      paddingRight: "3vw",
    },
  },
}));

function indexToRoute(index) {
  switch (index) {
    case 0:
      return "/home";
    case 1:
      return "/friends";
    case 2:
      return "/messages";
    case 3:
      return "/notifications";
    default:
      return "home";
  }
}

function Navbar(props) {
  const classes = useStyles();
  const [tabIndex, setTabIndex] = React.useState(0);
  const changeRoute = (event, newIndex) => {
    setTabIndex(newIndex);
    props.history.push(indexToRoute(newIndex));
  };
  return (
    <AppBar position="static" className={classes.root}>
      <Grid container alignItems="center">
        <Grid item xs={2} sm={2} md={1}>
          <Box>
            <Typography align="center" variant="h5" className={classes.title}>
              MTN
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={8} md={2}>
          <div className={classes.searchBar}>
            <SearchIcon className={classes.searchIcon} />
            <InputBase
              className={classes.searchField}
              placeholder="Search..."
              inputProps={{ "aria-label": "search" }}
            />
          </div>
        </Grid>
        <Grid item xs={false} md={1} />
        <Grid className={classes.tabsGrid} item xs={12} md={4}>
          <Tabs
            classes={{
              indicator: classes.bigIndicator,
            }}
            value={tabIndex}
            onChange={changeRoute}
            indicatorColor="primary"
            variant="fullWidth"
          >
            <Tab
              className={classes.tab}
              label={
                <Badge badgeContent={0} max={0} color="secondary">
                  <HomeIcon fontSize={tabIndex === 0 ? "large" : "default"} />
                </Badge>
              }
            />
            <Tab
              className={classes.tab}
              label={
                <Badge badgeContent={2} max={99} color="secondary">
                  <FriendIcon fontSize={tabIndex === 1 ? "large" : "default"} />
                </Badge>
              }
            />
            <Tab
              className={classes.tab}
              label={
                <Badge badgeContent={5} max={99} color="secondary">
                  <MessageIcon
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
                    fontSize={tabIndex === 3 ? "large" : "default"}
                  />
                </Badge>
              }
            />
          </Tabs>
        </Grid>
        <Grid className={classes.accountGrid} item xs={2} md={4}>
          <Box display="flex" justifyContent="flex-end">
            <IconButton color="inherit">
              <AccountIcon fontSize="large" />
            </IconButton>
          </Box>
        </Grid>
      </Grid>
    </AppBar>
  );
}

export default Navbar;
