import { configureStore } from '@reduxjs/toolkit';

import activitySlice from './redux/activitySlice';
import interactionSlice from './redux/interactionSlice';
import daysOffSlice from './redux/daysOffSlice';
import daysOffStatusSlice from './redux/daysOffStatusSlice';
import domainSlice from './redux/domainSlice';
import emergencyContactSlice from './redux/emergencyContactSlice';
import emergencyUserSlice from './redux/emergencyUserSlice';
import prospectStatusSlice from './redux/prospectStatusSlice';
import projectStatusSlice from './redux/projectStatusSlice';
import projectTypeSlice from './redux/projectTypeSlice';
import projectSlice from './redux/projectSlice';
import projectUserSlice from './redux/projectUserSlice';
import prospectSlice from './redux/prospectSlice';
import serverSlice from './redux/serverSlice';
import serverTypeSlice from './redux/serverTypeSlice';
import sourceSlice from './redux/sourceSlice';
import subdomainSlice from './redux/subdomainSlice';
import hostSlice from './redux/hostSlice';
import userSlice from './redux/userSlice';
import authSlice from './redux/authSlice';
import contactSlice from './redux/contactSlice';

export const store = configureStore({
  reducer: {
    activities: activitySlice,
    contacts: contactSlice,
    daysOffStatus: daysOffStatusSlice,
    daysOff: daysOffSlice,
    domains: domainSlice,
    emergencyContacts: emergencyContactSlice,
    emergencyUsers: emergencyUserSlice,
    hosts: hostSlice,
    interactions: interactionSlice,
    prospectStatus: prospectStatusSlice,
    projectStatus: projectStatusSlice,
    projectType: projectTypeSlice,
    projects: projectSlice,
    projectUsers: projectUserSlice,
    prospects: prospectSlice,
    servers: serverSlice,
    serverTypes: serverTypeSlice,
    sources: sourceSlice,
    subdomains: subdomainSlice,
    users: userSlice,
    auth: authSlice,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
