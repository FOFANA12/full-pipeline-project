import axios from "axios";

const baseURL = (import.meta.env.VITE_API_URL || "http://127.0.0.1:3000/api").replace(/\/$/, "");

export const api = axios.create({
  baseURL,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});
