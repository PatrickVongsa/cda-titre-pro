import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL + '/project-users';

const instance = axios.create({
  baseURL: API_URL,
});

export const allProjectUsers = async () => {
  return (await instance.get('/'))?.data;
};
export const allProjectUsersByProject = async (project: IProject) => {
  return (await instance.get(`/${project.id}`))?.data;
};

export const addOneProjectUser = async (project: IProject, user: IUser) => {
  return (await instance.post('/', { project_id: project.id, user_id: user.id }))?.data;
};

export const deleteAllUserAndProject = async (project: IProject) => {
  const data = (await instance.delete('/', { data: { project_id: project.id } }))?.data;
  console.log(data);
  return data
};

export const deleteUserFromProject = async (project: IProject, user: IUser) => {
  return (await instance.delete(`/${project.id}`, { data: { user_id: user.id } }))?.data;
};
