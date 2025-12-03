import { reactive, computed } from 'vue';
import ProductApi from '../infrastructure/productApi.js';
import { CoffeeAssembler } from '../infrastructure/CoffeeAssembler.js';

const state = reactive({
    coffees: [],
    loading: false,
    error: null
});

export const useProductStore = () => {
    const allCafes = computed(() => state.coffees);
    const loading = computed(() => state.loading);
    const error = computed(() => state.error);

    const originsOptions = computed(() => {
        const unique = new Set(state.coffees.map(c => c.originKey).filter(Boolean));
        return Array.from(unique).sort();
    });

    const flavorNotesOptions = computed(() => {
        const allNotes = state.coffees.map(c => c.notes).filter(Array.isArray).flat();
        return Array.from(new Set(allNotes)).sort();
    });

    const fetchCoffees = async () => {
        state.loading = true;
        state.error = null;
        try {
            const response = await ProductApi.getCoffees();
            state.coffees = CoffeeAssembler.toEntitiesFromResponse(response);
        } catch (e) {
            console.error("Error fetching coffees:", e);
            state.error = "Error al cargar los cafés.";
        } finally {
            state.loading = false;
        }
    };

    return {
        allCafes,
        loading,
        error,
        originsOptions,
        flavorNotesOptions,
        fetchCoffees
    };
};
