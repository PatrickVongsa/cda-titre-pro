import axios from 'axios';

const PROSPECT_STATUS_URL = import.meta.env.VITE_API_URL + '/activities';

const instance = axios.create({
  baseURL: PROSPECT_STATUS_URL,
});

export const allActivities = async () => {
  return (await instance.get('/'))?.data;
};

export const addOneActivity = async (newActivity: IActivity) => {
  console.log(newActivity);
  return (await instance.post('/', newActivity))?.data;
};
