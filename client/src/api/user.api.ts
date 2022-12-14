import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL + '/users';

const instance = axios.create({
  baseURL: API_URL,
});

export const allUsers = async () => {
  return (await instance.get('/'))?.data;
};

export const addOneUser = async (newUser: IUser) => {
  return (await instance.post('/', newUser))?.data;
};
