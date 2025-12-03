import { Coffee } from "../domain/model/Coffee.js";

export class CoffeeAssembler {
    static toEntitiesFromResponse(response) {
        if (!response || !response.data) return [];
        return response.data.map(resource => this.toEntityFromResource(resource));
    }

    static toEntityFromResource(resource) {

        return new Coffee({
            id: resource.id,
            nombre: resource.name,           // name -> nombre
            tipo: resource.kind,             // kind -> tipo
            precio: resource.price,          // price -> precio
            tostado: resource.toasted,       // toasted -> tostado
            imagenUrl: resource.imageUrl,    // imageUrl -> imagenUrl
            lugar: resource.place,           // place -> lugar
            notas: resource.notes || [],
            descripcion: resource.description,

            minSubscription: resource.minSuscription || resource.minSubscription || 'basic',
            origen_key: resource.originKey,
            productor: resource.producerName || "Productor Local"
        });
    }
}