<template>
    <div class="fixed bottom-[10px] right-[10px] flex flex-col gap-2 p-2 justify-start items-end" style="z-index: 999;">
    <div class="px-3 py-2 rounded backdrop-blur-sm max-w-[300px] w-[fit-content] col-end-1 shadow" 
        v-for="noti in data"
        :class="[getNotiClass(noti).bg,getNotiClass(noti).color]">
            {{noti.message}}
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
const getNotiClass =(noti)=>{
    let cls = {
        bg: ``,
        color: ``
    }
    console.log(noti)
    switch(noti.type){
        case "error":{
            cls.bg = `bg-red-300/60`
            cls.color = `text-red-700`
        }break;
        case "noti":{
            cls.bg = `bg-sky-300/60`
            cls.color = `text-sky-700`
        }break;
        case "info":{
            cls.bg = `bg-slate-300/60`
            cls.color = `text-slate-700`
        }break;
    }
    return cls;
}
</script>