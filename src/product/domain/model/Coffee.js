export class Coffee {
    constructor({
                    id = '',
                    mysteryBoxId = 0,
                    producerId = 0,
                    name = '',
                    kind = '',
                    notes = [],
                    place = '',
                    originKey = '',
                    description = '',
                    imageUrl = '',
                    price = 0,
                    toasted = '',
                    minSubscription = ''
                } = {}) {
        this.id = id;
        this.mysteryBoxId = mysteryBoxId;
        this.producerId = producerId;
        this.name = name;
        this.kind = kind;
        this.notes = notes;
        this.place = place;
        this.originKey = originKey;
        this.description = description;
        this.imageUrl = imageUrl;
        this.price = Number(price);
        this.toasted = toasted;
        this.minSubscription = minSubscription;
    }
}