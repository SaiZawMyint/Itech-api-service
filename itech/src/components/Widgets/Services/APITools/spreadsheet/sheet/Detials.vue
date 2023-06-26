<template>
    <div class="w-full p-2">
        <div class="flex items-center my-3 text-sm justify-between">
            <div class="flex items-center">
                <input readonly v-model="sheetProps.name" type="text"
                    class="appereance-none px-3 py-2 mr-2 rounded-lg ring-slate-100 border-2" placeholder="Sheet Name">
                <button @click="filterBox.show = true"
                    class="px-3 py-2 rounded bg-slate-200 hover:bg-slate-100 flex items-center jsutify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-4 h-4" stroke="2">
                        <path
                            d="M10 3.75a2 2 0 10-4 0 2 2 0 004 0zM17.25 4.5a.75.75 0 000-1.5h-5.5a.75.75 0 000 1.5h5.5zM5 3.75a.75.75 0 01-.75.75h-1.5a.75.75 0 010-1.5h1.5a.75.75 0 01.75.75zM4.25 17a.75.75 0 000-1.5h-1.5a.75.75 0 000 1.5h1.5zM17.25 17a.75.75 0 000-1.5h-5.5a.75.75 0 000 1.5h5.5zM9 10a.75.75 0 01-.75.75h-5.5a.75.75 0 010-1.5h5.5A.75.75 0 019 10zM17.25 10.75a.75.75 0 000-1.5h-1.5a.75.75 0 000 1.5h1.5zM14 10a2 2 0 10-4 0 2 2 0 004 0zM10 16.25a2 2 0 10-4 0 2 2 0 004 0z" />
                    </svg>
                    <span class="px-2">Filter</span>
                </button>
                <a :href="sheetLink" target="_blank" rel="noopener noreferrer"
                    class="w-8 h-8 bg-green-300 mx-2 flex items-center justify-center rounded-lg">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
                        class="w-4 h-4">
                        <path stroke-linecap="round" stroke-linejoin="round"
                            d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
                    </svg>
                </a>
            </div>
            <div class="flex items-center">
                <form @submit.prevent="searchCell" class="flex rounded-lg overflow-hidden ring-1 ring-slate-400 text-sm">
                    <input @input="searchChanges" v-model="searchOption.input" type="search" class="appereance-none px-3 py-2 w-full" placeholder="Search">
                    <div class="flex items-center bg-slate-100 p-1 rounded" v-if="searchOption.match">
                        <button type="button"
                        @click.stop="flowSearch('up')" class=" w-5 h-5 flex items-center justify-center">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor"
                                class="w-4 h-4">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 15.75l7.5-7.5 7.5 7.5" />
                            </svg>
                        </button>
                        <span class="px-2 text-sm">{{`${searchable.active + 1 }/${searchable.data.length}`}}</span>
                        <button type="button" @click.stop="flowSearch('down')" class=" w-5 h-5 flex items-center justify-center">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor"
                                class="w-4 h-4">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                            </svg>
                        </button>
                    </div>
                    <button v-else type="submit" class="w-10 bg-slate-200 hover:bg-slate-300 flex items-center justify-center" >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
                            class="w-4 h-4">
                            <path stroke-linecap="round" stroke-linejoin="round"
                                d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                        </svg>
                    </button>
                </form>
            </div>
        </div>
        <div class="flex items-center justify-center my-2">
            <div
                class="w-full flex items-center justify-start overflow-hidden rounded-md ring-slate-200 ring-2  text-sm">
                <span class="px-3 py-2 bg-gray-200 min-w-[fit-content] max-w-[20%]">
                    Selected Cell
                </span>
                <input type="text" id="references" autocomplete="off" class="appereance-none w-full px-3 py-2" name="">
            </div>
        </div>
        <div class="w-full rounded-lg shadow overflow-hidden mb-4">
            <Table v-bind:data="sheetProps.values" :selected="selectedProps" @table-click="tableClick" 
            id="record-table"
            v-if="refreshTable"
            />
        </div>
    </div>
    <Transition name="alert">
        <ModalBox title="Filters" v-if="filterBox.show" :show="filterBox.show"
            @on-close="filterBox.show = false" width="w-[400px]">
            <template v-slot:icon>
                <div class="w-10 h-10 mt-7 flex items-center btn text-gray-100 justify-center rounded-full">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-4 h-4"
                        stroke="2">
                        <path
                            d="M10 3.75a2 2 0 10-4 0 2 2 0 004 0zM17.25 4.5a.75.75 0 000-1.5h-5.5a.75.75 0 000 1.5h5.5zM5 3.75a.75.75 0 01-.75.75h-1.5a.75.75 0 010-1.5h1.5a.75.75 0 01.75.75zM4.25 17a.75.75 0 000-1.5h-1.5a.75.75 0 000 1.5h1.5zM17.25 17a.75.75 0 000-1.5h-5.5a.75.75 0 000 1.5h5.5zM9 10a.75.75 0 01-.75.75h-5.5a.75.75 0 010-1.5h5.5A.75.75 0 019 10zM17.25 10.75a.75.75 0 000-1.5h-1.5a.75.75 0 000 1.5h1.5zM14 10a2 2 0 10-4 0 2 2 0 004 0zM10 16.25a2 2 0 10-4 0 2 2 0 004 0z" />
                    </svg>
                </div>
            </template>
            <template v-slot:content>
                <div class="flex flex-col p-1 rounded mx-auto mt-2">
                    <div class="w-full my-1 flex items-center justify-center">
                        <label class="w-[30%]">Row</label>
                        <div class="p-2 flex items-center">
                            <button @click="remove('row')"
                                class="w-6 h-6 hover:bg-slate-300/40 rounded-lg bg-slate-300 flex items-center justify-center">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                    stroke-width="1.5" stroke="currentColor" class="w-4 h-4">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M18 12H6" />
                                </svg>
                            </button>
                            <div
                                class="flex mx-1 items-center max-w-[100px] rounded ring-2 ring-slate-300 overflow-hidden">
                                <input v-model="operations.start.range" type="text" class="w-[40%] text-center uppercase px-2 py-1 bg-slate-200">
                                <input v-model="operations.start.index" type="number" name=""
                                    class="w-[60%] text-right px-2 py-1" id="" placeholder="Row">
                            </div>
                            <button @click="add('row')"
                                class="w-6 h-6 hover:bg-slate-300/40 rounded-lg bg-slate-300 flex items-center justify-center">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                    stroke-width="1.5" stroke="currentColor" class="w-4 h-4">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                                </svg>
                            </button>
                        </div>
                    </div>
                    <div class="w-full my-1 flex items-center justify-center">
                        <label  class="w-[30%]">Column</label>
                        <div class="p-2 flex items-center">
                            <button @click="remove('column')"
                                class="w-6 h-6 hover:bg-slate-300/40 rounded-lg bg-slate-300 flex items-center justify-center">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                    stroke-width="1.5" stroke="currentColor" class="w-4 h-4">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M18 12H6" />
                                </svg>
                            </button>
                            <div
                                class="flex mx-1 items-center max-w-[100px] rounded ring-2 ring-slate-300 overflow-hidden">
                                <input v-model="operations.end.range" type="text" class="w-[40%] text-center uppercase px-2 py-1 bg-slate-200">
                                <input v-model="operations.end.index" type="number" name=""
                                    class="w-[60%] text-right px-2 py-1" id="" placeholder="Column">
                            </div>
                            <button @click="add('column')"
                                class="w-6 h-6 hover:bg-slate-300/40 rounded-lg bg-slate-300 flex items-center justify-center">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                    stroke-width="1.5" stroke="currentColor" class="w-4 h-4">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                                </svg>
                            </button>
                        </div>

                    </div>
                </div>
            </template>
            <template v-slot:footer>
                <div class="flex items-center justify-center my-2 text-sm pt-3">
                    <button class="px-3 py-2 rounded mx-2 hover:bg-[#0000004c]"
                        @click="filterBox.show = false">Cancel</button>
                    <button class="px-3 py-2 rounded mx-2 btn text-white"
                        @click="applyFilter">Apply</button>
                </div>
            </template>
        </ModalBox>
    </Transition>
</template>

<script setup>
import { computed } from '@vue/reactivity';
import { toRef,ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { useStore } from 'vuex';
import Table from '../../../../itech/Widgets/Table.vue';
import ModalBox from '../../../../LightUI/ModalBox.vue';

import {spreadsheet} from '../../../../../../js/script'
import itechObject from '../../../../../../js/itech-objects';

const store = useStore()
const sheetProps = toRef(store.state.sheet,'data')
const selectedProps = ref([{row:undefined,column: undefined}])
const route = useRoute()
const refreshTable = ref(true)
const operations = ref({
    start: {
        range: ``,
        index: 0
    },
    end: {
        range: ``,
        index: 0
    }
})
const filterBox=ref({
    show: false
})
const sheetLink = computed(()=>{
    return `https://docs.google.com/spreadsheets/d/${route.params.spreadsheetId}/edit#gid=${route.params.sheetId}`
})
onMounted(()=>{
    operations.value = spreadsheet.getRange(sheetProps.value.range)
})
const tableClick = function(data){
    let ref = document.getElementById('references')
    ref.value = data.innerText
}
const add = function(direction){
    switch(direction){
        case "row":{
            operations.value.start.index ++
        }break;
        case "column":{
            operations.value.end.index ++
        }break;
    }
}
const remove = function(direction){
    switch(direction){
        case "row":{
            if(operations.value.start.index > 1)
                operations.value.start.index--
        }break;
        case "column":{
            if(operations.value.end.index > 1)
                operations.value.end.index--
        }break;
    }
}
const rangeToString = computed(()=>{
    let startRange = operations.value.start.range == null ? "A":operations.value.start.range
    let startIndex = operations.value.start.index == null ? "A":operations.value.start.index
    let endRange = operations.value.end.range == null ? "A":operations.value.end.range
    let endIndex = operations.value.end.index == null ? "A":operations.value.end.index
    return `${startRange}${startIndex}:${endRange}${endIndex}`
})
const applyFilter = function(){
    let payload = Object.assign(route.params, {range: rangeToString.value})
    store.state.setting.progress = true;
    store.dispatch(`getSheetDetailData`,payload).then((res)=>{
            filterBox.value.show = false
            store.state.setting.progress = false
            if(!res.ok){
                store.dispatch(`addNotification`,{
                    type: "error",
                    message: res.error.message ? res.error.message : res.message
                })
            }else{
                store.dispatch('clearNotifications').then(()=>{
                    store.dispatch(`addNotification`, {
                        type: "noti",
                        message: "Apply filter success!"
                    })
                })
                refreshTable.value = false;
                refreshTable.value = true;
            }
        })
}
const searchOption = ref({
    input: '',
    match: false
})
const searchable = ref({active: 0,data:[]})
const searchCell = function(){
    if(!searchOption.value.input) return false;
    const data = (itechObject().search2DArray(sheetProps.value.values).search(searchOption.value.input,false))
    let table = (document.querySelector('#record-table tbody'))
    clearTable()
    if(table){
        let first = false;
        data.forEach(d=>{
            for (let i = 0; i < table.childElementCount; i++) {
                searchOption.value.match = true
                if(d.row == i) {
                    if(!first){
                        first = true
                        table.children[i].scrollIntoView({ block: 'center',  behavior: 'smooth' })
                        searchable.value.active = 0
                    }
                    if(!table.children[i].classList.contains('search-selected')){
                        table.children[i].classList.add('search-selected')
                        searchable.value.data.push(table.children[i])
                    }
                }
            }
        })
    }
}
const flowSearch = function(dir){
    let selected = document.querySelectorAll('.search-active');
    for(let i = 0; i< selected.length;i++){
        selected[i].classList.remove('search-active')
    }
    switch(dir){
        case "up": {
            if(searchable.value.active == 0 ){
                searchable.value.active = searchable.value.data.length
                // return false;
            } 
            let active = searchable.value.active - 1
            console.log(searchable.value)
            searchable.value.data[active].scrollIntoView({ block: 'center',  behavior: 'smooth' })
            searchable.value.data[active].classList.add('search-active')
            searchable.value.active = active
        }break;
        case "down": {
            if(searchable.value.active == searchable.value.data.length - 1){
                searchable.value.active = -1
                // return false
            } 
            let active = searchable.value.active + 1
            console.log(searchable.value)
            searchable.value.data[active].scrollIntoView({ block: 'center',  behavior: 'smooth' })
            searchable.value.data[active].classList.add('search-active')
            searchable.value.active = active
        } break;
    }
}
const searchChanges = function(){
    searchOption.value.match = false
    clearTable()
}
const clearTable = ()=>{
    let selected = document.querySelectorAll('#record-table tbody tr');
    for(let i = 0; i< selected.length;i++){
        selected[i].classList.remove('search-selected')
    }
    let searchactive = document.querySelectorAll('.search-active');
    for(let i = 0; i< searchactive.length;i++){
        searchactive[i].classList.remove('search-active')
    }
    searchable.value = {active: 0,data:[]}
}
</script>
<style>
.search-selected{
    box-shadow: inset 0px 0px 0px 2px #04c9f1;
}
.search-active{
    background-color: #04c9f174;
}
</style>