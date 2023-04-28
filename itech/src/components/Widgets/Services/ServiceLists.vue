<template>
    <div class="max-w-[80%] mx-auto px-2 pt-20">
        <div class="w-full flex items-center justify-center mb-14">
            <div class="flex items-center justify-center ">
                <input type="search" name="" id=""
                    class="appearance-none min-w-[300px] focus:outline-none px-2 py-2 ring-slate ring-2 rounded"
                    placeholder="Search Services">
                <button class="w-10 h-10 flex items-center justify-center mx-3 rounded-full bg-slate-300">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                        stroke="currentColor" class="w-6 h-6">
                        <path stroke-linecap="round" stroke-linejoin="round"
                            d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                    </svg>
                </button>
            </div>
        </div>
        <div class="w-full grid grid-cols-4 grid-flow-col gap-2">
            <button class="rounded-lg max-w-[250px] ring-blue-300 focus:ring-2 overflow-hidden border-2 shadow flex flex-col m-4 cursor-pointer justify-between
            hover:shadow-lg" @click="setup(`SPREADSHEET`,`google`)">
                <div class="w-full">
                    <img src="@img/google-spreadsheet-api-logo.png" alt="" class="block w-full h-[230px]">
                </div>
                <div class="p-2 bg-sky-100 w-full">
                    <h2 class="px-2">Google Spreadsheet API</h2>
                </div>
            </button>
            <button 
            @click="setup(`DRIVE`,`google`)"
            class="rounded-lg max-w-[250px] ring-blue-300 focus:ring-2 overflow-hidden border-2 shadow flex flex-col m-4 cursor-pointer justify-between
            hover:shadow-lg">
                <div class="w-full">
                    <img src="@img/google-drive-api-logo.png" alt="" class="block w-full h-[230px]">
                </div>
                <div class="p-2 bg-sky-100 w-full">
                    <h2 class="px-2">Google Drive API</h2>
                </div>
            </button>
            <button 
            @click="setup(`FACEBOOK`,`facebook`)"
            class="rounded-lg max-w-[250px] ring-blue-300 focus:ring-2 overflow-hidden border-2 shadow flex flex-col m-4 cursor-pointer justify-between
            hover:shadow-lg">
                <div class="w-full">
                    <img src="@img/facebook-api-icon.png" alt="" class="block w-full h-[230px]">
                </div>
                <div class="p-2 bg-sky-100 w-full">
                    <h2 class="px-2">Facebook API</h2>
                </div>
            </button>
            <button 
            @click="setup(`SHOPIFY`,`shopify`)"
            class="rounded-lg max-w-[250px] ring-blue-300 focus:ring-2 overflow-hidden border-2 shadow flex flex-col m-4 cursor-pointer justify-between
            hover:shadow-lg">
                <div class="w-full">
                    <img src="@img/shopify-api-icon.png" alt="" class="block w-full h-[230px]">
                </div>
                <div class="p-2 bg-sky-100 w-full">
                    <h2 class="px-2">Shopify API</h2>
                </div>
            </button>
        </div>
    </div>
    <Transition name="alert">
        <ModalBox :title="setUpBox.title" height="min-h-[300px]" v-if="setUpBox.show" :show="setUpBox.show"
            @on-close="setUpBox.show = false" width="w-[50%]">
            <template v-slot:content>
                <div class="w-full p-4 relative z-10 min-h-[260px]">
                    <div class="my-2" v-if="!showCreateForm">
                        <span class="text-sm px-2 text-gray-400">Select Project</span>
                        <SelectWidget :data="projectsData.data[setUpBox.title]" :max="{height:'max-h-[150px]'}"
                            @changes="changesHandler" placeholder="Select Project">
                        </SelectWidget>
                    </div>
                    <form @submit.prevent="createProject" class="my-4 px-2" id="create-project-form"
                        v-if="showCreateForm">
                        <CreateNewGoogleProject :create-project-form="createProjectForm" @file-change="projectJSON" v-if="setUpBox.organization == `google`" />
                        <CreateFacebookProject :create-project-form="createProjectForm" v-if="setUpBox.organization == `facebook`" />
                        <div class="w-full py-4 flex items-center">
                            <button type="submit"
                                class="p-2 bg-slate-300 hover:bg-slate-300/40 text-slate-800 rounded-md flex items-center">
                                <span class="px-2">Create</span>
                            </button>
                            <span class="px-2 text-sm" :class="createWatcher.error ? 'text-red-800':'text-green-800'"
                                v-if="createWatcher.show" v-html="createWatcher.message"></span>
                        </div>
                    </form>
                    <a href="#" @click.prevent="showCreateForm = !showCreateForm"
                        class="px-2 block py-1 text-sm text-blue-400 underline">{{showCreateForm ? "ChooseProject":"Create Project"}}</a>
                </div>
            </template>
            <template v-slot:footer>
                <div class="flex items-center justify-end p-4">
                    <button class="px-3 py-2 ring-slate-200 ring-2 hover:bg-slate-400 rounded-lg ml-4"
                        @click="setUpBox.show = false">Cancel</button>
                    <button 
                    @click="openAPI"
                    v-if="spreadsheetSelectedProject.data" class="px-4 py-2 ring-slate-200 ring-2 rounded-lg ml-4 btn primary">Select</button>
                    <span v-else
                        class="px-4 py-2 ring-slate-200 ring-2 rounded-lg ml-4 bg-slate-400 text-slate-800 cursor-not-allowed">
                        Select
                    </span>
                </div>
            </template>
        </ModalBox>
    </Transition>
</template>
<script setup>
import { onMounted, ref } from 'vue';
import ModalBox from '../LightUI/ModalBox.vue';
import SelectWidget from '../itech/Widgets/SelectWidget.vue';
import itechObject from '../../../js/itech-objects'
import { useStore } from 'vuex';
import itech from '../../../js/itech';
import { useRouter } from 'vue-router'
import { computed } from '@vue/reactivity';
import CreateNewGoogleProject from '../itech/UI/google/CreateGoogleProject.vue';
import CreateFacebookProject from '../itech/UI/facebook/CreateFacebookProject.vue';

const store = useStore()
const router = useRouter()

const setUpBox = ref({
    show: false,
    title: '',
    type: '',
    organization: ''
});
const showCreateForm = ref(false)

const projectsData = ref({
    data: store.state.project.data,
    error: false,
    message: 'To add tag, you need to create outline first!'
})
const createProjectForm = ref({
    name: '',
    clientId: null,
    clientSecret: null,
    projectId: null,
    authURI: null,
    tokenURI: null,
    authProvider: null,
    redirectURIs: [],
})
const spreadsheetSelectedProject = ref({
    data: null
})
const changesHandler = function(data){
    spreadsheetSelectedProject.value.data = data
    let index = (itechObject(projectsData.value.data).find(data.id, 'id'))
    projectsData.value.data[index] = data
}

const setup = function(service, organization){
    setUpBox.value.show = true;
    setUpBox.value.title = service
    setUpBox.value.organization = organization
}
const projectJSON = function(e){
    const [file] = e.target.files
    console.log(`files: ${file}`)
    itechObject().json(file,(data)=>{
        for(let web in data){ //first web layer
            let clients = data[web]
            for(let key in clients){
                switch (key) {
                    case "client_id": { createProjectForm.value.clientId = clients['client_id'] } break
                    case "project_id": { createProjectForm.value.projectId = clients['project_id'] } break
                    case "auth_uri": { createProjectForm.value.authURI = clients['auth_uri'] } break
                    case "token_uri": { createProjectForm.value.tokenURI = clients['token_uri'] } break
                    case "auth_provider_x509_cert_url": { createProjectForm.value.authProvider = clients['auth_provider_x509_cert_url'] } break
                    case "client_secret": { createProjectForm.value.clientSecret = clients['client_secret'] } break
                    case "redirect_uris": { createProjectForm.value.redirectURIs = clients['redirect_uris'] } break
                }
            }
        }
    })
}
// const validateSpreadsheetClient = function(json){
    
// }
const createWatcher = ref({
    show: false,
    error: false,
    message: "",
})
const createProject = function(){
    store.dispatch('createProject',Object.assign({'serviceType':setUpBox.value.title},createProjectForm.value)).then((res)=>{
        if(res.ok){
            document.getElementById('create-project-form').reset()
            createProjectForm.value = {}
            createWatcher.value.show = true
            createWatcher.value.error = false
            showCreateForm.value = false
            changesHandler(res.data)
        }else{
            createWatcher.value.show = true
            createWatcher.value.error = true
            createWatcher.value.message = res.error
        }

        itech().wait(4000, () => {}, () => {
            createWatcher.value.show = false
            createWatcher.value.error = false
            createWatcher.value.message = ""
        })

    })
}
const openAPI = function(){
    store.dispatch(`addService`,{type: setUpBox.value.title, data: spreadsheetSelectedProject.value.data})
    router.push({name: getServiceName.value,params:{service: setUpBox.value.title.toLocaleLowerCase(),id: spreadsheetSelectedProject.value.data.id}})
}
const getServiceName = computed(()=>{
    switch(setUpBox.value.title){
        case "SPREADSHEET":{
            return 'itech.spreadsheet.shome'
        }
        case "DRIVE":{
            return 'itech.drive.shome'
        }
        default: {
            return 'home'
        }
    }
})
onMounted(()=>{
    store.dispatch('getSpreadsheetProjects').then((res)=>{
        if(res.data.length == 0){
            projectsData.value.data = [{id: -1, name: "No project created!",isUsed: true}]
        }else{
            projectsData.value.data = res.data
        }
    })
})
</script>