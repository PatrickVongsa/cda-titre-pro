import { createAsyncThunk, createSlice, current } from '@reduxjs/toolkit';
import {
  allProspects,
  addOneProspect,
  updateOneProspect,
  archiveOneProspect,
  deleteOneProspect,
} from '../api/prospect.api';

interface IProspectState {
  prospects: IProspect[];
  loading: boolean;
}

const initialState: IProspectState = {
  prospects: [],
  loading: false,
};

export const getProspects = createAsyncThunk('prospects/getProspects', () => {
  return allProspects();
});
export const addProspect = createAsyncThunk(
  'prospects/addProspect',
  async (newProspect: IProspect) => {
    const response = await addOneProspect(newProspect);
    return response;
  },
);
export const updateProspect = createAsyncThunk(
  'prospects/updateProspect',
  async (updateProspect: IProspect) => {
    const response = await updateOneProspect(updateProspect);
    return response;
  },
);
export const archiveProspect = createAsyncThunk(
  'prospects/archiveProspect',
  async (archiveProspect: IProspect) => {
    const response = await archiveOneProspect(archiveProspect);
    return response;
  },
);
export const deleteProspect = createAsyncThunk(
  'prospects/deleteProspect',
  async (deleteProspect: IProspect) => {
    const response = await deleteOneProspect(deleteProspect);
    return response;
  },
);

export const prospectSlice = createSlice({
  name: 'prospects',
  initialState,
  extraReducers(builder) {
    builder
      .addCase(getProspects.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(getProspects.fulfilled, (state, action) => {
        state.loading = false;
        state.prospects = action.payload;
      })
      .addCase(getProspects.rejected, (state, action) => {
        state.loading = false;
      })
      .addCase(addProspect.fulfilled, (state, action) => {
        state.prospects.push(action.payload);
      })
      .addCase(updateProspect.fulfilled, (state, action) => {
        state.prospects = [
          ...state.prospects.map((prospect: IProspect, i: number) => {
            if (prospect.id !== action.payload.id) {
              return prospect;
            } else {
              return action.payload;
            }
          }),
        ];
      })
      .addCase(archiveProspect.fulfilled, (state, action) => {
        state.prospects = [
          ...state.prospects.map((prospect: IProspect, i: number) => {
            if (prospect.id !== action.payload.id) {
              return prospect;
            } else {
              return action.payload;
            }
          }),
        ];
      })
      .addCase(deleteProspect.fulfilled, (state, action) => {
        state.prospects = [
          ...state.prospects.filter((prospect: IProspect, i: number) => {
            if (prospect.id !== action.payload.id) {
              return prospect;
            }
          }),
        ];
      })
  },
  reducers: {},
});

export default prospectSlice.reducer;
