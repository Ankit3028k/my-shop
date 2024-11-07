// src/axiosConfig.js
import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://personal-shop-backend.vercel.app//api/v1', // Update with your API URL
});

export default instance;
