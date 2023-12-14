import { createApp } from 'vue';
import App from './App.vue';
import Vue from 'vue';
import VueCookies from 'vue-cookies';

import router from './router'

Vue.config.productionTip = false


createApp(App).use(VueCookies).use(router).mount('#app')