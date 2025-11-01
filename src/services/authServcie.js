import axiosInstance from './axiosInstance';

export const login = (credentials) => axiosInstance.post('/auth/login', credentials); // login user
export const signup = (userData) => axiosInstance.post('/auth/register', userData); // register new user