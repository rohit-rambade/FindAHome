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
    <div className="bg-slate-100 font-poppins ">
      <h2 className="text-lg font-semibold mb-4 p-2">Sent Requests</h2>
      <div className="space-y-4 grid col-span-4 ">
        <table className="w-full min-w-max table-auto text-left ">
          <thead>
            <tr>
              <th className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4">
                <p className="block antialiased  text-sm text-blue-gray-900 font-normal leading-none opacity-70">
                  Message
                </p>
              </th>

              <th className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4">
                <p className="block antialiased  text-sm text-blue-gray-900 font-normal leading-none opacity-70">
                  Additional Details
                </p>
              </th>
              <th className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4">
                <p className="block antialiased  text-sm text-blue-gray-900 font-normal leading-none opacity-70">
                  Amount
                </p>
              </th>
              <th className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4">
                <p className="block antialiased  text-sm text-blue-gray-900 font-normal leading-none opacity-70">
                  Status
                </p>
              </th>
              <th className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4">
                <p className="block antialiased  text-sm text-blue-gray-900 font-normal leading-none opacity-70">
                  Payment Status
                </p>
              </th>

              <th className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4">
                <p className="block antialiased  text-sm text-blue-gray-900 font-normal leading-none opacity-70">
                  Payment
                </p>
              </th>
            </tr>
          </thead>
          <tbody className="">
            {sentRequests.map((request) => (
              <>
                <tr>
                  <td className="p-4 border-b border-blue-gray-50">
                    <div className="flex items-center gap-3">
                      <div className="flex flex-col">
                        <p className="block antialiased  text-sm leading-normal text-blue-gray-900 font-normal capitalize">
                          {request.message}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="p-4 border-b border-blue-gray-50">
                    <p className="block antialiased  text-sm leading-normal text-blue-gray-900 font-normal capitalize">
                      {request.additionalDetails}
                    </p>
                  </td>
                  <td className="p-4 border-b border-blue-gray-50">
                    <p className="block antialiased  text-sm leading-normal text-blue-gray-900 font-normal">
                      {request?.listing?.rent} Rs.
                    </p>
                  </td>
                  <td className="p-4 border-b border-blue-gray-50">
                    <div className="flex items-center gap-3">
                      <span
                        className={`${
                          request.status === "Pending"
                            ? "bg-yellow-200 text-yellow-500"
                            : request.status === "Approved"
                            ? "bg-green-500/20 text-green-900"
                            : "bg-red-200 text-red-400"
                        } font-bold uppercase whitespace-nowrap select-none  py-1 px-2 text-xs rounded-md`}
                      >
                        {request.status}
                      </span>
                    </div>
                  </td>
                  <td className="p-4 border-b border-blue-gray-50">
                    <p className="block antialiased  text-sm leading-normal text-blue-gray-900 font-normal">
                      <span
                        className={`${
                          request.paymentStatus === "Pending"
                            ? "bg-yellow-200 text-yellow-500"
                            : request.paymentStatus === "Approved"
                            ? "bg-green-500/20 text-green-900"
                            : "bg-red-200 text-red-400"
                        }font-bold uppercase whitespace-nowrap select-none  py-1 px-2 text-xs rounded-md`}
                      >
                        {request.paymentStatus}
                      </span>
                    </p>
                  </td>

                  <td className="p-4 border-b border-blue-gray-50">
                    <div className="flex items-center gap-3">
                      {role === "student" &&
                      request.status === "Approved" &&
                      request.paymentStatus === "Pending" ? (
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
                  </td>
                </tr>
              </>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SentRequests;

// <div
//   key={request._id}
//   className="w-1/2 border rounded-lg p-4 text-2xl"
// >
//   <div className="">
//     <p className="text-lg">
//       Status:
//
//     </p>
//     <p className="text-lg">
//       :{" "}
//
//     </p>
//     <p className="text-lg"> </p>
//     <p className="text-lg">
//       Additional Details:
//     </p>
//
//   </div>

//   <div>
//     {role === "student" &&
//     request.status === "Approved" &&
//     request.paymentStatus === "Pending" ? (
//       <button
//         type="button"
//         className="text-white bg-[#FF9119] hover:bg-[#FF9119]/80 focus:ring-4 focus:outline-none focus:ring-[#FF9119]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:hover:bg-[#FF9119]/80 dark:focus:ring-[#FF9119]/40 me-2 mb-2"
//         onClick={() =>
//           paymentHandler(
//             request?.listing?._id,
//             request?.listing?.landlord?._id,
//             request?.listing?.rent
//           )
//         }
//       >
//         Make A Payment
//       </button>
//     ) : (
//       ""
//     )}
//   </div>
// </div>
