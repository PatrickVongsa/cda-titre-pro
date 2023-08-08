import { createAsyncThunk, createSlice, current } from "@reduxjs/toolkit";
import {
  allServers,
  addOneServer,
  deleteOneServer,
  updateOneServer,
} from "../api/server.api";

interface IServerState {
  servers: IServer[];
  loading: boolean;
}

const initialState: IServerState = {
  servers: [],
  loading: false,
};

export const getServers = createAsyncThunk(
  "servers/getServers",
  () => {
    return allServers();
  }
);
export const addServer = createAsyncThunk(
  "servers/addServer",
  async (newServer: IServer) => {
    const response = await addOneServer(newServer);
    return response;
  }
);
export const updateServer = createAsyncThunk(
  'servers/updateServer',
  async (updateServer: IServer) => {
    const response = await updateOneServer(updateServer);
    return response;
  },
);
export const deleteServer = createAsyncThunk(
  'servers/deleteServer',
  async (deleteServer: IServer) => {
    const response = await deleteOneServer(deleteServer);
    return response;
  },
);

export const serverSlice = createSlice({
  name: "servers",
  initialState,
  extraReducers(builder) {
    builder
      .addCase(getServers.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(getServers.fulfilled, (state, action) => {
        state.loading = false;
        state.servers = action.payload;
      })
      .addCase(getServers.rejected, (state, action) => {
        state.loading = false;
      })
      .addCase(addServer.fulfilled, (state, action) => {
        state.servers.push(action.payload);
      })
      .addCase(updateServer.fulfilled, (state, action) => {
        state.servers = [
          ...state.servers.map((server: IServer, i: number) => {
            if (server.id !== action.payload.id) {
              return server;
            } else {
              return action.payload;
            }
          }),
        ];
      })
      .addCase(deleteServer.fulfilled, (state, action) => {
        state.servers = [
          ...state.servers.filter((server: IServer, i: number) => {
            if (server.id !== action.payload.id) {
              return server;
            }
          }),
        ];
      });
  },
  reducers: {},
});

export default serverSlice.reducer;
