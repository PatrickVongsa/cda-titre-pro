import { createAsyncThunk, createSlice, current } from '@reduxjs/toolkit';
import {
  allEmergencyContacts,
  addOneEmergencyContact,
  updateOneEmergencyContact,
  deleteOneEmergencyContact,
} from '../api/emergencyContact.api';

interface IEmergencyContactState {
  emergencyContacts: IEmergencyContact[];
  loading: boolean;
}

const initialState: IEmergencyContactState = {
  emergencyContacts: [],
  loading: false,
};

export const getEmergencyContacts = createAsyncThunk(
  'emergencyContacts/getEmergencyContacts',
  () => {
    return allEmergencyContacts();
  },
);

export const addEmergencyContact = createAsyncThunk(
  'emergencyContacts/addEmergencyContact',
  async (newEmergencyContact: IEmergencyContact) => {
    const response = await addOneEmergencyContact(newEmergencyContact);
    return response;
  },
);

export const updateEmergencyContact = createAsyncThunk(
  'emergencyContacts/updateEmergencyContact',
  async (updateEmergencyContact: IEmergencyContact) => {
    const response = await updateOneEmergencyContact(updateEmergencyContact);
    return response;
  },
);

export const deleteEmergencyContact = createAsyncThunk(
  'emergencyContacts/deleteEmergencyContact',
  async (deleteEmergencyContact: IEmergencyContact) => {
    const response = await deleteOneEmergencyContact(deleteEmergencyContact);
    return response;
  },
);

export const emergencyContactSlice = createSlice({
  name: 'emergencyContacts',
  initialState,
  extraReducers(builder) {
    builder
      .addCase(getEmergencyContacts.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(getEmergencyContacts.fulfilled, (state, action) => {
        state.loading = false;
        state.emergencyContacts = action.payload;
      })
      .addCase(getEmergencyContacts.rejected, (state, action) => {
        state.loading = false;
      })
      .addCase(addEmergencyContact.fulfilled, (state, action) => {
        state.emergencyContacts.push(action.payload);
      })
      .addCase(updateEmergencyContact.fulfilled, (state, action) => {
        state.emergencyContacts = [
          ...state.emergencyContacts.map((contact: IEmergencyContact, i: number) => {
            if (contact.id !== action.payload.id) {
              return contact;
            } else {
              return action.payload;
            }
          }),
        ];
      })
      .addCase(deleteEmergencyContact.fulfilled, (state, action) => {
        state.emergencyContacts = [
          ...state.emergencyContacts.filter((contact: IEmergencyContact, i: number) => {
            if (contact.id !== action.payload.id) {
              return contact;
            }
          }),
        ];
      });
  },
  reducers: {},
});

export default emergencyContactSlice.reducer;
