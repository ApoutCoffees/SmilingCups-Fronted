import { BaseApi } from '../../shared/infrastructure/BaseApi.js';

class ProfilesApi extends BaseApi {
    constructor() {
        super();
    }

    async getUserById(userId) {
        try {
            const response = await this.http.get('');
            const user = response.data.users.find(u => u.id === parseInt(userId));
            return user ? user : null;
        } catch (error) {
            console.error('Error fetching profile by ID:', error);
            throw error;
        }
    }

    async updateProfile(userId, updatedProfile) {
        try {
            const response = await this.http.put(`users/${userId}`, updatedProfile);
            return response.data;
        } catch (error) {
            console.error('Error updating profile:', error);
            throw error;
        }
    }

    async getFavorites(userId) {
        try {
            const response = await this.http.get('');
            const allData = response.data;
            const userFavorites = allData.favorites.filter(f => f.userId === parseInt(userId));
            return userFavorites;
        } catch (error) {
            console.error('Error fetching favorites:', error);
            throw error;
        }
    }

    async getProducerStats(userId) {
        try {
            const response = await this.http.get('');
            const allData = response.data;
            const userStats = allData.producerStats.find(s => s.userId === parseInt(userId));
            return userStats ? userStats : null;
        } catch (error) {
            console.error('Error fetching producer stats:', error);
            throw error;
        }
    }
}

export default new ProfilesApi();