/**
 * main.js
 *
 * Bootstraps Vuetify and other plugins then mounts the App`
 */

// Components
import App from './App.vue'

// Composables
import { createApp, watch } from 'vue'

// Plugins
import { registerPlugins } from '@/plugins'

import Datepicker from '@vuepic/vue-datepicker';
import VueDraggableNext from 'vuedraggable'
import '@vuepic/vue-datepicker/dist/main.css'


import { createPinia } from 'pinia'
import { createPersistedState } from 'pinia-plugin-persistedstate'

const pinia = createPinia()
pinia.use(createPersistedState({
    storage: sessionStorage,
}))
const app = createApp(App)



app.component("draggable", VueDraggableNext);

app.component('Datepicker', Datepicker);


registerPlugins(app)

app.mount('#app')
