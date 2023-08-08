import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL + '/emergency-contacts';
console.log(API_URL);
const instance = axios.create({
  baseURL: API_URL,
});

export const allEmergencyContacts = async () => {
  return (await instance.get('/'))?.data;
};

export const addOneEmergencyContact = async (newContact: IEmergencyContact) => {
  return (await instance.post('/', newContact))?.data;
};

export const updateOneEmergencyContact = async (updateContact: IEmergencyContact) => {
  return (await instance.put(`/${updateContact.id}`, updateContact))?.data;
};

export const deleteOneEmergencyContact = async (deleteContact: IEmergencyContact) => {
  return (await instance.delete(`/${deleteContact.id}`))?.data;
};
