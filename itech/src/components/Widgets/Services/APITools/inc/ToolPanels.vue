<template>
    <div id="tool-panel" class="fixed top-0 left-0 w-[25%] p-2" style="top: 50px;height: calc(100% - 50px);z-index: 99;">
        <div class="flex flex-col rounded-lg shadow h-full bg-slate-50">
            <div class="px-3 py-2 border-b-2 flex items-center justify-between">
                {{route.meta.service}}
                <button @click="openAuthorize" class="relative px-3 py-1 rounded-lg bg-slate-100 hover:bg-slate-100/50">
                    Authorize
                    <span class="float-noti alert shadow-lg ring-2 ring-red-200" v-if="!store.state.auth.status"></span>
                </button>
            </div>
            <SpreadsheetTools v-if="getServiceTools.isSpreadsheetService()" :id="route.params.id" />
            <DriveTools v-if="getServiceTools.isDriveService()" :id="route.params.id"/>
        </div>
        <button
        id="tool-panel-hider"
        @click="hideToolPanel"
            class="absolute top-[20px] right-[-8px] flex items-center justify-center rounded-full w-6 h-6 bg-slate-200 ring-slate-300 ring-1 hover:bg-slate-200/50">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                stroke="currentColor" class="w-4 h-4">
                <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
            </svg>
        </button>
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
                        <input v-model="code" type="text" class="appereance-none px-3 py-2 w-full"
                            placeholder="Enter auth code">
                        <button class="px-3 hover:font-bold" @click="authorize">Authorize</button>
                    </div>
                </div>
            </template>
        </ModalBox>
    </Transition>

</template>

<script setup>
import { onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useStore } from 'vuex';
import SpreadsheetTools from '../spreadsheet/SpreadsheetTools.vue';
import ModalBox from '../../../LightUI/ModalBox.vue';
import itechDom from '../../../../../js/itech-dom'
import { computed } from '@vue/reactivity';
import DriveTools from '../drive/DriveTools.vue';

const store = useStore()
const route = useRoute()
const router = useRouter()
const tokenURL = ref("")
const code = ref("")
const tokenAlertBox=ref(store.state.auth.tokenAlertBox)
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
    store.dispatch('authorize',{service: route.meta.service,id: route.params.id, code: code.value}).then((res)=>{
        if(res.ok){
            store.dispatch('clearNotifications')
            tokenAlertBox.value.show = false
            code.value = ""
            switch(route.meta.service){
                case "SPREADSHEET":{
                    router.push({
                        name: 'itech.spreadsheet.shome',
                        params: {
                            id: route.params.id
                        }
                    })
                }break
                case "DRIVE":{
                    router.push({
                        name: 'itech.drive.shome',
                        params: {
                            id: route.params.id
                        }
                    })
                }break
            }
        }
    })
}
const hideToolPanel = function(e){
    const element = e.target
    itechDom(element).toggleClass('active');
    itechDom('#tool-panel').toggleClass('hide');
    itechDom(document.getElementById('tool-panel').firstElementChild).toggleClass('overflow-hidden')
    itechDom('#tool-dashboard').toggleClass('wide');
}
const getServiceTools = computed(()=>{
    return {
        isSpreadsheetService: ()=>{
            return route.meta.service === 'SPREADSHEET'
        },
        isDriveService: ()=>{
            return route.meta.service === 'DRIVE'
        }
    }
})
onMounted(()=>{
    tokenURL.value = `http://localhost:8001/itech/api/auth/request/code/${route.params.id}?service=${route.meta.service}&u_token=${store.state.user.token}`
})

</script>