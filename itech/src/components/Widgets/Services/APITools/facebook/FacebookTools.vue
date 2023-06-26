<template>
    <div class="flex flex-col h-full">
        <RouterLink :to="{name: 'itech.fb.shome'}" class="p-2">Home</RouterLink>
        <DropMenu title="Marketing API" />
        <DropMenu title="Group API" />
        <DropMenu title="Page API" />
    </div>
</template>

<script setup>
import DropMenu from '../../../itech/UI/DropMenu.vue';


</script>