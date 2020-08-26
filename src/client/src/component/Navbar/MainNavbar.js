import React from "react";
import {
  AppBar,
  Typography,
  Box,
  Button,
  Avatar,
  IconButton,
  Grid,
} from "@material-ui/core";
import {
  ArrowDropDown as ArrowDropDownIcon,
} from "@material-ui/icons";

import { makeStyles } from "@material-ui/core/styles";
import NavigationTab from "./NavigitionTab";
import Logo from "../../resources/Logo.svg";
import { HOST } from "../../config/constant";
import { connect } from "react-redux";
import NavbarMenu from "./NavbarMenu";
import SearchBar from "./SearchBar";

const useStyles = makeStyles((theme) => ({
  root: {
    height: 65,
    [theme.breakpoints.only("sm")]: {
      height: 120,
    },
    [theme.breakpoints.only("xs")]: {
      height: 110,
    },
  },
  appbar: {
    backgroundColor: "#1e88e5",
    zIndex: 999,
    padding: "0 10px",
  },
  brand: {
    float: "left",
    cursor: "default",
    paddingTop: 1,
    paddingRight: 2,
    "&>*": {
      fontWeight: "bold",
    },
  },
  searchBar: {
    marginLeft: 40,
    borderRadius: 25,
    width: "calc(100%-80px)",
    [theme.breakpoints.down("sm")]: {
      marginRight: 45,
      marginTop: 10,
    },
    backgroundColor: "white",
    margin: theme.spacing(1),
    padding: theme.spacing(0.3, 5, 0.3, 2),
  },
  fullHeight: {
    ...theme.mixins.toolbar,
  },
  accountButton: {
    float: "right",
    marginTop: -1.5,
    marginRight: -2,
    [theme.breakpoints.up("md")]: {
      display: "none",
    },
  },
  accountGrid: {
    [theme.breakpoints.down("sm")]: {
      display: "none",
    },
  },
  accountAvatar: {
    width: 35,
    height: 35,
    backgroundColor: "#bdbdbd",
    border: "1.7px solid white",
  },
  userInfo: {
    padding: 0,
    textTransform: "none",
    "&:hover": {
      backgroundColor: "inherit",
    },
  }
}));

export function MainNavbar(props) {
  const { user } = props;

  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const closeMenu = (newLocation) => {
    if (newLocation) props.history.push(newLocation);
    setAnchorEl(null);
  };
  return (
    <Box className={classes.root}>
      <AppBar className={classes.appbar}>
        <Grid container alignItems="center">
          <Grid item xs={12} md={3}>
            <Box>
              <Box className={classes.brand} width={40}>
                <img src={Logo} alt="Logo" width={35} />
              </Box>

              <IconButton
                disableRipple
                onClick={handleMenu}
                size="small"
                className={classes.accountButton}
              >
                <Avatar
                  className={classes.accountAvatar}
                  src={HOST + "/image/" + user.avatar}
                />
              </IconButton>
              <Box position="relative" className={classes.searchBar}>
                <SearchBar />
              </Box>
            </Box>
          </Grid>
          <Grid item xs={12} md={6}>
            <NavigationTab history={props.history} socket={props.socket} />
          </Grid>
          <Grid className={classes.accountGrid} item xs={2} md={3}>
            <Box display="flex" justifyContent="flex-end">
              <Button
                className={classes.userInfo}
                color="inherit"
                size="large"
                onClick={handleMenu}
                disableElevation
                disableRipple
              >
                <Box marginRight={1}>
                  <Avatar
                    className={classes.accountAvatar}
                    src={HOST + "/image/" + user.avatar}
                    alt={user.firstName + "'s avatar"}
                  />
                </Box>
                <Typography>{user.firstName + " " + user.lastName}</Typography>
                <ArrowDropDownIcon />
              </Button>
            </Box>
          </Grid>
          <NavbarMenu history={props.history} anchorEl={anchorEl} closeMenu={closeMenu} user={user} />
        </Grid>
      </AppBar>
    </Box>
  );
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
    socket: state.socket
  };
};

export default connect(mapStateToProps)(MainNavbar);
