import { createApp } from 'vue'
import App from './App.vue'
import router from './routes/index.js'
import store from './store/index.js'
import mitt from 'mitt'

const emitter = mitt();
const app = createApp(App);
app.config.globalProperties.emitter = emitter
app.use(router).use(store).mount('#app')