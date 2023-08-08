import { Draft, PayloadAction, createAsyncThunk, createSlice, current } from '@reduxjs/toolkit';
import { IData, userLogin, userLogout } from '../api/auth.api';

interface IAuthState {
  isLoggedIn: boolean;
  user: IUser | null;
  token: string | null;
}

const localStorageUser = localStorage.getItem('user');
const localStorageToken = localStorage.getItem('currentUser');

let isLoggedIn = false;
let user: IUser | null = null;
let token: string | null = null;

if (localStorageUser && localStorageToken) {
  try {
    const parsedUser = JSON.parse(localStorageUser);
    if (typeof parsedUser === 'object') {
      user = parsedUser;
      isLoggedIn = Boolean(user && localStorageToken);
    }
    token = localStorageToken;
  } catch (error) {
    // Gérer le cas où la chaîne JSON est incorrecte, par exemple, attribuer des valeurs par défaut
    user = null;
    isLoggedIn = false;
    token = null;
  }
} else if (localStorageUser && !localStorageToken) {
  try {
    const parsedUser = JSON.parse(localStorageUser);
    if (typeof parsedUser === 'object') {
      user = parsedUser;
      isLoggedIn = Boolean(localStorageUser);
    }
  } catch (error) {
    // Gérer le cas où la chaîne JSON est incorrecte, par exemple, attribuer des valeurs par défaut
    user = null;
    isLoggedIn = false;
    token = null;
  }
}

const initialState: IAuthState = {
  user,
  isLoggedIn,
  token,
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
  reducers: {
    setUser: (state: Draft<IAuthState>, action: PayloadAction<IUser | null>) => {
      state.user = action.payload;
    },
    setIsLoggedIn: (state: Draft<IAuthState>, action: PayloadAction<boolean>) => {
      state.isLoggedIn = action.payload;
    },
    setToken: (state: Draft<IAuthState>, action: PayloadAction<string | null>) => {
      state.token = action.payload;
    },
  },
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
});

export const { setUser, setIsLoggedIn, setToken } = authSlice.actions;

export default authSlice.reducer;
