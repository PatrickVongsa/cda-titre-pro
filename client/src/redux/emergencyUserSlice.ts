import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
  allEmergencyUsers,
  allEmergencyUsersByUser,
  addOneEmergencyUser,
  deleteAllEmergencyAndUser,
  deleteEmergencyFromUser,
} from '../api/emergencyUser.api';

interface IEmergencyUserState {
  emergencyUsers: IEmergencyUser[];
  loading: boolean;
}

const initialState: IEmergencyUserState = {
  emergencyUsers: [],
  loading: false,
};

export const getAllEmergencyUsers = createAsyncThunk('emergencyUsers/getAllEmergencyUsers', () => {
  return allEmergencyUsers();
});

export const getAllEmergencyUsersbByUser = createAsyncThunk(
  'emergencyUsers/getAllEmergencyUsersbByUser',
  (user: IUser) => {
    return allEmergencyUsersByUser(user);
  },
);

export const addEmergencyUser = createAsyncThunk(
  'emergencyUsers/addEmergencyUser',
  (assignment: { contact: IEmergencyContact, user: IUser }) => {
    const { contact, user } = assignment;
    return addOneEmergencyUser(contact, user);
  },
);
export const deleteOneEmergencyUser = createAsyncThunk(
  'emergencyUsers/deleteOneProjectUser',
  (assignment: { contact: IEmergencyContact, user: IUser }) => {
    const { contact, user } = assignment;
    return deleteEmergencyFromUser(contact, user);
  },
);
export const deleteEmergencyUser = createAsyncThunk(
  'emergencyUsers/deleteProjectUser',
  (user: IUser) => {
    return deleteAllEmergencyAndUser(user);
  },
);

export const emergencyUserSlice = createSlice({
  name: 'emergencyUsers',
  initialState,
  extraReducers(builder) {
    builder
      .addCase(getAllEmergencyUsers.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(getAllEmergencyUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.emergencyUsers = action.payload;
      })
      .addCase(getAllEmergencyUsers.rejected, (state, action) => {
        state.loading = false;
      })
      .addCase(getAllEmergencyUsersbByUser.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(getAllEmergencyUsersbByUser.fulfilled, (state, action) => {
        state.loading = false;
        state.emergencyUsers = action.payload;
      })
      .addCase(getAllEmergencyUsersbByUser.rejected, (state, action) => {
        state.loading = false;
      })
      .addCase(addEmergencyUser.fulfilled, (state, action) => {
        state.emergencyUsers.push(action.payload);
      })
      .addCase(deleteOneEmergencyUser.fulfilled, (state, action) => {
        console.log(action.payload);
        state.emergencyUsers = [
          ...state.emergencyUsers.filter((contact: IEmergencyUser, i: number) => {
            if (contact.emergency_contact_id != action.payload.emergency_contact_id) {
              return contact;
            }
          }),
        ];
      })
      .addCase(deleteEmergencyUser.fulfilled, (state, action) => {
        state.emergencyUsers = [];
      });
  },
  reducers: {},
});

export default emergencyUserSlice.reducer;
