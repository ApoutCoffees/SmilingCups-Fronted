import { reactive, computed } from 'vue';
import PaymentApi from '../infrastructure/PaymentApi.js';
import { OrderAssembler } from '../infrastructure/OrderAssembler.js';


const state = reactive({
    selectedPlan: null,

    orders: [],
    loadingOrders: false,
    ordersError: null
});

export const usePaymentStore = () => {
    const selectedPlan = computed(() => state.selectedPlan);
    const orders = computed(() => state.orders);
    const loadingOrders = computed(() => state.loadingOrders);
    const ordersError = computed(() => state.ordersError);

    const cartTotal = computed(() => {
        return state.selectedPlan ? state.selectedPlan.price : 0;
    });

    const addSubscriptionPlan = (planDetails) => {
        state.selectedPlan = planDetails;
    };

    const clearCart = () => {
        state.selectedPlan = null;
    };

    const fetchOrders = async (userId) => {
        state.loadingOrders = true;
        state.ordersError = null;
        try {
            const response = await PaymentApi.getOrders(userId);
            state.orders = OrderAssembler.toEntitiesFromResponse(response);
        } catch (e) {
            console.error("Error fetching orders:", e);
            state.ordersError = "Failed to load orders.";
        } finally {
            state.loadingOrders = false;
        }
    };

    const placeOrder = async (userId, shippingInfo, paymentInfo) => {
        if (!state.selectedPlan || !userId) {
            throw new Error('User or Plan not selected.');
        }

        const newOrderResource = {
            userId: Number(userId),
            planId: state.selectedPlan.id,
            total: state.selectedPlan.price,
            status: 'Completed',
            type: 'subscription',
            date: new Date().toISOString().split('T')[0],
            orderNumber: `ORD-${Math.floor(Math.random() * 10000)}`,
            shippingInfo,
            paymentInfo: { cardLast4: paymentInfo.cardNumber.slice(-4) }
        };

        try {
            const response = await PaymentApi.placeSubscriptionOrder(newOrderResource);
            const createdOrder = OrderAssembler.toEntityFromResource(response.data);

            clearCart();
            return createdOrder;
        } catch (error) {
            console.error("Error in store placeOrder:", error);
            throw error;
        }
    };

    return {
        selectedPlan,
        cartTotal,
        orders,
        loadingOrders,
        ordersError,
        addSubscriptionPlan,
        clearCart,
        fetchOrders,
        placeOrder
    };
};