import { useStore } from "vuex";

const store = useStore()
export function pushNotification(data){
    store.dispatch(`addNotification`,data).then((res)=>{
        console.log(res)
    });
}