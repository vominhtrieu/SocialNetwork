import React from "react";

import { Form, Input, Button, Spin, Alert, Card } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { API_HOST } from "../../config/constant";
import { getProfile } from "../../actions/getProfile";
import { connect } from "react-redux";
import axios from "axios";

function SignInForm(props) {
  const [alertTitle, setAlertTitle] = React.useState("");
  const [isSigningIn, setIsSigningIn] = React.useState(false);

  function SignUserIn(data) {
    setIsSigningIn(true);
    axios
      .post(`${API_HOST}/signin`, data)
      .then(() => {
        props.getProfile();
        props.history.push("/");
      })
      .catch((err) => {
        setAlertTitle(err.response.data);
      })
      .then(() => {
        setIsSigningIn(false);
      });
  }

  function closeAlert() {
    setAlertTitle("");
  }

  return (
    <Card title="Sign In">
      {alertTitle ? <Alert type="error" showIcon closable afterClose={closeAlert} message={alertTitle} /> : null}

      <Form onFinish={SignUserIn}>
        <Form.Item
          name="email"
          rules={[
            {
              required: true,
              type: "email",
              message: "Please input a valid email!",
            },
          ]}
        >
          <Input type="email" prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Email" />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[
            {
              required: true,
              message: "Please input your Password!",
            },
          ]}
        >
          <Input prefix={<LockOutlined className="site-form-item-icon" />} type="password" placeholder="Password" />
        </Form.Item>

        <Form.Item className="align-center">
          <Button block type="primary" htmlType="submit" disabled={isSigningIn}>
            Log in
            {isSigningIn && <Spin style={{ marginLeft: 4 }} />}
          </Button>
          No account? <a href="/signup">Register one!</a>
        </Form.Item>
      </Form>
    </Card>
  );
}

const mapDispatchToProps = (dispatch) => ({
  getProfile: () => {
    dispatch(getProfile);
  },
});

export default connect(null, mapDispatchToProps)(SignInForm);
