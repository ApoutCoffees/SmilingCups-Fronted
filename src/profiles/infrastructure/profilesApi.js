import { BaseApi } from '../../shared/infrastructure/BaseApi.js';

class ProfilesApi extends BaseApi {
    constructor() {
        super();
    }

    getFavorites(userId) {
        return this.http.get(`/favorites?userId=${userId}&_expand=coffee`);
    }

    addFavorite(favoriteData) {
        return this.http.post('/favorites', favoriteData);
    }

    removeFavorite(id) {
        return this.http.delete(`/favorites/${id}`);
    }

    getProducerStats(userId) {
        return this.http.get(`/producerStats?userId=${userId}`);
    }

    getMonthlySales(producerStatId) {
        return this.http.get(`/monthlySales?producerStatId=${producerStatId}`);
    }
}

export default new ProfilesApi();