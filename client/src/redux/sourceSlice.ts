import { createAsyncThunk, createSlice, current } from '@reduxjs/toolkit';
import { allSources, addOneSource } from '../api/source.api';

interface ISourceState {
  sources: ISource[];
  loading: boolean;
}

const initialState: ISourceState = {
  sources: [],
  loading: false,
};

export const getSources = createAsyncThunk('sources/getSources', () => {
  return allSources();
});

export const addSource = createAsyncThunk('sources/addSource', async (newSource: ISource) => {
  const response = await addOneSource(newSource);
  return response;
});

export const sourceSlice = createSlice({
    name: "sources",
    initialState,
    extraReducers(builder) {
      builder
        .addCase(getSources.pending, (state, action) => {
          state.loading = true;
        })
        .addCase(getSources.fulfilled, (state, action) => {
          state.loading = false;
          state.sources = action.payload;
        })
        .addCase(getSources.rejected, (state, action) => {
          state.loading = false;
        })
        .addCase(addSource.fulfilled, (state, action) => {
          console.log(action.payload)
          state.sources.push(action.payload);
          console.log(current(state))
        });
    },
    reducers: {
      updateSource: (state, action) => {
        const { index, ...body } = action.payload;
        state.sources = [
          ...state.sources.map((source: ISource, i: number) => {
            if (i !== index) return source;
  
            return body;
          }),
        ];
      },
      deleteSource: (state, action) => {
        const { index } = action.payload;
        state.sources = [
          ...state.sources.map((source: ISource, i: number) => {
            if (i !== index) return source;
            let sourceDeleted = {
              ...source,
              is_archived: true,
            };
  
            return {
              ...sourceDeleted,
              is_archived: true,
            };
          }),
        ];
      },
    },
  });
  
  // Action creators are generated for each case reducer function
  export const { updateSource, deleteSource } = sourceSlice.actions;
  
  export default sourceSlice.reducer;