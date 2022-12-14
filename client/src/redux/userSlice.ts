import { createAsyncThunk, createSlice, current } from '@reduxjs/toolkit';
import { allUsers, addOneUser, updateOneUser, archiveOneUser, deleteOneUser } from '../api/user.api';

interface IUserState {
  users: IUser[];
  loading: boolean;
}

const initialState: IUserState = {
  users: [],
  loading: false,
};

export const getUsers = createAsyncThunk('users/getUsers', () => {
  return allUsers();
});

export const addUser = createAsyncThunk('users/addUser', async (newUser: IUser) => {
  const response = await addOneUser(newUser);
  return response;
});

export const updateUser = createAsyncThunk('users/updateUser', async (updateUser: IUser) => {
  const response = await updateOneUser(updateUser);
  return response;
});

export const archiveUser = createAsyncThunk(
  'users/archiveUser',
  async (archiveUser: IUser) => {
    const response = await archiveOneUser(archiveUser);
    return response;
  },
);

export const deleteUser = createAsyncThunk(
  'users/deleteUser',
  async (deleteUser: IUser) => {
    const response = await deleteOneUser(deleteUser);
    return response;
  },
);

export const userSlice = createSlice({
  name: 'users',
  initialState,
  extraReducers(builder) {
    builder
      .addCase(getUsers.pending, (state, _) => {
        state.loading = true;
      })
      .addCase(getUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload;
      })
      .addCase(getUsers.rejected, (state, _) => {
        state.loading = false;
      })
      .addCase(addUser.fulfilled, (state, action) => {
        state.users.push(action.payload);
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.users = [
          ...state.users.map((users: IUser, i: number) => {
            if (users.id !== action.payload.id) {
              return users;
            } else {
              return action.payload;
            }
          }),
        ];
      })
      .addCase(archiveUser.fulfilled, (state, action) => {
        state.users = [
          ...state.users.map((user: IUser, i: number) => {
            if (user.id !== action.payload.id) {
              return user;
            } else {
              return action.payload;
            }
          }),
        ];
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.users = [
          ...state.users.filter((user: IUser, i: number) => {
            if (user.id !== action.payload.id) {
              return user;
            }
          }),
        ];
      })
  },
  reducers: {},
});

export default userSlice.reducer;
