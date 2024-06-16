import { useState } from 'react';
import PropTypes from 'prop-types'; // Import PropTypes
import MovieContext from './movieContext';

const MovieState = (props) => {
    // const host = "http://localhost:5000";
    const host = "https://movie-booking-backend-theta.vercel.app";
    
    const MoviesInitial = [];
    const [Movies, setMovies] = useState(MoviesInitial);

    const GetAllMovies = async () => {
        const url = `${host}/api/movies/allMovies`;
        const response = await fetch(url, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });
        const json = await response.json();
        setMovies(json);
    };

    return (
        <MovieContext.Provider value={{ Movies, GetAllMovies }}>
            {props.children}
        </MovieContext.Provider>
    );
};

MovieState.propTypes = {
    children: PropTypes.node.isRequired,
};

export default MovieState;
