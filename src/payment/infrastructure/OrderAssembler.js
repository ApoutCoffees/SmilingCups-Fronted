import { Order } from "../domain/model/Order.js";

export class OrderAssembler {
    static toEntitiesFromResponse(response) {
        if (!response.data) return [];

        const data = Array.isArray(response.data) ? response.data : [];

        return data.map(resource => this.toEntityFromResource(resource));
    }

    static toEntityFromResource(resource) {
        return new Order({
            id: String(resource.id),
            userId: String(resource.userId),
            subscriptionId: String(resource.subscriptionId || ''),
            orderNumber: resource.orderNumber,
            total: resource.total,
            status: resource.status,
            type: resource.type,
            date: resource.date
        });
    }
}