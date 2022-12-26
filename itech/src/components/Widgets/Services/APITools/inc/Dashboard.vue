<template>
    <div id="tool-dashboard" class="w-[75%] ml-[25%] px-4">
        <div class="w-full sticky top-[55px] px-3 py-2 bg-gray-200/40 backdrop-blur-sm rounded-lg z-10">
            {{ name }}
        </div>
        <router-view></router-view>
    </div>
</template>

<script setup>
import { useRoute } from 'vue-router';
const props = defineProps({
    name: {
        type: String,
        default: 'itech'
    }
})
const route = useRoute()
console.log(route.name)
</script>

<style lang="scss" scoped>

</style>