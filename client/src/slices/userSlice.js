import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  isEditing: false,
};
export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser(state, action) {
      state.user = action.payload;
      console.log("after signin", state.user);
    },
    setEditing(state, action) {
      console.log(action.payload);
      state.isEditing = action.payload;
    },
  },
});

export const { setUser, setEditing } = userSlice.actions;
export default userSlice.reducer;
