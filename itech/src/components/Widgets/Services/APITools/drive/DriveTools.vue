<template>
    <div class="flex flex-col h-full">
        <div class="h-full flex flex-col">
            <DropMenu title="Google Drive" classes="bg-slate-100" :expend="true" :max="{ height: 'max-h-[400px]' }">
                <template v-slot:helper-btn>
                    <button class="px-3 py-2 mx-1 text-sm rounded-lg bg-slate-200 hover:bg-slate-300"
                        @click.stop="importAlertBox.show = true">Import</button>
                    <button class="px-3 py-2 mx-1 text-sm rounded-lg bg-slate-200 hover:bg-slate-300"
                        @click.stop="createPrep">Create</button>
                </template>
                <div class="px-2 rounded text-sm">
                    <button @click.stop="chooseProjectService(spreadsheet.refId)"
                        class="w-full my-1 px-3 py-2 flex items-center justify-between rounded-lg bg-slate-100 cursor-pointer text-slate-800"
                        :class="driveFolderActiveClass(spreadsheet.refId)" v-for="spreadsheet in drives">
                        <div class="flex items-center max-w-[50%]">
                            <span class="text-green-700">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
                                    class="w-5 h-5">
                                    <path stroke-linecap="round" stroke-linejoin="round"
                                        d="M2.25 12.75V12A2.25 2.25 0 014.5 9.75h15A2.25 2.25 0 0121.75 12v.75m-8.69-6.44l-2.12-2.12a1.5 1.5 0 00-1.061-.44H4.5A2.25 2.25 0 002.25 6v12a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9a2.25 2.25 0 00-2.25-2.25h-5.379a1.5 1.5 0 01-1.06-.44z" />
                                </svg>
                            </span>
                            
                            <span class="px-2 truncate">{{ spreadsheet.name }}</span>
                        </div>
                        <div class="flex items-center" v-if="route.params.spreadsheetId == spreadsheet.refId">
                            <button
                                class="w-6 h-6 mx-1 flex bg-slate-200 items-center justify-center rounded-full hover:bg-blue-600/50"
                                @click.stop="edit(spreadsheet)">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                    stroke-width="1.5" stroke="currentColor" class="w-4 h-4">
                                    <path stroke-linecap="round" stroke-linejoin="round"
                                        d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                                </svg>
                            </button>
                            <button
                                class="w-6 h-6 flex bg-slate-200 items-center justify-center rounded-full hover:bg-red-600/50"
                                @click.stop="alertDelete(spreadsheet.refId)">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                    stroke-width="1.5" stroke="currentColor" class="w-4 h-4">
                                    <path stroke-linecap="round" stroke-linejoin="round"
                                        d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                                </svg>
                            </button>
                            <a :href="spreadsheet.link" target="_blank"
                                class="w-6 mx-1 h-6  bg-slate-200 flex items-center justify-center rounded-full hover:bg-green-600/50">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                    stroke-width="1.5" stroke="currentColor" class="w-4 h-4">
                                    <path stroke-linecap="round" stroke-linejoin="round"
                                        d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
                                </svg>
                            </a>
                        </div>
                    </button>
                    <div class="p-2" v-if="!drives || drives.length == 0">
                        <p class="text-center w-full text-slate-500">You Drive is empty! Are you new to drive?</p>
                        <button class="px-3 py-2 rounded-lg bg-slate-300 text-slate-800 mx-auto my-1 block"
                            @click="createPrep">Create Drive File</button>
                    </div>
                </div>
            </DropMenu>
        </div>
        <div
            class="p-2 border-t-1 sticky bottom-0 bg-gray-200/50 backdrop-blur-sm border-t-2 rounded-b-md flex items-center justify-between">
            <div class="flex items-center">
                <div class="flex items-center justify-center rounded-full w-10 h-10 bg-gray-300 overflow-hidden">
                    <img :src="user.photoLink" alt="User profile">
                </div>
                <div class="px-2">
                    <span class="block">{{ user.displayName }}</span>
                    <small>{{ user.emailAddress }}</small>
                </div>
            </div>
            <ToolTips direction="right-top" class="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center"
                @click="">
                <CricleProgressBar :size=40 :progress=calculatePercentageStorage
                    :primary-bar-color="progressColor(calculatePercentageStorage)" />
                <template v-slot:data>
                    <div
                        class="min-w-[300px] ring-slate-300/50 ring-2 w-[fit-content] max-w-[600px] ml-2 bg-gray-200/40 backdroup-blur-sm rounded shadow flex flex-col">
                        <div class="border-b py-1 border-1 flex items-center justify-between">
                            <div class="flex items-center">
                                <div class="w-8 h-8 rounded-full flex items-center justify-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="#3cb371"
                                        class="w-5 h-5">
                                        <path stroke-linecap="round" stroke-linejoin="round"
                                            d="M2.25 15a4.5 4.5 0 004.5 4.5H18a3.75 3.75 0 001.332-7.257 3 3 0 00-3.758-3.848 5.25 5.25 0 00-10.233 2.33A4.502 4.502 0 002.25 15z" />
                                    </svg>
                                </div>
                                <h3 class="truncate">Google Drive Storage</h3>
                            </div>
                            <div class="flex items-center mr-1">
                                <a href="http://" target="_blank" rel="noopener noreferrer"
                                    class="w-8 h-8 rounded-full flex items-center justify-center bg-gray-200/30 hover:bg-gray-400/30">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                        stroke-width="1.5" stroke="currentColor" class="w-4 h-4">
                                        <path stroke-linecap="round" stroke-linejoin="round"
                                            d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
                                    </svg>
                                </a>
                            </div>
                        </div>
                        <div class="flex flex-col py-4 flex items-center justify-center">
                            <CricleProgressBar :size=80 :progress=calculatePercentageStorage :bar="20"
                                :primary-bar-color="progressColor(calculatePercentageStorage)" :show-in-percent=true />
                        </div>
                        <div class="py-2 border-t">
                            <div class="w-[80%] mx-auto text-sm">
                                <div class="flex items-center my-2 justify-between">
                                    <span class="w-[50%] truncate">Limit</span>
                                    <span class="w-[50%] truncate text-right text-slate-800">{{ getDriveStorage.limit}}</span>
                                </div>
                                <div class="flex items-center my-2 justify-between">
                                    <span class="w-[50%] truncate">Usage</span>
                                    <span class="w-[50%] truncate text-right text-slate-800">{{ getDriveStorage.usage}}</span>
                                </div>
                                <div class="flex items-center my-2 justify-between">
                                    <span class="w-[50%] truncate">Usage in Drive</span>
                                    <span class="w-[50%] truncate text-right text-slate-800">{{getDriveStorage.usageInDrive}}</span>
                                </div>
                                <div class="flex items-center my-2 justify-between">
                                    <span class="w-[50%] truncate">Usage in Drive Trash</span>
                                    <span class="w-[50%] truncate text-right text-slate-800">{{getDriveStorage.usageInDriveTrash}}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </template>
            </ToolTips>
        </div>
    </div>
    <Transition name="alert">
        <ModalBox :title="createDriveFolderOption.isEditing? 'Rename a folder': 'Create a folder'" v-if="createDriveFolderOption.show" :show="createDriveFolderOption.show"
            @on-close="createDriveFolderOption.show = false" width="w-[400px]">
            <template v-slot:icon>
                <div class="w-10 h-10 mt-7 flex items-center bg-green-500/80 text-gray-100 justify-center rounded-full">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
                        class="w-6 h-6">
                        <path stroke-linecap="round" stroke-linejoin="round"
                            d="M12 10.5v6m3-3H9m4.06-7.19l-2.12-2.12a1.5 1.5 0 00-1.061-.44H4.5A2.25 2.25 0 002.25 6v12a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9a2.25 2.25 0 00-2.25-2.25h-5.379a1.5 1.5 0 01-1.06-.44z" />
                    </svg>
                </div>
            </template>
            <template v-slot:content>
                <p class="text-center">{{createModalText}} Drive Folder</p>
                <form @submit.prevent="createNewDriveFolder" class="p-2 w-[80%] mx-auto mb-2">
                    <input v-model="driveFolderInput.value" type="text" class="appereance-none px-3 py-2 w-full rounded-lg" placeholder="Spreadsheet name">
                    <div class="flex items-center justify-center p-4">
                        <button 
                        type="submit"
                        v-if="driveFolderInput.value && !driveFolderInput.valid" class="px-4 py-2 ring-slate-200 ring-2 rounded-lg ml-4 btn primary">{{createModalText}}</button>
                        <span v-else
                            class="flex items-center jsutify-between px-3 py-2 ring-slate-200 ring-2 rounded-lg ml-4 bg-slate-400 text-slate-800 cursor-not-allowed">
                            <img src="@img/loading-icon.svg" alt="" class="w-6 h-6 mr-2" v-if="createDriveFolderOption.loading">
                            <span>{{createModalText}}</span>
                        </span>
                    </div>
                </form>
            </template>
        </ModalBox>
    </Transition>
    <Transition name="alert">
        <ModalBox title="Import Drive Folders" v-if="importAlertBox.show" :show="importAlertBox.show"
            @on-close="importAlertBox.show = false" width="w-[400px]">
            <template v-slot:icon>
                <div class="w-10 h-10 mt-7 flex items-center bg-green-600/80 text-gray-100 justify-center rounded-full">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                        stroke="currentColor" class="w-6 h-6">
                        <path stroke-linecap="round"
                            d="M16.5 12a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0zm0 0c0 1.657 1.007 3 2.25 3S21 13.657 21 12a9 9 0 10-2.636 6.364M16.5 12V8.25" />
                    </svg>
                </div>
            </template>
            <template v-slot:content>
                <p class="p-2 text-center text-slate-400 text-sm">Please import your Drive Folder Id</p>
                <div class="p-2 w-[70%] mx-auto mb-4">
                    <div class="flex  rounded-lg overflow-hidden ring-1 ring-slate-400 text-sm">
                        <input v-model="importId" type="text" class="appereance-none px-3 py-2 w-full"
                            placeholder="Folder Id">
                        <button class="px-3 hover:font-bold" @click="importSheet">Import</button>
                    </div>
                </div>
            </template>
        </ModalBox>
    </Transition>
</template>

<script setup>
import { computed } from '@vue/reactivity';
import { onMounted, ref, toRef } from 'vue';
import DropMenu from '../../../itech/UI/DropMenu.vue';
import CricleProgressBar from '../../../itech/Widgets/CricleProgressBar.vue';
import ToolTips from '../../../itech/Widgets/ToolTips.vue';
import itechObject from '../../../../../js/itech-objects'
import { useStore } from 'vuex';
import ModalBox from '../../../LightUI/ModalBox.vue';
import { useRoute } from 'vue-router';

const store = useStore()
const route = useRoute()

const createDriveFolderOption = ref({show:false,isEditing: false,loading: false})
const driveFolderInput = ref({value:'',valid: false,selectedId: null})
const drives = toRef(store.state.drive.drive,'folders')
console.log(drives.value)
const importAlertBox=ref({
    show: false
})
const props = defineProps({
    id: {
        type: String,
        default: 1
    }
})
const importId = ref('')
const createPrep = function(){
    createDriveFolderOption.value.show = true
    driveFolderInput.value.value = ''
    createDriveFolderOption.value.isEditing = false
}
const user = ref({
    "kind": "drive#user",
    "displayName": "Loading",
    "photoLink": "@img/logo.svg",
    "me": true,
    "permissionId": "null",
    "emailAddress": "..."
})

const storageQuota = ref({
    "limit": 0,
    "usage": 0,
    "usageInDrive": 0,
    "usageInDriveTrash": 0
})

onMounted(() => {
    user.value = store.state.drive.user
    storageQuota.value = store.state.drive.storageQuota
})

const createNewDriveFolder = function () {

    driveFolderInput.value.valid = true

    let payload = {
        id: props.id, payload: { name: driveFolderInput.value.value }
    }
    if (createDriveFolderOption.value.isEditing) {
        payload.folderId = driveFolderInput.value.selectedId
    }
    createDriveFolderOption.value.loading = true
    store.dispatch(createDriveFolderOption.value.isEditing ? `updateDriveFolder` : `createDriveFolder`, payload).then((res) => {
        driveFolderInput.value.valid = false
        createDriveFolderOption.value.loading = false
        if (res.ok) {
            createDriveFolderOption.value.show = false
            driveFolderInput.value.value = null
            store.dispatch('clearNotifications').then(() => {
                store.dispatch(`addNotification`, {
                    type: "noti",
                    message: res.message
                })
            })

        } else {
            console.log(res)
            store.dispatch(`addNotification`, {
                type: "error",
                message: res.message
            })
        }
    });
}

const calculatePercentageStorage = computed(() => {
    return Math.floor((storageQuota.value.usage / storageQuota.value.limit) * 100)
})
const createModalText = computed(()=>{
    return createDriveFolderOption.value.isEditing ? "Update" : "Create"
})
const driveFolderActiveClass = function(id){
    if(route.params.spreadsheetId == id){
        return 'bg-slate-400 hover:bg-slate-400/80';
    }
    return 'hover:bg-slate-200';
}
const getDriveStorage = computed(() => {
    return {
        limit: itechObject().byte(storageQuota.value.limit),
        usage: itechObject().byte(storageQuota.value.usage),
        usageInDrive: itechObject().byte(storageQuota.value.usageInDrive),
        usageInDriveTrash: itechObject().byte(storageQuota.value.usageInDriveTrash)
    }
})
const progressColor = (index) => {
    if (index < 40) {
        return '#3cb371'
    }
    if (index > 40 && index < 60) {
        return '#ffcc00'
    }
    if (index > 60 && index < 80) {
        return '#ff9966'
    }
    if (index > 80) {
        return '#cc3300'
    }
}
</script>

<style lang="scss" scoped>

</style>