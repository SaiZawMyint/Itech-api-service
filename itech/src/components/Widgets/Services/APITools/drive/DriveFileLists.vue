<template>
    <div class="w-full grid grid-cols-6 gap-2" v-if="'driveFolderId' in route.params && getDriveFileData">
        <button 
        @dblclick="openSheet(driveFile)"
        class="relative flex flex-col text-sm service-block m-2 rounded-lg shadow text-center ring-slate hover:ring-2 focus:ring-2 hover:shadow-md" 
        v-for="(driveFile,index) in getDriveFileData">
            <div class="w-full h-full flex items-center justify-center p-2">
                <img :src="fileTypeLogo(driveFile.type)" alt="" style="max-width: 80%;">
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
                        <button class="py-1 px-2 hover:text-gray-200 hover:bg-gray-700/50 border-b text-left flex items-center justify-start">
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
</template>

<script setup>
import { computed } from '@vue/reactivity';
import { useRoute } from 'vue-router';
import { useStore } from 'vuex';
import {fileTypeLogo} from '../../../../../js/script'
import itech from '../../../../../js/itech'
import { onMounted, ref } from 'vue';
import itechObject from '../../../../../js/itech-objects';

const store = useStore()
const route = useRoute()

const filePop = ref([])

const getDriveFileData = computed(()=>{
    return store.state.driveFile.children
})
const showPop = (index)=>{
    filePop.value[index] = !filePop.value[index]
    itech().wait(50,()=>{},()=>{
        document.getElementById(`btn-pop-${index}`).focus()
    })
    
}
const getFileSize = (byte)=>{
    return itechObject().byte(byte)
}
const progressData = ref({
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

const download = (id)=>{
    let payload = {
        id: route.params.id,
        fileId: id
    }
    store.dispatch('clearNotifications').then(() => {
        store.dispatch(`addNotification`, progressData.value)
    })

    payload.loaded = (percentage)=>{
        progressData.value.message = "Downloading"
        progressData.value.progress={
                progress: percentage,
                size: 35,
                primaryBarColor: "#076857",
                fontColor: "black",
                showLabel: true,
                isLoading: false
            }
    }
    store.dispatch('downloadFile',payload).then((res)=>{
        progressData.value.message = "Downloaded"
        progressData.value.isMuted = false
        progressData.value.progress.isLoading = false
    })
}
onMounted(()=>{
    if(getDriveFileData.value.length > 0){
        getDriveFileData.value.forEach(()=>{
            filePop.value.push(false)
        })
    }
})
</script>

<style scoped>
.btn-pop-enter-active,
.btn-pop-leave-active{
    transition: all .4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}
.btn-pop-enter-from,
.btn-pop-leave-to{
    opacity: 0;
    top: 50%;
}
</style>