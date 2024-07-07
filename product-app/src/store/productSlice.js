import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getProductDetails, getProducts, postProduct } from "../api/product";

const initialState = {
  products: [],
  productDetails: {},
  status: "idle",
  error: null,
  detailsStatus: "idle",
  detailsError: null,
};

export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async () => {
    const response = await getProducts()
    return response;
  }
);

// export const addProduct = createAsyncThunk(
//   "products/addProduct",
//   async (productData) => {
//     try {
//       const response = await postProduct(productData)
//       return response;
//     } catch (error) {
//       throw Error(error.response.data.message);
//     }
//   }
// );

export const addProduct = createAsyncThunk(
  'products/addProduct',
  async ({ productData, successCb, errorCb }, { rejectWithValue }) => {
    return postProduct(productData)
      .then(response => {
        if (successCb) successCb(response);
        return response;
      })
      .catch(error => {
        if (errorCb) errorCb(error);
        return rejectWithValue(error.response?.data?.message || error.message);
      });
  }
);

export const fetchProductDetails = createAsyncThunk(
  "products/fetchProductDetails",
  async (productId) => {
    const response = await getProductDetails(productId)
    return response;
  }
);

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.products = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(addProduct.pending, (state) => {
        state.status = "loading";
      })
      .addCase(addProduct.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.products.push(action.payload);
      })
      .addCase(addProduct.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(fetchProductDetails.pending, (state) => {
        state.detailsStatus = "loading";
      })
      .addCase(fetchProductDetails.fulfilled, (state, action) => {
        state.detailsStatus = "succeeded";
        state.productDetails = action.payload;
      })
      .addCase(fetchProductDetails.rejected, (state, action) => {
        state.detailsStatus = "failed";
        state.detailsError = action.error.message;
      });
  },
});

export default productSlice.reducer;
