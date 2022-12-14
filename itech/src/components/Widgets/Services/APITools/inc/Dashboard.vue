<template>
    <div class="w-[75%] ml-[25%] px-2">
        <div class="w-full sticky top-[55px] px-3 py-2 bg-gray-200/40 backdrop-blur-sm rounded-lg z-10">
            Spreadsheet
        </div>
        <router-view></router-view>
    </div>
</template>

<script setup>
import { useRoute } from 'vue-router';

const route = useRoute()

</script>

<style lang="scss" scoped>

</style>