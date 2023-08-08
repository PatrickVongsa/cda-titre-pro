import { createAsyncThunk, createSlice, current } from "@reduxjs/toolkit";
import {
  allDomains,
  addOneDomain,
  deleteOneDomain,
  updateOneDomain,
} from "../api/domain.api";

interface IDomainState {
  domains: IDomain[];
  loading: boolean;
}

const initialState: IDomainState = {
  domains: [],
  loading: false,
};

export const getDomains = createAsyncThunk(
  "domains/getDomains",
  () => {
    return allDomains();
  }
);
export const addDomain = createAsyncThunk(
  "domains/addDomain",
  async (newDomain: IDomain) => {
    const response = await addOneDomain(newDomain);
    return response;
  }
);
export const updateDomain = createAsyncThunk(
  'domains/updateDomain',
  async (updateDomain: IDomain) => {
    const response = await updateOneDomain(updateDomain);
    return response;
  },
);
export const deleteDomain = createAsyncThunk(
  'domains/deleteDomain',
  async (deleteDomain: IDomain) => {
    const response = await deleteOneDomain(deleteDomain);
    return response;
  },
);

export const domainSlice = createSlice({
  name: "domains",
  initialState,
  extraReducers(builder) {
    builder
      .addCase(getDomains.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(getDomains.fulfilled, (state, action) => {
        state.loading = false;
        state.domains = action.payload;
      })
      .addCase(getDomains.rejected, (state, action) => {
        state.loading = false;
      })
      .addCase(addDomain.fulfilled, (state, action) => {
        state.domains.push(action.payload);
      })
      .addCase(updateDomain.fulfilled, (state, action) => {
        state.domains = [
          ...state.domains.map((domain: IDomain, i: number) => {
            if (domain.id !== action.payload.id) {
              return domain;
            } else {
              return action.payload;
            }
          }),
        ];
      })
      .addCase(deleteDomain.fulfilled, (state, action) => {
        state.domains = [
          ...state.domains.filter((domain: IDomain, i: number) => {
            if (domain.id !== action.payload.id) {
              return domain;
            }
          }),
        ];
      });
  },
  reducers: {},
});

export default domainSlice.reducer;
