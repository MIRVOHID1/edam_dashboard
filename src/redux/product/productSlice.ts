import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

// Mahsulot tipi
interface Product {
  id: string;
  title: string;
  image: string;
  subtitle: string;
  description: string;
  rate: number;
  price: number;
  size: number;
  color: string;
}

// Dastlabki holat tipi
type ProductState = Product[];

const initialState: ProductState = [];

// Mahsulotlarni olish uchun async thunk
export const fetchProducts = createAsyncThunk<Product[]>(
  'product/fetchProducts',
  async () => {
    const response = await axios.get('https://ecommerce-backend-fawn-eight.vercel.app/api/products');
    return response.data;
  }
);

// Yangi mahsulot yaratish uchun async thunk
export const createProduct = createAsyncThunk<Product, Product>(
  'product/createProduct',
  async (newProduct, ThunkAPI) => {
    const token = localStorage.getItem('token');
    if (token) {
      const res = await axios.post(
        'https://ecommerce-backend-fawn-eight.vercel.app/api/products',
        newProduct,
        { headers: { Authorization: token } }
      );
      return res.data;
    }
    throw new Error('No token found');
  }
);

const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchProducts.fulfilled, (state, action: PayloadAction<Product[]>) => {
      return action.payload;
    });
  }
});

export default productSlice.reducer;
