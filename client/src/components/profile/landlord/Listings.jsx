import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setEditing } from "../../../slices/userSlice";
import axios from "axios"; // Import Axios or your preferred HTTP library

const Listings = () => {
  const user = useSelector((state) => state.user.user);

  const [listings, setListings] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    if (user && user.role === "landlord" && user.details) {
      fetchListings(); // Fetch listings when component mounts
    }
  }, [user]);

  const fetchListings = async () => {
    try {
      const response = await axios.get("/api/landlord/get-listings", {
        withCredentials: true,
      });
      const { data } = response;

      setListings(data.data);
    } catch (error) {
      console.error("Error fetching listings:", error);
    }
  };

  const handleEditClick = (listingId) => {
    dispatch(setEditing(true));
  };

  return (
    <div>
      {user && user.role === "landlord" && (
        <>
          <h2>Your Listings</h2>
          {listings?.length > 0 && (
            <ul>
              {listings?.map((listing) => (
                <div
                  key={listing._id} // Assuming each listing has a unique ID
                  className="max-w-sm rounded overflow-hidden shadow-lg hover:shadow-xl m-4"
                >
                  <img
                    className="w-full"
                    src={listing.images[0]}
                    alt="Property Image"
                  />
                  <div className="px-6 py-4">
                    <div className="mb-2">
                      <h2 className="text-xl font-bold text-gray-900">
                        {listing.roomType} Room in {listing.location}
                      </h2>
                    </div>
                    <div className="flex justify-between">
                      <div className="flex items-center">
                        <p className="ml-2 text-sm font-medium text-gray-700">
                          {listing.roomDescription.size} sq ft
                        </p>
                      </div>
                    </div>
                    <div className="mt-4">
                      <p className="text-3xl font-extrabold text-blue-800">
                        {listing.rent} Rs. /month
                      </p>
                    </div>
                    <button
                      onClick={() => handleEditClick(listing._id)}
                      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    >
                      Edit
                    </button>
                  </div>
                </div>
              ))}
            </ul>
          )}
        </>
      )}
      {user && user.role === "student" && (
        <>
          <h2>Student Dashboard</h2>
          {/* Render student-specific content here */}
        </>
      )}
    </div>
  );
};

export default Listings;
