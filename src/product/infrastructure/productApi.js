
// src/product/infrastructure/ProductApi.js
import { BaseApi } from '../../shared/infrastructure/BaseApi.js';

class ProductApi extends BaseApi {
    constructor() {
        super();
    }

    async getCoffees() {
        try {
            const response = await this.http.get('cafes'); // Usa this.http
            return response.data;
        } catch (error) {
            console.error('Error fetching cafes:', error);
            throw error;
        }
    }
}

export default new ProductApi();