import { useState, useEffect, useContext } from "react";
import { useParams, Link } from "react-router-dom";
import MovieContext from "../context/movieContext";

function ShowtimeSelector() {
  const { id } = useParams();
  const { Movies: movies, GetAllMovies } = useContext(MovieContext);

  useEffect(() => {
    GetAllMovies();
  }, []);

  const movie = movies.find((movie) => movie.id === parseInt(id));
  const theaters = movie?.Theater;

  const [selectedTheaterIndex, setSelectedTheaterIndex] = useState(-1);
  const [selectedDateIndex, setSelectedDateIndex] = useState(-1);
  const [selectedShowtimeIndex, setSelectedShowtimeIndex] = useState(-1);
  const [selectedScreenIndex, setSelectedScreenIndex] = useState(-1);

  const [TName, setTName] = useState("");
  const [SName, setSName] = useState("");
  const [STime, setSTime] = useState("");

  const handleDateChange = (index) => {
    setSelectedDateIndex(index);
    setSelectedShowtimeIndex(-1); 
  };

  const generateDates = () => {
    const dates = [];
    for (let i = 0; i < 5; i++) {
      const date = new Date();
      date.setDate(date.getDate() + i);
      dates.push(date);
    }
    return dates;
  };

  const availableDates = generateDates();

  return (
    <div className="p-10">
      <h1 className="text-3xl font-bold text-white mb-4">Showtime</h1>

      {/* Date Selection Cards */}
      <div className="flex space-x-4 overflow-x-auto mb-4">
        {availableDates.map((date, index) => (
          <div
            key={index}
            className={`border rounded-md p-3 flex flex-col items-center cursor-pointer transition duration-200 ease-in-out ${
              selectedDateIndex === index && selectedDateIndex !== -1
                ? "bg-blue-100 border-blue-400 shadow-lg"
                : "border-gray-300 text-white"
            }`}
            onClick={() => handleDateChange(index)}
          >
            <p className="text-lg font-bold">
              {date.toLocaleDateString([], { weekday: "long" })}
            </p>
            <p className="text-gray-500">
              {date.toLocaleDateString([], {
                month: "long",
                day: "numeric",
              })}
            </p>
          </div>
        ))}
      </div>

      {/* Theater Selection */}
      <div className="mb-4 mt-3">
        <label className="text-gray-400 mb-2 mt-2 block">Select Theater:</label>
        <div className="flex space-x-2">
          {theaters?.map((theater, index) => (
            <div
              key={index}
              className={`border rounded-md p-3 cursor-pointer transition duration-200 ease-in-out ${
                selectedTheaterIndex === index && selectedTheaterIndex !== -1
                  ? "bg-blue-100 border-blue-400 shadow-lg"
                  : "border-gray-300 text-white"
              }`}
              onClick={() => {
                setSelectedTheaterIndex(index); // Set selected index
                setTName(theater.name);
                setSelectedScreenIndex(-1); // Reset screen index when theater changes
                setSelectedShowtimeIndex(-1); // Reset showtime index when theater changes
              }}
            >
              {theater.name}
            </div>
          ))}
        </div>
      </div>

      {/* Screen Selection */}
      {selectedTheaterIndex !== -1 && (
        <div className="mt-5">
          <label className="text-gray-400 mb-2 block">Select Screen:</label>
          <div className="flex space-x-2">
            {theaters[selectedTheaterIndex]?.showtimes.map((showtime, index) => (
              <div
                key={index}
                className={`border rounded-md p-3 cursor-pointer transition duration-200 ease-in-out ${
                  selectedScreenIndex === index && selectedScreenIndex !== -1
                    ? "bg-blue-100 border-blue-400 shadow-lg"
                    : "border-gray-300 text-white"
                }`}
                onClick={() => {
                  setSelectedScreenIndex(index);
                  setSName(showtime.screen);
                  setSelectedShowtimeIndex(-1); // Reset showtime index when screen changes
                }}
              >
                {showtime.screen}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Showtime Selection */}
      {selectedTheaterIndex !== -1 && (
        <div className="mt-5">
          <label className="text-gray-400 mb-2 block">Select Showtime:</label>
          <div className="flex space-x-2">
            {theaters[selectedTheaterIndex]?.showtimes.map((showtime, index) => (
              <div
                key={index}
                className={`border rounded-md p-3 cursor-pointer transition duration-200 ease-in-out ${
                  selectedShowtimeIndex === index && selectedShowtimeIndex !== -1
                    ? "bg-blue-100 border-blue-400 shadow-lg"
                    : "border-gray-300 text-white"
                }`}
                onClick={() => {
                  setSelectedShowtimeIndex(index);
                  setSTime(showtime.time.slice(0, 5));}}
              >
                {showtime.time.slice(0, 5)}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Link to Seat Selection */}
      {selectedTheaterIndex !== -1 && (
        <div className="mt-5">
          <Link
            to={`/seat-selection/${TName}/${SName}/${STime}`}
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
          >
            Select Seats
          </Link>
        </div>
      )}
    </div>
  );
}

export default ShowtimeSelector;
