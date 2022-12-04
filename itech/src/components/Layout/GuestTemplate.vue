<template>
    <GHeader></GHeader>
    <div class="">
        <div class="w-full py-10 text-center mx-auto main-view h-[80vh] flex items-end justify-center">
            <div class="mask bg-gray-100/30 backdrop-blur-sm w-full h-full"></div>
            <div class="view text-center mt-14 w-[600px] ">
                <h1 class="service-lab drop-shadow-lg">ITech API Service</h1>
                <p class="p-2 mx-auto">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Necessitatibus dolorem delectus sint
                    ducimus facilis minus temporibus atque molestiae dolor? Provident assumenda.
                </p>
                <div class="flex items-center justify-center p-2 mt-4">
                    <button
                        class="px-3 py-2 bg-slate-300 quick-start rounded-lg mx-2 font-bold text-slate-800 ring-inset focus:ring-2">
                        API Tools
                    </button>
                    <button class="px-3 py-2 btn quick-start rounded-lg mx-2 ring-inset focus:ring-2">
                        Quick Start
                    </button>
                </div>

            </div>
        </div>
        <div class="w-full p-2 text-center">
            <div class="services p-2 w-[50%] mx-auto my-4">
                <h2 class="text-2xl font-bold text-center">Services</h2>
                <div class="flex items-center justify-center mt-4">
                    <div
                        class="rounded-full overflow-hidden w-10 h-10 shadow flex items-center justify-center cursor-pointer mx-2">
                        <img src="@img/google-api-icon.svg" alt="Itech business logo" class="w-10 rounded-full">
                    </div>
                    <div
                        class="rounded-full overflow-hidden w-10 h-10 shadow flex items-center justify-center cursor-pointer mx-2">
                        <img src="@img/facebook-api-icon.svg" alt="Itech business logo" class="w-10 rounded-full">
                    </div>
                    <div
                        class="rounded-full overflow-hidden w-10 h-10 shadow flex items-center justify-center cursor-pointer mx-2">
                        <img src="@img/shopify-api-icon.svg" alt="Itech business logo" class="w-10 rounded-full">
                    </div>
                </div>
            </div>
            <div class="w-[80%] mx-auto grid grid-cols-3 gap-4 items-center justify-center my-8">
                <div class="flex overflow-hidden rounded-lg shadow">
                    <div class="w-[50%] api-icon-v google-api"></div>
                    <div class="w-full text-left p-2 bg-slate-100">
                        <h3 class="font-bold text-slate-800">Google Service</h3>
                        <p class="text-sm mt-2">
                            Google Spreadsheets
                        </p>
                        <div class="flex items-center justify-start mt-4 text-sm">
                            <button
                                class="truncate max-w-[30%] overflow-hidden px-2 py-1 bg-slate-300 quick-start rounded-lg mr-2 font-bold text-slate-800 ring-inset focus:ring-2">
                                Doc
                            </button>
                            <button class="px-2 py-1 btn quick-start rounded mx-2 ring-inset focus:ring-2">
                                Quick Start
                            </button>
                        </div>
                    </div>
                </div>
                <div class="flex overflow-hidden rounded-lg shadow">
                    <div class="w-[50%] api-icon-v facebook-api"></div>
                    <div class="w-full text-left p-2 bg-slate-100">
                        <h3 class="font-bold text-slate-800">Google Service</h3>
                        <p class="text-sm mt-2">
                            Google Spreadsheets
                        </p>
                        <div class="flex items-center justify-start mt-4 text-sm">
                            <button
                                class="truncate max-w-[30%] overflow-hidden px-2 py-1 bg-slate-300 quick-start rounded-lg mr-2 font-bold text-slate-800 ring-inset focus:ring-2">
                                Doc
                            </button>
                            <button class="px-2 py-1 btn quick-start rounded mx-2 ring-inset focus:ring-2">
                                Quick Start
                            </button>
                        </div>
                    </div>
                </div>
                <div class="flex overflow-hidden rounded-lg shadow">
                    <div class="w-[50%] api-icon-v shopify-api"></div>
                    <div class="w-full text-left p-2 bg-slate-100">
                        <h3 class="font-bold text-slate-800">Google Service</h3>
                        <p class="text-sm mt-2">
                            Google Spreadsheets
                        </p>
                        <div class="flex items-center justify-start mt-4 text-sm">
                            <button
                                class="truncate max-w-[30%] overflow-hidden px-2 py-1 bg-slate-300 quick-start rounded-lg mr-2 font-bold text-slate-800 ring-inset focus:ring-2">
                                Doc
                            </button>
                            <button class="px-2 py-1 btn quick-start rounded mx-2 ring-inset focus:ring-2">
                                Quick Start
                            </button>
                        </div>
                    </div>
                </div>

            </div>
        </div>
        <div class="w-full px-2 py-20">
            <div class="max-w-[60%] mx-auto">
                <h2 class="text-2xl font-bold text-center">Tools</h2>
                <p class="py-4 text-center">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Aspernatur, facere cumque quo recusandae
                    modi sed veniam beatae excepturi nobis, voluptate error ipsum reprehenderit nesciunt pariatur!
                    Atque, nemo molestias. Velit, dicta!
                </p>
            </div>
            <div class="max-w-[60%] mx-auto tool-field-wrapper mt-14">
                <div class="float-box lt w-[50%] rounded overflow-hidden shadow ring-slate-300 ring-2">
                    <img src="@img/test-ss.png" alt="Tools" class="block">
                </div>
                <div
                    class="float-box rb w-[60%] rounded overflow-hidden shadow-md bg-gray-300/50 backdrop-blur-sm p-4 text-slate-800">
                    <h2 class="font-bold">API Tool</h2>
                    <p class="text-sm py-2">
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Commodi, amet vel magnam in deserunt
                        consectetur, cum sapiente et officia autem nulla soluta laboriosam consequatur. Quam obcaecati
                        in quia ratione ipsum.
                    </p>
                    <div class="flex items-center justify-start mt-4">
                        <button
                            class="px-3 py-2 bg-slate-300 quick-start rounded-lg mr-2 font-bold text-slate-800 ring-inset focus:ring-2">
                            Quick Start
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="w-full py-4">
        <div class="max-w-[60%] mx-auto">
            <h2 class="text-2xl font-bold text-center">Pick Up Your Plan</h2>
        </div>
        <div class="max-w-[80%] mx-auto grid grid-cols-3 gap-4 my-8">
            <div class="h-[200px] rounded-lg shadow bg-gray-200/30 backdrop-blur-sm"></div>
            <div class="h-[200px] rounded-lg shadow bg-gray-200/30 backdrop-blur-sm"></div>
            <div class="h-[200px] rounded-lg shadow bg-gray-200/30 backdrop-blur-sm"></div>
        </div>
    </div>
    <div class="w-full p-2 text-center">
        <a href="http://" target="_blank" rel="noopener noreferrer" class="font-san">https://api.itech.com</a>
    </div>
</template>

<script setup>
import GHeader from './inc/header/GHeader.vue';

</script>

<style lang="scss" scoped>
</style>