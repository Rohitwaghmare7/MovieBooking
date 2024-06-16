import { Link } from "react-router-dom";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../login&signup.css";
import Notification from "./Alert";

function Login() {
  const [signInEmail, setSignInEmail] = useState("");
  const [signInPassword, setSignInPassword] = useState("");
  const [notification, setNotification] = useState(null);
  const navigate = useNavigate();

  const handleSignIn = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("https://movie-booking-backend-theta.vercel.app/api/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: signInEmail, password: signInPassword }),
      });
      const json = await response.json();
      console.log(json);
      if (json.success) {
        localStorage.setItem("token", json.authToken);
        showNotification("Logged in Successfully", "success");


        if (signInEmail === "admin@example.com" && signInPassword === "adminPassword") {
          navigate("/AdminHome"); 
        } else {
          navigate("/home"); 
        }
      } else {
        showNotification(json.error || "Login failed. Please check your credentials.", "error");
      }
    } catch (error) {
      console.error("Error logging in:", error);
      showNotification("Error logging in. Please try again later.", "error");
    }
  };

  const showNotification = (message, type) => {
    setNotification({ message, type });
    setTimeout(() => {
      setNotification(null);
    }, 3000); // Clear notification after 3 seconds
  };

  return (
    <>
      <div className="gradient-background flex justify-start items-center min-h-screen">
        <div className="flex flex-col justify-center px-6 py-12 lg:px-8 w-full max-w-screen-xl mx-auto">
          <div className="sm:w-full sm:max-w-sm">
            <h1 className="text-5xl font-bold text-center text-gradient">
              BMS
            </h1>

            <h2 className="mt-2 text-center text-2xl font-bold leading-9 tracking-tight text-white">
              Login to your account
            </h2>
          </div>

          <div className="mt-10 sm:w-full sm:max-w-sm">
            <form className="space-y-6" onSubmit={handleSignIn}>
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium leading-6 text-white"
                >
                  Email address
                </label>
                <div className="mt-2">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    value={signInEmail}
                    onChange={(e) => setSignInEmail(e.target.value)}
                    className="block w-full rounded-md border-0 py-2 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div className="mt-4">
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium leading-6 text-white"
                  >
                    Password
                  </label>
                  <div className="text-sm">
                    <Link
                      to="/forgotPassword"
                      className="font-semibold text-indigo-600 hover:text-indigo-500"
                    >
                      Forgot password?
                    </Link>
                  </div>
                </div>
                <div className="mt-2">
                  <input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    required
                    value={signInPassword}
                    onChange={(e) => setSignInPassword(e.target.value)}
                    className="block w-full rounded-md border-0 py-2 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div className="mt-6">
                <button
                  type="submit"
                  className="flex w-full justify-center rounded-md bg-gradient-custom px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-gradient-custom focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Sign in
                </button>
              </div>
            </form>

            <p className="mt-8 text-center text-sm text-gray-500">
              Not a member?{" "}
              <Link
                to="/signUp"
                className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
              >
                Create your account.
              </Link>
            </p>
          </div>
        </div>
      </div>

      {notification && (
        <Notification
          message={notification.message}
          type={notification.type}
          onClose={() => setNotification(null)}
        />
      )}
    </>
  );
}

export default Login;
