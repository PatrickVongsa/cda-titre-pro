import axios from 'axios';

const PROSPECT_STATUS_URL = import.meta.env.VITE_API_URL + '/sources';

const instance = axios.create({
  baseURL: PROSPECT_STATUS_URL,
});

export const allSources = async () => {
  return (await instance.get('/'))?.data;
};

export const addOneSource = async (newSource: ISource) => {
  console.log(newSource);
  return (await instance.post('/', newSource))?.data;
};
