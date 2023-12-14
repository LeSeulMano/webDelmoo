import { createApp } from 'vue';
import App from './App.vue';

import VueCookies from 'vue-cookies';

import router from './router'

createApp().config.productionTip = false;

createApp(App).use(VueCookies).use(router).mount('#app')