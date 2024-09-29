<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { mdiFood } from '@mdi/js'
import { mdiHumanMaleMaleChild } from '@mdi/js'
import { mdiTicket } from '@mdi/js'
import { mdiRoad } from '@mdi/js'
import { mdiStadium } from '@mdi/js'
import { mdiHomeCity } from '@mdi/js'
import { mdiLightbulb } from '@mdi/js'
import type { Idea } from '@/types/type'
import { useRoute } from 'vue-router'

const route = useRoute()
const mode = route.query.mode
const props = withDefaults(defineProps<Idea>(), {
 index: 0,
 アイデア: '',
 カテゴリ: '',
 タイムスタンプ: '',
 ニックネーム: '',
 ProsCons: '',
 visibility: false
})

let color = ref<string>('#ECDDFF')

const Data = computed(() => {
 return props
})

watch(
 () => props,
 () => {
  color.value = getRandomColorCode()
 },
 { deep: true }
)

function getRandomColorCode(): string {
 const colorCodes = [
  '#DCF0FF',
  '#C2E5D1',
  '#D0F5A2',
  '#FFF0B3',
  '#FFDFCA',
  '#FFDADA',
  '#FFD0FF',
  '#ECDDFF'
 ]
 const randomIndex = Math.floor(Math.random() * colorCodes.length)
 return colorCodes[randomIndex]
}
</script>

<template>
 <v-card v-if="Data.visibility" :color="color" height="22vh" width="22vh">
  <v-card-text height="21vh">
   <v-row align="center" no-gutters>
    <v-col v-show="mode === 'demo'">{{ Data.index }}</v-col>
    <v-col class="text-body-1"> {{ Data.アイデア }} </v-col>
   </v-row>
  </v-card-text>
  <v-row no-gutters>
   <v-col class="ml-2">{{ Data.ニックネーム }}</v-col>
   <v-col class="text-body-2 text-right mr-2">
    <v-icon v-if="Data.カテゴリ.includes('景観')" :icon="mdiHomeCity" />
    <v-icon v-if="Data.カテゴリ.includes('食事')" :icon="mdiFood" />
    <v-icon v-if="Data.カテゴリ.includes('インフラ')" :icon="mdiRoad" />
    <v-icon v-if="Data.カテゴリ.includes('施設')" :icon="mdiStadium" />
    <v-icon v-if="Data.カテゴリ.includes('アクティビティ')" :icon="mdiTicket" />
    <v-icon v-if="Data.カテゴリ.includes('人')" :icon="mdiHumanMaleMaleChild" />
    <v-icon v-if="Data.カテゴリ.includes('その他')" :icon="mdiLightbulb" />
    <!-- <v-icon v-else :icon="mdiCity" /> -->
   </v-col>
  </v-row>
 </v-card>
</template>

<style>
.v-card-text {
 height: 19vh;
}
</style>
