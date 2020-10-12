import React from "react";
import { Route } from "react-router-dom";
import { HOST } from "../../config/constant";
import {useHistory} from "react-router-dom";

function PrivateRoute({ component: Component, ...rest }) {
  const history = useHistory();
  const [isAuthenticated, setIsAuthenticated] = React.useState(false);

  React.useEffect(() => {
    fetch(HOST + "/auth", {
      method: "GET",
      credentials: "include",
    })
      .then((res) => {
        if (!res.ok) history.replace({pathname:"/signin"});
        else setIsAuthenticated(true);
      })
      .catch((err) => history.replace({pathname:"/signin"}));
  }, [history]);

  if (!isAuthenticated)
    return null;
  return (
    <Route
      {...rest}
      render={(props) => {
        return <Component {...props} />;
      }}
    />
  );
}

export default PrivateRoute;
