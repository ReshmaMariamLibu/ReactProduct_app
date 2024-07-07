import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getCategory, postCategory } from '../api/category';

const initialState = {
  categories: [],
  status: 'idle',
  error: null
};

export const fetchCategories = createAsyncThunk(
  'categories/fetchCategories',
  async () => {
    const response = await getCategory()
    return response;
  }
);

// export const addcategory = createAsyncThunk(
//   "category/addcategory",
//   async (Data) => {
//     try {
//       const response = await postCategory(Data)
//       return response;
//     } catch (error) {
//       throw Error(error.response.data.message);
//     }
//   }
// );

export const addCategory = createAsyncThunk(
  "category/addcategory",
  async ({Data, successCb, errorCb }, { rejectWithValue }) => {
    return postCategory(Data)
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

const categorySlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategories.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.categories = action.payload;
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(addCategory.pending, (state) => {
        state.status = "loading";
      })
      .addCase(addCategory.fulfilled, (state,action) => {
        state.status = "succeeded";
        state.categories.push(action.payload);
      })
      .addCase(addCategory.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
  }
});

export default categorySlice.reducer;
