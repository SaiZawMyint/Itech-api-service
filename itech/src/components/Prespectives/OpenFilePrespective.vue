<template>
        <ModalBox :title="data.name" v-if="alertBox.show" :show="alertBox.show" @on-close="cancle" width="w-[600px]">
            <template v-slot:content>
                <div class="w-full p-2">
                    <video :src="getVideoRoute(data.id)" autoplay controls="controls" class="w-full"></video>
                </div>
            </template>
        </ModalBox>
</template>

<script setup>
import { ref, toRef } from 'vue';
import { useStore } from 'vuex';
import router from '../../router';
import ModalBox from '../Widgets/LightUI/ModalBox.vue';


const store = useStore()
const data = toRef(
    store.state.prespectives, 'drivefile'
)
const getVideoRoute = (id)=>{
    return `http://localhost:8001/itech/api/drive/17/drivefile/video/${id}?u_token=${sessionStorage.getItem('TOKEN')}`
}
const alertBox = ref({
    show: true
})
const cancle = ()=>{
    alertBox.value = false
    router.go(-1)
}
</script>