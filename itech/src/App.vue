<template>
 <router-view></router-view>
 <Notification v-bind="notiProps"/>
</template>
<script setup>
import { ref } from 'vue';
import { useStore } from 'vuex';
import Notification from './components/Widgets/itech/Widgets/Notification.vue';
const store = useStore()
const notiProps = ref(store.state.notification.data)
</script>

