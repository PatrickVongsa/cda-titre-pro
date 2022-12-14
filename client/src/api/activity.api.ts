import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL + '/activities';

const instance = axios.create({
  baseURL: API_URL,
});

export const allActivities = async () => {
  return (await instance.get('/'))?.data;
};

export const addOneActivity = async (newActivity: IActivity) => {
  return (await instance.post('/', newActivity))?.data;
};
