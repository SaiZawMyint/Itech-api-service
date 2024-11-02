<template>
    <div class="w-full flex flex-col p-2 bg-gray-100 max-h-[300px] overflow-hidden">
        <h3 class="text-small font-bold p-1 text-center">Drive folders</h3>
        <div class="w-full h-full flex items-center justify-center" v-if="page.loading">
            <img src="@img/icons/loading-ball.svg" alt="loading" class="w-8 h-8">
        </div>
        <div class="w-full overflow-auto" v-else>

            <div class="w-full grid grid-cols-4 gap-1 px-1">
                <div :title="data.name" v-for="data in page.data" @click.stop="onSelected(data.id)"
                    class="relative cursor-pointer border-sky border-2 flex flex-col text-sm service-block m-2 rounded-lg shadow text-center ring-slate hover:ring-2 focus:ring-2 hover:shadow-md">
                    <div class="overflow-hidden w-full h-full flex flex-col rounded-lg">
                        <div
                            class="relative w-full flex items-center justify-center p-2 relative overflow-hidden min-h-[60px] rounded-lg">
                            <img :src="fileTypeLogo('drive-folder')" alt="" class="max-h-[130px]"
                                style="max-width: 80%;">
                        </div>
                        <div class="w-full bg-gray-100 p-2 truncate">
                            {{ data.name }}
                        </div>
                    </div>
                    <div @contextmenu.stop="" v-if="page.selected == data.id"
                        class="absolute ring-2 ring-green-600 top-0 left-0 bg-gray-300/10 backdrop-blur-sm rounded w-full h-full">
                        <span
                            class="absolute top-[3px] right-[3px] rounded-full w-10 h-10 flex items-center justify-center">
                            <font-awesome-icon icon="fas fa-check-circle" class="w-6 h-6" color="#0ca678" />
                        </span>
                    </div>
                </div>

            </div>
            <div class="w-full flex justify-center items-center" v-if="page.more">
                <button @click.stop="moreClick" class="px-3 py-2 mx-1 text-sm hover:text-sky-400 tracking-wider rounded-lg bg-none underline">
                    {{ page.moreLoading ? 'Loading ...':'More' }}
                </button>
            </div>
        </div>

    </div>
</template>
<script setup>
import {fileTypeLogo} from '@js/script.js'
import { onMounted, ref } from 'vue';
import { useStore } from 'vuex';

const props = defineProps({
    id: String
})

const emits = defineEmits(['onSelected'])

const store = useStore();

const page = ref({
    loading: true,
    moreLoading: false,
    data: [],
    selected: '',
    more: false
})

const onSelected = (id)=>{
    page.value.selected = id
    emits('onSelected', id)
}

const moreClick = () => {
    let accessible_folders = store.state.drive.drive.accessible_folders;
    if(!accessible_folders.has_next || accessible_folders.next_page_token == null || page.value.moreLoading) return;
    let nextPageToken = accessible_folders.next_page_token
    page.value.moreLoading = true
    store.dispatch(`getMoreAccessibleFolders`, {pid: props.id, nextPageToken: nextPageToken}).then((res)=>{
        if(res.ok){
            page.value.moreLoading = false
            page.value.data.push(...res.data.list)
            page.value.more = res.data.has_next
        }
    })
}

onMounted(()=>{
    store.dispatch(`getAccessibleFolders`, {pid: props.id}).then((res)=>{
        if(res.ok){
            page.value.loading = false
            page.value.data = res.data.list
            page.value.more = res.data.has_next
        }
    })
})
</script>