import axios from "axios";

const PROSPECT_STATUS_URL = import.meta.env.VITE_API_URL + "/prospect-status";

const instance = axios.create({
  baseURL: PROSPECT_STATUS_URL,
});

export const allProspectStatus = async () => {
  console.log("fired!")
  return (await instance.get("/"))?.data;
};
