import { createAsyncThunk, createSlice, current } from '@reduxjs/toolkit';
import { allUsers, addOneUser } from '../api/user.api';

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
        console.log(action.payload);
        state.users.push(action.payload);
        console.log(current(state));
      });
  },
  reducers: {
    updateUser: (state, action) => {
      const { index, ...body } = action.payload;
      state.users = [
        ...state.users.map((user: IUser, i: number) => {
          if (i !== index) return user;

          return body;
        }),
      ];
    },
    deleteUser: (state, action) => {
      const { index } = action.payload;
      state.users = [
        ...state.users.map((user: IUser, i: number) => {
          if (i !== index) return user;
          let userDeleted = {
            ...user,
            is_archived: true,
          };

          return {
            ...userDeleted,
            is_archived: true,
          };
        }),
      ];
    },
  },
});

// Action creators are generated for each case reducer function
export const { updateUser, deleteUser } = userSlice.actions;

export default userSlice.reducer;
