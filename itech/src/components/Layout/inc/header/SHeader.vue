<template>
    <div class="fixed top-0 left-0 p-2 w-full bg-gray-100/40 backdrop-blur sm shadow-sm header">
        <div class="w-full max-w-[85%] flex items-center justify-between header mx-auto">

            <div class="logo flex items-center justify-start">
                <img src="@img/logo-02.svg" alt="Itech business logo" class="w-[50px]">
                <h1>Choose Service</h1>
            </div>
            <div class="flex items-center justify-center">
                <router-link :to="{name: 'top'}" class="py-1 px-2 rounded hover:font-bold hover:text-[#0f857d] mr-2"
                :class="route.name == `home` ? 'text-[#0f857d] font-bold':''"
                >Home</router-link>
                <button class="py-1 px-2 rounded hover:font-bold hover:text-[#0f857d] mr-2"
                :class="route.name == 'service' ? 'text-[#0f857d] font-bold':''"
                >Service</button>
                <button class="py-1 px-2 rounded hover:font-bold hover:text-[#0f857d] mr-2"
                :class="route.name == 'api'? 'text-[#0f857d] font-bold':''"
                >API</button>
                <button class="py-1 px-2 rounded hover:font-bold hover:text-[#0f857d] mr-2"
                :class="route.name == 'documentation'? 'text-[#0f857d] font-bold':''"
                >Documentations</button>
            </div>
        </div>
    </div>
</template>
<script setup>
import { useRoute } from 'vue-router';

const route = useRoute()
</script>