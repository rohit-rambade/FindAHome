import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
const SentRequests = () => {
  const [sentRequests, setSentRequests] = useState([]);
  const { role } = useSelector((state) => state.user.user);

  console.log(sentRequests);

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
  const generateReceiptId = () => {
    const randomString = Math.random().toString(36).substring(7);
    const timestamp = new Date().getTime();
    return `receipt_${timestamp}_${randomString}`;
  };

  const paymentHandler = async (listingId, landlordId, amount) => {
    try {
      const receiptId = generateReceiptId();

      const response = await axios.post(
        "/api/student/payment-order",
        {
          amount,
          currency: "INR",
          receipt: receiptId,
          listingId,
        },
        { withCredentials: true }
      );
      const {
        data: { order },
      } = response;
      console.log(order);

      let options = {
        key: "rzp_test_4XtuiyXKyGhqXK",
        amount: order.amount,
        currency: "INR",
        name: "SHF",
        description: "Test Transaction",
        order_id: order.id,
        handler: async function (response) {
          try {
            console.log(response);
            const {
              razorpay_order_id,
              razorpay_payment_id,
              razorpay_signature,
            } = response;
            console.log(
              razorpay_order_id,
              razorpay_payment_id,
              razorpay_signature
            );

            const validateResponse = await axios.post(
              "/api/student/payment-verification",
              {
                razorpay_order_id,
                razorpay_payment_id,
                razorpay_signature,
                landlordId,
                listingId,
              },
              { withCredentials: true }
            );
            toast.success(validateResponse.data.message);
          } catch (error) {
            toast.error(error.response.data.message || "An error occurred.");
          }
        },

        theme: {
          color: "#3399cc",
        },
      };

      let rzp1 = new Razorpay(options);
      rzp1.open();
    } catch (error) {
      toast.error(error.response.data.message || "An error occurred.");
    }
  };

  return (
    <div>
      <h2 className="text-lg font-semibold mb-4">Sent Requests</h2>
      <div className="space-y-4">
        {sentRequests.map((request) => (
          <div key={request._id}>
            {console.log(request.listing._id)}

            <div className="border rounded-lg p-4">
              <p className="text-sm">Status: {request.status}</p>
              <p className="text-sm">Payment Status: {request.paymentStatus}</p>
              <p className="text-sm">Message: {request.message}</p>
              <p className="text-sm">
                Additional Details: {request.additionalDetails}
              </p>
              <h1>Amount : {request?.listing?.rent}</h1>
            </div>

            <div>
              {role === "student" && request.status === "Approved" ? (
                <button
                  type="button"
                  className="text-white bg-[#FF9119] hover:bg-[#FF9119]/80 focus:ring-4 focus:outline-none focus:ring-[#FF9119]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:hover:bg-[#FF9119]/80 dark:focus:ring-[#FF9119]/40 me-2 mb-2"
                  onClick={() =>
                    paymentHandler(
                      request?.listing?._id,
                      request?.listing?.landlord?._id,
                      request?.listing?.rent
                    )
                  }
                >
                  Make A Payment
                </button>
              ) : (
                ""
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SentRequests;
