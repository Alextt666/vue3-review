import { createApp,h } from 'vue'
import './style.css'
import App from './App.vue'

createApp(App)
.component('comp',{
    render(){
        return h('div','I am comp')
    }
})
.mount('#app')
