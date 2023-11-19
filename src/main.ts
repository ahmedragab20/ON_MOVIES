import 'bootstrap-icons/font/bootstrap-icons.css'
import './assets/main.css'

import { createApp } from 'vue'
import { key, store } from './stores'

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(store, key)
app.use(router)

app.mount('#app')
