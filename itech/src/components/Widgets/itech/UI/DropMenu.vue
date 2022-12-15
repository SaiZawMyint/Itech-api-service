<template>
    <div class="w-full">
        <button class="flex w-full items-center justify-between p-2"
        :class="classes" 
        @click="expandFn">
            <label class="cursor-pointer">{{title}}</label>
            <div class="flex items-center">
                <slot name="helper-btn"></slot>
                <button class="w-6 h-6 rounded-full bg-gray-200/20 flex items-center justify-center dropdown-icon"
                :class="dropdownData.icon">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                        stroke="currentColor" class="w-4 h-4">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                    </svg>
                </button>
            </div>
        </button>
        <div class="overflow-y-auto overflow-x-hidden rounded mt-1" :style="expend ? 'display:block':'display:none'"
        :class="[max.width,max.height]">
            <slot></slot>
        </div>
    </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';

const props = defineProps({
    title: {
        type:String,
        default: "Itech Dropdown"
    },
    data: {
        type: Object,
        default: {

        }
    },
    expend: {
        type:Boolean,
        default: false
    },
    max:{
        type:Object,
        default:{
            height: 'max-h-[300px]',
            width: 'max-w-[100%]'
        }
    },
    classes: {
        type: String,
        default: ''
    }
})

const expend = ref(props.expend)
const dropdownData = ref({
    class: [],
    icon: '-rotate-90'
})
function init(){
    if(expend.value){
        dropdownData.value.icon = 'rotate-0'
    }else{
        dropdownData.value.icon = '-rotate-90'
    }
}

const expandFn = ()=>{
    expend.value = !expend.value
    init()
}

onMounted(()=>{
    init()
})
</script>

<style>
.dropdown-icon{
    transition: all .4s cubic-bezier(0.075, 0.82, 0.165, 1);
}
</style>