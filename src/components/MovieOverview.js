import { useState, useEffect } from "react";
import { API_KEY } from "./../config.js";

export function MovieOverview({ BASE_URL }) {
  const [POSTER_PATH, setPOSTER_PATH] = useState();
  const [movieTitle, setMovieTitle] = useState("");
  const [movieOverview, setMovieOverview] = useState("");

  const [movieId, setMovieId] = useState(64);

  useEffect(() => {
    fetch(`https://api.themoviedb.org/3/movie/${movieId}?api_key=${API_KEY}`)
      .then((res) => res.json())
      .then((res) => {
        setPOSTER_PATH(res.poster_path);
        setMovieTitle(res.original_title);
        setMovieOverview(res.overview);
      });
  }, [movieId]);

  const nextMovie = () => {
    setMovieId((movieId) => {
      if (movieId >= 71) {
        return 64;
      }

      return movieId + 1;
    });
  };

  const previousMovie = () => {
    setMovieId((movieId) => {
      if (movieId <= 64) {
        return 71;
      }

      return movieId - 1;
    });
  };

  return (
    <section className="movie-overview-container">
      <div
        className="movie-overview"
        style={{
          backgroundImage: `linear-gradient(
            rgba(0, 0, 0, 0.5),
            rgba(0, 0, 0, 0.5)
          ),url(${BASE_URL}w500${POSTER_PATH})`,
        }}
      >
        <div className="movie-overview-info">
          <h2>{movieTitle}</h2>
          <p>{movieOverview}</p>
        </div>

        <i onClick={nextMovie} className="material-icons forward-arrow">
          arrow_forward_ios
        </i>
        <i onClick={previousMovie} className="material-icons back-arrow">
          arrow_back_ios
        </i>
      </div>
    </section>
  );
}
