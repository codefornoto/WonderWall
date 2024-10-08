import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import Unfonts from 'unplugin-fonts/vite'

// https://vitejs.dev/config/
export default defineConfig({
 base: '/WonderWall',
 build: {
  outDir: 'docs'
 },
 plugins: [
  vue(),
  vueJsx(),
  Unfonts({
   google: {
    families: ['Noto Sans JP']
   }
  })
 ],
 resolve: {
  alias: {
   '@': fileURLToPath(new URL('./src', import.meta.url))
  }
 }
})
