<template>
    <div class="w-full grid grid-cols-6 gap-2" v-if="'driveFolderId' in route.params && getSheetData">
        <button 
        @dblclick="openSheet(sheet)"
        class="relative flex flex-col text-sm service-block m-2 rounded-lg overflow-hidden shadow text-center ring-slate hover:ring-2 focus:ring-2 hover:shadow-md" 
        v-for="sheet in getSheetData">
            <div class="w-full h-full flex items-center justify-center p-2">
                <img :src="fileTypeLogo(sheet.type)" alt="" style="max-width: 80%;">
            </div>
            <div class="w-full bg-gray-100 px-3 py-2 truncate">
                {{sheet.name}}
            </div>
            <button 
            @click="edit(sheet)"
            class="float-edit-btn bg-green-400 hover:bg-green-400/50 flex items-center justify-center w-6 h-6 rounded-lg">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
                    class="w-4 h-4">
                    <path stroke-linecap="round" stroke-linejoin="round"
                        d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                </svg>
            </button>
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

const store = useStore()
const route = useRoute()
const getSheetData = computed(()=>{
    return store.state.driveFile.children
})
</script>

<style lang="scss" scoped>

</style>