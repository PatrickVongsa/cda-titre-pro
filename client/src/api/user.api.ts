import axios from 'axios';

const PROSPECT_STATUS_URL = import.meta.env.VITE_API_URL + '/users';

const instance = axios.create({
  baseURL: PROSPECT_STATUS_URL,
});

export const allUsers = async () => {
  return (await instance.get('/'))?.data;
};

export const addOneUser = async (newUser: IUser) => {
  console.log(newUser);
  return (await instance.post('/', newUser))?.data;
};
