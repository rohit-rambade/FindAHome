import React, { useState } from "react";
import { FaEdit } from "react-icons/fa";
import LandlordProfile from "./landlord/LandlordProfile";
import { useSelector } from "react-redux";
import EditProfileLandlord from "./landlord/EditProfile";
import EditProfileStudent from "./student/EditProfile";
import StudentProfile from "./student/StudentProfile";
import Listings from "./landlord/Listings";

const UserProfile = () => {
  const { role, details } = useSelector((state) => state.user.user);
  const [showEditPopup, setShowEditPopup] = useState(!details);
  console.log(details);
  const toggleEditPopup = () => {
    setShowEditPopup((prev) => !prev);
  };
  return (
    <div className="bg-gray-100">
      <div className="container mx-auto ">
        <div className="">
          <div className=" ">
            <div className="bg-white shadow rounded-lg p-6 flex flex-col md:flex-row justify-around">
              <div className=" bg-white shadow rounded-lg p-6">
                <div className="flex justify-end">
                  <FaEdit size={25} color="blue" onClick={toggleEditPopup} />
                </div>
                <div className="flex flex-col items-center">
                  <img
                    src={`${
                      role == "student"
                        ? "https://avatar.iran.liara.run/public/22"
                        : "https://avatar.iran.liara.run/public/1"
                    }`}
                    className="w-1/4 bg-gray-300 rounded-full mb-4 shrink-0"
                  ></img>
                  <h1 className="text-xl font-bold">{details?.fullName}</h1>
                  <p className="text-gray-700">{role}</p>
                  <div className="mt-6 flex flex-wrap gap-4 justify-center">
                    <a
                      href="#"
                      className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
                    >
                      {details?.phone}
                    </a>
                  </div>
                </div>
              </div>

              {role === "landlord" ? (
                <LandlordProfile details={details} />
              ) : (
                <StudentProfile details={details} />
              )}
            </div>
            {role === "landlord" ? <Listings /> : ""}
          </div>
        </div>
      </div>
      {showEditPopup && role === "landlord" ? (
        <EditProfileLandlord
          profileData={details}
          onClose={toggleEditPopup}
          toggleEditPopup={toggleEditPopup}
        />
      ) : null}
      {showEditPopup && role === "student" ? (
        <EditProfileStudent
          profileData={details}
          onClose={toggleEditPopup}
          toggleEditPopup={toggleEditPopup}
        />
      ) : null}
    </div>
  );
};

export default UserProfile;
