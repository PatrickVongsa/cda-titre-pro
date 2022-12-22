import { createAsyncThunk, createSlice, current } from '@reduxjs/toolkit';
import { allContacts, addOneContact, updateOneContact, archiveOneContact, deleteOneContact } from '../api/contact.api';



interface IContactState {
  contacts: IContact[];
  loading: boolean;
}

const initialState: IContactState = {
  contacts: [],
  loading: false,
};

export const getContacts = createAsyncThunk('contacts/getContacts', () => {
  return allContacts();
});

export const addContact = createAsyncThunk(
  'contacts/addContact',
  async (newContact: IContact) => {
    const response = await addOneContact(newContact);
    return response;
  },
);

export const updateContact = createAsyncThunk(
  'contacts/updateContact',
  async (updateContact: IContact) => {
    const response = await updateOneContact(updateContact);
    return response;
  },
);

export const archiveContact = createAsyncThunk(
  'contacts/archiveContact',
  async (archiveContact: IContact) => {
    const response = await archiveOneContact(archiveContact);
    return response;
  },
);

export const deleteContact = createAsyncThunk(
  'contacts/deleteContact',
  async (deleteContact: IContact) => {
    const response = await deleteOneContact(deleteContact);
    return response;
  },
);

export const contactSlice = createSlice({
  name: 'contacts',
  initialState,
  extraReducers(builder) {
    builder
      .addCase(getContacts.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(getContacts.fulfilled, (state, action) => {
        state.loading = false;
        state.contacts = action.payload;
      })
      .addCase(getContacts.rejected, (state, action) => {
        state.loading = false;
      })
      .addCase(addContact.fulfilled, (state, action) => {
        state.contacts.push(action.payload);
      })
      .addCase(updateContact.fulfilled, (state, action) => {
        state.contacts = [
          ...state.contacts.map((contact: IContact, i: number) => {
            if (contact.id !== action.payload.id) {
              return contact;
            } else {
              return action.payload;
            }
          }),
        ];
      })
      .addCase(archiveContact.fulfilled, (state, action) => {
        state.contacts = [
          ...state.contacts.map((contact: IContact, i: number) => {
            if (contact.id !== action.payload.id) {
              return contact;
            } else {
              return action.payload;
            }
          }),
        ];
      })
      .addCase(deleteContact.fulfilled, (state, action) => {
        state.contacts = [
          ...state.contacts.filter((contact: IContact, i: number) => {
            if (contact.id !== action.payload.id) {
              return contact;
            }
          }),
        ];
      })
  },
  reducers: {},
});

export default contactSlice.reducer;
