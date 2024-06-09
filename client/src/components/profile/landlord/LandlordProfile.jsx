import React from "react";

const LandlordProfile = ({ details }) => {
  return (
    <div>
      <div>
        <h2 className="text-xl font-bold mb-4">About Me</h2>
        <p className="text-gray-700">{details?.about}</p>
      </div>
      <div>
        <h2 className="text-xl font-bold mb-4">Address</h2>
        <p className="text-gray-700">{details?.address}</p>
      </div>

      <div className="flex flex-col">
        <div className="flex flex-col">
          <h2 className="text-xl font-bold mt-6 mb-4">Room Types</h2>
          <ul className="flex space-x-4">
            {details?.roomTypes.map((type, index) => {
              return (
                <li className=" p-2 shadow-lg  w-fit " key={index}>
                  {type}
                </li>
              );
            })}
          </ul>
        </div>

        <div>
          <h2 className="text-xl font-bold mt-6 mb-4">Amenities</h2>
          <ul className="flex space-x-4">
            {details?.amenities.map((amenitie, index) => {
              return (
                <li className=" p-2 shadow-lg  w-fit " key={index}>
                  {amenitie}
                </li>
              );
            })}
          </ul>
        </div>

        {/* <div>
          {details?.listings?.map((listing) => (
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
        </div> */}
      </div>
    </div>
  );
};

export default LandlordProfile;
