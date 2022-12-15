<template>
    <div class="overflow-auto relative shadow-md sm:rounded-lg dark:bg-gray-700 ring-2 max-h-[500px]">
        <table :id="id" class="w-full text-sm text-left text-gray-500 dark:text-gray-400 border-collapse border">
            <thead class="sticky top-0 text-xs text-gray-700 uppercase bg-gray-300 z-10 dark:bg-gray-700 dark:text-slate-400">
                <tr>
                    <th class="text-center py-3 px-3 border border-slate-200 sticky left-0 top-0 bg-gray-300 z-10">No.</th>
                    <th scope="col" class="py-3 px-6 border border-slate-200 max-w-[300px]" v-for="(t,index) in getTitle">
                        {{t}}
                    </th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(d,index) in data" v-if="data.length > 0"
                    :class="getSelected(index)"
                    class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                    <th class="text-center border border-slate-200 sticky left-0">{{index + 1}}</th>
                    <th :title="x" scope="row" class="py-3 overflow-hidden truncate max-w-[300px] px-4 font-medium border border-slate-200 text-gray-900 whitespace-nowrap dark:text-slate-200"
                     v-for="x in d" @click="click" >
                        {{x}}
                    </th>
                </tr>
                <tr v-else><td :colspan="title.length + 1" class="py-2 text-center">No Data</td></tr>
            </tbody>
        </table>
    </div>
</template>

<script setup>
import { computed } from '@vue/reactivity';
import { defineEmits,ref } from 'vue';
import itechObject from '../../../../js/itech-objects'
const props = defineProps({
    id: {
        type: String,
        default: new Date().getMilliseconds()
    },
    title: {
        type: Array,
        default: []
    },
    data: {
        type: Array,
        default: []
    },
    selected: {
        type: Array,
        default: []
    }
})
const emits = defineEmits(['tableClick'])

const getTitle = computed(()=>{
    if(props.title.length > 0){
        return props.title
    }
    let index = itechObject(props.data).max()
    let t = []
    let i = 0
    if(!props.data[index]) return []
    for(let x of props.data[index]){
        t.push(++i)
    }
    return t
})
const click = function(e){
    const element = e.target;
    if(document.querySelector(".tab-selected"))
        document.querySelector(".tab-selected").classList.remove("tab-selected");
    element.classList.add("tab-selected")
    emits('tableClick',e.target)
}
let first = false;
let search = ref({
    match: false,
    cls: '',
    temp: ''
})
const getSelected = (row)=>{
    let cls = "";
    props.selected.forEach(data => {
        if(data.row == row){
            search.value.match = true;
            search.value.cls = "scroll_"+row
            cls = "selected "+search.value.cls
        }
    })
    return cls
}
</script>
<style>
.tab-selected{
    box-shadow: inset 0px 0px 0px 2px #04bfc2;
}

</style>