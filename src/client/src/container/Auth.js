import React from "react";
import Paper from "@material-ui/core/Paper";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import SignInForm from "../component/Auth/SignInForm";
import SignUpForm from "../component/Auth/SignUpForm";
import { withStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { Switch, Route } from "react-router-dom";

class Auth extends React.Component {
  constructor() {
    super();
    this.state = {
      route: 0,
    };
  }

  changeTab = () => {
    this.props.history.push(this.state.route === 0 ? "/signup" : "/signin");
    this.setState({ route: this.state.route === 0 ? 1 : 0 });
  };

  componentDidMount() {
    this.setState({
      route:
        this.props.history.location.pathname === "/signin" ? 0 : 1,
    });
  }

  render() {
    const { classes } = this.props;
    return (
      <Container component="main" maxWidth="xs">
        <Paper variant="elevation" elevation={5} className={classes.paper}>
          <div>
            <Tabs
              variant="fullWidth"
              value={this.state.route}
              onChange={this.changeTab}
              aria-label="simple tabs example"
            >
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
}

const useStyles = withStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "5px 25px 30px 25px",
  },
}));

export default useStyles(Auth);
