import { createAsyncThunk, createSlice, current } from '@reduxjs/toolkit';
import { allDaysOffs, addOneDaysOff, updateOneDaysOff, deleteOneDaysOff } from '../api/daysOff.api';

interface IDaysOffState {
  daysOff: IDaysOff[];
  loading: boolean;
}

const initialState: IDaysOffState = {
  daysOff: [],
  loading: false,
};

export const getDaysOffs = createAsyncThunk('daysOff/getProjects', () => {
  return allDaysOffs();
});
export const addDaysOff = createAsyncThunk('daysOff/addDaysOff', async (newDaysOff: IDaysOff) => {
  const response = await addOneDaysOff(newDaysOff);
  return response;
});
export const updateDaysOff = createAsyncThunk(
  'daysOff/updateDaysOff',
  async (updateDaysOff: IDaysOff) => {
    const response = await updateOneDaysOff(updateDaysOff);
    return response;
  },
);
export const deleteDaysOff = createAsyncThunk(
  'daysOff/deleteDaysOff',
  async (deleteDaysOff: IDaysOff) => {
    const response = await deleteOneDaysOff(deleteDaysOff);
    return response;
  },
);

export const daysOffSlice = createSlice({
  name: 'projects',
  initialState,
  extraReducers(builder) {
    builder
      .addCase(getDaysOffs.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(getDaysOffs.fulfilled, (state, action) => {
        state.loading = false;
        state.daysOff = action.payload;
      })
      .addCase(getDaysOffs.rejected, (state, action) => {
        state.loading = false;
      })
      .addCase(addDaysOff.fulfilled, (state, action) => {
        state.daysOff.push(action.payload);
      })
      .addCase(updateDaysOff.fulfilled, (state, action) => {
        state.daysOff = [
          ...state.daysOff.map((doff: IDaysOff, i: number) => {
            if (doff.id !== action.payload.id) {
              return doff;
            } else {
              return action.payload;
            }
          }),
        ];
      })
      .addCase(deleteDaysOff.fulfilled, (state, action) => {
        state.daysOff = [
          ...state.daysOff.filter((doff: IDaysOff, i: number) => {
            if (doff.id !== action.payload.id) {
              return doff;
            }
          }),
        ];
      });
  },
  reducers: {},
});

export default daysOffSlice.reducer;
