import React from "react";
import { Route } from "react-router-dom";
import { HOST } from "../config/constant";

function checkAuthenticated(props) {
  fetch(HOST + "/auth", {
    method: "GET",
    credentials: "include",
  })
    .then((res) => {
      if (res.status !== 200) props.history.push("/signin");
    })
    .catch(console.log);
}

function PrivateRoute({ component: Component, ...rest }) {
  return (
    <Route
      {...rest}
      render={(props) => {
        checkAuthenticated(props);
        return <Component {...props} />;
      }}
    />
  );
}

export default PrivateRoute;