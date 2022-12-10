<template>
    <div class="flex flex-col">
        <DropMenu title="Spreadsheet" classes="bg-slate-100" :expend="true">
            <div class="p-3 rounded text-sm">
                <p class="text-center w-full text-slate-500">You dosen't have any spreadsheet yet</p>
                <button class="px-3 py-2 rounded-lg bg-slate-300 text-slate-800 mx-auto block">Create Spreadsheet</button>
            </div>
        </DropMenu>
    </div>
</template>

<script setup>
import DropMenu from '../../../itech/UI/DropMenu.vue';

</script>

<style lang="scss" scoped>

</style>