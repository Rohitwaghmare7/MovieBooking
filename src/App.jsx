import "./App.css";
import { Route, Routes, useLocation } from "react-router-dom";
import Home from "./components/Home";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import MovieState from "./context/MovieState";
import Navbar from "./components/Navbar";
import MovieDetails from "./components/MovieDetails";
import { useState, useEffect } from 'react';
import BookTickets from "./components/BookTickets";
import SeatSelection from "./components/SeatSelection";
import Checkout from "./components/Checkout";
import AdminHome from "./Admin/AdminHome";

function App() {
  const location = useLocation();
  const [hideNavbar, setHideNavbar] = useState(false);

  useEffect(() => {

    if (location.pathname === '/' || location.pathname === '/signUp' || location.pathname === '/searchMovies' ) {
      setHideNavbar(true);
    } else {
      setHideNavbar(false);
    }
  }, [location.pathname]);

  return (
    <>
      <MovieState>
        {!hideNavbar && <Navbar />}
        <Routes>
          <Route exact path="/home" element={<Home />}></Route>
          <Route exact path="/" element={<Login />}></Route>
          <Route exact path="/signUp" element={<SignUp />}></Route>
          <Route path="/movie/:id" element={<MovieDetails/>}></Route>
          <Route path="/BookTickets/:id" element={<BookTickets/>}></Route>
          <Route path="/seat-selection/:theaterName/:screenName/:showtime" element={<SeatSelection />} />
          <Route path="/checkout/:theaterName/:screenName/:showtime" element={<Checkout />} />
          <Route exact path="/AdminHome" element={<AdminHome />}></Route>
        </Routes>
      </MovieState>
    </>
  );
}

export default App;
