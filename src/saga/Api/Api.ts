import axios from 'axios';

const baseUrl = 'http://localhost:8000';
export const instance = axios.create({
    baseURL: baseUrl,
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials: true,
});
