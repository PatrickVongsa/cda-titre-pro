import { createAsyncThunk, createSlice, current } from '@reduxjs/toolkit';
import { addOneHost, allHosts } from '../api/host.api';

interface IHostState {
  hosts: IHost[];
  loading: boolean;
}

const initialState: IHostState = {
  hosts: [],
  loading: false,
};

export const getHosts = createAsyncThunk('hosts/getHosts', () => {
  return allHosts();
});

export const addHost = createAsyncThunk('hosts/addHost', async (newHost: IHost) => {
  const response = await addOneHost(newHost);
  return response;
});

export const hostSlice = createSlice({
    name: "hosts",
    initialState,
    extraReducers(builder) {
      builder
        .addCase(getHosts.pending, (state, action) => {
          state.loading = true;
        })
        .addCase(getHosts.fulfilled, (state, action) => {
          state.loading = false;
          state.hosts = action.payload;
        })
        .addCase(getHosts.rejected, (state, action) => {
          state.loading = false;
        })
        .addCase(addHost.fulfilled, (state, action) => {
          state.hosts.push(action.payload);
        });
    },
    reducers: {
      updateHost: (state, action) => {
        const { index, ...body } = action.payload;
        state.hosts = [
          ...state.hosts.map((host: IHost, i: number) => {
            if (i !== index) return host;
  
            return body;
          }),
        ];
      },
      deleteHost: (state, action) => {
        const { index } = action.payload;
        state.hosts = [
          ...state.hosts.map((host: IHost, i: number) => {
            if (i !== index) return host;
            let hostDeleted = {
              ...host,
              is_archived: true,
            };
  
            return {
              ...hostDeleted,
              is_archived: true,
            };
          }),
        ];
      },
    },
  });
  
  // Action creators are generated for each case reducer function
  export const { updateHost, deleteHost } = hostSlice.actions;
  
  export default hostSlice.reducer;