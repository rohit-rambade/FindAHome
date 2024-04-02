import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setListings } from "../slices/listingsSlice";

const AllListings = () => {
  const listings = useSelector((state) => state.listings.listings);
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/api/users/listings");
        dispatch(setListings(response.data.data));
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [dispatch]);
  console.log(listings);
  return (
    <div className="flex flex-wrap justify-center">
      {listings?.map((listing) => (
        <Link to={`/listing/${listing._id}`} key={listing._id}>
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
        </Link>
      ))}
    </div>
  );
};

export default AllListings;
