import { Favorite } from "../domain/model/Favorite.js";
import { ProducerStat } from "../domain/model/ProducerStat.js";
import { MonthlySale } from "../domain/model/MonthlySale.js";
import { CoffeeAssembler } from "../../product/infrastructure/CoffeeAssembler.js";

export class ProfileAssembler {
    static toFavoriteEntity(resource) {
        return new Favorite({
            id: String(resource.id),
            userId: String(resource.userId),
            coffeeId: String(resource.coffeeId),
            coffee: resource.coffee ? CoffeeAssembler.toEntityFromResource(resource.coffee) : null
        });
    }

    static toFavoriteEntities(response) {
        if (!response.data) return [];
        const data = Array.isArray(response.data) ? response.data : [];
        return data.map(r => this.toFavoriteEntity(r));
    }

    static toProducerStatEntity(resource) {
        return new ProducerStat(resource);
    }

    static toMonthlySaleEntities(response) {
        if (!response.data) return [];
        const data = Array.isArray(response.data) ? response.data : [];
        return data.map(r => new MonthlySale(r));
    }
}