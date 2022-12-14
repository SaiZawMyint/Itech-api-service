<template>
    <div class="w-full grid grid-cols-6 gap-2" v-if="'spreadsheetId' in route.params && getSheetData">
        <button 
        @dblclick="openSheet(sheet)"
        class="relative flex flex-col text-sm service-block m-2 rounded-lg overflow-hidden shadow text-center ring-slate hover:ring-2 focus:ring-2 hover:shadow-md" 
        v-for="sheet in getSheetData.data">
            <div class="w-full h-full flex items-center justify-center p-2">
                <img src="@img/Google_Sheets_Logo.svg" alt="">
            </div>
            <div class="w-full bg-gray-100 px-3 py-2 truncate">
                {{sheet.name}}
            </div>
            <button 
            @click="edit(sheet)"
            class="float-edit-btn bg-green-400 hover:bg-green-400/50 flex items-center justify-center w-6 h-6 rounded-lg">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
                    class="w-4 h-4">
                    <path stroke-linecap="round" stroke-linejoin="round"
                        d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                </svg>
            </button>
        </button>
        <button 
        @click="showBox"
        class="m-2 min-h-[150px] rounded-lg overflow-hidden border-dashed border-2 border-slate-300 text-slate-300 focus:border-sky-500 focus:text-sky-500 hover:border-sky-500 hover:text-sky-500 flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
                class="w-6 h-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
            </svg>
        </button>
    </div>
    <Transition name="alert">
        <ModalBox :title="createSheetOption.isEditing? 'Rename a Sheet': 'Create a Sheet'" v-if="createSheetOption.show" :show="createSheetOption.show"
            @on-close="createSheetOption.show = false" width="w-[400px]">
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
                <p class="text-center py-2">{{createModalText()}} Sheet</p>
                <form @submit.prevent="createNewSheet" class="p-2 w-[80%] mx-auto mb-2 text-sm">
                    <input v-model="sheetInput.value" type="text" class="appereance-none px-3 py-2 w-full rounded-lg" placeholder="Sheet name">
                    <div class="flex items-center justify-center p-4">
                        <button 
                        type="submit"
                        v-if="sheetInput.value && !sheetInput.valid" class="px-4 py-2 ring-slate-200 ring-2 rounded-lg ml-4 btn primary">{{createModalText()}}</button>
                        <span v-else
                            class="px-4 py-2 ring-slate-200 ring-2 rounded-lg ml-4 bg-slate-400 text-slate-800 cursor-not-allowed">
                            {{createModalText()}}
                        </span>
                    </div>
                </form>
            </template>
        </ModalBox>
    </Transition>
</template>
<script setup>
import { computed } from '@vue/reactivity';
import { useRoute, useRouter } from 'vue-router';
import { useStore } from 'vuex';
import { ref } from 'vue';
import ModalBox from '../../../../LightUI/ModalBox.vue';

const store = useStore()
const route = useRoute()
const router = useRouter()
const getSheetData = computed(()=>{
    return store.state.spreadsheet.sheets.data
})
const sheetInput = ref({value:'',valid: false,selectedId: null})
const createSheetOption = ref({show:false,isEditing: false})
const showBox = function(){
    createSheetOption.value.show = true
    sheetInput.value.value = ''
    createSheetOption.value.isEditing = false
}
const edit = function(sheet){
    createSheetOption.value.show = true
    sheetInput.value.value = sheet.name
    sheetInput.value.selectedId = sheet.sheetId
    console.log(sheet)
    createSheetOption.value.isEditing = true
}
const createNewSheet = function(){
    sheetInput.value.valid = true
    
    let payload = {
        id: route.params.id, payload: { name: sheetInput.value.value }, spreadsheetId: route.params.spreadsheetId
    }
    if(createSheetOption.value.isEditing){
        payload.sheetId = sheetInput.value.selectedId
    }
    store.dispatch(createSheetOption.value.isEditing ? `updateSheet` : `createSheet`,payload).then((res)=>{
        sheetInput.value.valid = false
        console.log(res)
        if(res.ok){
            createSheetOption.value.show = false
            sheetInput.value.value = null
            store.dispatch('clearNotifications').then(()=>{
                store.dispatch(`addNotification`,{
                    type: "noti",
                    message: res.message
                })
            })
        }else{
            store.dispatch(`addNotification`,{
                    type: "error",
                    message: res.error.message
                })
        }
    });
}
const createModalText = function(){
    return createSheetOption.value.isEditing ? "Update" : "Create"
}
const openSheet = function(sheet){
    router.push({name: 'itech.service.sheets.details',params:{spreadsheetId: route.params.spreadsheetId,sheetId: sheet.sheetId}})
}
</script>

<style>
.float-edit-btn{
    position: absolute;
    top: -50px;
    right: 5px;
    transition: top .4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}
.service-block:hover > .float-edit-btn{
    top: 5px
}
</style>