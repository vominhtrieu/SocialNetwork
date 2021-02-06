import React from "react";
import Friends from "../container/Friends";
import Messages from "../container/Messages";

import Home from "./Home";
import Notification from "./Notification";
import About from "../component/About/About";
import MainNavbar from "../component/Navbar/MainNavbar";

import { Switch, Route } from "react-router-dom";
import { Layout } from "antd";
import PrivateRoute from "../component/Common/PrivateRoute";
import Profile from "./Profile";
import ActiveList from "./ActiveList";

import "./main.less";
const { Content, Header, Sider } = Layout;

function Main() {
  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Header className="nav-bar">
        <MainNavbar />
      </Header>
      <Layout className="main-body">
        <Content className="main-content">
          <Switch>
            <PrivateRoute exact path="/" component={Home} />
            <PrivateRoute exact path="/friends" component={Friends} />
            <PrivateRoute path="/messages" component={Messages} />
            <PrivateRoute exact path="/notifications" component={Notification} />
            <Route path="/about" component={About} />
            <PrivateRoute path="/:id" component={Profile} />
          </Switch>
        </Content>
        <Sider
          style={{ height: "100%", backgroundColor: "#333333" }}
          width={300}
          reverseArrow
          breakpoint="lg"
          collapsedWidth={0}
        >
          <ActiveList />
        </Sider>
      </Layout>
    </Layout>
  );
}

export default Main;
