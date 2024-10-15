<script setup lang="ts">
import { ref } from 'vue'

const left = ref(10)
const right = ref(10)
const sheetName = ref('demo')
const interval = ref(50)
const polling = ref(300)
</script>

<template>
 <v-container>
  <v-row>
   <v-col cols="4">
    <v-text-field label="左側に表示する付箋の数" v-model="left" variant="underlined"></v-text-field>
   </v-col>
   <v-col cols="4">
    <v-text-field
     label="右側に表示する付箋の数"
     v-model="right"
     variant="underlined"
    ></v-text-field>
   </v-col>
   <v-col cols="4">
    <v-text-field
     label="取得するデータのシート名"
     v-model="sheetName"
     variant="underlined"
    ></v-text-field>
   </v-col>
   <v-col cols="4">
    <v-text-field
     label="付箋のデータを更新する間隔（秒数）"
     v-model="interval"
     variant="underlined"
    ></v-text-field>
   </v-col>
   <v-col cols="4">
    <v-text-field
     label="カテゴリを変更する間隔（秒数）"
     v-model="polling"
     variant="underlined"
    ></v-text-field>
   </v-col>
  </v-row>
  <v-row>
   <v-col>
    <router-link
     :to="{
      name: 'WonderWall',
      query: {
       left: left,
       right: right,
       sheetName: sheetName,
       interval: interval,
       polling: polling
      }
     }"
    >
     Wander Wallを表示する
    </router-link>
   </v-col>
  </v-row>
 </v-container>
</template>

<style scoped>
.v-col {
 color: black;
}
</style>
