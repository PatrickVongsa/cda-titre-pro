import { createAsyncThunk, createSlice, current } from '@reduxjs/toolkit';
import {
  allInteractions,
  addOneInteraction,
  updateOneInteraction,
  archiveOneInteraction,
  deleteOneInteraction,
} from '../api/interection.api';

interface IInteractionState {
  interactions: IInteraction[];
  loading: boolean;
}

const initialState: IInteractionState = {
  interactions: [],
  loading: false,
};

export const getInteractions = createAsyncThunk('interactions/getInteractions', () => {
  return allInteractions();
});
export const addInteraction = createAsyncThunk(
  'interactions/addInteraction',
  async (newInteraction: IInteraction) => {
    const response = await addOneInteraction(newInteraction);
    return response;
  },
);
export const updateInteraction = createAsyncThunk(
  'interactions/updateInteraction',
  async (updateInteraction: IInteraction) => {
    const response = await updateOneInteraction(updateInteraction);
    return response;
  },
);
export const archiveInteraction = createAsyncThunk(
  'interactions/archiveInteraction',
  async (archiveInteraction: IInteraction) => {
    const response = await archiveOneInteraction(archiveInteraction);
    return response;
  },
);
export const deleteInteraction = createAsyncThunk(
  'interactions/deleteInteraction',
  async (deleteInteraction: IInteraction) => {
    const response = await deleteOneInteraction(deleteInteraction);
    return response;
  },
);

export const interactionSlice = createSlice({
  name: 'prospects',
  initialState,
  extraReducers(builder) {
    builder
      .addCase(getInteractions.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(getInteractions.fulfilled, (state, action) => {
        state.loading = false;
        state.interactions = action.payload;
      })
      .addCase(getInteractions.rejected, (state, action) => {
        state.loading = false;
      })
      .addCase(addInteraction.fulfilled, (state, action) => {
        state.interactions.push(action.payload);
      })
      .addCase(updateInteraction.fulfilled, (state, action) => {
        state.interactions = [
          ...state.interactions.map((interaction: IInteraction, i: number) => {
            if (interaction.id !== action.payload.id) {
              return interaction;
            } else {
              return action.payload;
            }
          }),
        ];
      })
      .addCase(archiveInteraction.fulfilled, (state, action) => {
        state.interactions = [
          ...state.interactions.map((interaction: IInteraction, i: number) => {
            if (interaction.id !== action.payload.id) {
              return interaction;
            } else {
              return action.payload;
            }
          }),
        ];
      })
      .addCase(deleteInteraction.fulfilled, (state, action) => {
        state.interactions = [
          ...state.interactions.filter((interaction: IInteraction, i: number) => {
            if (interaction.id !== action.payload.id) {
              return interaction;
            }
          }),
        ];
      });
  },
  reducers: {},
});

export default interactionSlice.reducer;
