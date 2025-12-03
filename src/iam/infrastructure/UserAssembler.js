import { User } from "../domain/model/User.js";

export class UserAssembler {
    static toEntityFromResource(resource) {
        if (!resource) return null;

        // ADAPTADOR: Convertimos el ID de suscripción en un objeto completo
        // Si tiene ID > 0, asumimos que es 'active' y plan 'premium' para que se vea bien en la UI
        const subId = resource.subscriptionId || 0;
        const isActive = subId > 0;

        return new User({
            id: resource.id,
            fullName: resource.fullName,
            email: resource.email,
            // Si el backend no devuelve 'type', asumimos 'customer'
            type: resource.type || 'customer',

            phone: resource.phone || '',
            address: resource.address || '',
            city: resource.city || '',
            country: resource.country || '',
            isVerified: true,

            // Construimos el objeto subscription que el frontend necesita
            subscriptionId: subId,
            subscription: {
                id: subId,
                status: isActive ? 'active' : 'inactive',
                plan: isActive ? 'premium' : null
            },

            companyName: resource.companyName || ''
        });
    }

    // Para enviar datos al backend
    static toDTO(userEntity) {
        return {
            id: userEntity.id,
            fullName: userEntity.fullName,
            email: userEntity.email,
            type: userEntity.type,
            subscriptionId: userEntity.subscriptionId
        };
    }
}