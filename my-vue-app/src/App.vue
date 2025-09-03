<script setup lang="ts">

</script>

<template>
  <div class="fixed flex gap-16 bg-yellow-300  w-full z-50 top-0 left-0 right-0 justify-center p-4">
    <router-link to="/" class="font-bold text-3xl no-underline text-black">VEOCINÉ</router-link>
  </div>
  <div class="mt-16 pb-16 py-4">
    <RouterView />
  </div>
</template>

<style scoped></style>
