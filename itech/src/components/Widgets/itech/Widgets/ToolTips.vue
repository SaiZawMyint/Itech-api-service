<template>
    <div class="w-fit-content h-fit-content tooltips-wrapper" :class="class">
        <button class="w-fit-content h-fit-content" @click="click">
            <slot/>
        </button>
        <div tabindex="-1" ref="data" class="data z-10" :class="directionClass"
        @focusout="hideData">
            <slot name="data"></slot>
        </div>
    </div>
</template>
<script setup>
import { computed } from '@vue/reactivity';
import { ref } from 'vue';

const data = ref(null)

const props = defineProps({
    direction: {
        type: String,
        default: 'left'
    },
    class:{
        type: String,
        default: ''
    }
})

const emits = defineEmits(['click'])
const click = ()=>{
    data.value.style.display='block'
    data.value.focus()
    emits('click')
}
const hideData = ()=>{
    data.value.style.display='none'
}
const directionClass = computed(()=>{
    switch(props.direction){
        case "left":{
            return `right-[100%]`
        }
        case "left-top":{
            return `right-[100%] bottom-[100%]`
        }
        case "left-button": {
            return `right-[100%] top-[100%]`
        }
        case "right":{
            return `left[100%]`
        }
        case "right-top":{
            return `left-[100%] bottom-[0]`
        }
        case "right-bottom":{
            return `left[100%] top-[100%]`
        }
        case "top": {

        }
        case "buttom":{

        }
        default:{

        }
    }
})

</script>

<style scoped>
.w-fit-content{
    width: fit-content !important;
}
.h-fit-content{
    height: fit-content !important;
}
.tooltips-wrapper{
    position: relative;
}
.data{
    position: fixed;
    display: none;
}
</style>