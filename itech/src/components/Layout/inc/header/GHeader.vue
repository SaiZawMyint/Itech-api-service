<template>
    <div class="fixed top-0 left-0 p-2 w-full bg-gray-100/40 backdrop-blur sm shadow-sm header">
        <div class="w-full max-w-[85%] flex items-center justify-between header mx-auto">
            <div class="logo flex items-center justify-start">
                <router-link :to="{name:'top'}">
                    <img src="@img/logo-02.svg" alt="Itech business logo mb-1" class="w-[50px]">
                </router-link>
            </div>
            <div class="flex items-center justify-center">
                <router-link :to="{name: 'top'}" class="py-1 px-2 rounded hover:font-bold hover:text-[#0f857d] mr-2"
                :class="route.name == `home` ? 'text-[#0f857d] font-bold':''"
                >Home</router-link>
                <router-link :to="{name: 'join'}" class="py-1 px-2 rounded hover:font-bold hover:text-[#0f857d] mr-2"
                :class="route.name == 'join'? 'text-[#0f857d] font-bold':''"
                >Join</router-link>
                <router-link :to="{name: 'services'}" class="py-1 px-2 rounded hover:font-bold hover:text-[#0f857d] mr-2"
                :class="route.name == 'services' ? 'text-[#0f857d] font-bold':''"
                >Service</router-link>
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

<style lang="scss" scoped>

</style>