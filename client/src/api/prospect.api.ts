import axios from 'axios';

const PROSPECT_STATUS_URL = import.meta.env.VITE_API_URL + '/prospects';

const instance = axios.create({
  baseURL: PROSPECT_STATUS_URL,
});

export const allProspects = async () => {
  return (await instance.get('/'))?.data;
};

export const addOneProspect = async (newProspect: IProspect) => {
  console.log(newProspect);
  return (await instance.post('/', newProspect))?.data;
};

export const updateOneProspect = async (updateProspect: IProspect) => {
  console.log(updateProspect);
  const newUpdate =  (await instance.put(`/${updateProspect.id}`, updateProspect))?.data;
  console.log(newUpdate);
  return newUpdate;
};
