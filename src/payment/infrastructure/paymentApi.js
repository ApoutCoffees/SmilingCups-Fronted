import { BaseApi } from '../../shared/infrastructure/BaseApi.js';

class PaymentApi extends BaseApi {
    constructor() {
        super();
    }

    getOrders(userId) {
        return this.http.get(`/orders?userId=${userId}`);
    }

    placeSubscriptionOrder(orderResource) {
        return this.http.post('/orders', orderResource);
    }
}

export default new PaymentApi();