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

const store = createStore({
    modules: {
        user: userModule
    }
})

export default store