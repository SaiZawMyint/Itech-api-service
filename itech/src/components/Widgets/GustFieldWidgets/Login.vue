<template>
  <div class="max-w-[80%]  mx-auto h-[100vh] flex justify-center flex-col">
    <div class="p-2 w-full w-[450px]">
    <div class="w-full">
      <img class="mx-auto h-[150px] w-auto" src="@img/logo-02.svg" alt="Sushi">
    </div>
    <form class="mt-8 space-y-6 w-full" @submit.prevent="login">
      <div v-if="error" class="flex items-start justify-between px-2 py-3 bg-red-100 text-red-500 rounded">
        <span class="max-w-[80%]" v-html="error.error"></span>
        <span @click="error = null"
          class="w-8 h-8 flex itech-rotate-180 items-center justify-center rounded-full transition-colors cursor-pointer hover:bg-[rgba(0,0,0,0.2)]">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
            stroke="currentColor" class="w-6 h-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </span>
      </div>
      <input type="hidden" name="remember" value="true">
      <div class="-space-y-px rounded-md shadow-sm">
        <div>
          <label for="email-address" class="sr-only">Email address</label>
          <input id="email-address" v-model="user.email" name="email" type="email" autocomplete="email" required
            class="relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
            placeholder="Email address">
        </div>
        <div>
          <label for="password" class="sr-only">Password</label>
          <input id="password" v-model="user.password" name="password" type="password" autocomplete="current-password"
            required
            class="relative block w-full appearance-none rounded-none rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
            placeholder="Password">
        </div>
      </div>
      <div class="flex items-center justify-between">
        <div class="text-sm">
          <a href="#" class="font-medium text-indigo-600 hover:text-indigo-500">Forgot your password?</a>
        </div>
      </div>

      <div class="text-center">
        <button type="submit"
          class="group relative flex w-full justify-center rounded-md border border-transparent bg-[#10b0d8] py-2 px-4 text-sm font-medium text-white hover:bg-[#10b0d8ab] focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
          <span class="absolute inset-y-0 left-0 flex items-center pl-3">
            <!-- Heroicon name: mini/lock-closed -->
            <svg class="h-5 w-5 text-indigo-500 group-hover:text-indigo-400" xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
              <path fill-rule="evenodd"
                d="M10 1a4.5 4.5 0 00-4.5 4.5V9H5a2 2 0 00-2 2v6a2 2 0 002 2h10a2 2 0 002-2v-6a2 2 0 00-2-2h-.5V5.5A4.5 4.5 0 0010 1zm3 8V5.5a3 3 0 10-6 0V9h6z"
                clip-rule="evenodd" />
            </svg>
          </span>
          Sign in
        </button>
        Or <br>
        New user?
        <button class="font-medium text-indigo-600 hover:text-indigo-500">Registeration
        </button>
      </div>
    </form>
  </div>
  </div>
  <div class="bg-mask">
    <div class="absolute w-full h-full bg-slate-300/30 backdrop-blur-sm"></div>
  </div>
</template>
<script setup>
import { ref } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';

const store = useStore()
const router = useRouter()
let error = ref()
const user = {
  'email': '',
  'password': ''
}
const login = function(){
  console.log(user)
  store.dispatch('login',user).then((res)=>{
    if(res.ok){
      router.push({'name':'top'})
    }
  })
}
</script>