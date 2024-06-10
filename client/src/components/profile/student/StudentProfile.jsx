import React from "react";

const StudentProfile = ({ details }) => {
  return (
    <div className="font-poppins space-y-4">
      <div className="space-y-2">
        <h2 className="md:text-xl font-bold mb-4 border border-black p-2 rounded-full w-fit">
          About Me
        </h2>
        {/* <p className="text-black">DOB : {details?.dob}</p> */}
        <p className="text-black">Gender : {details?.gender}</p>
        <p className="text-black">
          institution Name : {details?.institutionName}
        </p>

        <p className="text-black">nationality : {details?.nationality}</p>
        <p className="text-black"> Branch : {details?.branch}</p>
        <p className="text-black"> academicYear : {details?.academicYear}</p>
      </div>
      <div className="space-y-2">
        <h2 className="md:text-xl font-bold mb-4 border border-black p-2 rounded-full w-fit">
          Address
        </h2>
        <p className="text-black">{details?.address}</p>

        <p className="text-black">City : {details?.city}</p>

        <p className="text-black">Pincode {details?.pincode}</p>
      </div>

      <div className="space-y-2">
        <h2 className="md:text-xl font-bold mb-4 border border-black p-2 rounded-full w-fit">
          Additional Details
        </h2>
        <p className="text-black">
          Parent Contact : {details?.parentContactNo}
        </p>

        <p className="text-black">Hod Contact: {details?.hodContactNo}</p>
      </div>
    </div>
  );
};

export default StudentProfile;
