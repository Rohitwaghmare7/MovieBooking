import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Slider from 'react-slick';
import { useState, useEffect } from 'react';
import { ClipLoader } from 'react-spinners';

const Movies = ({ movies }) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if movies array has items
    setLoading(movies.length === 0);
  }, [movies]);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div className="p-4">
      {loading ? (
        // Display loading spinner centered on screen
        <div className="flex justify-center items-center h-screen">
          <ClipLoader size={50} color={"#123abc"} loading={loading} />
        </div>
      ) : (
        // Display movie slider once movies are loaded
        <Slider {...settings}>
          {movies.map(movie => (
            <Link key={movie.id} to={`/movie/${movie.id}`} className="flex-none w-72">
              <div className="bg-white rounded-lg shadow-lg h-full flex flex-col">
                <img
                  src={movie.posterUrl}
                  alt={movie.title}
                  className="w-full object-cover rounded-t-lg"
                  style={{ height: '500px' }} // Set a fixed height for the images
                />
                <div className="p-4 flex flex-col flex-grow">
                  <h2 className="text-lg font-bold mb-2">{movie.title}</h2>
                  <p className="text-gray-600">{movie.genre.join(', ')}</p>
                </div>
              </div>
            </Link>
          ))}
        </Slider>
      )}
    </div>
  );
};

Movies.propTypes = {
  movies: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default Movies;
