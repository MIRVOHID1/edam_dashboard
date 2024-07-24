import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

interface Category {
  id: string;
  name: string;
}

interface CategoryState {
  isLoading: boolean;
  value: Category[];
  error: string | null;
}

const initialState: CategoryState = {
  isLoading: false,
  value: [],
  error: null
};

export const fetchCategories = createAsyncThunk<Category[]>(
  'category/fetchCategories',
  async () => {
    const response = await axios.get('https://ecommerce-backend-fawn-eight.vercel.app/api/categories');
    return response.data;
  }
);

export const createCategory = createAsyncThunk<Category, Category>(
  'category/createCategory',
  async (newCategory, { dispatch, getState }) => {
    const token = localStorage.getItem('token');
    if (token) {
      const res = await axios.post('https://ecommerce-backend-fawn-eight.vercel.app/api/categories', newCategory, {
        headers: {
          Authorization: token
        }
      });
      dispatch(fetchCategories());
      return res.data;
    }
    throw new Error('No token found');
  }
);

const categorySlice = createSlice({
  name: 'category',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategories.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Failed to fetch categories';
      })
      .addCase(fetchCategories.fulfilled, (state, action: PayloadAction<Category[]>) => {
        state.isLoading = false;
        state.value = action.payload;
      })
      .addCase(createCategory.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createCategory.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Failed to create category';
      })
      .addCase(createCategory.fulfilled, (state, action: PayloadAction<Category>) => {
        state.isLoading = false;
        state.value.push(action.payload);
      });
  }
});

export default categorySlice.reducer;
