<template>
    <div class="fixed bottom-[10px] right-[10px] flex flex-col gap-2 p-2 justify-start items-end" style="z-index: 999;">
        <div class="relative px-3 py-2 rounded backdrop-blur-sm max-w-[400px] w-[fit-content] col-end-1 shadow text-sm pr-14"
            v-for="(noti,index) in data" :class="[getNotiClass(noti).bg,getNotiClass(noti).color]">
            {{noti.message}}
            <button class="w-7 h-7 rounded-full flex items-center justify-center absolute right-1 top-1"
            :class="getNotiClass(noti).hover"
            @click="closeHandler(noti,index)">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                    stroke="currentColor" class="w-4 h-4">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
            </button>
        </div>
    </div>
</template>
<script setup>
import { defineProps } from 'vue';
const props = defineProps({
    data: {
        type: Array,
        default: []
    }
})
const emits = defineEmits(['close'])
const closeHandler = function(noti,index){
    emits('close',{index,id:noti.id})
}
const getNotiClass =(noti)=>{
    let cls = {
        bg: ``,
        color: ``,
        hover: ``
    }
    switch(noti.type){
        case "error":{
            cls.bg = `bg-red-300/60`
            cls.color = `text-red-700`
            cls.hover = `hover:bg-red-300`
        }break;
        case "noti":{
            cls.bg = `bg-sky-300/60`
            cls.color = `text-sky-700`
            cls.hover = `hover:bg-sky-300`
        }break;
        case "info":{
            cls.bg = `bg-slate-300/60`
            cls.color = `text-slate-700`
            cls.hover = `hover:bg-slate-300`
        }break;
    }
    return cls;
}
</script>