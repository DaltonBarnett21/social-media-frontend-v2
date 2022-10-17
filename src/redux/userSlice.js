import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    id: "",
    email: "",
    username: "",
    firstName: "",
    lastName: "",
    profilePicture: "",
    coverPicture: "",
  },
  reducers: {
    update: (state, action) => {
      state.id = action.payload.id;
      state.email = action.payload.email;
      state.username = action.payload.username;
      state.firstName = action.payload.firstName;
      state.lastName = action.payload.lastName;
      state.profilePicture = action.payload.profilePicture;
      state.coverPicture = action.payload.coverPicture;
    },
  },
});

export const { update } = userSlice.actions;
export default userSlice.reducer;
