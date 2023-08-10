import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import Vue3EasyDataTable from 'vue3-easy-data-table';
import 'vue3-easy-data-table/dist/style.css';
import App from './App.vue'
import router from './router'
const vuetify = createVuetify({
    components,
    directives,
  }) 

createApp(App).use(vuetify).use(createPinia()).use(router).mount('#app')
const app = createApp(App);
app.component('EasyDataTable', Vue3EasyDataTable);