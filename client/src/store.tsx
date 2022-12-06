import { configureStore } from "@reduxjs/toolkit";

import prospectStatusSlice from "./redux/prospectStatusSlice";
import projectStatusSlice from "./redux/projectStatusSlice";
import projectTypeSlice from "./redux/projectTypeSlice";
import projectSlice from "./redux/projectSlice";

export const store = configureStore({
  reducer: {
    prospectStatus: prospectStatusSlice,
    projectStatus: projectStatusSlice,
    projectType: projectTypeSlice,
    projects: projectSlice,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
