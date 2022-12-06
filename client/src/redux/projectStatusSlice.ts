import { createAsyncThunk, createSlice, current } from "@reduxjs/toolkit";
import {
  allProjectStatus,
  addOneProjectStatus,
} from "../api/statusProject.api";

interface IProjectStatusState {
  status: IProjectStatus[];
  loading: boolean;
}

const initialState: IProjectStatusState = {
  status: [],
  loading: false,
};

export const getProjectStatus = createAsyncThunk(
  "projectStatus/getProjectStatus",
  () => {
    return allProjectStatus();
  }
);
export const addProjectStatus = createAsyncThunk(
  "projectStatus/addProjectStatus",
  async (newProjectStatus: IProjectStatus) => {
    const response = await addOneProjectStatus(newProjectStatus);
    return response;
  }
);

export const projectStatusSlice = createSlice({
  name: "projectStatus",
  initialState,
  extraReducers(builder) {
    builder
      .addCase(getProjectStatus.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(getProjectStatus.fulfilled, (state, action) => {
        state.loading = false;
        state.status = action.payload;
      })
      .addCase(getProjectStatus.rejected, (state, action) => {
        state.loading = false;
      })
      .addCase(addProjectStatus.fulfilled, (state, action) => {
        console.log(action.payload)
        state.status.push(action.payload);
        console.log(current(state))
      });
  },
  reducers: {
    updateStatus: (state, action) => {
      const { index, ...body } = action.payload;
      state.status = [
        ...state.status.map((statusProject: IProjectStatus, i: number) => {
          if (i !== index) return statusProject;

          return body;
        }),
      ];
    },
    deleteStatus: (state, action) => {
      const { index } = action.payload;
      state.status = [
        ...state.status.map((statusProject: IProjectStatus, i: number) => {
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
export const { updateStatus, deleteStatus } = projectStatusSlice.actions;

export default projectStatusSlice.reducer;
