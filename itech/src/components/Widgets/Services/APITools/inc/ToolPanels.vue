<template>
    <div class="fixed top-0 left-0 w-[25%] p-2" style="top: 50px;height: calc(100% - 50px)">
        <div class="flex flex-col rounded-lg shadow h-full">
            <div class="px-3 py-2 border-b-2 flex items-center justify-between">
                {{props.type}}
                <button @click="openAuthorize"
                    class="px-3 py-1 rounded-lg bg-slate-100 hover:bg-slate-100/50">Authorize</button>
            </div>
            <SpreadsheetTools :id="route.params.id"></SpreadsheetTools>
        </div>
    </div>
    <Transition name="alert">
        <ModalBox title="Authorization" v-if="tokenAlertBox.show" :show="tokenAlertBox.show"
            @on-close="tokenAlertBox.show = false" width="w-[400px]">
            <template v-slot:icon>
                <div class="w-10 h-10 mt-7 flex items-center bg-green-600/80 text-gray-100 justify-center rounded-full">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                        stroke="currentColor" class="w-6 h-6">
                        <path stroke-linecap="round" stroke-linejoin="round"
                            d="M15.042 21.672L13.684 16.6m0 0l-2.51 2.225.569-9.47 5.227 7.917-3.286-.672zm-7.518-.267A8.25 8.25 0 1120.25 10.5M8.288 14.212A5.25 5.25 0 1117.25 10.5" />
                    </svg>
                </div>
            </template>
            <template v-slot:content>
                <p class="p-2 text-center text-slate-400 text-sm">Click the following <span
                        class="text-slate-800 font-bold">URL</span> to get code</p>
                <a :href="tokenURL" target="_blank"
                    class="text-blue-400 text-center underline text-sm mx-auto block w-[fit-content]">Get authorization
                    code</a>
                <div class="p-2 w-[70%] mx-auto mb-4">
                    <div class="flex  rounded-lg overflow-hidden ring-1 ring-slate-400 text-sm">
                        <input v-model="code" type="text" class="appereance-none px-3 py-2 w-full" placeholder="Enter auth code">
                        <button class="px-3 hover:font-bold" @click="authorize">Authorize</button>
                    </div>
                </div>
            </template>
        </ModalBox>
    </Transition>

</template>

<script setup>
import { defineProps, onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import { useStore } from 'vuex';
import SpreadsheetTools from '../spreadsheet/SpreadsheetTools.vue';
import ModalBox from '../../../LightUI/ModalBox.vue';

const store = useStore()
const route = useRoute()
const tokenURL = ref("")
const code = ref("")
const tokenAlertBox=ref({
    show: false
})
const props = defineProps({
    type:{
        type: String,
        default: 'Itech API'
    },
    data: {
        type: Object,
        default: {}
    }
})
const openAuthorize = function(){
    tokenAlertBox.value.show=true
}
const authorize = function(){
    store.dispatch('authorize',{service: 'SPREADSHEET',id: route.params.id, code: code.value}).then((res)=>{
        if(res.ok){
            tokenAlertBox.value.show = false
            code.value = ""
        }
    })
}
onMounted(()=>{
    tokenURL.value = `http://localhost:8001/itech/api/auth/request/code/${route.params.id}?service=SPREADSHEET&u_token=${store.state.user.token}`
})
</script>

<style lang="scss" scoped>

</style>