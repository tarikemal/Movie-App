import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { API_KEY } from "./../config.js";

export function MovieDetailsPage({ BASE_URL }) {
  const { id } = useParams();
  const [movie, setMovie] = useState({});

  useEffect(() => {
    fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}`)
      .then((res) => res.json())
      .then((data) => {
        setMovie({ ...data });
        console.log(data);
      });
  }, []);

  return (
    <section style={{ textAlign: "center", fontSize: "5rem" }}>
      <h3>{movie.title}</h3>
    </section>
  );
}
