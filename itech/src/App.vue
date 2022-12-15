<template>
 <router-view></router-view>
 <Notification v-bind:data="notiData" @close="notiClose"/>
 <ProgressBar v-if="store.state.setting.progress"/>
</template>
<script setup>
import { toRef } from 'vue';
import { useStore } from 'vuex';
import Notification from './components/Widgets/itech/Widgets/Notification.vue';
import ProgressBar from './components/Widgets/itech/Widgets/ProgressBar.vue';
import itechObject from './js/itech-objects';
const store = useStore()
const notiData = toRef(store.state.notification, 'data')
const notiClose = (data)=>{
    let index = itechObject(store.state.notification.data).find(data.id, "id");
    store.dispatch('removeNotification',index);
}
</script>

