import { createApp } from 'vue'
import { store } from './store/index'
import App from './App.vue'
import router from './router/router'
import UI from './UI'

const app = createApp(App)

UI.forEach(component =>{
    app.component(component.name, component)
})
app.use(store)
app.use(router).mount('#app')
