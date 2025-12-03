import { BaseApi } from '@/shared/infrastructure/BaseApi.js';

class IamApi extends BaseApi {
    constructor() {
        super();
    }

    /**
     * Login POST to .NET Backend
     * @param {string} email
     * @param {string} password
     */
    async login(email, password) {
        // Swagger: POST /api/v1/authentication/sign-in
        const response = await this.http.post('authentication/sign-in', {
            email: email,
            password: password
        });
        return response.data;
    }

    /**
     * Register POST to .NET Backend
     * @param {Object} userData
     */
    async createUser(userData) {

        const response = await this.http.post('authentication/sign-up', userData);
        return response.data;
    }

    async getUserById(userId) {
        const response = await this.http.get(`users/${userId}`);
        return response.data;
    }
}


export const iamApi = new IamApi();