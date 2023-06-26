<template>
    <div id="tool-dashboard" class="w-[75%] ml-[25%] px-4">
        <div class="w-full sticky top-[55px] px-3 py-2 bg-gray-200/40 backdrop-blur-sm rounded-lg z-10 flex justify-between items-center">
            {{ name }}
            <div class="flex items-center">
                <button @click="selectionBox = !selectionBox" @focusout="selectionBox = false"  class="relative py-1 px-2 rounded-lg ring-2 bg-green-500/50 cursor-pointer text-sm ring-slate-300 mr-2" v-if="multiSelectOption().active">
                    {{ multiSelectOption().data }}
                    <Transition name="btn-pop">
                        <div @click.stop="" class="absolute overflow-hidden top-[100%] right-0 flex flex-col bg-gray-300 mt-1 rounded shadow-sm" v-if="selectionBox">
                            <button class="text-left p-2 min-w-[150px] border-b-2">
                                Download {{ store.state.multiSelect.data.length }} files
                            </button>
                            <button class="text-left p-2 min-w-[150px] border-b-2">
                                Delete {{ store.state.multiSelect.data.length }} files
                            </button>
                        </div>
                    </Transition>
                    
                </button>
                <button @click="enableMultiSelect" class="w-8 h-8 rounded-full bg-gray-200 mr-2"
                :class="selectedClass()">
                    <font-awesome-icon icon="fas fa-check-double" />
                </button>
                <button class="w-8 h-8 rounded-full bg-gray-200 mr-2">
                    <font-awesome-icon icon="fas fa-bars" />
                </button>
            </div>
        </div>
        <router-view></router-view>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRoute } from 'vue-router';
import { useStore } from 'vuex';
const props = defineProps({
    name: {
        type: String,
        default: 'itech'
    }
})
const route = useRoute()
const store = useStore()
const enableMultiSelect = ()=>{
    if(store.state.multiSelect.enable){
        store.state.multiSelect = {
            data: [],
            enable: false,
            target: null
        }
    }else{
        store.state.multiSelect.enable = true
        store.state.multiSelect.target = route.meta.service
    }
   
}
const multiSelectOption = ()=>{
    return{
        active: store.state.multiSelect.data.length > 0,
        data : `${store.state.multiSelect.data.length} selected`,
        show: true
    }
}
const selectionBox = ref(false)
const selectedClass = ()=>{
    return store.state.multiSelect.enable ? "bg-gray-400":"bg-gray-200"
}
</script>

<style lang="scss" scoped>

</style>