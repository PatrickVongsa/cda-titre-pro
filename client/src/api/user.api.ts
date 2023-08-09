import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL + '/users';

const instance = axios.create({
  baseURL: API_URL,
});

export const allUsers = async () => {
  return (await instance.get('/'))?.data;
};

export const addOneUser = async (newUser: Partial<IUser>) => {
  return (await instance.post('/', newUser))?.data;
};

export const updateOneUser = async (updateUser: IUser) => {
  return (await instance.put(`/${updateUser.id}`, updateUser))?.data;
};

export const archiveOneUser = async (updateUser: IUser) => {
  return (await instance.put(`/archive/${updateUser.id}`, { is_archived: String(!updateUser.is_archived) }))?.data;
};

export const deleteOneUser = async (deleteUser: IUser) => {
  return (await instance.delete(`/${deleteUser.id}`))?.data;
};