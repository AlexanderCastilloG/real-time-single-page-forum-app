require('./bootstrap');

window.Vue = require('vue');
import Vuetify from 'vuetify';
// import 'vuetify/dist/vuetify.min.css';

Vue.use(Vuetify);
export default new Vuetify({});

// Import Class User
import User from './Helpers/User';
window.User = User;

//Event Bus
window.EventBus = new Vue();


// Components
Vue.component('AppHome', require('./components/AppHome.vue').default);

// Vue Router
import router from './Router/router.js';

const app = new Vue({
    vuetify: new Vuetify(),
    el: '#app',
    router
});