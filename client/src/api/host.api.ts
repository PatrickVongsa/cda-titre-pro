import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL + '/hosts';

const instance = axios.create({
  baseURL: API_URL,
});

export const allHosts = async () => {
  return (await instance.get('/'))?.data;
};

export const addOneHost = async (newHost: IHost) => {
  return (await instance.post('/', newHost))?.data;
};
