import { createAsyncThunk, createSlice, current } from '@reduxjs/toolkit';
import { allServerTypes, addOneServerType } from '../api/serverType.api';

interface IServerTypeState {
  serverTypes: IServerType[];
  loading: boolean;
}

const initialState: IServerTypeState = {
  serverTypes: [],
  loading: false,
};

export const getServerTypes = createAsyncThunk('serverTypes/getServerTypes', () => {
  return allServerTypes();
});

export const addServerType = createAsyncThunk('serverTypes/addServerType', async (newServerType: IServerType) => {
  const response = await addOneServerType(newServerType);
  return response;
});

export const serverTypeSlice = createSlice({
    name: "serverTypes",
    initialState,
    extraReducers(builder) {
      builder
        .addCase(getServerTypes.pending, (state, action) => {
          state.loading = true;
        })
        .addCase(getServerTypes.fulfilled, (state, action) => {
          state.loading = false;
          state.serverTypes = action.payload;
        })
        .addCase(getServerTypes.rejected, (state, action) => {
          state.loading = false;
        })
        .addCase(addServerType.fulfilled, (state, action) => {
          state.serverTypes.push(action.payload);
        });
    },
    reducers: {
      updateServerType: (state, action) => {
        const { index, ...body } = action.payload;
        state.serverTypes = [
          ...state.serverTypes.map((serverType: IServerType, i: number) => {
            if (i !== index) return serverType;
  
            return body;
          }),
        ];
      },
      deleteServerType: (state, action) => {
        const { index } = action.payload;
        state.serverTypes = [
          ...state.serverTypes.map((serverType: IServerType, i: number) => {
            if (i !== index) return serverType;
            let serverTypeDeleted = {
              ...serverType,
              is_archived: true,
            };
  
            return {
              ...serverTypeDeleted,
              is_archived: true,
            };
          }),
        ];
      },
    },
  });
  
  // Action creators are generated for each case reducer function
  export const { updateServerType, deleteServerType } = serverTypeSlice.actions;
  
  export default serverTypeSlice.reducer;