import axios from "axios";

export const axiosPublic = axios.create({
  baseURL: "https://task-managment-server-sigma.vercel.app",
});

const useAxiosPublic = () => {
  return axiosPublic;
};

export default useAxiosPublic;
