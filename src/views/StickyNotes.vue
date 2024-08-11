<script setup lang="ts">
import StickyNote from '../components/StickyNote.vue'
</script>

<template>
  <v-row>
    <v-col cols="6">
      <StickyNote />
    </v-col>
    <v-col cols="6"> </v-col>
  </v-row>
  <v-row>
    <v-col cols="6"> </v-col>
    <v-col cols="6"> </v-col>
  </v-row>
</template>

<style>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>
