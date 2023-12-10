import { createRouter, createWebHistory } from "vue-router";
import Home from '../pages/HomePage.vue';
import Cours from '../pages/CoursPage.vue';
import ResultCours from "../pages/result/ResultCoursPage.vue";
import LoginPage from "@/pages/LoginPage.vue";
import AddingCoursResult from "@/pages/result/AddingCoursResult.vue";
import CguPage from "@/pages/legacy/CguPage.vue";
import {checkAdminPermission} from "@/components/auth/authService";
import AdminPage from "@/pages/staff/AdminPage.vue";
import ShopPage from "@/pages/ShopPage.vue";
import PodcastPage from "@/pages/PodcastPage.vue";
import AccountPage from "@/pages/AccountPage.vue";

const routes = [
    {
        name: 'Home',
        path: '/',
        component: Home
    },
    {
        name: "Cours",
        path: '/cours',
        component: Cours
    },
    {
        name: "Result",
        path: '/result',
        component: ResultCours,
        props: true
    },
    {
        name: "Login",
        path: "/login",
        component: LoginPage,
        meta: { requiresAuth: true, redirectIfLoggedIn: true }
    },
    {
        name: "Adding",
        path: "/add",
        component: AddingCoursResult
    },
    {
        name: "CGU",
        path: "/cgu",
        component: CguPage
    },
    {
        name: "Admin",
        path: "/admin",
        component: AdminPage,
        meta: { requiresAuth: true, requiresAdmin: true, redirectIfNotAdmin: true }
    },
    {
        name: "Podcast",
        path: '/podcast',
        component: PodcastPage
    },
    {
        name: "Shop",
        path: "/shop",
        component: ShopPage
    },
    {
        name: "Account",
        path: "/account",
        component: AccountPage,
        meta: { requiresAuth: true, redirectIfLoggedIn: true }
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes,
})

router.beforeEach((to, from, next) => {
    const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
    const requiresAdmin = to.matched.some(record => record.meta.requiresAdmin);
    const redirectIfLoggedIn = to.matched.some(record => record.meta.redirectIfLoggedIn);
    const redirectIfNotAdmin = to.matched.some(record => record.meta.redirectIfNotAdmin);
    const isLoggedIn = document.cookie.includes('token=');

    if (requiresAuth || requiresAdmin) {
        checkAdminPermission().then((isAdmin) => {
            if (requiresAuth && isLoggedIn && redirectIfLoggedIn) {
                next();  // Rediriger vers /cgu si déjà connecté
            } else if (requiresAuth && !isLoggedIn && redirectIfNotAdmin) {
                next('/login');  // Permettre l'accès à /login si non connecté
            } else if (requiresAuth && !isLoggedIn){
                next();
            } else if (requiresAdmin && !isAdmin && redirectIfNotAdmin) {
                next('/account');  // Rediriger vers /shop si non admin
            } else if (requiresAdmin && isAdmin) {
                next();  // Permettre l'accès à /admin si admin
            } else {
                next();
            }
        });
    } else {
        next();
    }
});

export default router;