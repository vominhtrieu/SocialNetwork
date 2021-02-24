import React from "react";
import { Layout } from "antd";
import SignInForm from "../component/Auth/SignInForm";
import SignUpForm from "../component/Auth/SignUpForm";
import { Switch, Route } from "react-router-dom";
import "./auth.less";

const { Content } = Layout;

export default function Auth() {
  return (
    <Layout>
      <Content className="form-container">
        <Switch>
          <Route exact path="/signin" component={SignInForm} />
          <Route exact path="/signup" component={SignUpForm} />
        </Switch>
      </Content>
    </Layout>
  );
}
