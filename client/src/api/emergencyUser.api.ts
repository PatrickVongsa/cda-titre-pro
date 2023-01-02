import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL + '/emergency-users';

const instance = axios.create({
  baseURL: API_URL,
});

export const allEmergencyUsers = async () => {
  return (await instance.get('/'))?.data;
};
export const allEmergencyUsersByUser = async (user: IUser) => {
  return (await instance.get(`/${user.id}`))?.data;
};

export const addOneEmergencyUser = async (contact: IEmergencyContact, user: IUser) => {
  return (await instance.post('/', { emergency_contact_id: contact.id, user_id: user.id }))?.data;
};

export const deleteAllEmergencyAndUser = async (user: IUser) => {
  const data = (await instance.delete('/', { data: { user_id: user.id } }))?.data;
  console.log(data);
  return data
};

export const deleteEmergencyFromUser = async (contact: IEmergencyContact, user: IUser) => {
  return (await instance.delete(`/${user.id}`, { data: { emergency_contact_id: contact.id } }))?.data;
};
