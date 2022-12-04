<template>
    <div class="fixed top-0 left-0 p-2 w-full bg-gray-100/40 backdrop-blur sm shadow-sm header">
        <div class="w-full max-w-[85%] flex items-center justify-between header mx-auto">
            <div class="logo flex items-center justify-start">
                <img src="@img/logo-02.svg" alt="Itech business logo" class="w-[50px]">
            </div>
            <div class="flex items-center justify-center">
                <button class="py-1 px-2 rounded hover:bg-green-200/30 mr-2">Home</button>
                <button class="py-1 px-2 rounded hover:bg-green-200/30 mr-2">Service</button>
                <button class="py-1 px-2 rounded hover:bg-green-200/30 mr-2">API</button>
                <button class="py-1 px-2 rounded hover:bg-green-200/30 mr-2">Documentations</button>
                <button class="py-1 px-2 rounded hover:bg-green-200/30 mr-2">Join</button>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    setup () {
        

        return {}
    }
}
</script>

<style lang="scss" scoped>

</style>