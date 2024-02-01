import axios from "axios";
import React, { useState } from "react";
import { FaAlignRight, FaXmark } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink } from "react-router-dom";
import { isAuthenticated } from "../../slices/authSlice";
const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const isAuth = useSelector((state) => state.auth.isAuthenticated);
  const dispatch = useDispatch();

  const handleSignOut = async () => {
    const res = await axios.post("/api/users/signout", {
      withCredentials: true,
    });
    dispatch(isAuthenticated(false));

    console.log(res.data);
  };

  return (
    <div>
      <header className="relative font-poppins container mx-auto">
        <nav className=" flex w-full shadow-sm ">
          <div className="flex justify-between w-full  md:w-auto p-4 ">
            <div>
              <Link to="/" className="text-xl font-bold">
                Find A Home
              </Link>
            </div>

            <div className="flex space-x-5 items-center justify-center ">
              <div>
                <button
                  className="text-xl md:hidden"
                  onClick={() => setIsOpen(!isOpen)}
                >
                  {isOpen ? <FaXmark size={30} /> : <FaAlignRight size={30} />}
                </button>
              </div>
            </div>
          </div>
          <div
            className={`absolute w-full ${
              isOpen ? "block" : "hidden"
            } top-full bg-white border-b-2 md:ml-auto  p-5 md:p-2 text-center flex flex-col  gap-y-3 md:flex-row md:border-none md:bg-transparent  md:relative md:w-auto md:flex`}
          >
            <div className="flex   ">
              <ul className="flex flex-col gap-y-4 md:gap-0 md:flex md:flex-row md:justify-center md:items-center">
                <li>
                  <NavLink className="md:mr-4">Home</NavLink>
                </li>
                <li className="md:mr-4">Listing</li>
                <li className="md:mr-4">Contact</li>
              </ul>
            </div>

            <div className="flex flex-col md:flex-row space-y-2 md:space-y-0  md:w-full md:space-x-2 ">
              <Link className="flex items-center gap-2 px-4 py-2 text-white bg-indigo-600 rounded-lg duration-150 hover:bg-indigo-500 active:bg-indigo-700">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-5 h-5"
                >
                  <path
                    fillRule="evenodd"
                    d="M6.32 2.577a49.255 49.255 0 0111.36 0c1.497.174 2.57 1.46 2.57 2.93V21a.75.75 0 01-1.085.67L12 18.089l-7.165 3.583A.75.75 0 013.75 21V5.507c0-1.47 1.073-2.756 2.57-2.93z"
                    clipRule="evenodd"
                  />
                </svg>
                Dashboard
              </Link>
              {isAuth ? (
                <Link
                  onClick={handleSignOut}
                  to="/signin"
                  className="flex items-center gap-2 px-4 py-2 text-white bg-indigo-600 rounded-lg duration-150 hover:bg-indigo-500 active:bg-indigo-700"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="w-5 h-5"
                  >
                    <path
                      fillRule="evenodd"
                      d="M6.32 2.577a49.255 49.255 0 0111.36 0c1.497.174 2.57 1.46 2.57 2.93V21a.75.75 0 01-1.085.67L12 18.089l-7.165 3.583A.75.75 0 013.75 21V5.507c0-1.47 1.073-2.756 2.57-2.93z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Sign Out
                </Link>
              ) : (
                <Link
                  to="/signin"
                  className="flex items-center gap-2 px-4 py-2 text-white bg-indigo-600 rounded-lg duration-150 hover:bg-indigo-500 active:bg-indigo-700"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="w-5 h-5"
                  >
                    <path
                      fillRule="evenodd"
                      d="M6.32 2.577a49.255 49.255 0 0111.36 0c1.497.174 2.57 1.46 2.57 2.93V21a.75.75 0 01-1.085.67L12 18.089l-7.165 3.583A.75.75 0 013.75 21V5.507c0-1.47 1.073-2.756 2.57-2.93z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Sign In
                </Link>
              )}
              <Link
                to="/signup"
                className="flex items-center gap-2 px-4 py-2 text-white bg-indigo-600 rounded-lg duration-150 hover:bg-indigo-500 active:bg-indigo-700"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-5 h-5"
                >
                  <path
                    fillRule="evenodd"
                    d="M6.32 2.577a49.255 49.255 0 0111.36 0c1.497.174 2.57 1.46 2.57 2.93V21a.75.75 0 01-1.085.67L12 18.089l-7.165 3.583A.75.75 0 013.75 21V5.507c0-1.47 1.073-2.756 2.57-2.93z"
                    clipRule="evenodd"
                  />
                </svg>
                Join Now
              </Link>
            </div>
          </div>
        </nav>
      </header>
    </div>
  );
};

export default Header;
