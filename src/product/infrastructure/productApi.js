import { BaseApi } from '../../shared/infrastructure/BaseApi.js';

class ProductApi extends BaseApi {
    constructor() {
        super();
        this.endpoint = '/cafes';
    }

    async getCoffees() {
        return await this.http.get(this.endpoint);
    }

    async getCoffeeById(id) {
        return await this.http.get(`${this.endpoint}/${id}`);
    }
}

export default new ProductApi();