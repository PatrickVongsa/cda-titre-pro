import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
  allProjectUsers,
  allProjectUsersByProject,
  addOneProjectUser,
  deleteAllUserAndProject,
  deleteUserFromProject,
} from '../api/projectUser.api';

interface IProjectUserState {
  projectUser: IProjectUser[];
  loading: boolean;
}

const initialState: IProjectUserState = {
  projectUser: [],
  loading: false,
};

export const getAllProjectUsers = createAsyncThunk('projectUsers/getAllProjectUsers', () => {
  return allProjectUsers();
});

export const getAllProjectUsersbByProject = createAsyncThunk(
  'projectUsers/getAllProjectUsersbByProject',
  (project: IProject) => {
    return allProjectUsersByProject(project);
  },
);

export const addProjectUser = createAsyncThunk(
  'projectUsers/addProjectUser',
  (assignment: { project: IProject; newUser: IUser }) => {
    const { project, newUser } = assignment;
    return addOneProjectUser(project, newUser);
  },
);
export const deleteOneProjectUser = createAsyncThunk(
  'projectUsers/deleteOneProjectUser',
  (assignment: { project: IProject; newUser: IUser }) => {
    const { project, newUser } = assignment;
    return deleteUserFromProject(project, newUser);
  },
);
export const deleteProjectUser = createAsyncThunk(
  'projectUsers/deleteProjectUser',
  (project: IProject) => {
    return deleteAllUserAndProject(project);
  },
);

export const projectUserSlice = createSlice({
  name: 'projectUser',
  initialState,
  extraReducers(builder) {
    builder
      .addCase(getAllProjectUsers.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(getAllProjectUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.projectUser = action.payload;
      })
      .addCase(getAllProjectUsers.rejected, (state, action) => {
        state.loading = false;
      })
      .addCase(getAllProjectUsersbByProject.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(getAllProjectUsersbByProject.fulfilled, (state, action) => {
        state.loading = false;
        state.projectUser = action.payload;
      })
      .addCase(getAllProjectUsersbByProject.rejected, (state, action) => {
        state.loading = false;
      })
      .addCase(addProjectUser.fulfilled, (state, action) => {
        state.projectUser.push(action.payload);
      })
      .addCase(deleteOneProjectUser.fulfilled, (state, action) => {
        console.log(action.payload);
        state.projectUser = [
          ...state.projectUser.filter((projectUser: IProjectUser, i: number) => {
            if (projectUser.user_id != action.payload.user_id) {
              return projectUser;
            }
          }),
        ];
      })
      .addCase(deleteProjectUser.fulfilled, (state, action) => {
        state.projectUser = [];
      });
  },
  reducers: {},
});

export default projectUserSlice.reducer;
