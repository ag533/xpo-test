import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { fetchBrands } from "../services/api";

export const getBrands = createAsyncThunk("brands/getBrands", async () => {
  return await fetchBrands();
});


interface Exhibitor {
  ExhibitorID: string;
  company: string;
  name: string;
  position: string;
  profile_picture: string;
}

interface Brand {
  BrandID: string;
  brand_name: string;
  description: string;
  exhibitor: Exhibitor;
  exhibitor_id: string;
  hall: string;
  image_url: string;
  location: string;
  product_tag: string;
  stand_number: string;
}

interface BrandState {
  brands: Brand[];
  loading: boolean;
  error: string | null;
}

const initialState: BrandState = {
  brands: [],
  loading: false,
  error: null,
};

const brandSlice = createSlice({
  name: "brands",
  initialState,
  reducers: {
    setBrands: (state, action: PayloadAction<Brand[]>) => {
      state.brands = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getBrands.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getBrands.fulfilled, (state, action) => {
      state.brands = action.payload;
      state.loading = false;
    });
    builder.addCase(getBrands.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message ?? null;
    });
  },
});

export const { setBrands } = brandSlice.actions;
export default brandSlice.reducer;