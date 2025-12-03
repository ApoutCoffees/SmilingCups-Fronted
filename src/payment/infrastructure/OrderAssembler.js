import { Order } from "../domain/model/Order.js";

export class OrderAssembler {
    static toEntitiesFromResponse(response) {
        // Validación robusta para array o objeto data
        let data = response.data || [];
        if (!Array.isArray(data)) data = [data]; // Si devuelve una sola orden, la metemos en un array

        return data.map(resource => this.toEntityFromResource(resource));
    }

    static toEntityFromResource(resource) {
        if (!resource) return null;

        return new Order({
            id: String(resource.id),
            userId: String(resource.userId),
            subscriptionId: String(resource.subscriptionId || ''),
            orderNumber: resource.orderNumber || `ORD-${resource.id}`,
            total: resource.total,
            status: resource.status || 'Pending',
            type: resource.type || 'subscription',
            // Aseguramos que la fecha sea legible
            date: resource.date ? new Date(resource.date).toLocaleDateString() : new Date().toLocaleDateString()
        });
    }
}