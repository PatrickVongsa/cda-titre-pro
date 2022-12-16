import { createAsyncThunk, createSlice, current } from '@reduxjs/toolkit';
import { IData, userLogin, userLogout } from '../api/auth.api';

interface IAuthState {
  isLoggedIn: boolean;
  user: IUser | null;
  token: string | null;
}
const localStorageUser = JSON.parse(localStorage.getItem('user') || 'null');
const localStorageToken = JSON.parse(localStorage.getItem('currentUser') || 'null');

const initialState: IAuthState =
  localStorageUser?.firstname && localStorageToken?.token
    ? {
        user: localStorageUser,
        isLoggedIn: true,
        token: localStorageToken.token,
      }
    : {
        user: null,
        isLoggedIn: false,
        token: null,
      };

export const login = createAsyncThunk('auth/login', (data: IData) => {
  return userLogin(data);
});

export const logout = createAsyncThunk('auth/logout', () => {
  userLogout();
  return null;
});

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  extraReducers(builder) {
    builder
      .addCase(login.pending, (state, action) => {
        state.isLoggedIn = false;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoggedIn = true;
        state.user = action.payload.user;
        state.token = action.payload.token;
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoggedIn = false;
      })
      .addCase(logout.fulfilled, (state, action) => {
        state.isLoggedIn = false;
        state.user = action.payload;
      });
  },
  reducers: {},
});

export default authSlice.reducer;
