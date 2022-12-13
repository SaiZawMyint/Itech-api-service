import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import SetUp from '../views/SetUp.vue'

import Home from '../components/Widgets/GustFieldWidgets/Home.vue'
import Login from '../components/Widgets/GustFieldWidgets/Login.vue'

import ServiceLists from '../components/Widgets/Services/ServiceLists.vue'
import ToolDashboard from '../components/Widgets/Services/APITools/ToolDashboard.vue'

import SheetLists from '../components/Widgets/Services/APITools/spreadsheet/sheet/SheetLists.vue'
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
            }
        ]
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
            {
                path: '/itech/:service/:id', 
                name: 'itech.service', 
                redirect: {
                    name: 'itech.service.sheets'
                },
                component: ToolDashboard,
                children: [
                    {path: ':spreadsheetId?', 'name': 'itech.service.sheets',component: SheetLists }
                ]
            }
        ]
    }
]

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes
})
router.beforeEach((to, from, next) => {
    process(to,from).then(()=>{
        if ((to.meta.requiresAuth || from.meta.requiresAuth) && !sessionStorage.getItem('TOKEN')) {
            next({ name: 'join' })
        } else {
            next()
        }
    })
})

async function process(to,from){
    let callData = []
    if(to.name == 'itech.service.sheets'){
        callData.push(store.dispatch(`getSpreadsheetsData`,to.params).then((res)=>{
            if(!res.ok){
                store.dispatch(`addNotification`,{
                    type: "error",
                    message: res.error.message
                })
            }
        }))
    }
    return Promise.all(callData)
    .catch((err)=>{
        console.log(err)
    })
}
export default router
