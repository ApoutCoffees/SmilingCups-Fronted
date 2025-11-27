export class Subscription {
    constructor({
                    id = 0,
                    status = 'inactive',
                    plan = null,
                    startDate = null,
                    nextBillingDate = null
                } = {}) {
        this.id = id;
        this.status = status;
        this.plan = plan;
        this.startDate = startDate ? new Date(startDate) : new Date();
        this.nextBillingDate = nextBillingDate ? new Date(nextBillingDate) : new Date();
    }

    isActive() {
        return this.status === 'active';
    }

    get planName() {
        return this.plan ? this.plan.charAt(0).toUpperCase() + this.plan.slice(1) : 'None';
    }
}