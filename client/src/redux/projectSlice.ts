import { createAsyncThunk, createSlice, current } from "@reduxjs/toolkit";
import {
  allProjects,
  addOneProject,
  deleteOneProject,
  updateOneProject,
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
export const updateProject = createAsyncThunk(
  'projects/updateProject',
  async (updateProject: IProject) => {
    const response = await updateOneProject(updateProject);
    return response;
  },
);
export const deleteProject = createAsyncThunk(
  'projects/deleteProject',
  async (deleteProject: IProject) => {
    const response = await deleteOneProject(deleteProject);
    return response;
  },
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
      })
      .addCase(updateProject.fulfilled, (state, action) => {
        state.projects = [
          ...state.projects.map((project: IProject, i: number) => {
            if (project.id !== action.payload.id) {
              return project;
            } else {
              return action.payload;
            }
          }),
        ];
      })
      .addCase(deleteProject.fulfilled, (state, action) => {
        state.projects = [
          ...state.projects.filter((project: IProject, i: number) => {
            if (project.id !== action.payload.id) {
              return project;
            }
          }),
        ];
      });
  },
  reducers: {},
});

export default projectSlice.reducer;
