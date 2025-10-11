import axios from 'axios';

const apiClient = axios.create({
    baseURL: 'https://api.npoint.io/8a3d2c38bea8d5daafc3',
    headers: {
        'Content-Type': 'application/json'
    }
});

export default {

    async getCafes() {
        try {
            const response = await apiClient.get('');
            return response.data.cafes;
        } catch (error) {
            console.error('Error fetching cafes:', error);
            throw error;
        }
    }
};