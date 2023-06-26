<template>
    <ToolPanels v-bind="toolPanelProps"></ToolPanels>
    <Dashboard :name="route.meta.service"></Dashboard>
</template>

<script setup>
import { onBeforeMount, ref } from 'vue';
import { useStore } from 'vuex';
import ToolPanels from './inc/ToolPanels.vue';
import Dashboard from './inc/Dashboard.vue';
import { useRoute } from 'vue-router';

const store = useStore()
const toolPanelProps = ref()
const route = useRoute()

onBeforeMount(()=>{
    toolPanelProps.value = store.state.services
})

</script>

<style lang="scss" scoped>

</style>