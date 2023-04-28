<template>
    <div class="flex mb-2">
        <div class="w-[50%] pr-1">
            <label for="pj-name" class="text-slate-700 my-2 text-sm">Project Name</label>
            <input v-model="createProjectForm.name" name="project-name" id="pj-name" type="text"
                class="px-3 py-2 rounded text-sm w-full" placeholder="Name">
        </div>
    </div>
    <div class="flex justify-between items-center mb-2">
        <div class="w-[50%] pr-1">
            <label for="app-Id" class="text-slate-700 my-2 text-sm">APP Id</label>
            <input v-model="createProjectForm.clientId" name="app-id" id="app-id" type="text"
                class="px-3 py-2 rounded text-sm w-full" placeholder="APP Id">
            <a href="" class="text-sm underline text-sky-500">How to get APP Id?</a>
        </div>
        <div class="w-[50%] pl-1">
            <label for="app-secret" class="text-slate-700 my-2 text-sm">APP Secret</label>
            <input v-model="createProjectForm.name" name="app-secret" id="app-secret" type="text"
                class="px-3 py-2 rounded text-sm w-full" placeholder="APP Secret">
            <a href="" class="text-sm underline text-sky-500">How to get APP secret?</a>
        </div>
    </div>
    <div class="flex justify-between items-center mb-2">
        <div class="w-full">
            <label class="text-slate-700 my-2 text-sm">Scopes</label>
            <Multiselect
                v-model="value"
                mode="tags"
                :close-on-select="false"
                :searchable="true"
                :create-option="true"
                :options="FACEBOOK_SCOPES"
                />
            <a href="" class="text-sm underline text-sky-500">What are the scopes and permissions?</a>
        </div>
    </div>
</template>
<script setup>
import {FACEBOOK_SCOPES} from '@js/script.js';
import Multiselect from '@vueform/multiselect'
import { ref } from 'vue';

defineProps({
    createProjectForm: {
        type: Object,
        default: {
            name: '',
            clientId: null,
            clientSecret: null,
            projectId: null,
            authURI: null,
            tokenURI: null,
            authProvider: null,
            redirectURIs: [],
            scopes: []
        }
    }
})
const value = ref([])
const facebooksPermissions = ()=>{
    let data = [];
    for(let p of FACEBOOK_SCOPES){
        data.push({
            name: p,
            label: p
        })
    }
    return data
}
const lists = facebooksPermissions();

const setScopes = (value)=>{

}
</script>
<style src="@vueform/multiselect/themes/default.css"></style>