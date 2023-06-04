"use client";

import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    loading: false,
    data: null,
    error: null,
  },
  reducers: {
    setLoading(state, action) {
      state.loading = action.payload;
    },
    setData(state, action) {
      state.data = action.payload;
    },
    setError(state, action) {
      state.error = action.payload;
    },
  },
});

export const authActions = authSlice.actions;
export const authReducer = authSlice.reducer;
