import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  listing: null,
};

export const landlordSlice = createSlice({
  name: "landlord",
  initialState,
  reducers: {
    addListingSuccess(state, action) {
      state.listing = action.payload; // Update the listing state with the newly added listing
    },
    addListingFailure(state, action) {
      // Handle failure or error state if needed
      console.error("Error adding listing:", action.payload);
    },
  },
});

export const { addListingSuccess, addListingFailure } = landlordSlice.actions;

// Async action creator using Redux Thunk and Axios
export const addListing = (formData, token) => async (dispatch) => {
  console.log(formData);
  try {
    const response = await axios.post(
      "/api/landlord/create-listing",
      formData,
      {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      }
    );
    console.log(response);

    dispatch(addListingSuccess(response.data)); // Dispatch success action with data from API response
  } catch (error) {
    console.error("There was a problem adding the listing:", error);
    dispatch(addListingFailure(error.message)); // Dispatch failure action with error message
  }
};

export default landlordSlice.reducer;
