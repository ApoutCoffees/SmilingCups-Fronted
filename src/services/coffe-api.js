import axios from 'axios';

const apiClient = axios.create({
    baseURL: 'http://localhost:3000/',
    headers: {
        'Content-Type': 'application/json'
    }
});

export default {
    async getCafes() {
        try {
            const response = await apiClient.get('cafes');
            return response.data;
        } catch (error) {
            console.error('Error fetching cafes:', error);
            throw error;
        }
    },

    async getProfile(userId) {
        try {
            const response = await apiClient.get(`users/${userId}`);
            return response.data;
        } catch (error) {
            console.error('Error fetching profile:', error);
            throw error;
        }
    },

    async updateProfile(userId, profileData) {
        try {
            const response = await apiClient.put(`users/${userId}`, profileData);
            return response.data;
        } catch (error) {
            console.error('Error updating profile:', error);
            throw error;
        }
    },

    async createUser(userData) {
        try {
            const response = await apiClient.post('users', userData);
            return response.data;
        } catch (error) {
            console.error('Error creating user:', error);
            throw error;
        }
    },

    async getOrders(userId) {
        try {
            const response = await apiClient.get(`orders?userId=${userId}`);
            return response.data;
        } catch (error) {
            console.error('Error fetching orders:', error);
            throw error;
        }
    },

    async getFavorites(userId) {
        try {
            const response = await apiClient.get(`favorites?userId=${userId}`);
            return response.data;
        } catch (error) {
            console.error('Error fetching favorites:', error);
            throw error;
        }
    },

    async getProducerStats(userId) {
        try {
            const response = await apiClient.get(`producerStats?userId=${userId}`);
            return response.data.length > 0 ? response.data[0] : null;
        } catch (error) {
            console.error('Error fetching producer stats:', error);
            throw error;
        }
    },

    async loginUser(email, password) {
        try {
            // Get ALL users (insecure, only for fake API!)
            const response = await apiClient.get('users', {
                params: { email: email, password: password } // json-server can filter like this
            });

            if (response.data.length === 1) {
                // Found exactly one user matching email and password
                return response.data[0]; // Return the user object
            } else {
                // No user found or multiple users (shouldn't happen with unique emails)
                return null; // Indicate login failure
            }
        } catch (error) {
            console.error('Error during login:', error);
            throw error; // Propagate the error
        }
    },

    async placeSubscriptionOrder(userId, planId, shippingInfo, paymentInfo) {
        try {
            const orderData = {
                userId: userId,
                planId: planId, // 'basic', 'premium', 'vip'
                orderDate: new Date().toISOString(),
                shippingAddress: shippingInfo, // Objeto con address, city, etc.
                // NO guardes info de pago real en db.json
                status: "Processing" // Estado inicial
            };
            // Simulamos POST a un nuevo endpoint /subscriptionOrders
            const response = await apiClient.post('subscriptionOrders', orderData);
            console.log("Subscription order placed:", response.data);
            return response.data; // Devuelve la orden creada (con su ID)
        } catch (error) {
            console.error('Error placing subscription order:', error);
            throw error;
        }
    }
};