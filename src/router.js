import { createRouter, createWebHistory } from "vue-router";
import { useAuth } from './auth.js'; // Correctly importing named export

import RoleSelection from "./publishing/presentation/views/RoleSection.vue";
import Login from "./publishing/presentation/views/Login.vue";
import Register from "./publishing/presentation/views/Register.vue";
import Catalog from "./publishing/presentation/views/Catalog.vue";
import About from "./publishing/presentation/views/About.vue";
import Subscriptions from "./publishing/presentation/views/Subscriptions.vue";
import Profile from "./publishing/presentation/views/Profile.vue";
import ProducerDashboard from "./publishing/presentation/views/ProducerDashboard.vue";
import goals from "./publishing/presentation/views/goals.vue";
import contact from "./publishing/presentation/views/Contact.vue";

import Cart from './publishing/presentation/views/Cart.vue';
import CheckoutShipping from './publishing/presentation/views/cart-tabs/CheckoutShipping.vue';
import CheckoutPayment from './publishing/presentation/views/cart-tabs/CheckoutPayment.vue';
import CheckoutConfirmation from './publishing/presentation/views/cart-tabs/CheckoutConfirmation.vue';
import CheckoutError from './publishing/presentation/views/cart-tabs/CheckoutError.vue';

import pageNotFound from './shared/presentation/views/page-not-found.vue';

const routes = [
    { path: '/welcome', name: 'roleSelection', component: RoleSelection, meta: { title: 'Welcome' } },
    { path: '/login', name: 'login', component: Login, meta: { title: 'Login' } },
    { path: '/register', name: 'register', component: Register, meta: { title: 'Register' } },
    { path: '/catalog', name: 'catalog', component: Catalog, meta: { title: 'Catalog' } },
    { path: '/about', name: 'about', component: About, meta: { title: 'About Us' } },
    { path: '/subscriptions', name: 'subscriptions', component: Subscriptions, meta: { title: 'Subscriptions' } },
    { path: '/goals', name: 'goals', component: goals, meta: { title: 'Goals' } },
    { path: '/contact', name: 'contact', component: contact, meta: { title: 'Contact' } },
    { path: '/profile', name: 'profile', component: Profile, meta: { title: 'My Profile', requiresAuth: true, roles: ['customer'] } },
    { path: '/producer-dashboard', name: 'producerDashboard', component: ProducerDashboard, meta: { title: 'Producer Dashboard', requiresAuth: true, roles: ['producer'] } },
    {
        path: '/checkout',
        name: 'CheckoutWrapper',
        redirect: { name: 'Cart' },
        meta: { requiresAuth: true, roles: ['customer'] },
        children: [
            { path: 'cart', name: 'Cart', component: Cart, meta: { title: 'Cart' } },
            { path: 'shipping', name: 'CheckoutShipping', component: CheckoutShipping, meta: { title: 'Shipping Address' } },
            { path: 'payment', name: 'CheckoutPayment', component: CheckoutPayment, meta: { title: 'Payment' } },
            { path: 'confirmed', name: 'OrderConfirmed', component: CheckoutConfirmation, meta: { title: 'Order Confirmed' } },
            { path: 'error', name: 'CheckoutError', component: CheckoutError, meta: { title: 'Order Error' } },
        ]
    },
    { path: '/', redirect: '/welcome' },
    { path: '/:pathMatch(.*)*', name: 'not-found', component: pageNotFound, meta: { title: 'Page Not Found' } }
];

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: routes,
});

router.beforeEach((to, from, next) => {
    console.log(`Navigating from ${from.name || 'start'} to ${to.name}`);

    const baseTitle = 'Smiling Cups';
    document.title = `${baseTitle} - ${to.meta['title'] || 'Welcome'}`;

    const auth = useAuth(); // Call useAuth() here to get the state object
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