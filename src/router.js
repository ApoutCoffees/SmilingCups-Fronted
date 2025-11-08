import { createRouter, createWebHistory } from "vue-router";
import { useAuth } from './iam/application/iam.store.js';

import RoleSelection from "./iam/components/views/RoleSelection.vue";
import LogInView from "./iam/components/views/LogInView.vue";
import SignUpView from "./iam/components/views/SignUpView.vue";

import Catalog from "./product/components/views/Catalog.vue";

import AboutView from "./shared/views/AboutView.vue";
import GoalsView from "./shared/views/GoalsView.vue";
import ContactView from "./shared/views/ContactView.vue";

import SubscriptionsView from "./payment/components/views/SubscriptionsView.vue";
import CartView from './payment/components/views/CartView.vue';
import ShippingView from './payment/components/views/ShippingView.vue';
import PaymentView from './payment/components/views/PaymentView.vue';
import PaymentConfirmedView from './payment/components/views/PaymentConfirmedView.vue';
import PaymentErrorView from './payment/components/views/PaymentErrorView.vue';

import ProfileView from "./profiles/components/views/ProfileView.vue";
import ProducerDashboardView from "./profiles/components/views/ProducerDashboardView.vue";

import PageNotfound from './shared/views/PageNotfound.vue';

const routes = [
    { path: '/welcome', name: 'roleSelection', component: RoleSelection, meta: { title: 'Welcome' } },
    { path: '/login', name: 'login', component: LogInView, meta: { title: 'Login' } },
    { path: '/register', name: 'register', component: SignUpView, meta: { title: 'Register' } },
    { path: '/catalog', name: 'catalog', component: Catalog, meta: { title: 'Catalog' } },
    { path: '/about', name: 'about', component: AboutView, meta: { title: 'About Us' } },
    { path: '/subscriptions', name: 'subscriptions', component: SubscriptionsView, meta: { title: 'Subscriptions' } },
    { path: '/goals', name: 'goals', component: GoalsView, meta: { title: 'Goals' } },
    { path: '/contact', name: 'contact', component: ContactView, meta: { title: 'Contact' } },
    { path: '/profile', name: 'profile', component: ProfileView, meta: { title: 'My Profile', requiresAuth: true, roles: ['customer'] } },
    { path: '/producer-dashboard', name: 'producerDashboard', component: ProducerDashboardView, meta: { title: 'Producer Dashboard', requiresAuth: true, roles: ['producer'] } },
    {
        path: '/checkout',
        name: 'CheckoutWrapper',
        redirect: { name: 'Cart' },
        meta: { requiresAuth: true, roles: ['customer'] },
        children: [
            { path: 'cart', name: 'Cart', component: CartView, meta: { title: 'Cart' } },
            { path: 'shipping', name: 'CheckoutShipping', component: ShippingView, meta: { title: 'Shipping Address' } },
            { path: 'payment', name: 'CheckoutPayment', component: PaymentView, meta: { title: 'Payment' } },
            { path: 'confirmed', name: 'OrderConfirmed', component: PaymentConfirmedView, meta: { title: 'Order Confirmed' } },
            { path: 'error', name: 'CheckoutError', component: PaymentErrorView, meta: { title: 'Order Error' } },
        ]
    },
    { path: '/', redirect: '/welcome' },
    { path: '/:pathMatch(.*)*', name: 'not-found', component: PageNotfound, meta: { title: 'Page Not Found' } }
];

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: routes,
});

router.beforeEach((to, from, next) => {
    console.log(`Navigating from ${from.name || 'start'} to ${to.name}`);

    const baseTitle = 'Smiling Cups';
    document.title = `${baseTitle} - ${to.meta['title'] || 'Welcome'}`;

    const auth = useAuth();
    const loggedIn = auth.loggedInUserId.value;
    const userType = auth.loggedInUserType.value;

    if (to.meta.requiresAuth && !loggedIn) {
        console.log(`Route ${to.name} requires auth, user not logged in. Redirecting to login.`);
        next({ name: 'login', query: { redirect: to.fullPath } });
    } else if (to.meta.roles && loggedIn && !to.meta.roles.includes(userType)) {
        console.log(`User type ${userType} does not have access to route ${to.name}. Redirecting.`);
        if (userType === 'customer') {
            next({ name: 'profile' });
        } else if (userType === 'producer') {
            next({ name: 'producerDashboard' });
        } else {
            next({ name: 'welcome' });
        }
    } else {
        next();
    }
});

export default router;