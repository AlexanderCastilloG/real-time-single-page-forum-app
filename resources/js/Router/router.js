import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

import Login from '../components/login/Login';

const routes = [
    { path: '/login', component: Login }
];

const router = new VueRouter({
    routes, // short for `routes: routes`
    hashbang: false, // Para eliminar el #
    mode: 'history' // Para eliminar el #
});

export default router;