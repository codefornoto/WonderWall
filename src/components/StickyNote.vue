<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import type { Idea } from '@/types/type'
import { useRoute } from 'vue-router'

import { mdiFood } from '@mdi/js'
import { mdiHumanMaleMaleChild } from '@mdi/js'
import { mdiTicket } from '@mdi/js'
import { mdiRoad } from '@mdi/js'
import { mdiStadium } from '@mdi/js'
import { mdiHomeCity } from '@mdi/js'
import { mdiAirplane } from '@mdi/js'
import { mdiAccountHardHat } from '@mdi/js'
import { mdiSchool } from '@mdi/js'

const route = useRoute()
const mode = route.query.mode
const props = withDefaults(defineProps<Idea>(), {
 index: 0,
 idea: '',
 category: '',
 timestamp: '',
 name: '',
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

let textStyle = route.query.style
 ? 'd-flex justify-center ' + (route.query.style as string)
 : 'd-flex justify-center'
</script>

<template>
 <v-card v-if="Data.visibility" :color="color" height="21.5vh" width="22vh">
  <v-card-text height="21vh" class="pa-1">
   <v-row no-gutters class="fill-height" align="center" justify="center">
    <v-col align="center" :class="textStyle">
     {{ Data.idea }}
    </v-col>
   </v-row>
  </v-card-text>

  <v-row no-gutters class="px-2" style="font-size: 12px">
   <v-col>{{ Data.ProsCons }}</v-col>
   <v-col class="text-right mr-2">
    <v-icon v-if="Data.category.includes('景観')" :icon="mdiHomeCity" />
    <v-icon v-if="Data.category.includes('食事')" :icon="mdiFood" />
    <v-icon v-if="Data.category.includes('インフラ')" :icon="mdiRoad" />
    <v-icon v-if="Data.category.includes('施設')" :icon="mdiStadium" />
    <v-icon v-if="Data.category.includes('アクティビティ')" :icon="mdiTicket" />
    <v-icon v-if="Data.category.includes('人')" :icon="mdiHumanMaleMaleChild" />
    <v-icon v-if="Data.category.includes('観光')" :icon="mdiAirplane" />
    <v-icon v-if="Data.category.includes('防災')" :icon="mdiAccountHardHat" />
    <v-icon v-if="Data.category.includes('子育て')" :icon="mdiHumanMaleMaleChild" />
    <v-icon v-if="Data.category.includes('その他')" :icon="mdiSchool" />
   </v-col>
  </v-row>
 </v-card>
</template>

<style scoped>
.v-card-text {
 height: 19vh;
 font-size: 14px;
 /* font-weight: bold; */
}
</style>
