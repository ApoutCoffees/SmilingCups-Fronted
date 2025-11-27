export class MonthlySale {
    constructor({ id = '', producerStatId = '', month = '', amount = 0 } = {}) {
        this.id = id;
        this.producerStatId = producerStatId;
        this.month = month;
        this.amount = Number(amount);
    }
}