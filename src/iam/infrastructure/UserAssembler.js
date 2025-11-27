import { User } from "../domain/model/User.js";

export class UserAssembler {
    static toEntitiesFromResponse(response) {
        if (!response.data) return [];

        const data = response.data;

        if (Array.isArray(data)) {
            return data.map((resource) => this.toEntityFromResource(resource));
        } else {
            return [];
        }
    }

    static toEntityFromResource(resource) {
        const safeResource = {
            ...resource,
            id: String(resource.id),
            subscriptionId: resource.subscriptionId ? String(resource.subscriptionId) : ''
        };

        return new User(safeResource);
    }
}