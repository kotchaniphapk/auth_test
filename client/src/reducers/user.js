import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { API_URL } from "../config/defines.js";

const initialState = {
  data: {},
  status: "idle",
  error: "",
};

export const signup = createAsyncThunk(
  "user/signup",
  async ({ name, email, password }) => {
    const url = `${API_URL}/users`;
    const method = "POST";
    const body = JSON.stringify({ name, email, password });
    const headers = new Headers({
      "Content-Type": "application/json",
      accept: "application/json",
    });

    const response = await fetch(url, { method, body, headers });
    if (!response.ok) {
      throw new Error("Could not create user, email already exists");
    }

    const data = await response.json();

    return data;
  }
);

export const login = createAsyncThunk(
  "user/login",
  async ({ email, password }) => {
    const url = `${API_URL}/users/login`;
    const method = "POST";
    const body = JSON.stringify({ email, password });
    const headers = new Headers({
      "Content-Type": "application/json",
      accept: "application/json",
    });

    const response = await fetch(url, { method, body, headers });
    if (!response.ok) {
      throw new Error("email and password are required");
    }
    const data = await response.json();
    return data;
  }
);

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logout: (state) => {
      state.data = {};
    },
  },
  extraReducers: (builder) => {
    // signup
    builder.addCase(signup.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(signup.fulfilled, (state, action) => {
      state.status = "success";
      state.data = action.payload;
    });
    builder.addCase(signup.rejected, (state, action) => {
      state.status = "error";
      state.error = action.error.message;
    });

    // login
    builder.addCase(login.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(login.fulfilled, (state, action) => {
      state.status = "success";
      state.data = { ...action.payload };
    });
    builder.addCase(login.rejected, (state, action) => {
      state.status = "error";
      state.error = action.error.message;
    });
  },
});

export const { logout } = userSlice.actions;

export default userSlice.reducer;
