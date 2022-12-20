import { createAsyncThunk, createSlice, current } from "@reduxjs/toolkit";
import {
  allProspectStatus,
  addOneProspectStatus,
} from "../api/statusProspect.api";

interface IProspectStatusState {
  status: IProspectStatus[];
  loading: boolean;
}

// Define the initial state using that type
const initialState: IProspectStatusState = {
  status: [],
  loading: false,
};

export const getProspectStatus = createAsyncThunk(
  "prospectStatus/getProspectStatus",
  () => {
    return allProspectStatus();
  }
);
export const addProspectStatus = createAsyncThunk(
  "prospectStatus/addProspectStatus",
  async (newProspectStatus: IProspectStatus) => {
    const response = await addOneProspectStatus(newProspectStatus);
    return response;
  }
);

export const prospectStatusSlice = createSlice({
  name: "prospectStatus",
  initialState,
  extraReducers(builder) {
    builder
      .addCase(getProspectStatus.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(getProspectStatus.fulfilled, (state, action) => {
        state.loading = false;
        state.status = action.payload;
      })
      .addCase(getProspectStatus.rejected, (state, action) => {
        state.loading = false;
      })
      .addCase(addProspectStatus.fulfilled, (state, action) => {
        state.status.push(action.payload);
      });
  },
  reducers: {
    updateStatus: (state, action) => {
      const { index, ...body } = action.payload;
      state.status = [
        ...state.status.map((statusProspect: IProspectStatus, i: number) => {
          if (i !== index) return statusProspect;

          return body;
        }),
      ];
    },
    deleteStatus: (state, action) => {
      const { index } = action.payload;
      state.status = [
        ...state.status.map((statusProspect: IProspectStatus, i: number) => {
          if (i !== index) return statusProspect;
          let statusDeleted = {
            ...statusProspect,
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
export const { updateStatus, deleteStatus } = prospectStatusSlice.actions;

export default prospectStatusSlice.reducer;