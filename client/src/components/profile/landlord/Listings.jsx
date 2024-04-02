import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setEditing } from "../../../slices/userSlice";

const Listings = () => {
  const user = useSelector((state) => state.user.user);
  const isEditing = useSelector((state) => state.user.isEditing);
  const dispatch = useDispatch();
  console.log(user);
  useEffect(() => {
    // Fetch user data and update Redux store if needed (e.g., if user data is null)
    // Example:
    // dispatch(setUser(/* Fetch user data from API */));
  }, [dispatch]);

  const handleEditClick = (listingId) => {
    // Set editing state and pass the listing ID to your edit form/component
    dispatch(setEditing(true));
    // Optionally, you can also pass the listing ID to your edit form/component
    // dispatch(setSelectedListing(listingId));
  };
  console.log();
  return (
    <div>
      {user && user.role === "landlord" && (
        <>
          <h2>Your Listings</h2>
          {user.details && user.details.listings && (
            <ul>
              {user.details.listings?.map((listing) => (
                <div className="max-w-sm rounded overflow-hidden shadow-lg hover:shadow-xl m-4">
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
                        {listing.rent}Rs. /month
                      </p>
                    </div>
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
