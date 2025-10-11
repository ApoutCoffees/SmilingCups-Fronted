import {createRouter, createWebHistory} from "vue-router";
import Home from "./shared/presentation/views/home.vue";
import goals from "./publishing/presentation/views/goals.vue";
import contact from "./publishing/presentation/views/Contact.vue";
import Catalog from './services/cofeeAssembler.vue';
// TODO: Define lazy-loaded components for routes
const about = () => import('./shared/presentation/views/about.vue');
const pageNotFound = () => import('./shared/presentation/views/page-not-found.vue');
const routes = [
    { path: '/home',            name: 'home',       component: Home,        meta: { title: 'Home' } },
    { path: '/catalog',           name: 'catalog',      component: Catalog,       meta: { title: 'Catalog' } },
    { path: '/goals',      name: 'goals', component: goals , meta: { title: 'Goals' } },
    { path: '/contact',      name: 'contact', component: contact , meta: { title: 'Contact' } },

    { path: '/',                redirect: '/home' },
    { path: '/:pathMatch(.*)*', name: 'not-found', component: pageNotFound, meta: { title: 'Page Not Found' } }
];

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: routes,

});

router.beforeEach((to, from, next) => {
    console.log(`Navigating from ${from.name} to ${to.name}`);
    // Set the page title
    let baseTitle = 'Smiling Cups';
    document.title = `${baseTitle} - ${to.meta['title']}`;
    // TODO: Call authentication guard
    next();
});

export default router;