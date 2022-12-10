import {createStore} from 'vuex'
import axiosClient from '../axios/axios'

const userModule = {
    state: ()=>({
        data:{},
        token: sessionStorage.getItem("TOKEN"),
        emailVerified: false
    }),
    actions: {
        async login({commit},data){
            return axiosClient.post('/auth/login',data).then(({data})=>{
                if(data.ok) commit('storeLoginData',data)
                return data;
            }).catch((err)=>{
                return {ok:false,error:err.response.data.message}
            })
        }
    },
    mutations: {
        storeLoginData: (state,data)=>{
            state.data = data
            state.token = data.data.accessToken
        }
    }
}
const servicesModule = {
    state: ()=>({
        type: '',
        data: {},
    }),
    actions: {
        addService({commit},service = {data:'',type: ''}){
            if(service) commit('storeService',service)
        }
    },
    mutations:{
        storeService: (state,service)=>{
            state.data = service.data
            state.type = service.type
        }
    }
}
const spreadsheetModule = {
    state: ()=>({
        data:[]
    }),
    actions: {
        async createProject({commit}, payload){
            return axiosClient.post('/project',payload).then(({data})=>{
                if(data.ok) commit('storeProject', data.data)
                return data
            }).catch((err)=>{
                return err.response.data
            })
        },
        async getSpreadsheetProjects({commit}){
            return axiosClient.get('/project').then(({ data }) => {
                if (data.ok) commit('putProject', data.data)
                return data
            }).catch((err) => {
                return { ok: false, error: err }
            })
        }
    },
    mutations: {
        storeProject: (state,data)=>{
            for(let d of state.data){
                delete d.active
            }
            state.data.push(Object.assign(data, {active: true}))
        },
        putProject: (state,data)=>{
            state.data = data
        }
    }
}
const authModule = {
    state: ()=>({
        
    }),
    actions: {
        async requestAuth({commit},id){
            return axiosClient.get(`/auth/request/code/${id}?service=SPREADSHEET`).then((res)=>{
                console.log(res)
                return res.data
            })
        },
        async authorize({commit},data){
            const configs = {
                headers:{
                    service: data.service
                }
            }
            return axiosClient.post(`/auth/authorize/${data.id}`,{'code':data.code},configs).then(({data})=>{
                return data
            }).catch((err)=>{
                return err
            })
        }
    },
    mutations: {

    }
}
const store = createStore({
    modules: {
        user: userModule,
        auth: authModule,
        spreadsheet: spreadsheetModule,
        services: servicesModule
    }
})

export default store