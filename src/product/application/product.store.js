
import { defineStore } from 'pinia';
import { ref, computed, nextTick } from 'vue';
import ProductApi from '../infrastructure/ProductApi.js';

export const useProductStore = defineStore('product', () => {

    // --- 1. STATE ---

    const allCafes = ref([]);
    const loading = ref(true);
    const error = ref(null);

    // --- 2. GETTERS (Estado Calculado) ---

    const originsOptions = computed(() => {
        const uniqueOrigins = new Set(allCafes.value.map(cafe => cafe.origen_key).filter(Boolean));
        return Array.from(uniqueOrigins).sort();
    });

    const flavorNotesOptions = computed(() => {
        const allNotesArrays = allCafes.value.map(cafe => cafe.notas).filter(Array.isArray);
        const flattenedNotes = allNotesArrays.flat();
        return Array.from(new Set(flattenedNotes)).filter(Boolean).sort();
    });

    // --- 3. ACTIONS ---

    async function fetchCoffees() {
        loading.value = true;
        error.value = null;
        try {

            const data = await ProductApi.getCoffees();
            allCafes.value = data || [];
            await nextTick();
        } catch (e) {
            console.error("Error al cargar cafés:", e);
            error.value = "Error al cargar los cafés. Intenta de nuevo.";
        } finally {
            loading.value = false;
        }
    }

    // --- 4. RETURN ---
    return {

        allCafes,
        loading,
        error,

        originsOptions,
        flavorNotesOptions,

        // Actions
        fetchCoffees,
    };
});