
import { BaseApi } from '../../shared/infrastructure/BaseApi.js';

class PaymentApi extends BaseApi {
    constructor() {
        super();
    }

    async getOrders(userId) {
        try {
            const response = await this.http.get(`orders?userId=${userId}`); // Usa this.http
            return response.data;
        } catch (error) {
            console.error('Error fetching orders:', error);
            throw error;
        }
    }

    async placeSubscriptionOrder(userId, planId, shippingInfo) {
        try {
            const orderData = { /* ... */ };
            const response = await this.http.post('subscriptionOrders', orderData); // Usa this.http
            return response.data;
        } catch (error) {
            console.error('Error placing subscription order:', error);
            throw error;
        }
    }
}

export default new PaymentApi();