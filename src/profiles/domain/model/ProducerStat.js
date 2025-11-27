export class ProducerStat {
    constructor({ id = '', userId = '', totalSales = 0, currentMonthSales = 0, totalViews = 0, rating = 0 } = {}) {
        this.id = id;
        this.userId = userId;
        this.totalSales = Number(totalSales);
        this.currentMonthSales = Number(currentMonthSales);
        this.totalViews = Number(totalViews);
        this.rating = Number(rating);
    }
}