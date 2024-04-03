import React, { useState, useEffect } from "react";
import axios from "axios";

const ViewReceivedRequests = () => {
  const [receivedRequests, setReceivedRequests] = useState([]);
  const [statusMap, setStatusMap] = useState({});

  useEffect(() => {
    const fetchReceivedRequests = async () => {
      try {
        const response = await axios.get("/api/landlord/received-requests", {
          withCredentials: true,
        });
        const { data } = response;
        if (data.success) {
          setReceivedRequests(data.data);

          const initialStatusMap = {};
          data.data.forEach((request) => {
            initialStatusMap[request._id] = request.status;
          });
          setStatusMap(initialStatusMap);
        } else {
          console.error("Error fetching received requests:", data.message);
        }
      } catch (error) {
        console.error("Error fetching received requests:", error);
      }
    };

    fetchReceivedRequests();
  }, []);

  const handleApproveRequest = async (requestId) => {
    try {
      const response = await axios.put(
        `/api/landlord/rent-request/${requestId}/verify-accept`,
        { status: statusMap[requestId] }, // Use status from status map
        { withCredentials: true }
      );
      const { data } = response;
      console.log(response);
      if (data.success) {
        console.log("Rent request updated successfully");
      } else {
        console.error("Error updating rent request:", data.message);
      }
    } catch (error) {
      console.error("Error updating rent request:", error);
    }
  };

  const handleStatusChange = (e, requestId) => {
    const { value } = e.target;
    setStatusMap((prevStatusMap) => ({
      ...prevStatusMap,
      [requestId]: value,
    }));
  };

  return (
    <div>
      <h2 className="text-lg font-semibold mb-4">Received Requests</h2>
      <div className="space-y-4">
        {receivedRequests.map((request) => (
          <div
            key={request._id}
            className="border rounded-lg p-4 flex justify-center items-center"
          >
            <div>
              <p>Listing ID: {request.listing}</p>
              <p>Status: {request.status}</p>
              <p>Message: {request.message}</p>
              <p>Additional Details: {request.additionalDetails}</p>
            </div>
            <div>
              <label>Status:</label>
              <select
                value={statusMap[request._id] || ""}
                onChange={(e) => handleStatusChange(e, request._id)}
              >
                <option value="Pending">Pending</option>
                <option value="Approved">Approved</option>
                <option value="Rejected">Rejected</option>
              </select>
            </div>
            <button onClick={() => handleApproveRequest(request._id)}>
              Approve Request
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ViewReceivedRequests;
