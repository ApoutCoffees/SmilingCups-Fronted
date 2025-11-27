import { Coffee } from "../domain/model/Coffee.js";

export class CoffeeAssembler {
    static toEntitiesFromResponse(response) {
        if (!response.data) return [];

        const data = Array.isArray(response.data) ? response.data : [];

        return data.map(resource => this.toEntityFromResource(resource));
    }

    static toEntityFromResource(resource) {
        return new Coffee({
            id: String(resource.id),
            mysteryBoxId: resource.mysteryBoxId || 0,
            producerId: resource.producerId || 0,
            name: resource.nombre || resource.name,
            kind: resource.tipo || resource.kind,
            notes: resource.notas || resource.notes || [],
            place: resource.lugar || resource.place,
            originKey: resource.origen_key || resource.originKey,
            description: resource.descripcion || resource.description,
            imageUrl: resource.imagenUrl || resource.imageUrl,
            price: resource.precio || resource.price,
            toasted: resource.tostado || resource.toasted,
            minSubscription: resource.minSubscription
        });
    }
}