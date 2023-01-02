import { createAsyncThunk, createSlice, current } from "@reduxjs/toolkit";
import {
  allDaysOffStatus,
  addOneDaysOffStatus,
} from "../api/statusDaysOff.api";

interface IDaysOffStatusState {
  daysOffStatus: IDaysOffStatus[];
  loading: boolean;
}

const initialState: IDaysOffStatusState = {
  daysOffStatus: [],
  loading: false,
};

export const getDaysOffStatus = createAsyncThunk(
  "daysOffStatus/getDaysOffStatus",
  () => {
    return allDaysOffStatus();
  }
);
export const addDaysOffStatus = createAsyncThunk(
  "daysOffStatus/addDaysOffStatus",
  async (newDaysOffStatus: IDaysOffStatus) => {
    const response = await addOneDaysOffStatus(newDaysOffStatus);
    return response;
  }
);

export const daysOffStatusSlice = createSlice({
  name: "daysOffStatus",
  initialState,
  extraReducers(builder) {
    builder
      .addCase(getDaysOffStatus.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(getDaysOffStatus.fulfilled, (state, action) => {
        state.loading = false;
        state.daysOffStatus = action.payload;
      })
      .addCase(getDaysOffStatus.rejected, (state, action) => {
        state.loading = false;
      })
      .addCase(addDaysOffStatus.fulfilled, (state, action) => {
        state.daysOffStatus.push(action.payload);
      });
  },
  reducers: {
    updateStatus: (state, action) => {
      const { index, ...body } = action.payload;
      state.daysOffStatus = [
        ...state.daysOffStatus.map((statusProject: IProjectStatus, i: number) => {
          if (i !== index) return statusProject;

          return body;
        }),
      ];
    },
    deleteStatus: (state, action) => {
      const { index } = action.payload;
      state.daysOffStatus = [
        ...state.daysOffStatus.map((statusProject: IProjectStatus, i: number) => {
          if (i !== index) return statusProject;
          let statusDeleted = {
            ...statusProject,
            is_archived: true,
          };

          return {
            ...statusDeleted,
            is_archived: true,
          };
        }),
      ];
    },
  },
});

// Action creators are generated for each case reducer function
export const { updateStatus, deleteStatus } = daysOffStatusSlice.actions;

export default daysOffStatusSlice.reducer;
