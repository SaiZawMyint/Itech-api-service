import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import SetUp from '../views/SetUp.vue'

import Home from '../components/Widgets/GustFieldWidgets/Home.vue'
import Login from '../components/Widgets/GustFieldWidgets/Login.vue'

import ServiceLists from '../components/Widgets/InformationCheckUp/ServiceLists.vue'
import store from '../store/store'


const routes = [
    {
        path: '/',
        name: 'top',
        redirect: '/home',
        component: HomeView,
        children: [
            {
                path: '/home', name: 'home', component: Home
            },
            {
                path: '/join', name: 'join', component: Login
            },
            {
                path: '/itech',
                name: 'services',
                redirect: '/itech/home',
                meta: {
                    requiresAuth: true
                },
                component: SetUp,
                children: [
                    {
                        path: '/itech/home', name: 'itech.home', component: ServiceLists
                    },
                ]
            }
        ]
    },
    
]

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes
})
router.beforeEach((to,from,next)=>{
    if(to.meta.requiresAuth && !store.state.user.token){
        next({name: 'join'})
    }else{
        next()
    }
    
})
export default router
