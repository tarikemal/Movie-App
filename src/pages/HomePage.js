import { MovieOverview } from "./../components/MovieOverview.js";
import { Movies } from "./../components/Movies.js";

export function HomePage({ BASE_URL }) {
  return (
    <>
      <MovieOverview BASE_URL={BASE_URL} />
      <Movies BASE_URL={BASE_URL} />
    </>
  );
}
