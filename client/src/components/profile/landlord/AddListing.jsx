import React, { useState } from "react";
import MultiStep from "react-multistep";

const AddListing = () => {
  const [formData, setFormData] = useState({
    images: [],
    location: "",
    proximityToCampus: 0,
    nearbyPublicTransportation: false,
    roomType: "",
    genderPreferences: "",
    rent: {
      amount: 0,
      rentType: "",
    },
    washroomSystem: "",
    cookingFacility: {
      inductionAllowed: false,
    },
    occupancy: 4,
    amenities: {
      withBed: false,
      furniture: "",
    },
    leaseDuration: "",
    roomDescription: {
      size: "",
      windowsAndNaturalLight: false,
      flooringType: "",
    },
    rating: 0,
    reviews: [],
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    // Handle nested objects
    if (name.includes(".")) {
      const [parent, child] = name.split(".");
      if (parent === "rent") {
        setFormData({
          ...formData,
          [parent]: {
            ...formData[parent],
            [child]: type === "checkbox" ? !formData[parent][child] : value,
          },
        });
      } else if (parent === "cookingFacility") {
        setFormData({
          ...formData,
          [parent]: {
            ...formData[parent],
            [child]: checked,
          },
        });
      } else if (parent === "amenities") {
        setFormData({
          ...formData,
          [parent]: {
            ...formData[parent],
            [child]: type === "checkbox" ? checked : value,
          },
        });
      } else if (parent === "roomDescription") {
        setFormData({
          ...formData,
          [parent]: {
            ...formData[parent],
            [child]: type === "checkbox" ? checked : value,
          },
        });
      } else {
        setFormData({
          ...formData,
          [parent]: {
            ...formData[parent],
            [child]: value,
          },
        });
      }
    } else if (type === "checkbox") {
      setFormData({ ...formData, [name]: checked });
    } else if (name === "inductionAllowed") {
      setFormData({
        ...formData,
        cookingFacility: { inductionAllowed: checked },
      });
    } else if (name === "images") {
      setFormData({
        ...formData,
        images: Array.from(e.target.files),
      });
    } else if (name === "rating") {
      setFormData({
        ...formData,
        [name]: parseInt(value),
      });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addListing(formData));
    // Reset form after submission
    setFormData({
      images: [],
      location: "",
      proximityToCampus: 0,
      nearbyPublicTransportation: false,
      roomType: "",
      genderPreferences: "",
      rent: {
        amount: 0,
        rentType: "",
      },
      washroomSystem: "",
      cookingFacility: {
        inductionAllowed: false,
      },
      occupancy: 4,
      amenities: {
        withBed: false,
        furniture: "",
      },
      leaseDuration: "",
      roomDescription: {
        size: "",
        windowsAndNaturalLight: false,
        flooringType: "",
      },
      rating: 0,
      reviews: [],
    });
  };
  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    const urls = files.map((file) => URL.createObjectURL(file));
    setFormData({
      ...formData,
      images: urls,
    });
  };
  console.log(formData);
  return (
    <div>
      <div className="py-8 px-4 mx-auto max-w-2xl lg:py-16">
        <h2 className="mb-4 text-xl font-bold text-gray-900 ">
          Add a new Listing
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Images */}

          <div>
            <label htmlFor="images">Upload Room Images</label>
            <input
              id="images"
              type="file"
              name="images"
              onChange={handleImageChange}
              multiple
              className="border border-gray-300 rounded-md p-2 w-full"
            />
          </div>
          {/* Location */}

          <div>
            <label htmlFor="location">Location</label>
            <input
              id="location"
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              placeholder="Location"
              className="border border-gray-300 rounded-md p-2 w-full"
            />
          </div>

          {/* Proximity to Campus */}

          <div>
            <label htmlFor="proximityToCampus"> Proximity to Campus</label>

            <input
              id="proximityToCampus"
              type="text"
              name="proximityToCampus"
              value={formData.proximityToCampus}
              onChange={handleChange}
              placeholder="in KM"
              className="border border-gray-300 rounded-md p-2 w-full"
            />
          </div>

          {/* Nearby Public Transportation */}
          <div>
            <label>
              <input
                type="checkbox"
                name="nearbyPublicTransportation"
                checked={formData.nearbyPublicTransportation}
                onChange={handleChange}
                className="mr-2"
              />
              Nearby Public Transportation
            </label>
          </div>

          {/* Room Type */}
          <select
            name="roomType"
            value={formData.roomType}
            onChange={handleChange}
            className="border border-gray-300 rounded-md p-2 w-full"
          >
            <option value="">Select Room Type</option>
            <option value="Single">Single</option>
            <option value="Double">Double</option>
            <option value="Triple">Triple</option>
            <option value="Common for 5 to 6 students">
              Common for 5 to 6 students
            </option>
            <option value="Apartment">Apartment</option>
          </select>

          {/* Gender Preferences */}
          <select
            name="genderPreferences"
            value={formData.genderPreferences}
            onChange={handleChange}
            className="border border-gray-300 rounded-md p-2 w-full"
          >
            <option value="">Select Gender Preferences</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Any">Any</option>
          </select>

          {/* Rent Amount */}
          <div>
            <label htmlFor="rentAmount">Rent Amount in rs</label>
            <input
              id="rentAmount"
              type="text"
              name="rent.amount"
              value={formData.rent.amount}
              onChange={handleChange}
              placeholder="Rent Amount"
              className="border border-gray-300 rounded-md p-2 w-full"
            />
          </div>

          {/* Rent Type */}
          <select
            name="rent.rentType"
            value={formData.rent.rentType}
            onChange={handleChange}
            className="border border-gray-300 rounded-md p-2 w-full"
          >
            <option value="">Select Rent Type</option>
            <option value="Monthly">Monthly</option>
            <option value="Based on days">Based on days</option>
            <option value="Weekly">Weekly</option>
          </select>

          {/* Washroom System */}
          <select
            name="washroomSystem"
            value={formData.washroomSystem}
            onChange={handleChange}
            className="border border-gray-300 rounded-md p-2 w-full"
          >
            <option value="">Select Washroom System</option>
            <option value="Common">Common</option>
            <option value="Separate">Separate</option>
          </select>

          {/* Cooking Facility */}
          <label>
            <input
              type="checkbox"
              name="cookingFacility.inductionAllowed"
              checked={formData.cookingFacility?.inductionAllowed}
              onChange={handleChange}
              className="mr-2"
            />
            Induction Allowed
          </label>

          {/* Occupancy */}

          <div>
            <label htmlFor="Occupancy">Occupancy</label>

            <input
              id="Occupancy"
              type="text"
              name="occupancy"
              value={formData.occupancy}
              onChange={handleChange}
              placeholder="Occupancy"
              className="border border-gray-300 rounded-md p-2 w-full"
            />
          </div>

          {/* Amenities */}
          <label>
            <input
              type="checkbox"
              name="amenities.withBed"
              checked={formData.amenities.withBed}
              onChange={handleChange}
              className="mr-2"
            />
            With Bed
          </label>

          <select
            name="amenities.furniture"
            value={formData.amenities.furniture}
            onChange={handleChange}
            className="border border-gray-300 rounded-md p-2 w-full"
          >
            <option value="">Select Furniture</option>
            <option value="Furnished">Furnished</option>
            <option value="Unfurnished">Unfurnished</option>
            <option value="Partially furnished">Partially furnished</option>
          </select>

          {/* Lease Duration */}
          <select
            name="leaseDuration"
            value={formData.leaseDuration}
            onChange={handleChange}
            className="border border-gray-300 rounded-md p-2 w-full"
          >
            <option value="">Select Lease Duration</option>
            <option value="Month-to-month">Month-to-month</option>
            <option value="Fixed term (6 months, 1 year)">
              Fixed term (6 months, 1 year)
            </option>
          </select>

          {/* Room Description */}
          <input
            type="text"
            name="roomDescription.size"
            value={formData.roomDescription.size}
            onChange={handleChange}
            placeholder="Room Size"
            className="border border-gray-300 rounded-md p-2 w-full"
          />

          <div>
            <label>
              <input
                type="checkbox"
                name="roomDescription.windowsAndNaturalLight"
                checked={formData.roomDescription.windowsAndNaturalLight}
                onChange={handleChange}
                className="mr-2"
              />
              Windows and Natural Light
            </label>
          </div>
          <div>
            <label>
              <input
                type="checkbox"
                name="nearbyPublicTransportation"
                checked={formData.nearbyPublicTransportation}
                onChange={handleChange}
                className="mr-2"
              />
              Nearby Public Transportation
            </label>
          </div>

          <div>
            <label htmlFor="flooringType">flooring Type</label>

            <input
              id="flooringType"
              type="text"
              name="roomDescription.flooringType"
              value={formData.roomDescription.flooringType}
              onChange={handleChange}
              placeholder="Flooring Type"
              className="border border-gray-300 rounded-md p-2 w-full"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md"
          >
            Add Listing
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddListing;
