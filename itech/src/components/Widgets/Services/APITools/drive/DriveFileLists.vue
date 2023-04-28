<template>
    <div class="w-full grid grid-cols-6 gap-2" v-if="'driveFolderId' in route.params && getDriveFileData">
        <button 
        @dblclick="openFile(driveFile)"
        @contextmenu.prevent="showPop(index)"
        @click="select(driveFile,index)"
        class="relative border-sky border-2 flex flex-col text-sm service-block m-2 rounded-lg shadow text-center ring-slate hover:ring-2 focus:ring-2 hover:shadow-md" 
        v-for="(driveFile,index) in getDriveFileData">
            <div class="overflow-hidden w-full h-full flex flex-col rounded-lg">
                <div class="relative w-full h-full flex items-center justify-center p-2 relative overflow-hidden min-h-[110px] rounded-lg">
                    <img :src="getImageData(route.params.id, driveFile.id)" alt="" v-if="driveFile.type == 'image'"
                        class="w-full preview-img">
                    <img :src="fileTypeLogo(driveFile.type)" alt="" class="max-h-[130px]" style="max-width: 80%;" v-else>
                    <div v-if="driveFile.type == 'image'" class="absolute top-0 left-0 none bg-gray-300/90 backdrop-blue-sm w-full h-full flex justify-center items-center">
                        <img src="@img/icons/loading-ball.svg" alt="loading" class="w-8 h-8">
                    </div>
                </div>
            </div>
            
            <div class="w-full bg-gray-100 px-3 py-2 truncate">
                {{driveFile.name}}
            </div>
            <div class="absolute top-0 right-0 flex flex-col justify-end items-end">
                <button @click.stop="showPop(index)" @dblclick.stop=""
                    class="hover:text-gray-500 flex items-center justify-center w-5 h-5 rounded-lg">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" stroke-width="3"
                        stroke="currentColor" class="w-6 h-6">
                        <path stroke-linecap="round" stroke-linejoin="round"
                            d="M12 6.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 12.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 18.75a.75.75 0 110-1.5.75.75 0 010 1.5z" />
                    </svg>
                </button>
                <Transition name="btn-pop">
                    <div v-if="filePop[index]" tabindex="-1"
                    :id="`btn-pop-${index}`"
                    @focusout="filePop[index] = false"
                        class="absolute bg-gray-300/80 backdrop-blur top-[100%] -right-2 rounded ring-1 ring-slate-400 shadow flex flex-col min-w-[160px]">
                        <button @click="openFile(driveFile)" class="py-1 px-2 hover:text-gray-200 hover:bg-gray-700/50 border-b text-left flex items-center justify-start">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
                                class="w-4 h-4 mr-2">
                                <path stroke-linecap="round" stroke-linejoin="round"
                                    d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.348a1.125 1.125 0 010 1.971l-11.54 6.347a1.125 1.125 0 01-1.667-.985V5.653z" />
                            </svg>
                            <span>Open</span>
                        </button>
                        <button @click="download(driveFile.id)"
                         class="py-1 px-2 hover:text-gray-200 hover:bg-gray-700/50 border-b text-left flex items-center justify-start">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
                                class="w-4 h-4 mr-2">
                                <path stroke-linecap="round" stroke-linejoin="round"
                                    d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
                            </svg>
                            <span>Download</span>
                        </button>
                        <button class="py-1 px-2 hover:text-gray-200 hover:bg-red-700/50 border-b border-slate-600 text-left flex items-center justify-start">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
                                class="w-4 h-4 mr-2">
                                <path stroke-linecap="round" stroke-linejoin="round"
                                    d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                            </svg>
                            <span>Delete</span>
                        </button>
                        <span class="py-1 px-2 cursor-default border-b text-left flex items-center justify-start">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" 
                            stroke="currentColor"
                                class="w-4 h-4 mr-2">
                                <path stroke-linecap="round" stroke-linejoin="round"
                                    d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" />
                            </svg>

                            <span>{{ getFileSize(driveFile.size) }}</span>
                        </span>
                        <span class="py-1 px-2 cursor-default border-b text-left flex items-center justify-start">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
                                class="w-4 h-4 mr-2">
                                <path stroke-linecap="round" stroke-linejoin="round"
                                    d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z" />
                            </svg>
                            <span>{{ driveFile.type }}</span>
                        </span>
                    </div>
                </Transition>
            </div>
            <div @contextmenu.stop="" v-if="fileSelect[index]" class="absolute ring-2 ring-green-600 top-0 left-0 bg-gray-300/10 backdrop-blur-sm rounded w-full h-full">
                <span class="absolute top-[3px] right-[3px] rounded-full w-10 h-10 flex items-center justify-center">
                    <font-awesome-icon icon="fas fa-check-circle" class="w-6 h-6" color="#0ca678"/>
                </span>
            </div>
        </button>
        <button 
        @click="showBox"
        class="m-2 min-h-[150px] rounded-lg overflow-hidden border-dashed border-2 border-slate-300 text-slate-300 focus:border-sky-500 focus:text-sky-500 hover:border-sky-500 hover:text-sky-500 flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
                class="w-6 h-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
            </svg>
        </button>
    </div>
    <router-view v-slot="{ Component }">
        <transition name="alert">
            <component :is="Component" />
        </transition>
    </router-view>
</template>

<script setup>
import { computed } from '@vue/reactivity';
import { useRoute } from 'vue-router';
import { useStore } from 'vuex';
import {fileTypeLogo, getImageData} from '../../../../../js/script'
import itech from '../../../../../js/itech'
import { onMounted, ref, watch } from 'vue';
import itechObject from '../../../../../js/itech-objects';
import router from '../../../../../router';
import imgFails from '@img/icons/img-fails.svg'
const store = useStore()
const route = useRoute()

const filePop = ref([])
const fileSelect = ref([])
const getDriveFileData = computed(()=>{
    return store.state.driveFile.children
})
const showPop = (index)=>{
    filePop.value[index] = !filePop.value[index]
    itech().wait(50,()=>{},()=>{
        document.getElementById(`btn-pop-${index}`).focus()
    })
    
}
const getParams = (id)=>{
    let param = Object.assign({},route.params)
    param.driveFolderId = id

    return param
}

const openFile = (file)=>{
    console.log(file)
    switch(file.type){
        case 'drive-folder':{
            router.push({name: 'itech.drive.files',params:getParams(file.id)})
        }break;
        default:{
            router.push({
                name: 'open-file',
                params: {
                    driveFolderId: route.params.driveFolderId,
                    fileId: file.id
                }
            })
        }
    }
    
}
const getFileSize = (byte)=>{
    return itechObject().byte(byte)
}
const select = (file,index)=>{
    if(store.state.multiSelect.enable){
        if (fileSelect.value[index]) {
            store.state.multiSelect.data = itechObject(store.state.multiSelect.data).remove(file.id);
            fileSelect.value[index] = false
        } else {
            store.state.multiSelect.data.push(file.id)
            fileSelect.value[index] = true
        }   
    }
}
const download = (id)=>{
    let payload = {
        id: route.params.id,
        fileId: id
    }
    const newNotiProps = ref({
        type: "noti",
        message: "Preparing to download file",
        progress: {
            progress: 0,
            size: 35,
            primaryBarColor: "#076857",
            fontColor: "black",
            showLabel: false,
            isLoading: true
        },
        isMuted: true
    })
    store.dispatch(`addNotification`, newNotiProps.value)
   
    payload.loaded = (percentage)=>{
        newNotiProps.value.message = "Downloading"
        newNotiProps.value.progress={
                progress: percentage,
                size: 35,
                primaryBarColor: "#076857",
                fontColor: "black",
                showLabel: true,
                isLoading: false
            }
    }
    payload.success = (res)=>{

    }
    store.dispatch('downloadFile',payload).then((res)=>{
        newNotiProps.value.message = "Downloaded"
        newNotiProps.value.isMuted = false
        newNotiProps.value.progress.isLoading = false
    })
}
//image loading
const loadingImg = ()=>{
    let imgs = document.querySelectorAll('.preview-img')
    for(let img of imgs){
        img.parentElement.lastElementChild.classList.remove('hidden')
        img.parentElement.lastElementChild.removeAttribute('title')
        img.onload = function(){
            this.parentElement.lastElementChild.classList.add('hidden')
        }
        img.onerror = function(){
            this.parentElement.lastElementChild.firstElementChild.src=imgFails
            this.parentElement.lastElementChild.title = "Cannot load image!"
        }
    }
}
onMounted(()=>{
    if(getDriveFileData.value.length > 0){
        getDriveFileData.value.forEach(()=>{
            filePop.value.push(false)
        })
    }
    loadingImg()
})
watch(()=>route.params.driveFolderId, ()=>{
    loadingImg()
})
watch(()=>store.state.multiSelect.enable, (opt)=>{
    if(!opt){
        fileSelect.value.fill(false)
    }
})
</script>