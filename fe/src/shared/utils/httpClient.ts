import axios from 'axios';
import { getToken } from '../../auth/services/auth.service';

const httpClient = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
});

httpClient.interceptors.response.use(
    response => response,
    error => Promise.reject(error),
);

httpClient.interceptors.request.use(
    config => {
        const token = getToken();
        if (!!token) {
            config.headers.authorization = `Bearer ${token}`;
        }

        config.headers['Cache-Control'] = "no-cache";
        config.headers['Pragma'] = "no-cache";

        return config;
    },
    error => Promise.reject(error),
);

export default httpClient;
