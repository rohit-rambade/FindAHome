import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
const ViewReceivedRequests = () => {
  const [receivedRequests, setReceivedRequests] = useState([]);
  const [statusMap, setStatusMap] = useState({});
  console.log(receivedRequests);
  useEffect(() => {
    const fetchReceivedRequests = async () => {
      try {
        const response = await axios.get("/api/landlord/received-requests", {
          withCredentials: true,
        });
        const { data } = response;
        console.log(data);
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
              className="border rounded-lg p-4 flex justify-between text-xl "
            >
              <div className="">
                <p className="font-bold">
                  Listing ID:
                  <span className="font-normal ml-3">{request.listing}</span>
                </p>
                <p className="font-bold">
                  Name:
                  <span className="font-normal ml-3">
                    {request.student.details.fullName}
                  </span>
                </p>
                <p className="font-bold">
                  Phone Number:
                  <span className="font-normal ml-3">
                    {request.student.details.phone}
                  </span>
                </p>
                <p className="font-bold">
                  Status:
                  <span
                    className={`${
                      request.status === "Pending"
                        ? "text-yellow-300"
                        : request.status === "Approved"
                        ? "text-green-400"
                        : "text-red-400"
                    } font-normal ml-3`}
                  >
                    {request.status}
                  </span>
                </p>
                <p className="text-lg font-bold">
                  Payment Status:
                  <span
                    className={`${
                      request.paymentStatus === "Pending"
                        ? "text-yellow-300"
                        : "text-green-400"
                    } font-normal ml-3`}
                  >
                    {request.paymentStatus}
                  </span>
                </p>
                <p className="font-bold">
                  Message:
                  <span className="font-normal ml-3"> {request.message}</span>
                </p>
                <p className="font-bold">
                  Additional Details:{" "}
                  <span className="font-normal ml-3">
                    {request.additionalDetails}
                  </span>
                </p>
              </div>
              <div className="gap-x-5">
                <div className="space-x-4 flex  ">
                  <div className="space-x-4">
                    <label>Status:</label>
                    <select
                      className="p-2 border border-black shadow-lg"
                      value={statusMap[request._id] || ""}
                      onChange={(e) => handleStatusChange(e, request._id)}
                    >
                      <option value="Pending">Pending</option>
                      <option value="Approved">Approved</option>
                      <option value="Rejected">Rejected</option>
                    </select>
                  </div>
                  <div>
                    <button
                      className="text-gray-900 bg-[#F7BE38] hover:bg-[#F7BE38]/90 focus:ring-4 focus:outline-none focus:ring-[#F7BE38]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#F7BE38]/50 me-2 mb-2"
                      onClick={() => handleApproveRequest(request._id)}
                    >
                      Approve Request
                    </button>
                  </div>
                </div>
                <div className="space-x-4">
                  <label> Payment Status:</label>
                  <select
                    className="p-2 border border-black shadow-lg"
                    value={statusMap[request._id] || ""}
                    onChange={(e) => handleStatusChange(e, request._id)}
                  >
                    <option value="Pending">Pending</option>
                    <option value="Paid">Paid</option>
                  </select>
                  <button
                    className="text-white bg-[#2557D6] hover:bg-[#2557D6]/90 focus:ring-4 focus:ring-[#2557D6]/50 focus:outline-none font-medium  rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#2557D6]/50 me-2 mb-2"
                    onClick={() => handlePaymentAsPaid(request._id)}
                  >
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
