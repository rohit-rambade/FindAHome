import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../pages/Home";
import SignUp from "../pages/SignUp";
import SignIn from "../pages/SignIn";
import Profile from "../pages/Profile";
import Listings from "../components/profile/landlord/Listings";
import UserProfile from "../components/profile/UserProfile";
import AddListing from "../components/profile/landlord/AddListing";
import AllListings from "../pages/AllListings";
import SingleListing from "../pages/SingleListing";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "",
        element: <Home />,
      },
      {
        path: "signup",
        element: <SignUp />,
      },
      {
        path: "signin",
        element: <SignIn />,
      },
      {
        path: "profile",
        element: <Profile />,
        children: [
          {
            path: "",
            element: <UserProfile />,
          },
          {
            path: "listings",
            element: <Listings />,
          },
          {
            path: "addlisting",
            element: <AddListing />,
          },
        ],
      },
      {
        path: "listings",
        element: <AllListings />,
      },
      {
        path: "listing/:id",
        element: <SingleListing />,
      },
    ],
  },
]);
