import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import Map from "../components/map/Map";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import Pin from "../components/pin/Pin";

const SingleListing = () => {
  const { id } = useParams();
  const { _id, role } = useSelector((state) => state.user.user);
  const listings = useSelector((state) => state.listings.listings);

  const listing = listings.find((item) => item._id === id);
  const [showPopup, setShowPopup] = useState(false);
  const [message, setMessage] = useState("");
  const [additionalDetails, setAdditionalDetails] = useState("");
  console.log(_id);
  const handleSendRequest = async () => {
    try {
      if (role !== "student") {
        toast.error("Only students can send requests.");
        return;
      }

      const response = await fetch("/api/student/rent-request", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          studentId: _id,
          listingId: id,
          message,
          additionalDetails,
        }),
      });
      const data = await response.json();
      console.log(data);
      if (response.ok) {
        toast.success("Request sent successfully!");
        setMessage("");
        setAdditionalDetails("");
      } else {
        toast.error(data.message || "Error sending request.");
      }
    } catch (error) {
      toast.error(error.message || "Error sending request.");
      console.error("Error sending request:", error.message);
    }
  };

  if (!listing) {
    return <div>Loading...</div>;
  }

  console.log(listing);

  return (
    <div className="font-[sans-serif]">
      <div className="p-6 lg:max-w-7xl max-w-2xl max-lg:mx-auto">
        <div className="grid items-start grid-cols-1 lg:grid-cols-5 gap-12">
          <div className="lg:col-span-3 bg-gray-100 w-full lg:sticky top-0 text-center p-8">
            {listing.images.map((image, index) => {
              return (
                <img
                  key={index}
                  src={image}
                  alt="Product"
                  className="w-4/5 rounded object-cover "
                />
              );
            })}
          </div>
          <div className="lg:col-span-2">
            <h2 className="text-2xl font-extrabold text-gray-800">
              {listing.roomDescription.size} Sq ft {listing.roomType} Room
            </h2>
            <div className="flex flex-wrap gap-4 mt-4">
              <p className="text-gray-800 text-xl font-bold">
                {listing.rent} Rs./ {listing.rentType}
              </p>
            </div>

            <div className="mt-8">
              <h3 className="text-lg font-bold text-gray-800">
                About the Room
              </h3>
              <p>Location: {listing.city}</p>
              <p>Occupancy: {listing.occupancy}</p>
              <p>Lease Duration: {listing.leaseDuration}</p>
              <p>
                Nearby Public Transport:{" "}
                {listing.nearbyPublicTransportation ? "Yes" : "No"}
              </p>
            </div>
            {!showPopup ? (
              <div className="mapContainer">
                <MapContainer
                  center={listing.coordinates}
                  zoom={7}
                  scrollWheelZoom={true}
                  className="h-96"
                >
                  <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  />

                  <Marker position={listing.coordinates}>
                    <Popup>
                      <div className="popupContainer">
                        <img src={listing.images[0]} alt="" />
                        <div className="textContainer">
                          {/* <Link to={`/${item.id}`}>{item.title}</Link> */}
                          <span> {listing.landlord}</span>
                          <b>{listing.rent} Rs</b>
                        </div>
                      </div>
                    </Popup>
                  </Marker>
                </MapContainer>
              </div>
            ) : (
              <></>
            )}
            <div className="mt-8 max-w-md">
              <button
                type="button"
                className="w-full mt-8 px-4 py-2 bg-transparent border-2 border-gray-800 text-gray-800 font-bold rounded"
                onClick={() => setShowPopup(true)}
              >
                Send Request
              </button>
            </div>
          </div>
          {/* Popup/Modal */}
          {showPopup && (
            <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50">
              <div className="bg-white p-6 rounded-lg">
                <h2 className="text-lg font-semibold mb-4">Enter Details</h2>
                <input
                  type="text"
                  placeholder="Message"
                  className="w-full border border-gray-300 rounded mb-4 p-2"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                />
                <textarea
                  placeholder="Additional Details"
                  className="w-full border border-gray-300 rounded p-2"
                  value={additionalDetails}
                  onChange={(e) => setAdditionalDetails(e.target.value)}
                ></textarea>
                <div className="mt-4 flex justify-end">
                  <button
                    className="px-4 py-2 bg-gray-800 text-white rounded mr-2"
                    onClick={() => setShowPopup(false)}
                  >
                    Cancel
                  </button>
                  <button
                    className="px-4 py-2 bg-blue-500 text-white rounded"
                    onClick={() => {
                      handleSendRequest();
                      setShowPopup(false);
                    }}
                  >
                    Send
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SingleListing;
