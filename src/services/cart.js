import { ref, computed } from 'vue';


const selectedPlan = ref(null);
const addSubscriptionPlan = (planDetails) => {
    selectedPlan.value = planDetails;

};

const clearCart = () => {
    selectedPlan.value = null;

};

const cartTotal = computed(() => {
    return selectedPlan.value ? selectedPlan.value.price : 0;
});


const itemCount = computed(() => {
    return selectedPlan.value ? 1 : 0;
});



export default {
    selectedPlan,
    addSubscriptionPlan,
    clearCart,
    cartTotal,
    itemCount
};