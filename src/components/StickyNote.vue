<script setup lang="ts">
import { computed, ref } from 'vue'
import { mdiFood } from '@mdi/js'
import { mdiHumanMaleMaleChild } from '@mdi/js'
import { mdiTicket } from '@mdi/js'
import { mdiRoad } from '@mdi/js'
import { mdiStadium } from '@mdi/js'
import { mdiHomeCity } from '@mdi/js'
import { mdiLightbulb } from '@mdi/js'

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

const Idea = computed(() => {
 return props
})

let color = ref<string>('#ECDDFF')
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

color.value = getRandomColorCode()
</script>

<template>
 <v-card v-if="Idea.visibility" :color="color" height="22vh" width="22vh">
  <v-card-text height="21vh">
   <v-row align="center" no-gutters>
    <v-col class="text-body-1"> {{ Idea.アイデア }} </v-col>
   </v-row>
  </v-card-text>
  <v-row no-gutters>
   <v-spacer></v-spacer>
   <v-col class="text-body-2 text-right mr-2">
    <v-icon v-if="Idea.カテゴリ.includes('景観')" :icon="mdiHomeCity" />
    <v-icon v-if="Idea.カテゴリ.includes('食事')" :icon="mdiFood" />
    <v-icon v-if="Idea.カテゴリ.includes('インフラ')" :icon="mdiRoad" />
    <v-icon v-if="Idea.カテゴリ.includes('施設')" :icon="mdiStadium" />
    <v-icon v-if="Idea.カテゴリ.includes('アクティビティ')" :icon="mdiTicket" />
    <v-icon v-if="Idea.カテゴリ.includes('人')" :icon="mdiHumanMaleMaleChild" />
    <v-icon v-if="Idea.カテゴリ.includes('その他')" :icon="mdiLightbulb" />
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
