import { createApp } from 'vue'
import App from './App.vue'
import router from './router/router'
import UI from './UI'

const app = createApp(App)

UI.forEach(component =>{
    app.component(component.name, component)
})
app.use(router).mount('#app')
