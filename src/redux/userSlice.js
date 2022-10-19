import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    id: "",
    username: "",
    firstname: "",
    lastname: "",
    profilePicture: "",
    coverPicture: "",
  },
  reducers: {
    update: (state, action) => {
      state.id = action.payload.id;
      state.username = action.payload.username;
      state.firstname = action.payload.firstname;
      state.lastname = action.payload.lastname;
      state.profilePicture = action.payload.profilePicture;
      state.coverPicture = action.payload.coverPicture;
    },
  },
});

export const { update } = userSlice.actions;
export default userSlice.reducer;
