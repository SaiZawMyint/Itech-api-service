<template>
    <div class="flex flex-col">
        <DropMenu title="Google Drive" classes="bg-slate-100" :expend="true"
        :max="{height:'max-h-[400px]'}">
            <template v-slot:helper-btn>
                <button class="px-3 py-2 mx-1 text-sm rounded-lg bg-slate-200 hover:bg-slate-300" @click.stop="importAlertBox.show=true">Import</button>
                <button class="px-3 py-2 mx-1 text-sm rounded-lg bg-slate-200 hover:bg-slate-300" @click.stop="createPrep">Create</button>
            </template>
            <div class="px-2 rounded text-sm">
                <button @click.stop="chooseProjectService(spreadsheet.refId)"
                class="w-full my-1 px-3 py-2 flex items-center justify-between rounded-lg bg-slate-100 cursor-pointer text-slate-800"
                :class="spreadsheetActiveClass(spreadsheet.refId)"
                    v-for="spreadsheet in spreadsheets">
                    <div class="flex items-center max-w-[50%]">
                        <img src="@img/Google_Sheets_Logo.svg" alt="Google Spreadsheet" class="w-3">
                        <span class="px-2 truncate">{{spreadsheet.name}}</span>
                    </div>
                    <div class="flex items-center" v-if="route.params.spreadsheetId == spreadsheet.refId">
                        <button class="w-6 h-6 mx-1 flex bg-slate-200 items-center justify-center rounded-full hover:bg-blue-600/50"
                            @click.stop="edit(spreadsheet)">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                                stroke="currentColor" class="w-4 h-4">
                                <path stroke-linecap="round" stroke-linejoin="round"
                                    d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                            </svg>
                        </button>
                        <button class="w-6 h-6 flex bg-slate-200 items-center justify-center rounded-full hover:bg-red-600/50"
                            @click.stop="alertDelete(spreadsheet.refId)">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                                stroke="currentColor" class="w-4 h-4">
                                <path stroke-linecap="round" stroke-linejoin="round"
                                    d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                            </svg>
                        </button>
                        <a :href="spreadsheet.link" target="_blank"
                            class="w-6 mx-1 h-6  bg-slate-200 flex items-center justify-center rounded-full hover:bg-green-600/50">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                                stroke="currentColor" class="w-4 h-4">
                                <path stroke-linecap="round" stroke-linejoin="round"
                                    d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
                            </svg>
                        </a>
                    </div>
                </button>
                <div class="p-2" v-if="!spreadsheets || spreadsheets.length == 0">
                    <p class="text-center w-full text-slate-500">You dosen't have any spreadsheet yet</p>
                    <button class="px-3 py-2 rounded-lg bg-slate-300 text-slate-800 mx-auto block" @click="createPrep">Create Drive File</button>
                </div>
            </div>
        </DropMenu>
    </div>
</template>

<script setup>
import DropMenu from '../../../itech/UI/DropMenu.vue';


</script>

<style lang="scss" scoped>

</style>