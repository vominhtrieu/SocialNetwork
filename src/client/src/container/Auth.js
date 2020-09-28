import React from "react";
import Paper from "@material-ui/core/Paper";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import SignInForm from "../component/Auth/SignInForm";
import SignUpForm from "../component/Auth/SignUpForm";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { Switch, Route, useLocation, useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "5px 25px 30px 25px",
  },
}));

export default function Auth() {
  const classes = useStyles();
  const history = useHistory();
  const location = useLocation();
  const [route, setRoute] = React.useState(
    location.pathname === "/signin" ? 0 : 1
  );

  const changeTab = () => {
    history.push(route === 0 ? "/signup" : "/signin");
  };

  React.useEffect(() => {
    setRoute(location.pathname === "/signin" ? 0 : 1);
  }, [location.pathname]);

  return (
    <Container component="main" maxWidth="xs">
      <Paper variant="elevation" elevation={5} className={classes.paper}>
        <div>
          <Tabs variant="fullWidth" value={route} onChange={changeTab}>
            <Tab label="Sign In" />
            <Tab label="Sign Up" />
          </Tabs>
          <Switch>
            <Route exact path="/signin" component={SignInForm} />
            <Route exact path="/signup" component={SignUpForm} />
          </Switch>
        </div>
      </Paper>
    </Container>
  );
}
