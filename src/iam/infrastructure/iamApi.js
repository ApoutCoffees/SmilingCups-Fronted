
import { BaseApi } from '../../shared/infrastructure/BaseApi.js';

class IamApi extends BaseApi {
    constructor() {
        super();
    }



    async loginUser(email, password) {
        try {

            const response = await this.http.get('users');


            const user = response.data.find(u => u.email === email && u.password === password);


            return user ? user : null;

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

            const response = await this.http.get('users');


            const user = response.data.find(u => u.id === parseInt(userId));


            return user ? user : null;

        } catch (error) {
            console.error('Error fetching profile:', error);
            throw error;
        }
    }

    // etc.
}

export default new IamApi();