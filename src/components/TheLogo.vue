<script setup lang="ts">
import { ref, onMounted } from 'vue'
import logo from '@/images/LOGO_white.png'
import qr from '@/images/qr.jpg'

const currentTime = ref('')

const updateTime = () => {
 const now = new Date()
 currentTime.value = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
}

onMounted(() => {
 updateTime()
 setInterval(updateTime, 60000) // 1分ごとに更新
})
</script>

<template>
 <v-container>
  <v-row>
   <v-col class="text-center">
    <v-row>
     <v-col>
      <div class="text-h2">
       {{ currentTime }}
      </div>
     </v-col>
    </v-row>
    <v-row>
     <v-col>
      <h4>なんでもありのアイデアの壁</h4>
      <h2>– NOTO Wonder Wall -</h2>
     </v-col>
    </v-row>
   </v-col>
  </v-row>
  <v-row>
   <v-col>
    <v-img :src="logo" class="mx-auto" height="32vh"></v-img>
   </v-col>
  </v-row>
  <v-row>
   <v-col>
    <div class="text-body-2 text-center">
     まちづくりのアイデア <br />
     こんなところが好き <br />
     こんなところが嫌い <br />
     あったらいいな <br />
     こうしたい <br />
     なんでもありの壁 <br />
     みなさんのご意見もお寄せください
    </div>
   </v-col>
  </v-row>
  <v-row>
   <v-col>
    <v-img :src="qr" class="mx-auto" height="20vh"></v-img>
   </v-col>
  </v-row>
 </v-container>
</template>
<style scoped>
.v-col {
 margin: 0;
 padding-right: 0;
 padding-left: 0;
}
</style>
