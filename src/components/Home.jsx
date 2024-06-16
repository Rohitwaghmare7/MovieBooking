import { useContext, useEffect } from "react";
import MovieContext from "../context/movieContext";
import Movies from "./Movies";

function Home() {

  const { Movies: movies, GetAllMovies } = useContext(MovieContext);
  useEffect(() => {
    GetAllMovies();
  }, []);

  return (
    <>
      <div className="mx-5">
        <h1 className="text-2xl font-bold mt-5 pt-4 ps-4">Top Movies</h1>
        <Movies movies={movies} />
      </div>
    </>
  );
}

export default Home;
