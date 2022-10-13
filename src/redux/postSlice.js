import { createSlice } from "@reduxjs/toolkit";

export const postSlice = createSlice({
  name: "post",
  initialState: {
    desc: "",
    img: "",
  },
  reducers: {
    update: (state, action) => {
      state.desc = action.payload.desc;
      state.img = action.payload.img;
    },
  },
});

export const { update } = postSlice.actions;

export default postSlice.reducer;
