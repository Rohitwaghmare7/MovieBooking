import { useState, useContext, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import MovieContext from "../context/movieContext";

const SeatSelection = () => {
  const { theaterName, screenName, showtime } = useParams();
  const { Movies: movies, GetAllMovies } = useContext(MovieContext);
  const [selectedSeats, setSelectedSeats] = useState([]);

  useEffect(() => {
    GetAllMovies();
  }, []);

  useEffect(() => {
    console.log("Movies updated: ", movies);
  }, [movies]);

  // Utility function to convert HH:MM to HH:MM:SS
  const convertTimeFormat = (time) => {
    if (time.length === 5) {
      return `${time}:00`;
    }
    return time;
  };

  // Helper function to find the specific showtime
  const findShowtime = () => {
    if (!movies.length) return null;

    const formattedShowtime = convertTimeFormat(showtime);
    console.log(`Converted showtime: ${formattedShowtime}`);

    for (let movie of movies) {
      for (let theater of movie.Theater) {
        if (theater.name === theaterName) {
          for (let show of theater.showtimes) {
            if (show.time === formattedShowtime && show.screen === screenName) {
              console.log("These are the show seats: ", show.seats);
              return show.seats;
            }
          }
        }
      }
    }
    return null;
  };

  const seats = findShowtime();

  const handleSeatClick = (seatNumber) => {
    if (!isUnavailable(seatNumber)) {
      if (selectedSeats.includes(seatNumber)) {
        setSelectedSeats(selectedSeats.filter((seat) => seat !== seatNumber));
      } else {
        setSelectedSeats([...selectedSeats, seatNumber]);
      }
    }
  };

  const isUnavailable = (seatNumber) => {
    if (!seats) return false;
    return seats[seatNumber - 1].isBooked;
  };

  const isSelected = (seatNumber) => {
    return selectedSeats.includes(seatNumber);
  };

  // Function to create query parameters from selectedSeats array
  const getSelectedSeatsQueryParam = () => {
    if (selectedSeats.length === 0) return "";
    return `selectedSeats=${selectedSeats.join(",")}`;
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 dark:bg-gray-900">
      <div className="w-full max-w-4xl">
        <div className="bg-gray-200 dark:bg-gray-800 rounded-t-lg py-4 text-center">
          <h2 className="text-2xl font-bold text-white">Select Your Seats</h2>
        </div>
        <div className="grid grid-cols-10 gap-4 p-8 bg-white dark:bg-gray-950 rounded-b-lg">
          {Array.from({ length: seats ? seats.length : 30 }, (_, i) => i + 1).map((seatNumber) => (
            <button
              key={seatNumber}
              className={`w-10 h-10 rounded-md flex items-center justify-center text-sm font-medium transition-colors ${
                isUnavailable(seatNumber)
                  ? "bg-gray-300 dark:bg-gray-700 text-gray-500 dark:text-gray-400 cursor-not-allowed border-2 border-red-800"
                  : isSelected(seatNumber)
                  ? "bg-primary-500 text-white hover:bg-primary-600 border-2 border-blue-500"
                  : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
              }`}
              onClick={() => handleSeatClick(seatNumber)}
              disabled={isUnavailable(seatNumber)}
            >
              {seatNumber}
            </button>
          ))}
        </div>
      </div>
      <div className="mt-8 flex flex-col items-center">
        <div className="flex items-center gap-4 mb-4">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-md bg-gray-100 dark:bg-gray-800" />
            <span className="text-gray-700 dark:text-gray-300">Available</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-md bg-primary-500 border-2 border-blue-500" />
            <span className="text-gray-700 dark:text-gray-300 ">Selected</span>
          </div>
          <div className="flex items-center gap-2 ">
            <div className="w-4 h-4 rounded-md bg-gray-300 dark:bg-gray-700 border-2 border-red-500" />
            <span className="text-gray-700 dark:text-gray-300">Unavailable</span>
          </div>
        </div>
        <div className="bg-white dark:bg-gray-950 p-4 rounded-lg shadow-md">
          <h3 className="text-lg font-bold mb-2 text-white text-center">Selected Seats</h3>
          <div className="flex flex-wrap gap-2">
            {selectedSeats.map((seat) => (
              <div key={seat} className="px-2 py-1 bg-primary-500 text-white rounded-md">
                {seat}
              </div>
            ))}
          </div>
          <div className="mt-5">
            <Link
              to={`/checkout/${theaterName}/${screenName}/${showtime}?${getSelectedSeatsQueryParam()}`}
              className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
            >
              Checkout
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SeatSelection;
