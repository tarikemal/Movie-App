import "./App.css";
import { useState, useEffect } from "react";
import { Switch, Route, Redirect } from "react-router";
import { Link, useParams } from "react-router-dom";

import { MoviesPage } from "./pages/MoviesPage.js";
import { Header } from "./components/Header.js";
import { MovieDetailsPage } from "./pages/MovieDetailsPage.js";
import { SignUp, LogIn } from "./pages/Authentication.js";
import { PrivateRoute } from "./components/PrivateRoute.js";
import { API_KEY } from "./config.js";

function App() {
  const [BASE_URL, setBASE_URL] = useState();

  useEffect(() => {
    fetch(
      `https://api.themoviedb.org/3/configuration?api_key=${API_KEY}&query=brad`
    )
      .then((res) => res.json())
      .then((res) => {
        setBASE_URL(res.images.secure_base_url);
      });
  }, []);

  return (
    <div className="App">
      <Header />
      <Switch>
        <Route exact path="/" render={() => <LogIn />} />
        <Route exact path="/signup" render={() => <SignUp />} />

        <PrivateRoute exact path="/movies">
          <MoviesPage BASE_URL={BASE_URL} />
        </PrivateRoute>
        <PrivateRoute exact path="/movie/:id">
          <MovieDetailsPage BASE_URL={BASE_URL} />
        </PrivateRoute>

        <Route
          exact
          path="*"
          render={() => (
            <div style={{ textAlign: "center", fontSize: "2.7rem" }}>
              404 Page Not Found
            </div>
          )}
        />
      </Switch>
    </div>
  );
}

export default App;
