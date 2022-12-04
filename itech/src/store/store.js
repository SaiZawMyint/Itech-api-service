import {createStore} from 'vuex'

const userModule = {
    state: ()=>({
        data:{},
        token: null,
        emailVerified: false
    }),
    actions: {

    }
}

const store = createStore({
    modules: {
        user: userModule
    }
})

export default store