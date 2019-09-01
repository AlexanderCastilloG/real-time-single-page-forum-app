require('./bootstrap');

window.Vue = require('vue');
import Vuetify from 'vuetify';
// import 'vuetify/dist/vuetify.min.css';

Vue.use(Vuetify);
export default new Vuetify({});

// Components
Vue.component('AppHome', require('./components/AppHome.vue').default);

// Vue Router
import router from './Router/router.js';

const app = new Vue({
    vuetify: new Vuetify(),
    el: '#app',
    router
});