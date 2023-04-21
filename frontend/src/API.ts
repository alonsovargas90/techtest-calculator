import axios, { AxiosPromise } from 'axios';

const BASE_URL = 'http://localhost:3000'; // This is the route that we will have for the backend running

interface RequestOptions {
  data?: any; // Request payload
  params?: any; // Query parameters
}

const api = {
  get: (path: string, options?: RequestOptions): AxiosPromise => {
    return axios.get(`${BASE_URL}${path}`, { params: options?.params });
  },
  post: (path: string, options?: RequestOptions): AxiosPromise => {
    return axios.post(`${BASE_URL}${path}`, options?.data);
  },
  put: (path: string, options?: RequestOptions): AxiosPromise => {
    return axios.put(`${BASE_URL}${path}`, options?.data);
  },
  delete: (path: string, options?: RequestOptions): AxiosPromise => {
    return axios.delete(`${BASE_URL}${path}`, { params: options?.params });
  },
};

export default api;