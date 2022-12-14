import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL + '/interactions';

const instance = axios.create({
  baseURL: API_URL,
});

export const allInteractions = async () => {
  return (await instance.get('/'))?.data;
};

export const addOneInteraction = async (newInteraction: IInteraction) => {
  return (await instance.post('/', newInteraction))?.data;
};

export const updateOneInteraction = async (updateInteraction: IInteraction) => {
  return (await instance.put(`/${updateInteraction.id}`, updateInteraction))?.data;
};

export const archiveOneInteraction = async (updateInteraction: IInteraction) => {
  return (
    await instance.put(`/archive/${updateInteraction.id}`, {
      is_archived: String(!updateInteraction.is_archived),
    })
  )?.data;
};

export const deleteOneInteraction = async (deleteInteraction: IInteraction) => {
  return (await instance.delete(`/${deleteInteraction.id}`))?.data;
};
