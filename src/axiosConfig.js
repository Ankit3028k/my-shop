// src/axiosConfig.js
import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://personal-shop-backend.onrender.com/api/v1', // Update with your API URL
});

export default instance;