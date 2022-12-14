<template>
    <div class="w-full p-2">
        <div class="flex items-center my-3 text-sm">
            <input readonly v-model="sheetProps.name" type="text"
                class="appereance-none px-3 py-2 mr-2 rounded-lg ring-slate-100 border-2" placeholder="Sheet Name">
                <div class="flex p-1 rounded">
                    <div class="mx-1 flex items-center justify-between">
                        <button @click="remove('row')" class="w-6 h-6 hover:bg-gray-200/40 rounded-lg bg-gray-200 flex items-center justify-center">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
                                class="w-4 h-4">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M18 12H6" />
                            </svg>
                        </button>
                        <input v-model="getOperationData.ROW" type="number" name=""
                            class="w-[60px] text-right mx-1 rounded border-2 px-2 py-1" id="" placeholder="Row">
                        <button @click="add('row')" class="w-6 h-6 hover:bg-gray-200/40 rounded-lg bg-gray-200 flex items-center justify-center">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
                                class="w-4 h-4">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                            </svg>
                        </button>
                    </div>
                    <div class="mx-1 flex items-center justify-between">
                        <button @click="remove('column')" class="w-6 h-6 hover:bg-gray-200/40 rounded-lg bg-gray-200 flex items-center justify-center">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
                                class="w-4 h-4">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M18 12H6" />
                            </svg>
                        </button>
                        <input v-model="getOperationData.COLUMN" type="number" name=""
                            class="w-[80px] text-right mx-1 rounded border-2 px-2 py-1" id="" placeholder="Column">
                        <button @click="add('column')" class="w-6 h-6 hover:bg-gray-200/40 rounded-lg bg-gray-200 flex items-center justify-center">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
                                class="w-4 h-4">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                            </svg>
                        </button>
                    </div>
                    <!-- <button class="mx-2 rounded-lg px-2 py-1 bg-slate-300">
                        Add
                    </button> -->
                </div>
        </div>
        <div class="flex items-center justify-center my-2">
            <div class="w-full flex items-center justify-start overflow-hidden rounded-md ring-slate-200 ring-2  text-sm">
                <span class="px-3 py-2 bg-gray-200 min-w-[fit-content] max-w-[20%]">
                    Selected Cell
                </span>
                <input type="text" id="references" class="appereance-none w-full px-3 py-2" name="">
            </div>
        </div>
        <div class="w-full rounded-lg shadow overflow-hidden">
            <Table v-bind:data="sheetProps.values" @table-click="tableClick"/>
        </div>
    </div>
</template>

<script setup>
import { computed } from '@vue/reactivity';
import { toRef,ref } from 'vue';
import { useRoute } from 'vue-router';
import { useStore } from 'vuex';
import itechObject from '../../../../../../js/itech-objects';
import Table from '../../../../itech/Widgets/Table.vue';
const store = useStore()
const sheetProps = toRef(store.state.sheet,'data')
const route = useRoute()

const getOperationData = computed(()=>{

    if(!sheetProps.value.values) return {ROW: 0,COLUMN:0}

    const maxIndex = itechObject(sheetProps.value.values).max()

    return{
        ROW: sheetProps.value.values.length,
        COLUMN: sheetProps.value.values[maxIndex].length
    }
})
const tableClick = function(data){
    let ref = document.getElementById('references')
    ref.value = data.innerText
}
const add = function(direction){
    switch(direction){
        case "row":{addRowRequest()}break;
        case "column":{addColumnRequest()}break;
    }
}
const addRowRequest = ()=>{

    let rangeRequest = "";

    let payload = Object.assign(route.params, {range: "A1:J10"})
}
</script>