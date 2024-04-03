import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const SentRequests = () => {
  const [sentRequests, setSentRequests] = useState([]);
  const listings = useSelector((state) => state.listings.listings);
  const { role } = useSelector((state) => state.user.user);
  useEffect(() => {
    const fetchSentRequests = async () => {
      try {
        const response = await axios.get("/api/student/view-sent-requests", {
          withCredentials: true,
        });
        const { data } = response;

        if (data.success) {
          setSentRequests(data.data);
        } else {
          console.error("Error fetching sent requests:", data.message);
        }
      } catch (error) {
        console.error("Error fetching sent requests:", error);
      }
    };

    fetchSentRequests();
  }, []);
  console.log(sentRequests);

  return (
    <div>
      <h2 className="text-lg font-semibold mb-4">Sent Requests</h2>
      <div className="space-y-4">
        {sentRequests.map((request) => (
          <Link to={`/listing/${request.listing}`} key={request._id}>
            <div className="border rounded-lg p-4">
              <p className="text-sm">Status: {request.status}</p>
              <p className="text-sm">Payment Status: {request.paymentStatus}</p>
              <p className="text-sm">Message: {request.message}</p>
              <p className="text-sm">
                Additional Details: {request.additionalDetails}
              </p>

              <div>
                {role === "student" && request.status === "Approved" ? (
                  <button
                    type="button"
                    className="text-white bg-[#FF9119] hover:bg-[#FF9119]/80 focus:ring-4 focus:outline-none focus:ring-[#FF9119]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:hover:bg-[#FF9119]/80 dark:focus:ring-[#FF9119]/40 me-2 mb-2"
                  >
                    Make A Payment
                  </button>
                ) : (
                  ""
                )}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default SentRequests;
