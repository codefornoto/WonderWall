<script setup lang="ts">
import { onMounted, ref, computed, watch } from 'vue'
import { useRoute } from 'vue-router'
import TheLogo from '../components/TheLogo.vue'
import DataConverter from '../services/dataConverter'
import StickyNote from '../components/StickyNote.vue'
import type { Idea } from '@/types/type'

const route = useRoute()
const mode = route.query.mode
const left = route.query.left ?? 10
const right = route.query.right ?? 10
const polling = route.query.polling ? Number(route.query.polling) * 1000 : 5 * 60 * 1000
const backgroundImage = route.query.background ? route.query.background : 'wakura_night_view.jpg'
const sheetName = route.query.sheetName ? (route.query.sheetName as string) : 'demo'
const categoryList = ref<string[]>([''])
const rawData = ref<Idea[]>([])
const isFading = ref(true)
// 表示するカテゴリーの番号
const categoryCount = ref<number>(0)
// 変更する付箋の番号
const activeNoteNumber = ref<number>(0)
// 変更する付箋が何周したかの数字
const noteIterationCount = ref<number>(0)
// 表示するデータ
const ideaLeft = ref<Idea[]>([])
const ideaRight = ref<Idea[]>([])
// 付箋を表示する位置
const randomNumberLeft = getRandomNumbers(Number(left))
const randomNumberRight = getRandomNumbers(Number(right))
// 各 StickyNote の表示状態を管理
const showMessage = ref<boolean[]>(Array(12).fill(true))

// 付箋を表示する位置を決定する
function getRandomNumbers(sheets: number): number[] {
 const numbers = Array.from({ length: 12 }, (_, i) => i)
 const shuffled = numbers.sort(() => Math.random() - 0.5)
 if (mode === 'demo') {
  return [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]
 } else {
  return shuffled.slice(0, sheets)
 }
}

// データを右側と左側用に半分に
function splitData(data: Idea[]): { data1: Idea[]; data2: Idea[] } {
 const data1: Idea[] = []
 const data2: Idea[] = []

 if (data) {
  data.forEach((item: any, index: number) => {
   if (index % 2 === 0) {
    data1.push(item)
   } else {
    data2.push(item)
   }
  })
 }
 return { data1, data2 }
}

// カテゴリごとにリストを整理
function groupByCategory(ideas: Idea[]): Record<string, Idea[]> {
 return ideas.reduce(
  (acc, idea) => {
   if (!acc[idea.category]) {
    acc[idea.category] = []
   }
   acc[idea.category].push(idea)
   return acc
  },
  {} as Record<string, Idea[]>
 )
}

// 背景スタイルを動的に生成
const backgroundStyle = computed(() => ({
 backgroundImage: 'url(https://codefornoto.github.io/images/' + backgroundImage + ')',
 backgroundSize: 'cover',
 backgroundPosition: 'center',
 width: '100vw',
 height: '100vh',
 transition: 'opacity 1s',
 opacity: isFading.value ? 1 : 0
}))

// GAS経由でスプシからデータ取得
async function getData() {
 const { data: ideas, categories } = await DataConverter.get(sheetName)
 rawData.value = DataConverter.shuffleArray(ideas)
 categoryList.value = categories
}

async function changeCategory() {
 //  カテゴリを一周したらリセット
 if (categoryCount.value == categoryList.value.length) {
  categoryCount.value = 0
  await getData()
 }
 const sortedIdea = groupByCategory(rawData.value)
 const { data1, data2 } = splitData(sortedIdea[categoryList.value[categoryCount.value]])
 ideaLeft.value = data1
 ideaRight.value = data2
}

// バックエンド（GAS）からデータを再取得
const fetchData = async () => {
 noteIterationCount.value = 0
 activeNoteNumber.value = 0
 changeCategory()
 setTimeout(async () => {
  categoryCount.value++
  fetchData()
 }, polling)
}

onMounted(async () => {
 await getData()
 fetchData()
})
</script>

<template>
 <v-container fluid :style="backgroundStyle">
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
        v-show="ideaLeft[index - 1] != undefined && randomNumberLeft?.includes(index - 1)"
        v-bind="ideaLeft[index - 1]"
        :visibility="showMessage[index - 1]"
       />
      </v-fade-transition>
     </v-col>
    </v-row>
   </v-col>
   <!-- 真ん中 -->
   <v-col cols="2" class="ma-0 pa-0">
    <div v-show="mode === 'demo'">
     {{ categoryCount }} : {{ activeNoteNumber }} : {{ noteIterationCount }}
    </div>
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
        v-show="ideaRight[index - 1] != undefined && randomNumberRight?.includes(index - 1)"
        v-bind="ideaRight[index - 1]"
        :visibility="showMessage[index - 1]"
       />
      </v-fade-transition>
     </v-col>
    </v-row>
   </v-col>
  </v-row>
 </v-container>
</template>

<style scoped>
.v-expand-transition {
 transition: all 3s ease; /* 1.5秒のトランジション時間を設定 */
}
</style>
