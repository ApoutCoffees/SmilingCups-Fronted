
import { BaseApi } from '../../shared/infrastructure/BaseApi.js';

class IamApi extends BaseApi {
    constructor() {
        super();
    }

    async loginUser(email, password) {
        try {
            const response = await this.http.get('users', {
                params: { email: email, password: password }
            });
            return response.data.length === 1 ? response.data[0] : null;
        } catch (error) {
            console.error('Error during login:', error);
            throw error;
        }
    }

    async createUser(userData) {
        try {
            const response = await this.http.post('users', userData);
            return response.data;
        } catch (error) {
            console.error('Error creating user:', error);
            throw error;
        }
    }

    async getUserById(userId) {
        try {
            const response = await this.http.get(`users/${userId}`); // Usa this.http
            return response.data;
        } catch (error) {
            console.error('Error fetching profile:', error);
            throw error;
        }
    }

    // etc.
}

export default new IamApi();