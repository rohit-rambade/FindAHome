import React from "react";

const SentRequests = () => {
  const sentRequests = [
    {
      _id: "1",
      listing: "Listing 1",
      status: "Pending",
    },
    {
      _id: "2",
      listing: "Listing 2",
      status: "Accepted",
    },
    {
      _id: "3",
      listing: "Listing 3",
      status: "Rejected",
    },
  ];
  return (
    <div>
      <h2 className="text-lg font-semibold mb-4">Sent Requests</h2>
      <div className="space-y-4">
        {sentRequests.map((request) => (
          <div key={request._id} className="border rounded-lg p-4">
            <h3 className="font-medium">{request.listing}</h3>
            <p className="text-sm">Status: {request.status}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SentRequests;
