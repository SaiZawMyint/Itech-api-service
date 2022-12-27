<template>
    <div class="progress-wrapper" :style="`width: ${size}px;height: ${size}px;background: ${background}`">
        <svg id="svg" :width="size" :height="size" viewPort="0 0 100 100" version="1.1" xmlns="http://www.w3.org/2000/svg">
            <circle :style="`stroke-width: ${bar}px`" :r="(size / 2)" :cx="size / 2" :cy="size / 2"
                stroke-dasharray="565.48" fill="transparent" stroke-dashoffset="0"
                :stroke="secondaryBarColor"></circle>
            <circle id="bar" :r="(size / 2)" :cx="size / 2" :cy="size / 2" stroke-dasharray="565.48"
                :style="`stroke-width: ${bar}px;stroke-dasharray:${calculateDashOffset}px; stroke-dashoffset:${calculateDashArray}px`"
                fill="transparent"
                :stroke="primaryBarColor"
                ></circle>
        </svg>
        <span class="label" :style="`color: ${getFontColor}`">{{ labelText }}</span>
    </div>
</template>

<script setup>
import { computed } from '@vue/reactivity';
import { ref } from 'vue';
    const props = defineProps({
        size:{
            type: Number,
            default: 50
        },
        progress: {
            type: Number,
            default: 20
        },
        bar:{
            type: Number,
            default: 10
        },
        primaryBarColor:{
            type: String,
            default: '#FF9F1E'
        },
        secondaryBarColor: {
            type: String,
            default: '#d2d2d2'
        },
        background:{
            type: String,
            default: 'transparent'
        },
        fontColor:{
            type: String,
            default: null
        },
        showInPercent: {
            type: Boolean,
            default: false
        }
    })

    const prog = ref(props.progress)

    const calculateDashArray = computed(()=>{
        prog.value = props.progress > 100 ? 100 : props.progress < 0 ? 0 : props.progress
        let c = Math.PI * ((props.size/2)*2)
        let dashAry = ((100 - prog.value)/100)*c
        return dashAry
    })
    const calculateDashOffset = computed(()=>{
        let v = 0;
        let c = Math.PI * ((props.size/2)*2)
        let dashAry = ((100 - v)/100)*c
        return dashAry
    })

    const getFontColor = computed(()=>{
        return props.fontColor == null ? props.primaryBarColor == null ? '#000' : props.primaryBarColor : props.fontColor
    })

    const labelText = computed(()=>{
        return props.showInPercent ? `${props.progress}%` : props.progress
    })
</script>

<style scoped>

#svg circle {
  stroke-dashoffset: 0;
  transition: stroke-dashoffset 1s linear;
  stroke-width: 3%;
}

.progress-wrapper {
  display: block;
  overflow: hidden;
  border-radius: 100%;
  position: relative;
}

.progress-wrapper .label{
    position: absolute;
    top: 50%;
    left: 50%;
    width: 100%;
    height: 100%;
    transform: translate(-50%,-50%);
    z-index: 2;
    border-radius: 50%;
    font-size: 100%;
    line-height: 0;
    display: flex;
    align-items: center;
    justify-content: center;
}

</style>