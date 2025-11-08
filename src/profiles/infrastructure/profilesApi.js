
import { BaseApi } from '../../shared/infrastructure/BaseApi.js';

class ProfilesApi extends BaseApi {
    constructor() {
        super();
    }

    async getFavorites(userId) {
        try {
            const response = await this.http.get(`favorites?userId=${userId}`); // Usa this.http
            return response.data;
        } catch (error) {
            console.error('Error fetching favorites:', error);
            throw error;
        }
    }

    async getProducerStats(userId) {
        try {
            const response = await this.http.get(`producerStats?userId=${userId}`); // Usa this.http
            return response.data.length > 0 ? response.data[0] : null;
        } catch (error) {
            console.error('Error fetching producer stats:', error);
            throw error;
        }
    }
}

export default new ProfilesApi();