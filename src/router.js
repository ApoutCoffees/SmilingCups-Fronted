import { createRouter, createWebHistory } from "vue-router";
import { useAuth } from './iam/application/iam.store.js'; // Importamos el nuevo store

// ... (Tus imports de vistas se mantienen igual: RoleSelection, LogInView, etc.)
import RoleSelection from "./iam/presentation/components/views/RoleSelection.vue";
import LogInView from "./iam/presentation/components/views/LogInView.vue";
import SignUpView from "./iam/presentation/components/views/SignUpView.vue";
import Catalog from "./product/presentation/components/views/Catalog.vue";
import AboutView from "./shared/views/AboutView.vue";
import GoalsView from "./shared/views/GoalsView.vue";
import ContactView from "./shared/views/ContactView.vue";
import SubscriptionsView from "./payment/presentation/components/views/SubscriptionsView.vue";
import CartView from './payment/presentation/components/views/CartView.vue';
import ShippingView from './payment/presentation/components/views/ShippingView.vue';
import PaymentView from './payment/presentation/components/views/PaymentView.vue';
import PaymentConfirmedView from './payment/presentation/components/views/PaymentConfirmedView.vue';
import PaymentErrorView from './payment/presentation/components/views/PaymentErrorView.vue';
import ProfileView from "./profiles/presentation/components/views/ProfileView.vue";
import ProducerDashboardView from "./profiles/presentation/components/views/ProducerDashboardView.vue";
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
    // Rutas protegidas
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

// Inicializamos el store antes de usarlo
const auth = useAuth();
auth.checkInitialAuthState();

router.beforeEach((to, from, next) => {
    const baseTitle = 'Smiling Cups';
    document.title = `${baseTitle} - ${to.meta['title'] || 'Welcome'}`;

    // --- LÓGICA DDD ACTUALIZADA ---
    const isAuthenticated = auth.isAuthenticated;
    const currentUser = auth.currentUser; // Es una entidad User

    if (to.meta.requiresAuth && !isAuthenticated) {
        console.log(`Redirigiendo a login por falta de autenticación`);
        next({ name: 'login', query: { redirect: to.fullPath } });
    }
    else if (to.meta.roles && isAuthenticated && currentUser) {
        // Usamos la lógica de dominio para verificar el rol
        const userRole = currentUser.isProducer() ? 'producer' : 'customer';

        if (!to.meta.roles.includes(userRole)) {
            console.log(`Usuario ${userRole} no tiene acceso a ${to.name}`);
            // Redirección inteligente basada en el rol
            if (currentUser.isProducer()) {
                next({ name: 'producerDashboard' });
            } else {
                next({ name: 'profile' });
            }
        } else {
            next();
        }
    } else {
        next();
    }
});

export default router;