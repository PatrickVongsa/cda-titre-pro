import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

const instance = axios.create({
  baseURL: API_URL,
});

export interface IData {
  email: string;
  password: string;
}

export const userLogin = async (data: IData) => {
  const res = (await instance.post('/login', data))?.data;
  localStorage.setItem('currentUser', JSON.stringify({token: res.token}));
  localStorage.setItem('user', JSON.stringify(res.user));

  return res;
};

export const userLogout = async () => {
  localStorage.removeItem('currentUser');
  localStorage.removeItem('user');
  return null;
};
