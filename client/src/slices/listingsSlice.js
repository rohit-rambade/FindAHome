// src/redux/listingsSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  listings: [],
};

const listingsSlice = createSlice({
  name: "listings",
  initialState,
  reducers: {
    setListings: (state, action) => {
      state.listings = action.payload;
    },
  },
});

export const { setListings } = listingsSlice.actions;

export default listingsSlice.reducer;
