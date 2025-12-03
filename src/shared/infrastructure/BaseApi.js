import axios from "axios";

// Apunta a tu backend .NET local
const platformApi = import.meta.env.VITE_LEARNING_PLATFORM_API_URL || "https://appoutcoffe.azurewebsites.net/api/v1";

export class BaseApi {
    #http;

    constructor() {
        this.#http = axios.create({
            baseURL: platformApi,
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        });

        this.#http.interceptors.request.use((config) => {
            const token = localStorage.getItem('authToken');
            if (token) {
                config.headers.Authorization = `Bearer ${token}`;
            }
            return config;
        });
    }

    get http() {
        return this.#http;
    }
}