import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import SetUp from '../views/SetUp.vue'

import Home from '../components/Widgets/GustFieldWidgets/Home.vue'
import Login from '../components/Widgets/GustFieldWidgets/Login.vue'

import ServiceLists from '../components/Widgets/Services/ServiceLists.vue'
import ToolDashboard from '../components/Widgets/Services/APITools/ToolDashboard.vue'

import SheetLists from '../components/Widgets/Services/APITools/spreadsheet/sheet/SheetLists.vue'
import SheetHome from '../components/Widgets/Services/APITools/spreadsheet/sheet/SheetHome.vue'
import Detials from '../components/Widgets/Services/APITools/spreadsheet/sheet/Detials.vue'
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
                    name: 'itech.service.shome'
                },
                meta:{service: 'SPREADSHEET'},
                component: ToolDashboard,
                children: [
                    {
                        path: 'service', 'name': 'itech.service.shome',component: SheetHome,
                    },
                    {
                        path: 'service/:spreadsheetId?', 'name': 'itech.service.sheets',component: SheetLists,
                    },
                    {path: 'service/:spreadsheetId/:sheetId',name: 'itech.service.sheets.details', component:Detials}
                ]
            },
            
        ]
    }
]

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes
})
router.beforeEach((to, from, next) => {
    store.state.setting.progress = true
    process(to,from).then(()=>{
        store.state.setting.progress = false
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
            if(!res) return null
            if(!res.ok){
                store.dispatch(`addNotification`,{
                    type: "error",
                    message: res.error && res.error.message ? res.error.message : res.message
                })
            }
        }))
    }
    if(to.name == 'itech.service.sheets.details'){
        let payload = Object.assign(to.params, {range: "A1:J30"})
        callData.push(store.dispatch(`getSheetDetailData`,payload).then((res)=>{
            if(!res.ok){
                store.dispatch(`addNotification`,{
                    type: "error",
                    message: res.error.message ? res.error.message : res.message
                })
            }
        }))
    }
    if(to.meta && 'service' in to.meta){
        console.log(to.params)
        switch(to.meta.service){
            case "SPREADSHEET":{
                callData.push(store.dispatch(`checkStatus`,to.params.id).then((res)=>{
                    if(!res.ok){
                        store.dispatch('clearNotifications').then(()=>{
                            store.dispatch(`addNotification`,{
                                type: "warning",
                                message: res.message
                            })
                        })
                    }
                }))
            }break
        }
    }
    return Promise.all(callData)
    .catch((err)=>{
        console.log(err)
    })
}
export default router
