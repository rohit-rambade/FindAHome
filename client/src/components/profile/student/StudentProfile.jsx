import React from "react";

const StudentProfile = ({ details }) => {
  return (
    <div>
      <div>
        <h2 className="text-xl font-bold mb-4">About Me</h2>
        {/* <p className="text-gray-700">DOB : {details?.dob}</p> */}
        <p className="text-gray-700">Gender : {details?.gender}</p>
        <p className="text-gray-700">
          institution Name : {details?.institutionName}
        </p>

        <p className="text-gray-700">nationality : {details?.nationality}</p>
        <p className="text-gray-700"> Branch : {details?.branch}</p>
        <p className="text-gray-700"> academicYear : {details?.academicYear}</p>
      </div>
      <div>
        <h2 className="text-xl font-bold mb-4">Address</h2>
        <p className="text-gray-700">{details?.address}</p>

        <p className="text-gray-700">City : {details?.city}</p>

        <p className="text-gray-700">Pincode {details?.pincode}</p>
      </div>

      <div>
        <h2 className="text-xl font-bold mb-4">Additional Details</h2>
        <p className="text-gray-700">
          parentContactNo : {details?.parentContactNo}
        </p>

        <p className="text-gray-700">hodContactNo : {details?.hodContactNo}</p>
      </div>
    </div>
  );
};

export default StudentProfile;
