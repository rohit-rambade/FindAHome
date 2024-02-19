import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  listing: null,
};

export const landlordSlice = createSlice({
  name: "landlord",
  initialState,
  reducers: {
    addListing(state, action) {},
  },
});

export const { addListing } = landlordSlice.actions;

export default landlordSlice.reducer;
