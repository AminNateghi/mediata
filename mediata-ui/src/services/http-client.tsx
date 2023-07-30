import axios from "axios";

const BASE_URL = import.meta.env.VITE_TMDB_URL;
const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const API_ACCEESS_KEY = import.meta.env.VITE_TMDB_READ_ACCESS_TOKEN;

export const api = axios.create({
  baseURL: BASE_URL,
  timeout: 10_000,
});

// Request interceptors for API calls
api.interceptors.request.use(
  (config) => {
    // config.params["api_key"] = API_KEY;
    config.headers.setAccept("application/json");
    config.headers.setAuthorization(`Bearer ${API_ACCEESS_KEY}`, true);
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
