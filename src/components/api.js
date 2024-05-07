import axios from 'axios';

const instance = axios.create({
    baseURL: 'http://localhost:8380', // Update with your backend URL
    timeout: 5000, // Timeout duration in milliseconds
    headers: {
        'Content-Type': 'application/json',
    },
});

export default instance;
