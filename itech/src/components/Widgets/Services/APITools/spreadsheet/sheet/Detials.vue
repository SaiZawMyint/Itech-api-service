<template>
    <div class="w-full p-2">
        <div class="flex items-center my-3 text-sm">
            <input readonly v-model="sheetProps.name" type="text"
                class="appereance-none px-3 py-2 mr-2 rounded-lg ring-slate-100 border-2" placeholder="Sheet Name">
            <button @click="filterBox.show = true"
                class="px-3 py-2 rounded bg-slate-200 hover:bg-slate-100 flex items-center jsutify-center">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-4 h-4"
                    stroke="2">
                    <path
                        d="M10 3.75a2 2 0 10-4 0 2 2 0 004 0zM17.25 4.5a.75.75 0 000-1.5h-5.5a.75.75 0 000 1.5h5.5zM5 3.75a.75.75 0 01-.75.75h-1.5a.75.75 0 010-1.5h1.5a.75.75 0 01.75.75zM4.25 17a.75.75 0 000-1.5h-1.5a.75.75 0 000 1.5h1.5zM17.25 17a.75.75 0 000-1.5h-5.5a.75.75 0 000 1.5h5.5zM9 10a.75.75 0 01-.75.75h-5.5a.75.75 0 010-1.5h5.5A.75.75 0 019 10zM17.25 10.75a.75.75 0 000-1.5h-1.5a.75.75 0 000 1.5h1.5zM14 10a2 2 0 10-4 0 2 2 0 004 0zM10 16.25a2 2 0 10-4 0 2 2 0 004 0z" />
                </svg>
                <span class="px-2">Filter</span>
            </button>

        </div>
        <div class="flex items-center justify-center my-2">
            <div
                class="w-full flex items-center justify-start overflow-hidden rounded-md ring-slate-200 ring-2  text-sm">
                <span class="px-3 py-2 bg-gray-200 min-w-[fit-content] max-w-[20%]">
                    Selected Cell
                </span>
                <input type="text" id="references" class="appereance-none w-full px-3 py-2" name="">
            </div>
        </div>
        <div class="w-full rounded-lg shadow overflow-hidden">
            <Table v-bind:data="sheetProps.values" @table-click="tableClick" />
        </div>
    </div>
    <Transition name="alert">
        <ModalBox title="Filters" v-if="filterBox.show" :show="filterBox.show"
            @on-close="filterBox.show = false" width="w-[400px]">
            <template v-slot:icon>
                <div class="w-10 h-10 mt-7 flex items-center bg-green-600/80 text-gray-100 justify-center rounded-full">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-4 h-4"
                        stroke="2">
                        <path
                            d="M10 3.75a2 2 0 10-4 0 2 2 0 004 0zM17.25 4.5a.75.75 0 000-1.5h-5.5a.75.75 0 000 1.5h5.5zM5 3.75a.75.75 0 01-.75.75h-1.5a.75.75 0 010-1.5h1.5a.75.75 0 01.75.75zM4.25 17a.75.75 0 000-1.5h-1.5a.75.75 0 000 1.5h1.5zM17.25 17a.75.75 0 000-1.5h-5.5a.75.75 0 000 1.5h5.5zM9 10a.75.75 0 01-.75.75h-5.5a.75.75 0 010-1.5h5.5A.75.75 0 019 10zM17.25 10.75a.75.75 0 000-1.5h-1.5a.75.75 0 000 1.5h1.5zM14 10a2 2 0 10-4 0 2 2 0 004 0zM10 16.25a2 2 0 10-4 0 2 2 0 004 0z" />
                    </svg>
                </div>
            </template>
            <template v-slot:content>
                <div class="flex flex-col p-1 rounded mx-auto mt-4">
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
                                <input v-model="operations.start.range" type="text" class="w-[40%] uppercase px-2 py-1 bg-slate-200">
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
                                <input v-model="operations.end.range" type="text" class="w-[40%] uppercase px-2 py-1 bg-slate-200">
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
                    <!-- <button class="mx-2 rounded-lg px-2 py-1 bg-slate-300">
                        Add
                    </button> -->
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
import itechObject from '../../../../../../js/itech-objects';
import Table from '../../../../itech/Widgets/Table.vue';
import ModalBox from '../../../../LightUI/ModalBox.vue';

import {spreadsheet} from '../../../../../../js/script'

const store = useStore()
const sheetProps = toRef(store.state.sheet,'data')
const route = useRoute()
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
    return `${operations.value.start.range}${operations.value.start.index}:${operations.value.end.range}${operations.value.end.index}`
})
const applyFilter = function(){
    let payload = Object.assign(route.params, {range: rangeToString.value})
    store.dispatch(`getSheetDetailData`,payload).then((res)=>{
            filterBox.value.show = false
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
            }
        })
}
</script>