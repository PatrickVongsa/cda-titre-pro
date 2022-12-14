import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL + '/sources';

const instance = axios.create({
  baseURL: API_URL,
});

export const allSources = async () => {
  return (await instance.get('/'))?.data;
};

export const addOneSource = async (newSource: ISource) => {
  return (await instance.post('/', newSource))?.data;
};
