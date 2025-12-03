import { BaseApi } from '@/shared/infrastructure/BaseApi.js';

class ProfilesApi extends BaseApi {
    constructor() {
        super();
    }



    async getUserById(userId) {
        try {
            const response = await this.http.get('');

            const user = response.data.users.find(u => u.id == userId);
            return user || null;
        } catch (error) {
            console.error('Error fetching profile:', error);
            throw error;
        }
    }

    async getProducerStats(userId) {
        try {
            const response = await this.http.get('');
            const stats = response.data.producerStats.find(s => s.userId == userId);
            return stats || null;
        } catch (error) {
            console.error('Error fetching stats:', error);
            throw error;
        }
    }


    async getRewardsStatus(userId) {
        try {
            const response = await this.http.get('');
            const allData = response.data;


            const user = allData.users.find(u => u.id == userId);


            const history = allData.rewardsHistory
                ? allData.rewardsHistory.filter(r => r.userId == userId)
                : [];

            if (!user) throw new Error("User not found for rewards");


            const startDate = new Date(user.subscription?.startDate || '2024-01-01');
            const now = new Date();

            const monthsActive = (now.getFullYear() - startDate.getFullYear()) * 12 + (now.getMonth() - startDate.getMonth());

            return {
                totalMonthsActive: Math.max(0, monthsActive),
                planName: user.subscription?.plan || 'Standard',
                history: history
            };
        } catch (error) {
            console.error('Error calculating rewards:', error);
            return { totalMonthsActive: 0, planName: '', history: [] };
        }
    }
}

export default new ProfilesApi();