export class Favorite {
    constructor({ id = '', userId = '', coffeeId = '', coffee = null } = {}) {
        this.id = id;
        this.userId = userId;
        this.coffeeId = coffeeId;
        this.coffee = coffee;
    }
}