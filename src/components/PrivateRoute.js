import { Route, Redirect } from "react-router-dom";

import Auth from "./../auth.js";

export function PrivateRoute({ children, ...rest }) {
  console.log(Auth.authenticated);

  return (
    <Route
      {...rest}
      render={() => {
        return Auth.isAuthenticated() ? (
          children
        ) : (
          <Redirect to={{ pathname: "/" }} />
        );
      }}
    />
  );
}
