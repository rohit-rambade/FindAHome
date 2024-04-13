import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
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
        toast.dismiss();
        toast.success(data.message);
      } else {
        console.error("Error updating rent request:", data.message);
      }
    } catch (error) {
      toast.dismiss();
      toast.error(error.response.data.message || "An error occurred.");
    }
  };
  const handlePaymentAsPaid = async (requestId) => {
    try {
      const response = await axios.put(
        `/api/landlord/rent-request/${requestId}/mark-payment-paid`,
        { withCredentials: true }
      );
      const { data } = response;
      if (data.success) {
        toast.dismiss();
        toast.success(data.message);
      } else {
        console.error("Failed to mark payment as paid:", data.message);
      }
    } catch (error) {
      console.error("Error marking payment as paid:", error);
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
      <h2
        className="text-2xl
       font-semibold mb-4"
      >
        Received Requests
      </h2>
      <div className="space-y-4">
        {receivedRequests.length === 0 ? (
          <div>
            <h1 className=" text-2xl  p-5">No Requests</h1>
          </div>
        ) : (
          receivedRequests.map((request) => (
            <div
              key={request._id}
              className="border rounded-lg p-4 flex   text-xl"
            >
              <div>
                <p>Listing ID: {request.listing}</p>
                <p>
                  Status:
                  <span
                    className={`${
                      request.status === "Pending"
                        ? "text-yellow-300"
                        : request.status === "Approved"
                        ? "text-green-400"
                        : "text-red-400"
                    }`}
                  >
                    {request.status}
                  </span>
                </p>
                <p className="text-lg">
                  Payment Status:{" "}
                  <span
                    className={`${
                      request.paymentStatus === "Pending"
                        ? "text-yellow-300"
                        : "text-green-400"
                    }`}
                  >
                    {request.paymentStatus}
                  </span>
                </p>
                <p>Message: {request.message}</p>
                <p>Additional Details: {request.additionalDetails}</p>
              </div>
              <div className="">
                <div className="space-x-4">
                  <label>Status:</label>
                  <select
                    value={statusMap[request._id] || ""}
                    onChange={(e) => handleStatusChange(e, request._id)}
                  >
                    <option value="Pending">Pending</option>
                    <option value="Approved">Approved</option>
                    <option value="Rejected">Rejected</option>
                  </select>
                  <button onClick={() => handleApproveRequest(request._id)}>
                    Approve Request
                  </button>
                </div>
                <div className="space-x-4">
                  <label> Payment Status:</label>
                  <select
                    value={statusMap[request._id] || ""}
                    onChange={(e) => handleStatusChange(e, request._id)}
                  >
                    <option value="Pending">Pending</option>
                    <option value="Paid">Paid</option>
                  </select>
                  <button onClick={() => handlePaymentAsPaid(request._id)}>
                    Accept Payment
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ViewReceivedRequests;
