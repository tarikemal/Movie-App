import "./App.css";
import { useState, useEffect } from "react";
import { Switch, Route } from "react-router";
import { Link, useParams } from "react-router-dom";

import { HomePage } from "./pages/HomePage.js";
import { Header } from "./components/Header.js";
import { MovieDetailsPage } from "./pages/MovieDetailsPage.js";
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
        <Route exact path="/" render={() => <HomePage BASE_URL={BASE_URL} />} />
        <Route
          exact
          path="/movie/:id"
          render={() => <MovieDetailsPage BASE_URL={BASE_URL} />}
        />
      </Switch>
    </div>
  );
}

export default App;
