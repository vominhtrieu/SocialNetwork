import React from "react";
import {
  AppBar,
  Typography,
  Box,
  Menu,
  MenuItem,
  Button,
  Avatar,
  IconButton,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import SearchIcon from "@material-ui/icons/Search";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import InputBase from "@material-ui/core/InputBase";
import Grid from "@material-ui/core/Grid";
import NavigationTab from "./NavigitionTab";
import PersonIcon from "@material-ui/icons/Person";
import SettingsIcon from "@material-ui/icons/Settings";
import LogoutIcon from "@material-ui/icons/ExitToApp";
import HelpIcon from "@material-ui/icons/Help";
import Logo from "../../resources/Logo.svg";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: "#1e88e5",
    zIndex: 9999
  },
  brand: {
    float: "left",
    cursor: "default",
    marginLeft: 10,
    paddingTop: 1,
    paddingRight: 2,
    "&>*": {
      fontWeight: "bold",
    },
  },
  searchBar: {
    marginLeft: 50,
    borderRadius: 25,
    width: "calc(100%-80px)",
    [theme.breakpoints.down("sm")]: {
      marginRight: 55,
      marginTop: 10,
    },
    backgroundColor: "white",
    margin: theme.spacing(1),
    padding: theme.spacing(0.3, 5, 0.3, 2),
  },
  searchButton: {
    color: "black",
    position: "absolute",
    right: 5,
    top: 3,
  },
  fullHeight: {
    ...theme.mixins.toolbar,
  },
  accountButton: {
    float: "right",  
    marginTop: -1,  
    marginRight: 10,
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
  },
  userInfo: {
    textTransform: "none",
    "&:hover": {
      backgroundColor: "inherit",
    },
  },
  menuIcon: {
    marginRight: 5,
  },
}));

export function MainNavbar(props) {
  console.log("here");
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const closeMenu = (newLocation) => {
    if(newLocation)
      props.history.push(newLocation);
    setAnchorEl(null);
  };
  return (
    <AppBar position="static" className={classes.root}>
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
              <Avatar className={classes.accountAvatar} />
            </IconButton>
            <Box position="relative" className={classes.searchBar}>
              <InputBase
                fullWidth
                placeholder="Search..."
                inputProps={{ "aria-label": "search" }}
              />
              <IconButton size="small" className={classes.searchButton}>
                <SearchIcon />
              </IconButton>
            </Box>
          </Box>
        </Grid>
        <Grid item xs={12} md={6}>
          <NavigationTab history={props.history} />
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
                <Avatar className={classes.accountAvatar} alt="Your avatar" />
              </Box>
              <Typography>Võ Minh Triều</Typography>
              <ArrowDropDownIcon />
            </Button>
          </Box>
        </Grid>
        <Menu
          id="menu-appbar"
          anchorEl={anchorEl}
          getContentAnchorEl={null}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "right",
          }}
          keepMounted
          transformOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          open={open}
          onClose={closeMenu}
        >
          <MenuItem 
          onClick={() => {closeMenu("/profile")}}>
            <PersonIcon className={classes.menuIcon} />
            <Typography>Profile</Typography>
          </MenuItem>
          <MenuItem 
          onClick={() => {closeMenu("/")}}>
            <SettingsIcon className={classes.menuIcon} />
            <Typography>Setting</Typography>
          </MenuItem>
          <MenuItem onClick={() => {closeMenu("/")}}>
            <HelpIcon className={classes.menuIcon} />
            <Typography>Help</Typography>
          </MenuItem>
          <MenuItem onClick={() => {closeMenu("/")}}>
            <LogoutIcon className={classes.menuIcon} />
            <Typography>Sign out</Typography>
          </MenuItem>
        </Menu>
      </Grid>
    </AppBar>
  );
}

export default MainNavbar;
