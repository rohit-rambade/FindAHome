import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";

import { toast } from "react-toastify";
const EditProfile = ({ toggleEditPopup, profileData }) => {
  //   const details = useSelector((state) => state.user.user.details);
  console.log(profileData);
  const initialDetails = {
    fullName: "",
    phone: "",
    about: "",
    address: "",
    photo: "",
    roomTypes: [],
    amenities: [],
  };
  const [details, setDetails] = useState(initialDetails);
  useEffect(() => {
    if (profileData) {
      setDetails(profileData);
    }
  }, [profileData]);
  const handleChange = (e) => {
    const { name, value } = e.target;

    setDetails((prevState) => {
      if (name === "roomTypes" || name === "amenities") {
        const updatedArray = prevState[name].includes(value)
          ? prevState[name].filter((item) => item !== value)
          : [...prevState[name], value];
        return { ...prevState, [name]: updatedArray };
      } else {
        return { ...prevState, [name]: value };
      }
    });
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
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">
          {profileData ? "Edit Profile" : "Create Profile"}
        </h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="fullName"
            value={details.fullName}
            onChange={handleChange}
            placeholder="Full Name"
            required
            className="w-full mb-4 p-2 border border-gray-300 rounded"
          />
          <input
            type="text"
            name="phone"
            value={details.phone}
            onChange={handleChange}
            placeholder="Phone"
            required
            className="w-full mb-4 p-2 border border-gray-300 rounded"
          />
          <textarea
            name="about"
            value={details.about}
            onChange={handleChange}
            placeholder="About"
            rows={4}
            className="w-full mb-4 p-2 border border-gray-300 rounded"
          ></textarea>
          <input
            type="text"
            name="address"
            value={details.address}
            onChange={handleChange}
            placeholder="Address"
            required
            className="w-full mb-4 p-2 border border-gray-300 rounded"
          />
          {/* <input
            type="text"
            name="photo"
            value={details.photo}
            onChange={handleChange}
            placeholder="Photo"
            className="w-full mb-4 p-2 border border-gray-300 rounded"
          /> */}
          <div className="mb-4">
            <label
              htmlFor="roomTypes"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Room Types
            </label>
            <select
              name="roomTypes"
              id="roomTypes"
              value={details.roomTypes}
              onChange={handleChange}
              multiple
              className="w-full border border-gray-300 rounded p-2"
            >
              <option value="Single Room">Single Room</option>
              <option value="Double Room">Double Room</option>
              <option value="Shared Room">Shared Room</option>
            </select>
          </div>
          <div className="mb-4">
            <label
              htmlFor="amenities"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Amenit ies
            </label>
            <select
              name="amenities"
              id="amenities"
              value={details.amenities}
              onChange={handleChange}
              multiple
              className="w-full border border-gray-300 rounded p-2"
            >
              <option value="Hot Water">Hot Water</option>
              <option value="Tiffin">Tiffin</option>
              <option value="Wi-Fi">Wi-Fi</option>
            </select>
          </div>

          <div className="flex justify-end">
            {profileData ? (
              <button
                type="button"
                className="bg-red-500 text-white py-2 px-4 rounded mr-2"
                onClick={toggleEditPopup}
              >
                Cancel
              </button>
            ) : null}
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProfile;
