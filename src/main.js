import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { i18n } from './i18n'

import 'dayjs/locale/nl';
import 'dayjs/locale/en';

import App from './App.vue'
import router from './router'

import "bootstrap"
import "./scss/styles.scss"

const app = createApp(App)

app.use(createPinia());
app.use(i18n);
app.use(router);

app.mount('#app')
