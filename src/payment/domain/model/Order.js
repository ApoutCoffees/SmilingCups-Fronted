export class Order {
    constructor({
                    id = '',
                    userId = '',
                    subscriptionId = '',
                    orderNumber = '',
                    total = 0,
                    status = 'PENDING',
                    type = '',
                    date = ''
                } = {}) {
        this.id = id;
        this.userId = userId;
        this.subscriptionId = subscriptionId;
        this.orderNumber = orderNumber;
        this.total = Number(total);
        this.status = status;
        this.type = type;
        this.date = date ? new Date(date) : new Date();
    }

    get formattedTotal() {
        return `$${this.total.toFixed(2)}`;
    }

    get formattedDate() {
        return this.date.toLocaleDateString();
    }
}