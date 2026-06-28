import axios from "axios";
const API_KEY = import.meta.env.VITE_STRAPI_API_KEY;

const axiosClient = axios.create({
  baseURL: "https://ai-resume-builder-backend-k022.onrender.com/api",
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${API_KEY}`,
  },
});

export const getUserResume = (userEmail) =>
  axiosClient.get("/user-resumes?filters[userEmail][$eq]=" + userEmail);

export const createNewResume = (data) =>
  axiosClient.post("/user-resumes", data);

export const updateResumeDetails = (id, data) =>
  axiosClient.put("/user-resumes/" + id, data);

export const getResumeById = (id) =>
  axiosClient.get("/user-resumes/" + id + "?populate=*");

export const deleteResumeById = (id) =>
  axiosClient.delete("/user-resumes/" + id);
