<script setup lang="ts">
import { defineProps, ref, watch } from 'vue'

interface Data {
 ProsCons: string
 アイデア: string
 カテゴリ: string
 タイムスタンプ: string
 ニックネーム: string
 visibility: boolean
}
const props = withDefaults(defineProps<Data>(), {
 アイデア: '',
 カテゴリ: '',
 タイムスタンプ: '',
 ニックネーム: '',
 ProsCons: '',
 visibility: false
})

let color = ref<string>('white')

watch(
 () => props.カテゴリ,
 (cate) => {
  if (cate) {
   switch (true) {
    case cate.includes('景観'):
     color.value = '#DCF0FF'
     break
    case cate.includes('食事'):
     color.value = '#C2E5D1'
     break
    case cate.includes('インフラ'):
     color.value = '#D0F5A2'
     break
    case cate.includes('施設'):
     color.value = '#FFF0B3'
     break
    case cate.includes('アクティビティ'):
     color.value = '#FFDFCA'
     break
    case cate.includes('人'):
     color.value = '#FFDADA'
     break
    case cate.includes('その他'):
     color.value = '#FFD0FF'
     break
    default:
     color.value = '#ECDDFF'
     break
   }
  } else {
   color.value = '#ECDDFF' // デフォルトの色
  }
 },
 { immediate: true }
)
</script>

<template>
 <v-card
  v-if="$props.visibility"
  :color="color"
  :text="$props.アイデア"
  height="22vh"
  width="22vh"
  class="text-center d-flex align-center rounded-0"
 >
 </v-card>
</template>

<style>
/* .v-card {
 display: flex;
 justify-content: center;
 align-items: center;
} */
</style>
