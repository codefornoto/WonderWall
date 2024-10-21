<script setup lang="ts">
import { reactive, ref, watch } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const selectedStorageKey = ref('')
const settingList = ref([''])
const backgroundList = ref([
 'souyu_day.jpg',
 'souyu_night.jpg',
 'wakura_monument.jpg',
 'wakura_night_view.jpg',
 'wakura_sunset.jpg'
])
const qrcodeList = ref(['qr_form1.jpg', 'qr_form2.jpg'])

let setting = reactive({
 left: 10,
 right: 10,
 sheetName: 'demo',
 background: 'wakura_night_view.jpg',
 polling: 5 * 60,
 form: 'qr_form1.jpg',
 settingKey: 'latest'
})

watch(selectedStorageKey, () => {
 getLocalStorageData(selectedStorageKey.value)
})

function saveSettings(key: string) {
 localStorage.setItem(key, JSON.stringify(setting))
}

function getLocalStorageData(key: string) {
 const data = localStorage.getItem(key)
 if (data) {
  const parsedData = JSON.parse(data)
  Object.assign(setting, parsedData)
 }
}

for (const key in localStorage) {
 if (Object.prototype.hasOwnProperty.call(localStorage, key)) {
  settingList.value.push(key)
 }
}
getLocalStorageData('latest')

router.beforeEach((to, from, next) => {
 saveSettings('latest')
 next()
})
</script>

<template>
 <v-container>
  <v-row>
   <v-col cols="2"> 設定 </v-col>
   <v-col cols="10">
    <v-row>
     <v-col cols="3">
      <v-text-field
       label="左側に表示する付箋の数"
       v-model="setting.left"
       variant="underlined"
      ></v-text-field>
     </v-col>
     <v-col cols="3">
      <v-text-field
       label="右側に表示する付箋の数"
       v-model="setting.right"
       variant="underlined"
      ></v-text-field>
     </v-col>
     <v-col cols="3">
      <v-text-field
       label="取得するデータのシート名"
       v-model="setting.sheetName"
       variant="underlined"
      ></v-text-field>
     </v-col>
     <v-col cols="3">
      <v-text-field
       label="カテゴリを変更する間隔（秒数）"
       v-model="setting.polling"
       variant="underlined"
      ></v-text-field>
     </v-col>
     <v-col cols="4">
      <v-select
       label="フォームのQRコードを指定"
       v-model="setting.form"
       :items="qrcodeList"
       variant="underlined"
      ></v-select>
     </v-col>
     <v-col>
      <v-img
       :src="'https://codefornoto.github.io/images/' + setting.form"
       class="mx-auto"
       height="15vh"
      ></v-img>
     </v-col>
    </v-row>
    <v-row>
     <v-col cols="4">
      <v-select
       label="背景画像を指定"
       v-model="setting.background"
       :items="backgroundList"
       variant="underlined"
      ></v-select>
     </v-col>
     <v-col>
      <v-img
       :src="'https://codefornoto.github.io/images/' + setting.background"
       class="mx-auto"
       height="30vh"
      ></v-img>
     </v-col>
    </v-row>
   </v-col>
  </v-row>
  <v-row>
   <v-col cols="4">
    <router-link
     :to="{
      name: 'WonderWall',
      query: {
       left: setting.left,
       right: setting.right,
       sheetName: setting.sheetName,
       background: setting.background,
       polling: setting.polling,
       form: setting.form
      }
     }"
    >
     Wander Wallを表示
    </router-link>
   </v-col>
  </v-row>
  <v-row>
   <v-col cols="2"> 設定保存 </v-col>
   <v-col cols="5">
    <v-text-field
     label="設定名（設定呼出時に使用）"
     v-model="setting.settingKey"
     variant="underlined"
    >
    </v-text-field>
   </v-col>
   <v-col cols="5">
    <v-btn @click="saveSettings(setting.settingKey)"> 入力した名前で設定保存 </v-btn>
   </v-col>
  </v-row>
  <v-row>
   <v-col cols="2"> 設定呼び出し </v-col>
   <v-col>
    <v-select
     label="呼び出す設定を選択"
     v-model="selectedStorageKey"
     :items="settingList"
     variant="underlined"
    ></v-select>
   </v-col>
  </v-row>
 </v-container>
</template>

<style scoped>
.v-col {
 color: black;
}
</style>
