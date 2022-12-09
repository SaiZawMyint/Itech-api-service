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
            <button class="rounded-lg max-w-[250px] ring-blue-300 focus:ring-2 overflow-hidden border-2 shadow flex flex-col m-4 cursor-pointer
            hover:shadow-lg" @click="setup(`Google Spreadsheet API`)">
                <div class="w-full">
                    <img src="@img/google-spreadsheet-api-logo.png" alt="" class="block w-full">
                </div>
                <div class="p-2">
                    <h2 class="px-2">Google Spreadsheet API</h2>
                </div>
            </button>
            <div tabindex="-1" class="rounded-lg max-w-[250px] ring-blue-300 focus:ring-2 overflow-hidden border-2 shadow flex flex-col m-4 cursor-pointer
            hover:shadow-lg">
                <div class="w-full">
                    <img src="@img/google-drive-api-logo.png" alt="" class="block w-full">
                </div>
                <div class="p-2">
                    <h2 class="px-2">Google Drive API</h2>
                </div>
            </div>
        </div>
    </div>
    <Transition name="alert">
        <ModalBox :title="setUpBox.title" height="min-h-[300px]" v-if="setUpBox.show" :show="setUpBox.show" @on-close="setUpBox.show = false"
            width="w-[40%]">
            <template v-slot:content>
                <div class="w-full p-4 relative z-10">
                    <div class="my-2" v-if="!showCreateForm">
                        <span class="text-sm px-2 text-gray-400">Select Project</span>
                        <SelectWidget :data="projectsData.data" :max="{height:'max-h-[150px]'}" @changes="changesHandler"
                            placeholder="Select Project">
                        </SelectWidget>
                    </div>
                    <form @submit.prevent="createProject" class="my-4 px-2" id="create-project-form" v-if="showCreateForm">
                        <div class="flex">
                            <div class="w-[30%] pr-2">
                                <label for="pj-name" class="text-slate-700 my-2 text-sm">Project Name</label>
                                <input v-model="createProjectForm.name" name="project-name" id="pj-name" type="text" class="px-3 py-2 rounded text-sm w-full"
                                    placeholder="Name">
                            </div>
                            <div class="w-[70%] pl-2">
                                <label for="pj-json" class="text-slate-700 my-2 text-sm">Google Client Json</label>
                                <input @change="projectJSON" name="file"
                                    class="block w-full ring-slate-200 p-1 ring-2 text-sm text-gray-900 border border-gray-300 rounded-lg overflow-hidden cursor-pointer bg-slate-50 focus:outline-none"
                                    id="pj-json" type="file" accept="application/JSON">
                            </div>
                        </div>
                        
                        <div class="w-full py-4 flex items-center">
                            <button 
                            type="submit"
                            class="p-2 bg-slate-300 hover:bg-slate-300/40 text-slate-800 rounded-md flex items-center">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                    stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                    <path stroke-linecap="round" stroke-linejoin="round"
                                        d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                <span class="px-2">Create</span>
                            </button>
                            <span class="px-2 text-sm" :class="createWatcher.error ? 'text-red-800':'text-green-800'" v-if="createWatcher.show"
                                v-html="createWatcher.message"></span>
                        </div>
                    </form>
                    <a href="#" @click.prevent="showCreateForm = !showCreateForm" class="px-2 block pt-4 text-sm text-blue-400 underline">{{showCreateForm ? "Choose Project":"Create Project"}}</a>
                </div>
            </template>
            <template v-slot:footer>
                <div class="flex items-center justify-end p-4">
                    <button class="px-3 py-2 ring-slate-200 ring-2 hover:bg-slate-400 rounded-lg ml-4" @click="setUpBox.show = false">Cancel</button>
                    <button class="px-4 py-2 ring-slate-200 ring-2 rounded-lg ml-4"
                    :class="spreadsheetSelectedProject.data ? 'btn primary ':'bg-slate-400 text-slate-800 cursor-not-allowed'"
                    >Select</button>
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

const store = useStore()

const setUpBox = ref({
    show: false,
    title: ''
});
const showCreateForm = ref(false)

const projectsData = ref({
    data: store.state.spreadsheet.data,
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

const setup = function(service){
    setUpBox.value.show = true;
    setUpBox.value.title = service
}
const projectJSON = function(e){
    const [file] = e.target.files
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
const validateSpreadsheetClient = function(json){
    
}
const createWatcher = ref({
    show: false,
    error: false,
    message: "",
})
const createProject = function(){
    store.dispatch('createProject',createProjectForm.value).then((res)=>{
        if(res.ok){
            document.getElementById('create-project-form').reset()
            createProjectForm.value = {}
            createWatcher.value.show = true
            createWatcher.value.error = false
            showCreateForm.value = false
            console.log(res)
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