<template>
  <div class="vue-counter">
    <p>
      Count: <strong>{{ count }}</strong>
    </p>
    <button @click="count++">+ Plus</button>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

const count = ref(0);
</script>

<style scoped>
.vue-card {
  padding: 20px;
  border: 2px solid #42b883;
  border-radius: 10px;
  background: #e8fdf2;
  max-width: 320px;
}
h3 {
  margin: 0 0 12px;
  color: #2a7a52;
}
p {
  margin: 0 0 12px;
}
button {
  padding: 8px 16px;
  background: #42b883;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-weight: bold;
  color: white;
}
button:hover {
  background: #33a06f;
}
</style>
