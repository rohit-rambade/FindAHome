import React, { useEffect, useState } from "react";

import axios from "axios";

import { toast } from "react-toastify";
const EditProfile = ({ toggleEditPopup, profileData }) => {
  const initialDetails = {
    fullName: "",
    dob: "",
    gender: "",
    nationality: "",
    aadharCard: "",
    email: "",
    phone: "",
    city: "",
    pincode: "",
    address: "",
    parentContactNo: "",
    hodContactNo: "",
    institutionName: "",
    branch: "",
    academicYear: "",
  };
  const [details, setDetails] = useState(initialDetails);
  useEffect(() => {
    if (profileData) {
      setDetails(profileData);
    }
  }, [profileData]);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setDetails((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  console.log(details);
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let response;
      if (profileData) {
        // Edit profile
        response = await axios.put(`/api/users/update-profile`, details, {
          withCredentials: true,
        });
      } else {
        response = await axios.post("/api/users/create-profile", details, {
          withCredentials: true,
        });
      }
      if (response.status) {
        toast.success(response.data.message);
        toggleEditPopup();
      }
    } catch (error) {
      console.error("Error saving profile:", error);
    }
  };
  console.log(details.fullName);
  return (
    <div
      className="fixed inset-0 flex items-start md:icf
     justify-center bg-gray-800 bg-opacity-50 z-50 overflow-scroll md:overflow-hidden"
    >
      <div className="bg-white p-6 rounded-lg w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">
          {profileData ? "Edit Profile" : "Create Profile"}
        </h2>
        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-2"
        >
          <input
            type="text"
            name="fullName"
            value={details.fullName}
            onChange={handleChange}
            placeholder="Full Name"
            required
            className="w-full mb-4 p-2 border border-gray-300 rounded md:col-span-2"
          />
          <div className="">
            <label htmlFor="dob">DOB</label>
            <input
              type="date"
              name="dob"
              id="dob"
              value={details.dob}
              onChange={handleChange}
              placeholder="DOB"
              required
              className="w-full mb-4 p-2 border border-gray-300 rounded"
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="gender"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Gender
            </label>
            <select
              name="gender"
              id="gender"
              value={details.gender}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded p-2"
              required
            >
              <option>Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <input
            type="text"
            name="nationality"
            value={details.nationality}
            onChange={handleChange}
            placeholder="nationality"
            required
            className="w-full mb-4 p-2 border border-gray-300 rounded"
          />
          {/* <input
            type="text"
            name="aadharCard"
            value={details.aadharCard}
            onChange={handleChange}
            placeholder="aadharCard"
            required
            className="w-full mb-4 p-2 border border-gray-300 rounded"
          /> */}
          <input
            type="email"
            name="email"
            value={details.email}
            onChange={handleChange}
            placeholder="email"
            required
            className="w-full mb-4 p-2 border border-gray-300 rounded"
          />
          <input
            type="number"
            name="phone"
            value={details.phone}
            onChange={handleChange}
            placeholder="phone"
            required
            className="w-full mb-4 p-2 border border-gray-300 rounded"
          />
          <input
            type="text"
            name="address"
            value={details.address}
            onChange={handleChange}
            placeholder="address"
            required
            className="w-full mb-4 p-2 border border-gray-300 rounded"
          />
          <input
            type="text"
            name="city"
            value={details.city}
            onChange={handleChange}
            placeholder="city"
            required
            className="w-full mb-4 p-2 border border-gray-300 rounded"
          />
          <input
            type="number"
            name="pincode"
            value={details.pincode}
            onChange={handleChange}
            placeholder="pincode"
            required
            className="w-full mb-4 p-2 border border-gray-300 rounded"
          />
          <input
            type="number"
            name="parentContactNo"
            value={details.parentContactNo}
            onChange={handleChange}
            placeholder="parentContactNo"
            required
            className="w-full mb-4 p-2 border border-gray-300 rounded"
          />
          <input
            type="text"
            name="institutionName"
            value={details.institutionName}
            onChange={handleChange}
            placeholder="institutionName"
            required
            className="w-full mb-4 p-2 border border-gray-300 rounded"
          />
          <input
            type="number"
            name="hodContactNo"
            value={details.hodContactNo}
            onChange={handleChange}
            placeholder="hodContactNo"
            required
            className="w-full mb-4 p-2 border border-gray-300 rounded"
          />

          <input
            type="text"
            name="branch"
            value={details.branch}
            onChange={handleChange}
            placeholder="branch"
            required
            className="w-full mb-4 p-2 border border-gray-300 rounded"
          />
          <input
            type="text"
            name="academicYear"
            value={details.academicYear}
            onChange={handleChange}
            placeholder="academicYear"
            required
            className="w-full mb-4 p-2 border border-gray-300 rounded col-span-1 "
          />

          {/* Add more input fields for other profile data */}
          <div className="">
            <div className="flex md:justify-end">
              {profileData ? ( // Conditionally render Cancel button based on profileData presence
                <button
                  type="button"
                  className="w-full bg-red-500 text-white py-2 px-4 rounded mr-2"
                  onClick={toggleEditPopup}
                >
                  Cancel
                </button>
              ) : null}
              <button
                type="submit"
                className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
              >
                Save
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProfile;
