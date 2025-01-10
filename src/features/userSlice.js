import { createAsyncThunk } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchUser = createAsyncThunk("user/fetchUser", async () => {
  try {
    const response = await axios.get(
      "https://project-1-backend-delta.vercel.app/users"
    );
    return response.data;
  } catch (error) {
    throw Error(error.response.data.message || error.message);
  }
});

export const createUser = createAsyncThunk(
  "user/createUser",
  async (userDetails) => {
    try {
      const response = await axios.post(
        "https://project-1-backend-delta.vercel.app/users",
        userDetails
      );
      return response.data;
    } catch (error) {
      throw Error(error.response.data.message || error.message);
    }
  }
);

export const updateUser = createAsyncThunk(
  "user/updateUser",
  async ({ userId, updateUserData }) => {
    try {
      const response = await axios.put(
        `https://project-1-backend-delta.vercel.app/users/${userId}`,
        updateUserData
      );
      return response.data;
    } catch (error) {
      throw Error(error.response.data.message || error.message);
    }
  }
);

export const deleteUser = createAsyncThunk(
  "user/deleteUser",
  async (userId) => {
    try {
      const response = await axios.delete(
        `https://project-1-backend-delta.vercel.app/users/${userId}`
      );
      return userId;
    } catch (error) {
      throw Error(error.response.data.message || error.message);
    }
  }
);

export const userSlice = createSlice({
  name: "user",
  initialState: {
    user: {},
    users: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    // fetch Users
    builder.addCase(fetchUser.pending, (state) => {
      state.status = "loading";
    });
    // builder.addCase(fetchUser.fulfilled, (state, action) => {
    //   state.status = "success";
    //   state.user = action.payload;
    // });

    builder.addCase(fetchUser.fulfilled, (state, action) => {
      state.status = "success";
      state.users = action.payload;
      console.log("action paylod", action.payload);
    });
    builder.addCase(fetchUser.rejected, (state, action) => {
      state.status = "error";
      state.error = action.error.message;
    });

    //Create User
    builder.addCase(createUser.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(createUser.fulfilled, (state, action) => {
      state.status = "success";
      state.users.push(action.payload);
    });
    builder.addCase(createUser.rejected, (state, action) => {
      state.status = "error";
      state.error = action.error.message;
    });

    //Update User
    builder.addCase(updateUser.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(updateUser.fulfilled, (state, action) => {
      const index = state.users.findIndex(
        (user) => user._id === action.payload._id
      );
      if (index !== -1) {
        state.users[index] = action.payload;
      }
    });
    builder.addCase(updateUser.rejected, (state, action) => {
      state.status = "error";
      state.error = action.error.message;
    });

    //Delete User
    builder.addCase(deleteUser.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(deleteUser.fulfilled, (state, action) => {
      state.users = state.users.filter((user) => user._id !== action.payload);
    });
    builder.addCase(deleteUser.rejected, (state, action) => {
      state.status = "error";
      state.error = action.error.message;
    });
  },
});

export default userSlice.reducer;
