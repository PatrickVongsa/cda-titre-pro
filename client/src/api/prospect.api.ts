import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL + '/prospects';

const instance = axios.create({
  baseURL: API_URL,
});

export const allProspects = async () => {
  return (await instance.get('/'))?.data;
};

export const addOneProspect = async (newProspect: IProspect) => {
  return (await instance.post('/', newProspect))?.data;
};

export const updateOneProspect = async (updateProspect: IProspect) => {
  return (await instance.put(`/${updateProspect.id}`, updateProspect))?.data;
};

export const archiveOneProspect = async (updateProspect: IProspect) => {
  return (await instance.put(`/archive/${updateProspect.id}`, { is_archived: String(!updateProspect.is_archived) }))?.data;
};

export const deleteOneProspect = async (deleteProspect: IProspect) => {
  return (await instance.delete(`/${deleteProspect.id}`))?.data;
};
