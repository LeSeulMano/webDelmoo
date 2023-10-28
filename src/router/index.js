import { createRouter, createWebHistory } from "vue-router";
import Home from '../pages/HomePage.vue';
import Cours from '../pages/CoursPage.vue';
import ResultCours from "../pages/result/ResultCoursPage.vue";

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
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes,
})

export default router;