import { createSlice } from "@reduxjs/toolkit";

const loadingSlice = createSlice({
  name: "loading",
  initialState: {
    isloading: false,
    iserror: false,
    issuccess: false,
  },
  reducers: {
    setLoading: (state) => {
      state.loading = true;
    },
    setError: (state) => {
      state.error = true;
    },
    setSuccess: (state) => {
      state.success = true;
    },
  },
});

export const { setLoading, setError, setSuccess } = loadingSlice.actions;

export default loadingSlice.reducer;
