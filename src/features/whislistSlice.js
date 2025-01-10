import { createAsyncThunk } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchWhislist = createAsyncThunk(
  "whislist/fetchWhislist",
  async () => {
    try {
      const response = await axios.get(
        `https://project-1-backend-delta.vercel.app/whishlist/673f106d0f4e41c67c09d00d`
      );
      // console.log("Response Data: ", response);
      return response.data;
    } catch (error) {
      throw Error(error.response.data.message || error.message);
    }
  }
);

export const addToWhislist = createAsyncThunk(
  "whislist/addToWhislist",
  async (product) => {
    // console.log("Product: ", product);
    try {
      const response = await axios.post(
        `https://project-1-backend-delta.vercel.app/whishlist/673f106d0f4e41c67c09d00d/products`,
        { productId: product._id }
      );
      //console.log("Response Data: ", response);
      return response.data;
    } catch (error) {
      throw Error(error.response.data.message || error.message);
    }
  }
);

export const removeFromWhislist = createAsyncThunk(
  "whislist/removeFromWhislist",
  async (productId) => {
    try {
      //console.log(productId);
      const response = await axios.delete(
        `https://project-1-backend-delta.vercel.app/whishlist/673f106d0f4e41c67c09d00d/products/${productId}`
      );
      // console.log("Response Data: ", response);
      // console.log("Product id", pro);
      return productId;
    } catch (error) {
      throw Error(error.response.data.message || error.message);
    }
  }
);

export const addToCartFromWhishlist = createAsyncThunk(
  "whislist/addToCartFromWhishlist",
  async (productId) => {
    try {
      const response = await axios.post(
        `https://project-1-backend-delta.vercel.app/whishlist/673f106d0f4e41c67c09d00d/products/${productId}/addToCart`
      );
      return response.data;
    } catch (error) {
      throw Error(error.response.data.message || error.message);
    }
  }
);

export const whislistSlice = createSlice({
  name: "whislist",
  initialState: {
    whislist: {
      items: [],
    },
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchWhislist.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(fetchWhislist.fulfilled, (state, action) => {
      state.status = "success";
      state.whislist.items = action.payload.products;
      //console.log("action paylod", state.whislist.items);
    });
    builder.addCase(fetchWhislist.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
    });
    builder.addCase(addToWhislist.fulfilled, (state, action) => {
      //console.log("Action", action);
      //console.log("State ", state.whislist.items);
      state.whislist.items = [
        ...state.whislist.items,
        { productId: action.meta.arg, _id: action.meta.arg._id },
      ];
    });

    builder.addCase(removeFromWhislist.fulfilled, (state, action) => {
      //console.log("payloadd", action);
      state.whislist.items = state.whislist.items.filter(
        (item) => item.productId._id !== action.meta.arg
      );
    });

    builder.addCase(addToCartFromWhishlist.fulfilled, (state, action) => {
      state.whislist.items = state.whislist.items.filter(
        (item) => item.productId._id !== action.meta.arg
      );
    });
  },
});

export default whislistSlice.reducer;
