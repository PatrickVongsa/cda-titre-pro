import { createAsyncThunk, createSlice, current } from '@reduxjs/toolkit';
import { allActivities, addOneActivity } from '../api/activity.api';

interface IActivityState {
  activities: IActivity[];
  loading: boolean;
}

const initialState: IActivityState = {
  activities: [],
  loading: false,
};

export const getActivities = createAsyncThunk('activities/getActivities', () => {
  return allActivities();
});

export const addActivity = createAsyncThunk('activities/addActivity', async (newActivity: IActivity) => {
  const response = await addOneActivity(newActivity);
  return response;
});

export const activitySlice = createSlice({
    name: "activities",
    initialState,
    extraReducers(builder) {
      builder
        .addCase(getActivities.pending, (state, action) => {
          state.loading = true;
        })
        .addCase(getActivities.fulfilled, (state, action) => {
          state.loading = false;
          state.activities = action.payload;
        })
        .addCase(getActivities.rejected, (state, action) => {
          state.loading = false;
        })
        .addCase(addActivity.fulfilled, (state, action) => {
          state.activities.push(action.payload);
        });
    },
    reducers: {
      updateActivity: (state, action) => {
        const { index, ...body } = action.payload;
        state.activities = [
          ...state.activities.map((activity: IActivity, i: number) => {
            if (i !== index) return activity;
  
            return body;
          }),
        ];
      },
      deleteActivity: (state, action) => {
        const { index } = action.payload;
        state.activities = [
          ...state.activities.map((activity: IActivity, i: number) => {
            if (i !== index) return activity;
            let activityDeleted = {
              ...activity,
              is_archived: true,
            };
  
            return {
              ...activityDeleted,
              is_archived: true,
            };
          }),
        ];
      },
    },
  });
  
  // Action creators are generated for each case reducer function
  export const { updateActivity, deleteActivity } = activitySlice.actions;
  
  export default activitySlice.reducer;