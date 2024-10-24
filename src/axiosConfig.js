// src/axiosConfig.js
import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://ankit3028k.github.io/personal-shop-backend//api/v1', // Update with your API URL
});

export default instance;
