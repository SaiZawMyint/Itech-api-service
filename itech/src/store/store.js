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
                return {ok:false,error:err}
            })
        }
    },
    mutations: {
        storeLoginData: (state,data)=>{
            state.data = data
            sessionStorage.setItem("TOKEN",data.data.accessToken)
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
                return {ok:false,error:err}
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
            state.data.push(data)
        },
        putProject: (state,data)=>{
            state.data = data
        }
    }
}
const store = createStore({
    modules: {
        user: userModule,
        spreadsheet: spreadsheetModule
    }
})

export default store