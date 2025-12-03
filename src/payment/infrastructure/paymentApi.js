import { BaseApi } from '@/shared/infrastructure/BaseApi.js';

class PaymentApi extends BaseApi {
    constructor() {
        super();
    }


    getOrders(userId) {
        return this.http.get(`/orders?userId=${userId}`);
    }


    createSubscription(subscriptionResource) {
        // Swagger: POST /api/v1/subscriptions
        return this.http.post('subscriptions', subscriptionResource);
    }

    placeSubscriptionOrder(orderResource) {

        return this.http.post('orders', orderResource);
    }
}

export default new PaymentApi();