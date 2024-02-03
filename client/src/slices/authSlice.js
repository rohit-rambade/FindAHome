import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  accessToken: null,
  refreshToken: null,
  isAuthenticated: false,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setTokens(state, action) {
      const { accessToken, refreshToken } = action.payload;
      state.accessToken = accessToken;
      state.refreshToken = refreshToken;
      state.isAuthenticated = true;
    },
    isAuthenticated(state, action) {
      state.isAuthenticated = action.payload;
    },
    resetAuth(state) {
      Object.assign(state, initialState);
    },
  },
});

export const { setTokens, isAuthenticated, resetAuth } = authSlice.actions;
export default authSlice.reducer;
