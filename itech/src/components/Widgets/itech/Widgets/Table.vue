<template>
    <div class="overflow-x-auto relative shadow-md sm:rounded-lg ring-2">
        <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400 border-collapse border ">
            <thead class="text-xs text-gray-700 uppercase bg-gray-300 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                    <th class="text-center py-3 px-3 border border-slate-200">No.</th>
                    <th scope="col" class="py-3 px-6 border border-slate-200 max-w-[300px]" v-for="(t,index) in getTitle">
                        {{t}}
                    </th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(d,index) in data" v-if="data.length > 0"
                    class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                    <th class="text-center border border-slate-200">{{index + 1}}</th>
                    <th :title="x" scope="row" class="py-3 overflow-hidden truncate max-w-[300px] px-4 font-medium border border-slate-200 text-gray-900 whitespace-nowrap dark:text-white"
                     v-for="x in d" @click="click">
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
import { defineProps,defineEmits } from 'vue';
import itechObject from '../../../../js/itech-objects'
const props = defineProps({
    title: {
        type: Array,
        default: []
    },
    data: {
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
    emits('tableClick',e.target)
}
</script>

<style lang="scss" scoped>

</style>