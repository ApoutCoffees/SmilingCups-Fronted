import { BaseApi } from '@/shared/infrastructure/BaseApi.js';

class ProductApi extends BaseApi {
    constructor() {
        super();
    }

    async getCoffees() {
        // Swagger: GET /api/v1/coffees
        const response = await this.http.get('coffees');
        return response;
    }

    async getCoffeeById(id) {
        const response = await this.http.get(`coffees/${id}`);
        return response;
    }
}

export default new ProductApi();