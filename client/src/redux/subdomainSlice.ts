import { createAsyncThunk, createSlice, current } from "@reduxjs/toolkit";
import {
  allSubdomains,
  addOneSubdomain,
  deleteOneSubdomain,
  updateOneSubdomain,
} from "../api/subdomain.api";

interface ISubdomainState {
  subdomains: ISubdomain[];
  loading: boolean;
}

const initialState: ISubdomainState = {
  subdomains: [],
  loading: false,
};

export const getSubdomains = createAsyncThunk(
  "subdomains/getSubdomains",
  () => {
    return allSubdomains();
  }
);
export const addSubdomain = createAsyncThunk(
  "subdomains/addSubdomain",
  async (newSubdomain: ISubdomain) => {
    const response = await addOneSubdomain(newSubdomain);
    return response;
  }
);
export const updateSubdomain = createAsyncThunk(
  'subdomains/updateSubdomain',
  async (updateSubdomain: ISubdomain) => {
    const response = await updateOneSubdomain(updateSubdomain);
    return response;
  },
);
export const deleteSubdomain = createAsyncThunk(
  'subdomains/deleteSubdomain',
  async (deleteSubdomain: ISubdomain) => {
    const response = await deleteOneSubdomain(deleteSubdomain);
    return response;
  },
);

export const subdomainSlice = createSlice({
  name: "subdomains",
  initialState,
  extraReducers(builder) {
    builder
      .addCase(getSubdomains.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(getSubdomains.fulfilled, (state, action) => {
        state.loading = false;
        state.subdomains = action.payload;
      })
      .addCase(getSubdomains.rejected, (state, action) => {
        state.loading = false;
      })
      .addCase(addSubdomain.fulfilled, (state, action) => {
        state.subdomains.push(action.payload);
      })
      .addCase(updateSubdomain.fulfilled, (state, action) => {
        state.subdomains = [
          ...state.subdomains.map((subdomain: ISubdomain, i: number) => {
            if (subdomain.id !== action.payload.id) {
              return subdomain;
            } else {
              return action.payload;
            }
          }),
        ];
      })
      .addCase(deleteSubdomain.fulfilled, (state, action) => {
        state.subdomains = [
          ...state.subdomains.filter((subdomain: ISubdomain, i: number) => {
            if (subdomain.id !== action.payload.id) {
              return subdomain;
            }
          }),
        ];
      });
  },
  reducers: {},
});

export default subdomainSlice.reducer;
