import { createAsyncThunk, createSlice, current } from "@reduxjs/toolkit";
import {
  allProjectType,
  addOneProjectType,
} from "../api/typeProject.api";

interface IProjectTypeState {
  type: IProjectType[];
  loading: boolean;
}

const initialState: IProjectTypeState = {
  type: [],
  loading: false,
};

export const getProjectType = createAsyncThunk(
  "projectType/getProjectType",
  () => {
    return allProjectType();
  }
);
export const addProjectType = createAsyncThunk(
  "projectType/addProjectType",
  async (newProjectType: IProjectType) => {
    const response = await addOneProjectType(newProjectType);
    return response;
  }
);

export const projectTypeSlice = createSlice({
  name: "projectType",
  initialState,
  extraReducers(builder) {
    builder
      .addCase(getProjectType.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(getProjectType.fulfilled, (state, action) => {
        state.loading = false;
        state.type = action.payload;
      })
      .addCase(getProjectType.rejected, (state, action) => {
        state.loading = false;
      })
      .addCase(addProjectType.fulfilled, (state, action) => {
        console.log(action.payload)
        state.type.push(action.payload);
        console.log(current(state))
      });
  },
  reducers: {
    updateType: (state, action) => {
      const { index, ...body } = action.payload;
      state.type = [
        ...state.type.map((typeProject: IProjectType, i: number) => {
          if (i !== index) return typeProject;

          return body;
        }),
      ];
    },
    deleteType: (state, action) => {
      const { index } = action.payload;
      state.type = [
        ...state.type.map((typeProject: IProjectType, i: number) => {
          if (i !== index) return typeProject;
          let typeDeleted = {
            ...typeProject,
            is_archived: true,
          };

          return {
            ...typeDeleted,
            is_archived: true,
          };
        }),
      ];
    },
  },
});

// Action creators are generated for each case reducer function
export const { updateType, deleteType } = projectTypeSlice.actions;

export default projectTypeSlice.reducer;
