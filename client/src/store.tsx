import { configureStore } from "@reduxjs/toolkit";

import activitySlice from "./redux/activitySlice";
import prospectStatusSlice from "./redux/prospectStatusSlice";
import projectStatusSlice from "./redux/projectStatusSlice";
import projectTypeSlice from "./redux/projectTypeSlice";
import projectSlice from "./redux/projectSlice";
import prospectSlice from "./redux/prospectSlice";
import sourceSlice from "./redux/sourceSlice";

export const store = configureStore({
  reducer: {
    activities: activitySlice,
    prospectStatus: prospectStatusSlice,
    projectStatus: projectStatusSlice,
    projectType: projectTypeSlice,
    projects: projectSlice,
    prospects: prospectSlice,
    sources: sourceSlice,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
