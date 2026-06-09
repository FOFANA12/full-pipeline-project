<script setup>
defineEmits(["home"]);
</script>

<template>
  <nav class="navbar bg-white border-bottom">
    <div class="container">
      <a class="navbar-brand fw-semibold" href="#" @click.prevent="$emit('home')">
        Orders Frontend
      </a>
      <!-- <span class="badge text-bg-primary">Vue 3 + Pinia + Bootstrap 5</span> -->
    </div>
  </nav>
</template>
