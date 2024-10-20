import axios from "axios";
import { API_BASE_URL } from "@/lib/constants";

export interface ErrorResponse {
  error?: string;
  message?: string;
  statusCode: number;
  details?: string;
}

const api = axios.create({
  baseURL: API_BASE_URL,
});

// add 30s timeout
api.defaults.timeout = 30000;

api.defaults.validateStatus = (status) => {
  return status >= 200 && status < 300; // default
};

api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (axios.isAxiosError<ErrorResponse, Record<string, unknown>>(error)) {
      if (error.response?.status === 401) {
        window.location.href = "/login";
      }
      return Promise.reject(error.response?.data);
    }
    return Promise.reject(error);
  },
);

export default api;
