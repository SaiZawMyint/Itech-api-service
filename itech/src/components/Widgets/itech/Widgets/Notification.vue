<template>
    <div class="fixed bottom-[10px] right-[10px] flex flex-col gap-2 p-2 justify-start items-end" style="z-index: 999;">
        <div class="relative px-3 border-2 py-2 rounded flex items-center justify-start backdrop-blur-sm max-w-[400px] w-[fit-content] col-end-1 shadow text-sm pr-14"
            v-for="(noti,index) in data" :class="[getNotiClass(noti).bg,getNotiClass(noti).color]"
            @click="openNoti"
            :id="`itech-noti-${noti.id}`">

            <div class="flex items-center mr-3 justify-center rounded-full" v-if="noti.progress">
                <CricleProgressBar v-bind="noti.progress" />
            </div>
            <span>{{noti.message}}</span>
            <button class="w-7 h-7 rounded-full flex items-center justify-center absolute right-1 top-1"
            v-if="!noti.isMuted"
            :class="getNotiClass(noti).hover"
            @click.stop="closeHandler(noti,index)">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                    stroke="currentColor" class="w-4 h-4">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
            </button>
        </div>
    </div>
</template>
<script setup>
import itech from '../../../../js/itech';
import CricleProgressBar from './CricleProgressBar.vue';

const props = defineProps({
    data: {
        type: Array,
        default: []
    }
})
const emits = defineEmits(['close','open'])
const closeHandler = function(noti,index){
    let el = document.getElementById(`itech-noti-${noti.id}`)
    itech().wait(40,()=>{
        el.classList.add('close-noti')
    },()=>{
        emits('close',{index,id:noti.id})
    })
    
}
const openNoti = ()=>{
    if(data.openAction){
        data.openAction()
    }
    emits('open',props.data)
}
const getNotiClass =(noti)=>{
    let cls = {
        bg: ``,
        color: ``,
        hover: ``
    }
    switch(noti.type){
        case "error":{
            cls.bg = `bg-red-300/80  border-red-400`
            cls.color = `text-red-700`
            cls.hover = `hover:bg-red-300`
        }break;
        case "noti":{
            cls.bg = `bg-sky-300/80 border-sky-400`
            cls.color = `text-sky-700`
            cls.hover = `hover:bg-sky-300`
        }break;
        case "info":{
            cls.bg = `bg-slate-300/80 border-slate-400`
            cls.color = `text-slate-700`
            cls.hover = `hover:bg-slate-300`
        }break;
        case "warning":{
            cls.bg = `bg-orange-400/80 border-orange-400`
            cls.color = `text-slate-700`
            cls.hover = `hover:bg-orange-400`
        }break;
    }
    return cls;
}
</script>
<style>
.close-noti{
    transition: all .2s linear;
    animation: closenoti .4s 1 linear;
}
@keyframes closenoti {
    from{
        transform: translateX(0);
    }
    to{
        transform: translateX(100%);
    }
}
</style>