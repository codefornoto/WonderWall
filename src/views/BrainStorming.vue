<script setup lang="ts">
import { onMounted, ref, computed, watch } from 'vue'
import { useRoute } from 'vue-router'
import TheLogo from '../components/TheLogo.vue'
import DataConverter from '../services/dataConverter'
import StickyNote from '../components/StickyNote.vue'
import type { Idea } from '@/types/type'

const route = useRoute()
const mode = route.query.mode
const categoryList = ref<string[]>([])
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
const randomNumberLeft = getRandomNumbers()
const randomNumberRight = getRandomNumbers()
// 表示していないデータも含めた全データ
const dataLeft = ref<Idea[]>([])
const dataRight = ref<Idea[]>([])
// 各 StickyNote の表示状態を管理
const showMessage = ref<boolean[]>(Array(12).fill(true))
// 初期背景画像のURLをセット
const backgroundImageUrl = ref('url("https://codefornoto.github.io/images/wakura_night_view.jpg")')
const interval = route.query.interval ? Number(route.query.interval) : 300000

function getRandomImageUrl(): string {
 const imageUrls = [
  'url("https://codefornoto.github.io/images/wakura_night_view.jpg")',
  'url("https://codefornoto.github.io/images/wakura_monument.jpg")',
  'url("https://codefornoto.github.io/images/wakura_sunset.jpg")',
  'url("https://codefornoto.github.io/images/souyu_day.jpg")',
  'url("https://codefornoto.github.io/images/souyu_night.jpg")'
 ]
 const randomIndex = Math.floor(Math.random() * imageUrls.length)
 return imageUrls[randomIndex]
}

// 付箋を表示する位置を決定する
function getRandomNumbers(): number[] {
 const numbers = Array.from({ length: 12 }, (_, i) => i + 1)
 const shuffled = numbers.sort(() => Math.random() - 0.5)
 if (mode === 'demo') {
  return [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
 } else {
  return shuffled.slice(0, 11)
 }
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

// カテゴリごとにリストを整理
function groupByCategory(ideas: Idea[]): Record<string, Idea[]> {
 return ideas.reduce(
  (acc, idea) => {
   if (!acc[idea.カテゴリ]) {
    acc[idea.カテゴリ] = []
   }
   acc[idea.カテゴリ].push(idea)
   return acc
  },
  {} as Record<string, Idea[]>
 )
}

// 背景スタイルを動的に生成
const backgroundStyle = computed(() => ({
 backgroundImage: backgroundImageUrl.value,
 backgroundSize: 'cover',
 backgroundPosition: 'center',
 width: '100vw',
 height: '100vh'
}))

// GAS経由でスプシからデータ取得
async function getData() {
 //  カテゴリを一周したらリセット
 if (categoryCount.value == categoryList.value.length) {
  categoryCount.value = 0
 }
 // データとカテゴリを取得
 const { data: ideas, categories } = await DataConverter.get(route.query.sheetName as string)
 categoryList.value = categories
 const sortedIdea = groupByCategory(ideas)
 const { data1, data2 } = splitData(sortedIdea[categories[categoryCount.value]])
 dataLeft.value = data1
 dataRight.value = data2
 ideaLeft.value = data1
 ideaRight.value = data2
}

// 表示内容の更新処理
async function changeData() {
 if (dataLeft.value[activeNoteNumber.value + 12 * (noteIterationCount.value + 1)] !== undefined) {
  ideaLeft.value[activeNoteNumber.value] =
   dataLeft.value[activeNoteNumber.value + 12 * (noteIterationCount.value + 1)]
  ideaRight.value[activeNoteNumber.value] =
   dataRight.value[activeNoteNumber.value + 12 * (noteIterationCount.value + 1)]
 } else {
  noteIterationCount.value = 0
 }

 //  付箋が最後=12番目まで更新されたら、1枚目に戻る
 if (noteIterationCount.value === 11) {
  noteIterationCount.value = 0
 }
}

onMounted(async () => {
 await getData()
 polling()
 updateNotes()
})

// 5分=300秒に一度データを再取得
const polling = async () => {
 backgroundImageUrl.value = getRandomImageUrl()
 noteIterationCount.value = 0
 activeNoteNumber.value = 0
 await getData()
 setTimeout(async () => {
  categoryCount.value++
  polling()
 }, interval)
}

// 50秒ごとに付箋の内容を更新
const updateNotes = () => {
 setTimeout(() => {
  if (activeNoteNumber.value === 12) {
   noteIterationCount.value++
   activeNoteNumber.value = 0
  }
  changeData()
  activeNoteNumber.value++
  updateNotes()
 }, 2000)
}
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
        v-show="ideaRight[index] != undefined && randomNumberRight?.includes(index)"
        v-bind="ideaRight[index]"
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
