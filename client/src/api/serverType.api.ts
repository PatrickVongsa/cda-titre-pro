import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL + '/server-types';

const instance = axios.create({
  baseURL: API_URL,
});

export const allServerTypes = async () => {
  return (await instance.get('/'))?.data;
};

export const addOneServerType = async (newServerType: IServerType) => {
  return (await instance.post('/', newServerType))?.data;
};
