import { createApp } from 'vue'

import './style.css'

import App from './App.vue'
import router from './router'
import store from './store/store'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faPhone,faFolder,faFileZipper } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(faFolder,faPhone,faFileZipper)

const app = createApp(App).use(router).use(store)
app.component('font-awesome-icon',FontAwesomeIcon)


app.mount('#app')
