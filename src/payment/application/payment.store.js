import { defineStore } from 'pinia';
import { ref, computed, readonly } from 'vue';
import PaymentApi from '../infrastructure/PaymentApi.js';

export const usePaymentStore = defineStore('payment', () => {

    // --- Lógica del Carrito (Existente) ---
    const selectedPlan = ref(null);

    const cartTotal = computed(() => {
        return selectedPlan.value ? selectedPlan.value.price : 0;
    });

    const itemCount = computed(() => {
        return selectedPlan.value ? 1 : 0;
    });

    const addSubscriptionPlan = (planDetails) => {
        selectedPlan.value = planDetails;
    };

    const clearCart = () => {
        selectedPlan.value = null;
    };

    async function placeOrder(userId, shippingInfo, paymentInfo) {
        if (!selectedPlan.value || !userId) {
            throw new Error('User or Plan not selected.');
        }
        try {
            const orderDetails = await PaymentApi.placeSubscriptionOrder(
                userId,
                selectedPlan.value.id,
                shippingInfo,
                paymentInfo
            );
            clearCart();
            return orderDetails;
        } catch (error) {
            console.error("Error in store placeOrder:", error);
            throw error;
        }
    }

    // --- NUEVA LÓGICA DE PEDIDOS ---

    // 1. Estado para los pedidos
    const orders = ref([]);
    const loadingOrders = ref(true);
    const ordersError = ref(null);

    // 2. Acción para obtener los pedidos
    async function fetchOrders(userId) {
        loadingOrders.value = true;
        ordersError.value = null;
        try {
            // El Store llama a la API
            orders.value = await PaymentApi.getOrders(userId);
        } catch(e) {
            console.error("Error fetching orders:", e);
            ordersError.value = "Failed to load orders."; // Mensaje genérico
        } finally {
            loadingOrders.value = false;
        }
    }

    // --- RETURN (Exponemos todo) ---
    return {
        // Carrito
        selectedPlan: readonly(selectedPlan),
        cartTotal,
        itemCount,
        addSubscriptionPlan,
        clearCart,
        placeOrder,

        // Pedidos (Nuevo)
        orders,
        loadingOrders,
        ordersError,
        fetchOrders
    };
});