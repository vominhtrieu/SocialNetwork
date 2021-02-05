import React from "react";
import { Form, Input, Button, Spin, Alert, Card } from "antd";
import { UserOutlined, LockOutlined, MailOutlined } from "@ant-design/icons";

import { useHistory } from "react-router-dom";
import { API_HOST } from "../../config/constant";
import axios from "axios";

function SignUpForm(props) {
  const [form] = Form.useForm();
  const history = useHistory();
  const [alertTitle, setAlertTitle] = React.useState("");
  const [isSigningUp, setIsSigningUp] = React.useState(false);
  const [alertType, setAlertType] = React.useState("success");

  React.useEffect(() => {
    return () => {};
  }, [alertType]);

  const validatePassword = (_rule, value, callback) => {
    if (value && value !== form.getFieldValue("password")) {
      callback(new Error("Password mismatch"));
    } else {
      callback();
    }
  };

  const RegisterUser = (data) => {
    setIsSigningUp(true);
    axios
      .post(`${API_HOST}/signup`, data)
      .then(({ data }) => {
        setAlertTitle(data);
        setAlertType("success");
        if (data === "Successfully registered") history.push("/signin");
      })
      .catch((err) => {
        setAlertTitle(err.response.data);
        setAlertType("error");
      })
      .then(() => {
        setIsSigningUp(false);
      });
  };

  function closeAlert() {
    setAlertTitle("");
  }

  return (
    <Card title="Sign up">
      {alertTitle ? <Alert type="error" showIcon closable afterClose={closeAlert} message={alertTitle} /> : null}

      <Form form={form} onFinish={RegisterUser}>
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
          <Input type="email" prefix={<MailOutlined className="site-form-item-icon" />} placeholder="Email" />
        </Form.Item>

        <Form.Item
          name="firstName"
          rules={[
            {
              required: true,
              type: "string",
              message: "Please input your first name!",
            },
          ]}
        >
          <Input type="text" prefix={<UserOutlined className="site-form-item-icon" />} placeholder="First name" />
        </Form.Item>

        <Form.Item
          name="lastName"
          rules={[
            {
              required: true,
              type: "string",
              message: "Please input your name!",
            },
          ]}
        >
          <Input type="text" prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Last name" />
        </Form.Item>

        <Form.Item
          name="password"
          rules={[
            {
              required: true,
              pattern: /[A-Za-z\d@$!%*#?&]{8,60}$/,
              message: "Password must have length between 8 and 60",
            },
          ]}
        >
          <Input prefix={<LockOutlined className="site-form-item-icon" />} type="password" placeholder="Password" />
        </Form.Item>

        <Form.Item
          name="retypePassword"
          rules={[
            {
              required: true,
              message: "Please retype your password!",
            },
            { validator: validatePassword },
          ]}
        >
          <Input
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="Retype your password"
          />
        </Form.Item>

        <Form.Item className="align-center">
          <Button block type="primary" htmlType="submit" disabled={isSigningUp}>
            Sign Up
            {isSigningUp && <Spin />}
          </Button>
          Already have account? <a href="/signin">Sign in!</a>
        </Form.Item>
      </Form>
    </Card>
  );
}

export default SignUpForm;
