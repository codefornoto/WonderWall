<script setup lang="ts">
import { onMounted, ref } from 'vue'
import TheLogo from '../components/TheLogo.vue'
import GetData from '../services/getData'
import StickyNote from '../components/StickyNote.vue'

type Idea = {
 ProsCons: string
 アイデア: string
 カテゴリ: string
 タイムスタンプ: string
 ニックネーム: string
}
const messagesLeft = ref<Idea[]>([])
const messagesRight = ref<Idea[]>([])
const count = ref<number>(0)
const randomNumberLeft = getRandomNumbers()
const randomNumberRight = getRandomNumbers()
// const showMessage = ref<boolean>(true)
const showMessage = ref<boolean[]>(Array(12).fill(false)) // 各 StickyNote の表示状態を管理

let intervalId: number | null = null

const triggerTransitions = () => {
 messagesLeft.value.forEach((_, i) => {
  setTimeout(() => {
   showMessage.value[i] = false
   setTimeout(() => {
    showMessage.value[i] = true
   }, 1000)
  }, i * 1000)
 })
}

// 取得したデータをランダムに入れ替え
function shuffleArray<Idea>(array: Idea[]): Idea[] {
 for (let i = array.length - 1; i > 0; i--) {
  const j = Math.floor(Math.random() * (i + 1))
  ;[array[i], array[j]] = [array[j], array[i]]
 }
 return array
}

// 付箋を表示する位置を決定する
function getRandomNumbers(): number[] {
 const numbers = Array.from({ length: 12 }, (_, i) => i + 1)
 const shuffled = numbers.sort(() => Math.random() - 0.5)
 return shuffled.slice(0, 9)
}

// データを右側と左側用に半分に
function splitData(data: Idea[]): { data1: Idea[]; data2: Idea[] } {
 const data1: Idea[] = []
 const data2: Idea[] = []

 data.forEach((item: any, index: number) => {
  if (index % 2 === 0) {
   data1.push(item)
  } else {
   data2.push(item)
  }
 })
 return { data1, data2 }
}

// GAS経由でスプシからデータ取得
async function getData() {
 const data: Idea[] = await GetData.get()
 const shuffleData: Idea[] = shuffleArray(data)
 const { data1, data2 } = splitData(shuffleData)
 messagesLeft.value = data1
 messagesRight.value = data2
}

onMounted(async () => {
 await getData()
  setInterval(getData, 10000)
  intervalId = setInterval(triggerTransitions, 5000)
})
</script>

<template>
 <v-container fluid>
  <v-row>
   <!-- 左側 -->
   <v-col cols="5">
    <v-row>
     <v-col
      v-for="index in 12"
      :key="index"
      cols="4"
      class="d-flex align-center justify-center fill-height"
     >
      <v-fade-transition>
       <StickyNote
        v-show="messagesLeft[index] != undefined && randomNumberLeft?.includes(index)"
        v-bind="messagesLeft[index]"
        :visibility="showMessage[index]"
       />
      </v-fade-transition>
     </v-col>
    </v-row>
   </v-col>
   <!-- 真ん中 -->
   <v-col cols="2" class="ma-0 pa-0">
    <TheLogo />
   </v-col>
   <!-- 右側 -->
   <v-col cols="5">
    <v-row>
     <v-col
      v-for="index in 12"
      :key="index"
      cols="4"
      class="d-flex align-center justify-center fill-height"
     >
      <v-fade-transition>
       <StickyNote
        v-if="messagesRight[index] != undefined && randomNumberRight?.includes(index)"
        v-bind="messagesRight[index]"
        :visibility="showMessage[index]"
       />
      </v-fade-transition>
     </v-col>
    </v-row>
   </v-col>
  </v-row>
 </v-container>
</template>

<style scoped>
/* .v-col {
 padding-bottom: 0;
} */
.v-expand-transition {
 transition: all 3s ease; /* 1.5秒のトランジション時間を設定 */
}
</style>
