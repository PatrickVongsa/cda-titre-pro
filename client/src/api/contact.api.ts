import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL + '/contacts';
console.log(API_URL)
const instance = axios.create({
  baseURL: API_URL,
});

export const allContacts = async () => {
  return (await instance.get('/'))?.data;
};

export const addOneContact = async (newContact: IContact) => {
  return (await instance.post('/', newContact))?.data;
};

export const updateOneContact = async (updateContact: IContact) => {
    return (await instance.put(`/${updateContact.id}`, updateContact))?.data;
  };
  
  export const archiveOneContact = async (updateContact: IContact) => {
    return (await instance.put(`/archive/${updateContact.id}`, { is_archived: String(!updateContact.is_archived) }))?.data;
  };
  
  export const deleteOneContact = async (deleteContact: IContact) => {
    return (await instance.delete(`/${deleteContact.id}`))?.data;
  };