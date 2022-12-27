<template>
    <div class="fixed top-0 left-0 p-2 w-full bg-gray-100/40 backdrop-blur sm shadow-sm header">
        <div class="w-full max-w-[100%] flex items-center justify-between header mx-auto">

            <div class="logo flex items-end justify-start">
                <router-link :to="{name:'top'}">
                    <img src="@img/logo-02.svg" alt="Itech business logo mb-1" class="w-[50px]">
                </router-link>
                <h1 class="px-2 text-xl font-bold">Services</h1>
            </div>
            <div class="flex items-center justify-center">
                <router-link :to="{name: 'services'}"
                    class="rounded-full flex items-center justify-start px-2 py-1 hover:font-bold hover:text-[#0f857d] mr-2"
                    :class="route.name == `itech.home` ? 'text-[#0f857d] font-bold':''">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                        stroke="currentColor" class="w-4 h-4">
                        <path stroke-linecap="round" stroke-linejoin="round"
                            d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
                    </svg>
                    <span class="px-2">Home</span>
                </router-link>
                <button
                    class="rounded-full flex items-center justify-start px-2 py-1 hover:font-bold hover:text-[#0f857d] mr-2"
                    :class="route.meta.APITOOL ? 'text-[#0f857d] font-bold':''">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                        stroke="currentColor" class="w-4 h-4">
                        <path stroke-linecap="round" stroke-linejoin="round"
                            d="M11.42 15.17L17.25 21A2.652 2.652 0 0021 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 11-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 004.486-6.336l-3.276 3.277a3.004 3.004 0 01-2.25-2.25l3.276-3.276a4.5 4.5 0 00-6.336 4.486c.091 1.076-.071 2.264-.904 2.95l-.102.085m-1.745 1.437L5.909 7.5H4.5L2.25 3.75l1.5-1.5L7.5 4.5v1.409l4.26 4.26m-1.745 1.437l1.745-1.437m6.615 8.206L15.75 15.75M4.867 19.125h.008v.008h-.008v-.008z" />
                    </svg>

                    <span class="px-2">API Tool</span>
                </button>
                <button
                    class="rounded-full flex items-center justify-start px-2 py-1 hover:font-bold hover:text-[#0f857d] mr-2"
                    :class="route.name == 'documentation'? 'text-[#0f857d] font-bold':''">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                        stroke="currentColor" class="w-4 h-4">
                        <path stroke-linecap="round" stroke-linejoin="round"
                            d="M6 6.878V6a2.25 2.25 0 012.25-2.25h7.5A2.25 2.25 0 0118 6v.878m-12 0c.235-.083.487-.128.75-.128h10.5c.263 0 .515.045.75.128m-12 0A2.25 2.25 0 004.5 9v.878m13.5-3A2.25 2.25 0 0119.5 9v.878m0 0a2.246 2.246 0 00-.75-.128H5.25c-.263 0-.515.045-.75.128m15 0A2.25 2.25 0 0121 12v6a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 18v-6c0-.98.626-1.813 1.5-2.122" />
                    </svg>
                    <span class="px-2">Documents</span>
                </button>
                <button
                    class="rounded-full flex items-center justify-start px-2 py-1 hover:font-bold hover:text-[#0f857d] mr-2"
                    :class="route.name == 'documentation'? 'text-[#0f857d] font-bold':''">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                        stroke="currentColor" class="w-5 h-5">
                        <path stroke-linecap="round" stroke-linejoin="round"
                            d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                    </svg>
                    <span class="px-2">Account</span>
                </button>
            </div>
        </div>
    </div>
</template>
<script setup>
import { useRoute } from 'vue-router';

const route = useRoute()
</script>