import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import SetUp from '../views/SetUp.vue'

import Home from '../components/Widgets/GustFieldWidgets/Home.vue'
import Login from '../components/Widgets/GustFieldWidgets/Login.vue'

import ServiceLists from '../components/Widgets/Services/ServiceLists.vue'
import ToolDashboard from '../components/Widgets/Services/APITools/ToolDashboard.vue'

import SheetLists from '../components/Widgets/Services/APITools/spreadsheet/sheet/SheetLists.vue'
import SheetHome from '../components/Widgets/Services/APITools/spreadsheet/sheet/SheetHome.vue'
import DriveHome from '../components/Widgets/Services/APITools/drive/DriveHome.vue'
import DriveFileLists from '../components/Widgets/Services/APITools/drive/DriveFileLists.vue'

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
                path: '/itech/spreadsheet/:id', 
                name: 'itech.spreadsheet', 
                redirect: {
                    name: 'itech.spreadsheet.shome'
                },
                meta:{service: 'SPREADSHEET',APITOOL: true},
                component: ToolDashboard,
                children: [
                    {
                        path: 'service', 'name': 'itech.spreadsheet.shome',component: SheetHome,
                    },
                    {
                        path: 'service/:spreadsheetId?', 'name': 'itech.spreadsheet.sheets',component: SheetLists,
                    },
                    {path: 'service/:spreadsheetId/:sheetId',name: 'itech.spreadsheet.sheets.details', component:Detials}
                ]
            },
            {
                path: '/itech/drive/:id', 
                name: 'itech.drive', 
                redirect: {
                    name: 'itech.drive.shome'
                },
                meta:{service: 'DRIVE',APITOOL: true},
                component: ToolDashboard,
                children: [
                    {
                        path: 'service', 'name': 'itech.drive.shome',component: DriveHome,
                    },
                    {
                        path: 'service/:driveFolderId?', 'name': 'itech.drive.files',component: DriveFileLists,
                    },
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
    if(to.meta && 'service' in to.meta){
        switch(to.meta.service){
            case "SPREADSHEET":{
                callData.push(checkTokenStatus(to.params.id))
            } break
            case "DRIVE" : {
                callData.push(callData.push(checkTokenStatus(to.params.id).then((res)=>{
                    if(res.ok){
                        return store.dispatch(`getDriveInfo`,to.params.id).then((res)=>{
                            if(res.ok){
                                return store.dispatch(`getDriveFolders`,to.params.id).then((res)=>{
                                    console.log(res)
                                })
                            }
                        })
                    }
                })))
            }
        }
        async function checkTokenStatus(id){
            return store.dispatch(`checkStatus`,id).then((res)=>{
                if(!res.ok){
                    store.dispatch('clearNotifications').then(()=>{
                        store.dispatch(`addNotification`,{
                            type: "warning",
                            message: res.message
                        })
                    })
                }
                return res
            })
        }
    }
    if(to.name == 'itech.spreadsheet.sheets'){
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
    if(to.name == 'itech.spreadsheet.sheets.details'){
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
    if(to.name == 'itech.drive.files'){
        callData.push(
            store.dispatch(`getDriveFiles`,{id: to.params.id,fileId: to.params.driveFolderId})
            .then((res)=>{
                console.log(res)
                return res
            })
        )
    }
    return Promise.all(callData)
    .catch((err)=>{
        console.log(err)
    })
}
export default router
