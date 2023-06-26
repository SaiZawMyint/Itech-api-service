<template>
    <div class="flex flex-col">
        <DropMenu title="Spreadsheet" classes="bg-slate-100" :expend="true"
        :max="{height:'max-h-[400px]'}">
            <template v-slot:helper-btn>
                <button class="px-3 py-2 mx-1 text-sm rounded-lg bg-slate-200 hover:bg-slate-300" @click.stop="importAlertBox.show=true">Import</button>
                <button class="px-3 py-2 mx-1 text-sm rounded-lg bg-slate-200 hover:bg-slate-300" @click.stop="createPrep">Create</button>
            </template>
            <div class="px-2 rounded text-sm">
                <button @click.stop="chooseProjectService(spreadsheet.refId)"
                class="w-full my-1 px-3 py-2 flex items-center justify-between rounded-lg bg-slate-100 cursor-pointer text-slate-800"
                :class="spreadsheetActiveClass(spreadsheet.refId)"
                    v-for="spreadsheet in spreadsheets">
                    <div class="flex items-center max-w-[50%]">
                        <img src="@img/Google_Sheets_Logo.svg" alt="Google Spreadsheet" class="w-3">
                        <span class="px-2 truncate">{{spreadsheet.name}}</span>
                    </div>
                    <div class="flex items-center" v-if="route.params.spreadsheetId == spreadsheet.refId">
                        <button class="w-6 h-6 mx-1 flex bg-slate-200 items-center justify-center rounded-full hover:bg-blue-600/50"
                            @click.stop="edit(spreadsheet)">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                                stroke="currentColor" class="w-4 h-4">
                                <path stroke-linecap="round" stroke-linejoin="round"
                                    d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                            </svg>
                        </button>
                        <button class="w-6 h-6 flex bg-slate-200 items-center justify-center rounded-full hover:bg-red-600/50"
                            @click.stop="alertDelete(spreadsheet.refId)">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                                stroke="currentColor" class="w-4 h-4">
                                <path stroke-linecap="round" stroke-linejoin="round"
                                    d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                            </svg>
                        </button>
                        <a :href="spreadsheet.link" target="_blank"
                            class="w-6 mx-1 h-6  bg-slate-200 flex items-center justify-center rounded-full hover:bg-green-600/50">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                                stroke="currentColor" class="w-4 h-4">
                                <path stroke-linecap="round" stroke-linejoin="round"
                                    d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
                            </svg>
                        </a>
                    </div>
                </button>
                <div class="p-2" v-if="!spreadsheets || spreadsheets.length == 0">
                    <p class="text-center w-full text-slate-500">You dosen't have any spreadsheet yet</p>
                    <button class="px-3 py-2 rounded-lg bg-slate-300 text-slate-800 mx-auto block" @click="createPrep">Create Spreadsheet</button>
                </div>
            </div>
        </DropMenu>
    </div>
    <Transition name="alert">
        <ModalBox :title="createSpreadsheetOption.isEditing? 'Rename a Spreadsheet': 'Create a Spreadsheet'" v-if="createSpreadsheetOption.show" :show="createSpreadsheetOption.show"
            @on-close="createSpreadsheetOption.show = false" width="w-[400px]">
            <template v-slot:icon>
                <div class="w-10 h-10 mt-7 flex items-center bg-green-500/80 text-gray-100 justify-center rounded-full">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
                        class="w-6 h-6">
                        <path stroke-linecap="round" stroke-linejoin="round"
                            d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m3.75 9v6m3-3H9m1.5-12H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                    </svg>
                </div>
            </template>
            <template v-slot:content>
                <p class="text-center">{{createModalText}} spreadsheet</p>
                <form @submit.prevent="createNewSpreadsheet" class="p-2 w-[80%] mx-auto mb-2">
                    <input v-model="spreadsheetInput.value" type="text" class="appereance-none px-3 py-2 w-full rounded-lg" placeholder="Spreadsheet name">
                    <div class="flex items-center justify-center p-4">
                        <button 
                        type="submit"
                        v-if="spreadsheetInput.value && !spreadsheetInput.valid" class="px-4 py-2 ring-slate-200 ring-2 rounded-lg ml-4 btn primary">{{createModalText}}</button>
                        <span v-else
                            class="flex items-center jsutify-between px-3 py-2 ring-slate-200 ring-2 rounded-lg ml-4 bg-slate-400 text-slate-800 cursor-not-allowed">
                            <img src="@img/loading-icon.svg" alt="" class="w-6 h-6 mr-2" v-if="createSpreadsheetOption.loading">
                            <span>{{createModalText}}</span>
                        </span>
                    </div>
                </form>
            </template>
        </ModalBox>
    </Transition>
    <Transition name="alert">
        <ModalBox title="Delete Spreadsheet" v-if="deleteAlertBox.show" :show="deleteAlertBox.show" @on-close="deleteAlertBox.show = false">
            <template v-slot:icon>
                <div class="w-10 h-10 mt-7 flex items-center bg-red-600/80 text-gray-100 justify-center rounded-full">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                        stroke="currentColor" class="w-6 h-6">
                        <path stroke-linecap="round" stroke-linejoin="round"
                            d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                    </svg>
                </div>
            </template>
            <template v-slot:content>
                <p class="p-2 text-center text-red-400">Are you sure?</p>
            </template>
            <template v-slot:footer>
                <div class="flex items-center justify-center my-2 text-sm pt-3">
                    <button class="px-3 py-2 rounded mx-2 hover:bg-[#0000004c]"
                        @click="deleteAlertBox.show = false">Cancel</button>
                    <button class="px-3 py-2 rounded mx-2 bg-red-500 hover:bg-red-300 text-white"
                        @click="deleteSpreadsheet">Delete</button>
                </div>
            </template>
        </ModalBox>
    </Transition>
    <Transition name="alert">
        <ModalBox title="Import Spreadsheet" v-if="importAlertBox.show" :show="importAlertBox.show"
            @on-close="importAlertBox.show = false" width="w-[400px]">
            <template v-slot:icon>
                <div class="w-10 h-10 mt-7 flex items-center bg-green-600/80 text-gray-100 justify-center rounded-full">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
                        class="w-6 h-6">
                        <path stroke-linecap="round"
                            d="M16.5 12a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0zm0 0c0 1.657 1.007 3 2.25 3S21 13.657 21 12a9 9 0 10-2.636 6.364M16.5 12V8.25" />
                    </svg>
                </div>
            </template>
            <template v-slot:content>
                <p class="p-2 text-center text-slate-400 text-sm">Please import your Spreadsheet</p>
                <div class="p-2 w-[70%] mx-auto mb-4">
                    <div class="flex  rounded-lg overflow-hidden ring-1 ring-slate-400 text-sm">
                        <input v-model="importId" type="text" class="appereance-none px-3 py-2 w-full" placeholder="Spreadsheet Id">
                        <button class="px-3 hover:font-bold" @click="importSheet">Import</button>
                    </div>
                </div>
            </template>
        </ModalBox>
    </Transition>
</template>

<script setup>
import { computed } from '@vue/reactivity';
import { onBeforeMount, ref, toRef } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useStore } from 'vuex';
import DropMenu from '../../../itech/UI/DropMenu.vue';
import ModalBox from '../../../LightUI/ModalBox.vue';
const props = defineProps({
    id: {
        type: String,
        default: 1
    }
})
const store = useStore()
const route = useRoute()
const router = useRouter()
const importAlertBox=ref({
    show: false
})
const importId = ref('')
const spreadsheets = toRef(store.state.spreadsheet,'data')
const spreadsheetInput = ref({value:'',valid: false,selectedId: null})
const createSpreadsheetOption = ref({show:false,isEditing: false,loading: false})
const deleteAlertBox = ref({show:false})

const getParams = (id)=>{
    let param = Object.assign({},route.params)
    param.spreadsheetId = id
    return param
}

const createPrep = function(){
    createSpreadsheetOption.value.show = true
    spreadsheetInput.value.value = ''
    createSpreadsheetOption.value.isEditing = false
}
const createNewSpreadsheet = function(){

    spreadsheetInput.value.valid = true
    
    let payload = {
        id: props.id, payload: { name: spreadsheetInput.value.value }
    }
    if(createSpreadsheetOption.value.isEditing){
        payload.spreadsheetId = spreadsheetInput.value.selectedId 
    }
    createSpreadsheetOption.value.loading = true
    store.dispatch(createSpreadsheetOption.value.isEditing ? `updateSpreadsheet` : `createSpreadsheet`,payload).then((res)=>{
        spreadsheetInput.value.valid = false
        createSpreadsheetOption.value.loading = false
        if(res.ok){
            createSpreadsheetOption.value.show = false
            spreadsheetInput.value.value = null
            store.dispatch('clearNotifications').then(()=>{
                store.dispatch(`addNotification`,{
                    type: "noti",
                    message: res.message
                })
            })
            
        }else{
            console.log(res)
            store.dispatch(`addNotification`,{
                    type: "error",
                    message: res.message
                })
        }
    });
}
const edit = function(spreadsheet){
    createSpreadsheetOption.value.show = true
    spreadsheetInput.value.value = spreadsheet.name
    spreadsheetInput.value.selectedId = spreadsheet.refId
    createSpreadsheetOption.value.isEditing = true
}
const alertDelete = function(id){
    spreadsheetInput.value.selectedId = id
    spreadsheetInput.value.value = 
    deleteAlertBox.value.show = true
}
const deleteSpreadsheet = function(){
    store.dispatch(`deleteSpreadsheet`,{pid: props.id, spreadsheetId: spreadsheetInput.value.selectedId}).then((res)=>{
        if(res.ok){
            deleteAlertBox.value.show = false
            router.back()
            store.dispatch('clearNotifications').then(()=>{
                store.dispatch(`addNotification`,{
                    type: "noti",
                    message: res.message
                })
            })
        }
        
    })
}
const createModalText = computed(()=>{
    return createSpreadsheetOption.value.isEditing ? "Update" : "Create"
})
const chooseProjectService= (id)=>{
    router.push({name: 'itech.spreadsheet.sheets',params:getParams(id)})
}
const spreadsheetActiveClass = function(id){
    if(route.params.spreadsheetId == id){
        return 'bg-slate-400 hover:bg-slate-400/80';
    }
    return 'hover:bg-slate-200';
}
const importSheet = function(){
    if(!importId.value){
         store.dispatch('clearNotifications').then(()=>{
                store.dispatch(`addNotification`,{
                    type: "error",
                    message:  "Spreadsheet id cannot be null"
                })
            })
            return false;
    }
    let payload = {
        id: props.id, payload: { spreadsheetId: importId.value }
    }
    store.dispatch(`importSpreadsheet`,payload).then((res)=>{
        if(!res.ok){
            store.dispatch('clearNotifications').then(()=>{
                store.dispatch(`addNotification`,{
                    type: "error",
                    message:  res.error && res.error.message ? res.error.message : res.message
                })
            })
        }else{
            importAlertBox.value.show = false
        }
    })
}
onBeforeMount(() => {
    store.dispatch(`getSpreadsheets`,props.id).then((res)=>{
        console.log(res)
        if(res.ok){
            store.state.auth.status = false
            spreadsheets.value = res.data
        }else{
            store.state.auth.status = true
            store.state.auth.tokenAlertBox.show = true
        }
        
    }).catch((err)=>{
        console.log("Error : "+err)
    })
})

</script>