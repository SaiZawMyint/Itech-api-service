import {createStore} from 'vuex'
import axiosClient from '../axios/axios'
import itechObject from '../js/itech-objects'

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
            sessionStorage.setItem("TOKEN",data.data.accessToken)
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
const projectModule = {
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
        },
        
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

const spreadsheetModule = {
    state: ()=>({
        data: []
    }),
    actions: {
        async getSpreadsheets({commit}, id){
            return axiosClient.get(`/spreadsheet/${id}/`).then(({data})=>{
                if(data.ok) commit('storeSpreadsheetProjects',data.data)
                return data
            })
        },
        async createSpreadsheet({commit},payload){
            return axiosClient.post(`/spreadsheet/${payload.id}/create`, payload.payload).then(({data})=>{
                console.log(data)
                if(data.ok) commit('putSpreadsheetData',data.data)
                return data;
            }).catch((err)=>{
                console.log(err)
                return err
            })
        },
        async updateSpreadsheet({commit},payload){
            return axiosClient.put(`/spreadsheet/${payload.id}/${payload.spreadsheetId}`, payload.payload).then(({data})=>{
                console.log(data)
                if(data.ok) commit('updateSpreadsheetData',data)
                return data;
            }).catch((err)=>{
                console.log(err)
                return err
            })
        },
        async deleteSpreadsheet({commit},setting = {pid: 0,spreadsheetId: ''}){
            return axiosClient.delete(`/spreadsheet/${setting.pid}/${setting.spreadsheetId}`).then(({data})=>{
                if(data.ok) commit('removeSpreadsheet',setting.spreadsheetId);
            })
        }
    },
    mutations: {
        storeSpreadsheetProjects: (state,data) =>{
            state.data = data;
        },
        putSpreadsheetData: (state,data) =>{
            state.data.push(data)
        },
        updateSpreadsheetData: (state,data)=>{
            let index = itechObject(state.data).find(data.spreadsheetId,'refId');
            state.data[index] = data
        },
        removeSpreadsheet: (state,spreadsheetId)=>{
            let index = itechObject(state.data).find(spreadsheetId,'refId');
            state.data.splice(index,1)
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
        project: projectModule,
        services: servicesModule,
        spreadsheet: spreadsheetModule
    }
})

export default store