<template>
        <ModalBox :title="data.name" v-if="alertBox.show" :show="alertBox.show" @on-close="cancle" width="w-auto max-w-[70%] min-w-[40%]" height="h-auto max-h-[90%]">
            <template v-slot:icon>
                <div class="w-full max-h-[80vh] h-full min-h-[250px] relative p-2 overflow-auto flex items-center justify-center img-dis">
                    <video :src="getVideoRoute(data.id)" autoplay controls="controls" class="w-full" v-if="data.type == 'video'"></video>
                    <img :src="getImageData(data.id)" alt="" v-if="data.type == 'image'" class="block inside-img">
                    <div v-if="data.type == 'image'" class="absolute top-0 left-0 none bg-gray-300/90 backdrop-blue-sm w-full h-full flex justify-center items-center">
                        <img src="@img/icons/loading-ball.svg" alt="loading" class="w-8 h-8 max-w-[35px] max-h-[35px]">
                    </div>
                </div>
            </template>
        </ModalBox>
</template>

<script setup>
import { ref, toRef, watch, onMounted } from 'vue';
import { useStore } from 'vuex';
import router from '../../router';
import ModalBox from '../Widgets/LightUI/ModalBox.vue';
import {BASE_API_URL} from '@js/script'
import { useRoute } from 'vue-router';

const route = useRoute()
const store = useStore()
const data = toRef(
    store.state.prespectives, 'drivefile'
)
const getVideoRoute = (id)=>{
    return `${BASE_API_URL}/drive/${route.params.id}/drivefile/video/${id}?u_token=${sessionStorage.getItem('TOKEN')}`
}
const getImageData = (id)=>{
    return `${BASE_API_URL}/drive/${route.params.id}/drivefile/photo/${id}?u_token=${sessionStorage.getItem('TOKEN')}`
}
const alertBox = ref({
    show: true
})
const cancle = ()=>{
    alertBox.value = false
    router.go(-1)
}
const loadingImg = ()=>{
    let imgs = document.querySelectorAll('.inside-img')
    for(let img of imgs){
        img.parentElement.lastElementChild.classList.remove('hidden')
        img.onload = function(){
            this.parentElement.lastElementChild.classList.add('hidden')
        }
    }
}
onMounted(()=>{
    loadingImg()
})
watch(()=>route.params.fileId, ()=>{
    loadingImg()
})
</script>