import { createAsyncThunk } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchCart = createAsyncThunk("cart/fetchCart", async () => {
  try {
    const response = await axios.get(
      `https://project-1-backend-delta.vercel.app/carts/673f106d0f4e41c67c09d00d`
    );
    return response.data;
  } catch (error) {
    throw Error(error.response.data.message || error.message);
  }
});

export const addToCart = createAsyncThunk("cart/addToCart", async (product) => {
  const response = await axios.post(
    `https://project-1-backend-delta.vercel.app/carts/673f106d0f4e41c67c09d00d/products`,
    {
      productId: product._id,
      quantity: 1,
    }
  );
  return response.data;
});

export const removeFromCart = createAsyncThunk(
  "cart/removeFromCart",
  async (productId) => {
    try {
      const response = await axios.delete(
        `https://project-1-backend-delta.vercel.app/carts/673f106d0f4e41c67c09d00d/products/${productId}`
      );

      return response.data;
    } catch (error) {
      throw Error(error.response.data.message || error.message);
    }
  }
);

export const moveToWishlistFrmCart = createAsyncThunk(
  "cart/moveToWishlistFrmCart",
  async (productId) => {
    try {
      const response = await axios.post(
        `https://project-1-backend-delta.vercel.app/carts/673f106d0f4e41c67c09d00d/products/${productId}/moveToWishlist`
      );
      return response.data;
    } catch (error) {
      throw Error(error.response.data.message || error.message);
    }
  }
);

export const itemQunatityIncrementInCart = createAsyncThunk(
  "cart/itemQunatityIncrementInCart",
  async (productId) => {
    console.log("productId", productId);
    try {
      const response = await axios.post(
        `https://project-1-backend-delta.vercel.app/carts/673f106d0f4e41c67c09d00d/products/${productId}/increaseItem`
      );
      return response.data;
    } catch (error) {
      throw Error(error.response.data.message || error.message);
    }
  }
);

export const itemQunatityDecrementInCart = createAsyncThunk(
  "cart/itemQunatityDecrementInCart",
  async (productId) => {
    try {
      const response = await axios.post(
        `https://project-1-backend-delta.vercel.app/carts/673f106d0f4e41c67c09d00d/products/${productId}/decreaseItem`
      );
      return response.data;
    } catch (error) {
      throw Error(error.response.data.message || error.message);
    }
  }
);
export const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cartItems: {
      items: [],
    },
    totalQuantity: 0,
    status: "idle",
    error: null,
  },

  reducers: {
    clearCart: (state) => {
      state.items = [];
      state.totalQuantity = 0;
    },
  },

  extraReducers: (builder) => {
    builder.addCase(fetchCart.pending, (state) => {
      state.status = "loading...";
    });
    builder.addCase(fetchCart.fulfilled, (state, action) => {
      state.status = "success";
      state.cartItems.items = action.payload.products;
      // console.log("Fetched cart items:", state.cartItems.items);
    });
    builder.addCase(fetchCart.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
    });

    builder.addCase(addToCart.fulfilled, (state, action) => {
      // state.cartItems.push(action.payload);
      // console.log("Add to cart: ", state);
      //console.log("Action", action);
      const item = state.cartItems.items.find(
        (item) => item.productId._id === action.meta.arg._id
      );
      if (item && item.quantity) {
        state.cartItems.items = [...state.cartItems.items];
      } else {
        const newItem = {
          productId: action.meta.arg,
          quantity: 1,
          _id: action.meta.arg._id,
        };

        // state.cartItems.items = [...action.payload.products];
        //console.log("New Item: ", newItem);
        state.cartItems.items = [newItem, ...state.cartItems.items];
      }
      //console.log("Add to cart: ", state.cartItems.items);
    });

    builder.addCase(removeFromCart.fulfilled, (state, action) => {
      //console.log("Cart Items", action);
      state.cartItems.items = state.cartItems.items.filter(
        (item) => item.productId._id !== action.meta.arg
      );
    });

    builder.addCase(moveToWishlistFrmCart.fulfilled, (state, action) => {
      state.cartItems.items = state.cartItems.items.filter(
        (item) => item.productId._id !== action.meta.arg
      );
    });

    builder.addCase(itemQunatityIncrementInCart.fulfilled, (state, action) => {
      console.log("State: ", state);
      console.log("acton: ", action);
      const product = state.cartItems.items.find(
        (item) => item.productId._id === action.meta.arg
      );
      console.log("Quantiy Check: ", state.cartItems.items);
      if (product) {
        product.quantity += 1;
        state.totalQuantity += 1;
      }
    });

    builder.addCase(itemQunatityDecrementInCart.fulfilled, (state, action) => {
      const product = state.cartItems.items.find(
        (item) => item.productId._id === action.meta.arg
      );
      if (product) {
        if (product.quantity > 1) {
          product.quantity -= 1;
          state.totalQuantity -= 1;
        } else {
          state.cartItems.items = state.cartItems.items.filter(
            (item) => item.productId._id !== action.meta.arg
          );
          state.totalQuantity -= 1;
        }
      }
    });
  },
});

export const { clearCart } = cartSlice.actions;

export default cartSlice.reducer;
