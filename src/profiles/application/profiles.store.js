import { reactive, computed } from 'vue';
import ProfilesApi from '../infrastructure/profilesApi.js';
import { ProfileAssembler } from '../infrastructure/ProfileAssembler.js';

const state = reactive({
    favorites: [],
    producerStats: null,
    monthlySales: [],
    loading: false,
    error: null
});

export const useProfilesStore = () => {
    const favorites = computed(() => state.favorites);
    const producerStats = computed(() => state.producerStats);
    const monthlySales = computed(() => state.monthlySales);
    const loading = computed(() => state.loading);

    // --- Favoritos ---
    const fetchFavorites = async (userId) => {
        state.loading = true;
        try {
            const response = await ProfilesApi.getFavorites(userId);
            state.favorites = ProfileAssembler.toFavoriteEntities(response);
        } catch (e) {
            console.error(e);
        } finally { state.loading = false; }
    };

    const toggleFavorite = async (userId, coffeeId) => {
        // Lógica simple: si ya existe, borrar; si no, crear.
        const existing = state.favorites.find(f => f.coffeeId === coffeeId);
        try {
            if (existing) {
                await ProfilesApi.removeFavorite(existing.id);
            } else {
                await ProfilesApi.addFavorite({ userId, coffeeId });
            }
            await fetchFavorites(userId); // Refrescamos
        } catch (e) { console.error(e); }
    };

    // --- Métricas de Productor ---
    const fetchProducerData = async (userId) => {
        state.loading = true;
        try {
            const statsRes = await ProfilesApi.getProducerStats(userId);
            if (statsRes.data && statsRes.data.length > 0) {
                state.producerStats = ProfileAssembler.toProducerStatEntity(statsRes.data[0]);

                // Traer ventas mensuales
                const salesRes = await ProfilesApi.getMonthlySales(state.producerStats.id);
                state.monthlySales = ProfileAssembler.toMonthlySaleEntities(salesRes);
            }
        } catch (e) { console.error(e); }
        finally { state.loading = false; }
    };

    return {
        favorites,
        producerStats,
        monthlySales,
        loading,
        fetchFavorites,
        toggleFavorite,
        fetchProducerData
    };
};