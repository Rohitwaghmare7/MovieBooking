import { useLocation } from "react-router-dom";
import PropTypes from "prop-types"; // Import PropTypes
import { useParams, Link } from "react-router-dom";

function Checkout() {
  const location = useLocation();
  const { theaterName, screenName, showtime } = useParams();

  // Function to parse query parameters
  const parseQueryParams = (search) => {
    const params = new URLSearchParams(search);
    return params.get("selectedSeats")?.split(",").map((seat) => parseInt(seat)) || [];
  };

  // Access selected seats from query parameters
  const selectedSeats = parseQueryParams(location.search);

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 dark:bg-gray-900 text-white">
      <div className="w-full max-w-4xl">
        <div className="bg-gray-200 dark:bg-gray-800 rounded-t-lg py-4 text-center">
          <h2 className="text-2xl font-bold">Checkout</h2>
        </div>
        <div className="p-8 bg-white dark:bg-gray-950 rounded-b-lg">
          <h3 className="text-lg font-bold mb-2">Selected Seats</h3>
          <div className="flex flex-wrap gap-2">
            {selectedSeats.map((seat) => (
              <div key={seat} className="px-2 py-1 bg-primary-500 text-white rounded-md">
                {seat}
              </div>
            ))}
          </div>
          <div className="mt-4 text-right">
            <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
              Proceed to Payment
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

Checkout.propTypes = {
  location: PropTypes.object.isRequired, // Ensure location object is passed as a prop
};

export default Checkout;
