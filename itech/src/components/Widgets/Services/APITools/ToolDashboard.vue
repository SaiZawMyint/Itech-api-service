<template>
    <ToolPanels v-bind="toolPanelProps"></ToolPanels>
    <Dashboard></Dashboard>
</template>

<script setup>
import { onBeforeMount, ref } from 'vue';
import { useStore } from 'vuex';
import ToolPanels from './inc/ToolPanels.vue';
import Dashboard from './inc/Dashboard.vue';

const store = useStore()
const toolPanelProps = ref()

onBeforeMount(()=>{
    toolPanelProps.value = store.state.services
})

</script>

<style lang="scss" scoped>

</style>