import { useState, useEffect } from "react";
import { API_KEY } from "./../config.js";
import { Link } from "react-router-dom";

export function Movies({ BASE_URL }) {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    fetch(
      `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${
        query === "" ? "k" : query
      }`
    )
      .then((res) => res.json())
      .then((data) => {
        setMovies(data.results);
        console.log("query movies");
        console.log(data);
      });
  }, [query]);

  const searchMovies = (e) => {
    setQuery(e.target.value);

    if (query !== "") {
      const newMovies = movies.filter((movie) => {
        const upperCaseMovie = movie.original_title.toUpperCase();

        return upperCaseMovie.includes(query.toUpperCase());
      });

      setMovies(newMovies);
      return;
    }
    setMovies(movies);
  };

  return (
    <section>
      <div className="search-bar">
        <input
          placeholder="Search Movie"
          type="text"
          value={query}
          onChange={(e) => searchMovies(e)}
        />
        <h2>Popular Movies</h2>
      </div>

      <div className="movie-cards-container">
        <div className="movie-cards">
          {movies.map((item, index) => {
            const POSTER_PATH = item.poster_path
              ? item.poster_path
              : item.backdrop_path;
            return (
              <Link
                to={`/movie/${item.id}`}
                key={index}
                style={{ border: "1px solid", marginTop: "10px" }}
                className="movie-card-link"
              >
                <div className="movie-card">
                  <div className="card-front">
                    <img src={`${BASE_URL}w500${POSTER_PATH}`} />
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
