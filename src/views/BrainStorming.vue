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

let category = ['']

const iterationCount = ref<number>(0)
const ideaLeft = ref<Idea[]>([])
const ideaRight = ref<Idea[]>([])
const randomNumberLeft = getRandomNumbers()
const randomNumberRight = getRandomNumbers()
const showMessage = ref<boolean>(true)
const dataLeft = ref<Idea[]>([])
const dataRight = ref<Idea[]>([])
// const showMessage = ref<boolean[]>(Array(12).fill(false)) // 各 StickyNote の表示状態を管理

let intervalId: number | null = null

// const triggerTransitions = () => {
//  ideaLeft.value.forEach((_, i) => {
//   setTimeout(() => {
//    showMessage.value[i] = false
//    setTimeout(() => {
//     showMessage.value[i] = true
//    }, 100000)
//   }, i * 100000)
//  })
// }

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
 //  return shuffled.slice(0, 10)
 return [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
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

// カテゴリのリストを抽出
function extractCategories(ideas: Idea[]): string[] {
 const categories = ideas.map((idea) => idea.カテゴリ)
 return Array.from(new Set(categories))
}

// GAS経由でスプシからデータ取得
async function getData() {
 //  カテゴリを一周したらリセット
 if (iterationCount.value == category.length) {
  iterationCount.value = 0
 }
 const idea: Idea[] = await GetData.get()
 category = extractCategories(idea)
 const sortedIdea = groupByCategory(idea)
 const shuffleData: Idea[] = shuffleArray(sortedIdea[category[iterationCount.value]])
 const { data1, data2 } = splitData(shuffleData)
 dataLeft.value = data1
 dataRight.value = data2
 ideaLeft.value = data1
 ideaRight.value = data2
}

function changeData() {
 ideaLeft.value[1] = dataLeft.value[13]
 console.log('test')
 console.log(ideaLeft.value[1])
 console.log(dataLeft.value[14])
}

onMounted(async () => {
 await getData()
})

const polling = () => {
 setTimeout(async () => {
  iterationCount.value++
  await getData()
  changeData()
  console.log('polling')
  polling() // 再帰呼び出し
 }, 6000)
}
polling()
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
        v-show="ideaLeft[index - 1] != undefined && randomNumberLeft?.includes(index - 1)"
        v-bind="ideaLeft[index - 1]"
        :visibility="showMessage"
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
        v-if="ideaRight[index] != undefined && randomNumberRight?.includes(index)"
        v-bind="ideaRight[index]"
        :visibility="showMessage"
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
