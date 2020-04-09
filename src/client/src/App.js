import React from "react";
import "./App.css";
import Navbar from "./component/Navbar";
import Auth from "./container/Auth";
import Home from "./component/Home";
//import { connect } from "react-redux";
import { BrowserRouter, Route, Switch } from "react-router-dom";

class App extends React.Component {
  constructor() {
    super();
    this.wrapper = React.createRef();
  }

  render() {
    return (
      <div>
        <BrowserRouter>
          <Route path="*" component={Navbar} />
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/signin" component={Auth} />
            <Route exact path="/signup" component={Auth} />
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
