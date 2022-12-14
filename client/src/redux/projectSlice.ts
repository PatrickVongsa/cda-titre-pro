import { createAsyncThunk, createSlice, current } from "@reduxjs/toolkit";
import {
  allProjects,
  addOneProject,
} from "../api/project.api";

interface IProjectState {
  projects: IProject[];
  loading: boolean;
}

const initialState: IProjectState = {
  projects: [],
  loading: false,
};

export const getProjects = createAsyncThunk(
  "projects/getProjects",
  () => {
    return allProjects();
  }
);
export const addProject = createAsyncThunk(
  "projects/addProject",
  async (newProject: IProject) => {
    const response = await addOneProject(newProject);
    return response;
  }
);

export const projectSlice = createSlice({
  name: "projects",
  initialState,
  extraReducers(builder) {
    builder
      .addCase(getProjects.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(getProjects.fulfilled, (state, action) => {
        state.loading = false;
        state.projects = action.payload;
      })
      .addCase(getProjects.rejected, (state, action) => {
        state.loading = false;
      })
      .addCase(addProject.fulfilled, (state, action) => {
        state.projects.push(action.payload);
      });
  },
  reducers: {
    updateProject: (state, action) => {
      const { index, ...body } = action.payload;
      state.projects = [
        ...state.projects.map((project: IProject, i: number) => {
          if (i !== index) return project;

          return body;
        }),
      ];
    },
    deleteProject: (state, action) => {
      const { index } = action.payload;
      state.projects = [
        ...state.projects.map((project: IProject, i: number) => {
          if (i !== index) return project;
          let projectDeleted = {
            ...project,
            is_archived: true,
          };

          return {
            ...projectDeleted,
            is_archived: true,
          };
        }),
      ];
    },
  },
});

// Action creators are generated for each case reducer function
export const { updateProject, deleteProject } = projectSlice.actions;

export default projectSlice.reducer;
