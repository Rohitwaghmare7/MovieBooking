import { useParams, Link } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import MovieContext from "../context/movieContext";
import { FaSpinner } from "react-icons/fa";

const MovieDetails = () => {
  const { id } = useParams();
  const { Movies: movies, GetAllMovies } = useContext(MovieContext);
  const [backgroundImageLoading, setBackgroundImageLoading] = useState(true);

  useEffect(() => {
    GetAllMovies();
  }, []);

  useEffect(() => {
    if (!movies || movies.length === 0) {
      return;
    }

    const movie = movies.find((movie) => movie.id === parseInt(id));

    if (movie) {
      const img = new Image();
      img.onload = () => {
        setBackgroundImageLoading(false);
        document.body.style.backgroundImage = `url(${movie.backgroundImageUrl})`;
        document.body.style.backgroundSize = "cover";
        document.body.style.backgroundPosition = "center";
        document.body.style.backgroundRepeat = "no-repeat";
      };
      img.src = movie.backgroundImageUrl;
    }

    return () => {
      document.body.style.backgroundImage = "";
    };
  }, [movies, id]);

  if (backgroundImageLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <FaSpinner className="animate-spin text-4xl text-gray-500" />
      </div>
    );
  }

  if (!movies || movies.length === 0) {
    return (
      <div className="flex justify-center items-center h-screen">
        <FaSpinner className="animate-spin text-4xl text-gray-500" />
      </div>
    ); // Handle edge case where movies are still loading
  }

  const movie = movies.find((movie) => movie.id === parseInt(id));

  if (!movie) {
    return <div>Movie not found</div>;
  }

  return (
    <div className="flex">
      <div className="movie-details mr-8 m-10">
        <h1 className="text-8xl font-bold text-white">{movie.title}</h1>
        <p className="text-1xl text-gray-200">
          {movie.duration} | {movie.rating}⭐
        </p>
        <div className="mt-2 max-h-24 overflow-hidden w-full sm:w-3/4 md:w-1/2 lg:w-1/3">
          <p className="text-white">{movie.synopsis}</p>
        </div>
        <div className="text-gray-200 mt-2">
          Director :{" "}
          <span className="text-white font-bold">{movie.director}</span>
        </div>
        <div>
          <Link key={movie.id} to={`/BookTickets/${movie.id}`}>
            <button className="mt-4 bg-gradient-custom text-white font-bold text-1.5xl px-5 py-2 rounded-md">
              Get Tickets
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default MovieDetails;
