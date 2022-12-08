<template>
  <div class="relative" @mousedown.prevent="">
    <button class="px-2 w-full py-1 bg-white backdrop-blur-sm rounded-lg flex items-center justify-between"
    @click="toggleShow"
    >
      <label class="text-sm px-2">{{selectedList.name}}</label>
      <div class="flex items-center justify-center w-8 h-8 rounded-full">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
          class="w-4 h-4">
          <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 15L12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9" />
        </svg>
      </div>
    </button>
    <Transition name="select-box">
      <div :class="max.height" v-if="editorData.show" tabindex="-1" ref="selectBox" @blur.prevent="editorData.show = false"
       @mousedown.prevent=""
        class="flex overflow-y-auto text-sm flex-col w-full absolute top-[110%] rounded shadow-lg bg-white/50 border-2 outline-0 border-gray-300 shadow-lg backdrop-blur focus:outline-none">
        <button 
        class="px-2 py-1 border-b-2 w-full flex items-center select-options justify-between" v-for="(list , index) in lists"
        :class="activeClass(index)"
        :data-comment="commentData(index)"
         @mousedown.prevent="changeHandler(index)"
        >
          <div class="flex items-center justify-start">
            <div class="flex items-center justify-center w-8 h-8">
              <i class="fa-solid fa-hashtag text-sm"></i>
            </div>
            <span class="">{{list.name}}</span>
          </div>
        </button>
      </div>
    </Transition>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import itech from '../../../js/itech';

const props = defineProps({
    data: {
        type: Array,
        default: [
            {
                id: 0,
                name: "List 1"
            },
            {
                id: 1,
                name: "List 2"
            },
            {
                id: 2,
                name: "List 3"
            }
        ]
    },
    placeholder: {
      type: String,
      default: 'Select Options'
    }
    ,
    max:{
      type: Object,
      default: {
        height: 'max-h-30',
        width: ''
      }
    }
})

const emits = defineEmits(['changes'])

const lists = ref(props.data)
const editorData = ref({
  show: false,
  active: false,
})
const selectedList = ref({
  id: null,
  name: props.placeholder
})
//selectbox
const selectBox = ref()
//functions
const toggleShow = function(){
  if(editorData.value.show){
    editorData.value.show = false
  }else{
    editorData.value.show = true
    itech().wait(30, () => { }, () => {
      selectBox.value.focus()
    })
  }
}
const changeHandler = function(index){
  if('isUsed' in lists.value[index] && lists.value[index].isUsed){
    return false
  }
  selectedList.value = lists.value[index]
  lists.value.forEach(l=>{
    if('active' in l){
      l['active'] = false
    }
  })
  lists.value[index].active = true
  editorData.value.show = false
  emits('changes',selectedList.value)
}

//active class
const activeClass = function(index){
  let res = 'hover:bg-green-300/30 hover:text-green-600';
  if('active' in lists.value[index]){
    if(lists.value[index].active){
      res= 'bg-green-300/30 text-green-600 hover:bg-green-300/30 hover:text-green-600 cursor-not-allowed'
    }
  }
  if('isUsed' in lists.value[index] && lists.value[index].isUsed){
    res= 'bg-gray-300/30 text-gray-600 relative used'
  }
  return res
}
//comment
const commentData = function(index){
  let res = ''
  if('isUsed' in lists.value[index] && lists.value[index].isUsed){
    res= 'Used'
  }
  return res
}
</script>
<style>
.itech-helper-slide-right-enter-active,
.itech-helper-slide-right-leave-active {
  transition: all .5s cubic-bezier(1, 0.82, 0.165, 1);
}

.itech-helper-slide-right-enter-from,
.itech-helper-slide-right-leave-to{
  right: -35px
}

.select-box-enter-active,
.select-box-leave-active {
  transition: all .2s cubic-bezier(1, 0.82, 0.165, 1);
}

.select-box-enter-from,
.select-box-leave-to{
  top:  calc(100% - 5px);
  opacity: 0;
}
</style>
