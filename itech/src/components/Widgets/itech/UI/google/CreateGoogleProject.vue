<template>
    <div class="flex">
        <div class="w-[30%] pr-2">
            <label for="pj-name" class="text-slate-700 my-2 text-sm">Project Name</label>
            <input v-model="createProjectForm.name" name="project-name" id="pj-name" type="text"
                class="px-3 py-2 rounded text-sm w-full" placeholder="Name">
        </div>
        <div class="w-[70%] pl-2">
            <label for="pj-json" class="text-slate-700 my-2 text-sm">Google Client Json</label>
            <input @change="projectJSON" name="file"
                class="block w-full ring-slate-200 p-1 ring-2 text-sm text-gray-900 border border-gray-300 rounded-lg overflow-hidden cursor-pointer bg-slate-50 focus:outline-none"
                id="pj-json" type="file" accept="application/JSON">
        </div>
    </div>
</template>
<script setup>
defineProps({
    createProjectForm: Object
})
const emits = defineEmits(["fileChange"]);
const projectJSON = (e)=>{
   emits("fileChange", e)
}
</script>