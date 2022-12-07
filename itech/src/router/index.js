import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import SetUp from '../views/SetUp.vue'

import Home from '../components/Widgets/GustFieldWidgets/Home.vue'
import Login from '../components/Widgets/GustFieldWidgets/Login.vue'

import ServiceLists from '../components/Widgets/InformationCheckUp/ServiceLists.vue'

const routes = [
    {
        path: '/',
        name: 'top',
        redirect: 'home',
        component: HomeView,
        children: [
            {
                path: '/home', name: 'home', component: Home
            },
            {
                path: '/join', name: 'join', component: Login
            }
        ]
    },
    {
        path: '/itech',
        name: 'itech',
        redirect: '/itech/services',
        meta: {
            requiresAuth: true
        },
        component: SetUp,
        children: [
            {
                path: '/itech/services', name: 'services', component: ServiceLists
            },
        ]
    }
]

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes
})

export default router
