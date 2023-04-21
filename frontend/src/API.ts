import axios, { AxiosPromise } from 'axios';
import Cookies from 'js-cookie';

const BASE_URL = 'http://localhost:3000';

interface RequestOptions {
  data?: any;
  params?: any;
  headers?: any;
}

const getToken = () => {
  const jwtCookie = Cookies.get('jwt');
  return jwtCookie ? jwtCookie : null;
};

const api = {
  get: (path: string, options?: RequestOptions): AxiosPromise => {
    const headers = { ...options?.headers, Authorization: `Bearer ${getToken()}` };
    return axios.get(`${BASE_URL}${path}`, { ...options, headers });
  },
  post: (path: string, options?: RequestOptions): AxiosPromise => {
    const headers = { ...options?.headers, Authorization: `Bearer ${getToken()}` };
    return axios.post(`${BASE_URL}${path}`, options?.data, { headers });
  },
  put: (path: string, options?: RequestOptions): AxiosPromise => {
    const headers = { ...options?.headers, Authorization: `Bearer ${getToken()}` };
    return axios.put(`${BASE_URL}${path}`, options?.data, { headers });
  },
  delete: (path: string, options?: RequestOptions): AxiosPromise => {
    const headers = { ...options?.headers, Authorization: `Bearer ${getToken()}` };
    return axios.delete(`${BASE_URL}${path}`, { ...options, headers });
  },
};

export default api;