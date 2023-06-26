<template>
    <div class="overflow-auto relative shadow-md sm:rounded-lg dark:bg-gray-700 ring-2 max-h-[480px]">
        <table :id="id" class="w-full text-sm text-left text-gray-500 dark:text-gray-400 border-collapse border">
            <thead class="sticky top-0  text-xs text-gray-700 uppercase bg-gray-300 z-10 dark:bg-gray-700 dark:text-slate-400">
                <tr>
                    <th class="w-[45px] max-w-[45px] text-center py-3 px-3 border border-slate-200 sticky left-0 top-0 bg-gray-300 z-10">No.</th>
                    <th scope="col" class="relative py-3 px-6 border border-slate-200 overflow-hidden resize-x" 
                    :class="`z[${getTitle.length - index}]`"
                    v-for="(t,index) in getTitle">
                    <span class="absolute w-full h-full top-[50%] p-2 truncate  left-0 translate-y-[-50%] text-center">{{t}}</span>
                        <button 
                        @click="fix($event,index,'column')"
                        class="absolute left-[2px] bottom-[2px] flex items-center justify-center w-4 h-4 rounded lock-helper-btn">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
                                class="w-3 h-3 pointer-events-none">
                                <path stroke-linecap="round" stroke-linejoin="round"
                                    d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
                            </svg>
                        </button>
                    </th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(d,index) in data" v-if="data.length > 0"
                    :class="getSelected(index)"
                    class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                    <th class="relative text-center border border-slate-200 sticky bg-slate-100 left-0"
                    :class="`tab-row-${index}`"
                    >
                        {{index + 1}}
                        <button 
                        @click="fix($event,index,'row')"
                        class="absolute right-[2px] bottom-[2px] flex items-center justify-center w-4 h-4 rounded lock-helper-btn"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
                                class="w-3 h-3 pointer-events-none">
                                <path stroke-linecap="round" stroke-linejoin="round"
                                    d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
                            </svg>
                        </button>
                    </th>
                    <th :title="x" scope="row" class="relative h-[35px] overflow-hidden truncate font-medium border border-slate-200 text-gray-900 whitespace-nowrap dark:text-slate-200"
                     v-for="x in d" @click="click" :class="`tab-row-${index}`">
                     <span class="absolute w-full h-full top-[50%] p-2 truncate  left-0 translate-y-[-50%]">{{x}}</span>
                        
                    </th>
                </tr>
                <tr v-else><td :colspan="title.length + 1" class="py-2 text-center">No Data</td></tr>
            </tbody>
        </table>
    </div>
</template>

<script setup>
import { computed } from '@vue/reactivity';
import { ref } from 'vue';
import itechDom from '../../../../js/itech-dom';
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
const fix=function(e,index,dir){
    let active = e.target.classList.contains('active');
    const table = document.getElementById(props.id)
    switch(dir){
        case 'column':{
            let collections = []
            let thead = table.firstElementChild; // thead
            let tr = thead.firstElementChild; // tr
            collections.push(tr.children[index + 1])

            let tbody = table.children[1]; // tbody
            for(let child of tbody.children){
                collections.push(child.children[index + 1])
            }
            collections.forEach((collect,index)=>{
                if(active){
                    itechDom(collect).removeClass(`sticky left-[45px] top-0 bg-gray-100`)
                    if(index == 0){
                        itechDom(collect).removeClass(`z-10`)
                    }
                }else{
                    itechDom(collect).addClass(`sticky left-[45px] top-0 bg-gray-100`)
                    if(index == 0){
                        itechDom(collect).addClass(`z-10`)
                    }
                }
            })
        }break
        case 'row':{
            let tbody = table.children[1]
            let tr = tbody.children[index]
            if(active){
                itechDom(tr).removeClass(`sticky left-0 top-[40px] bg-gray-100 z-10`)
                itechDom(tr.firstElementChild).addClass('relative')
                itechDom(`.tab-row-${index}`).removeClass('selected-row')
                tr.firstElementChild.removeAttribute("style")
            }else{
                itechDom(tr).addClass(`sticky left-0 top-[40px] bg-gray-100 z-10`)
                itechDom(tr.firstElementChild).removeClass('relative')
                itechDom(tr.firstElementChild).addClass(`sticky left-0 top-[40px] bg-gray-100 z-${props.data.length + index}`)
                tr.firstElementChild.setAttribute("style",`z-index: ${props.data.length + index}`)
                itechDom(`.tab-row-${index}`).addClass('selected-row')
            }
        }break
    }
    itechDom(e.target).toggleClass('active');
}
</script>
<style>
.tab-selected{
    box-shadow: inset 0px 0px 0px 2px #04bfc2;
}
.selected-row{
    background-color: #cdd7dd !important;
}
</style>