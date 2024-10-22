import http from '../http-common'
import type { Idea } from '@/types/type'

// 下記のスプレッドシートのデータを取得する
// https://docs.google.com/spreadsheets/d/1XBUGCAwoNopXpmxZ1bAN5eofScOlkcV_riqpUTgHRQo
const url =
 'https://script.google.com/macros/s/AKfycbwBM3RgTwMWZWXDc4INqa-9mmdIqCn_xfDTYhppjkVNW5fZnpsuZBckmQ08FvwWSpcn/exec'
//  'https://script.google.com/macros/s/AKfycbwxZm06fLzdMqtM3wZIoeE89LpdpiUQ1DArgH248BtHL8kUBHDrivVpqyn4sZ_8-Q0M/exec'

class DataConverter {
 // 取得したデータをランダムに入れ替え
 shuffleArray<Idea>(array: Idea[]): Idea[] {
  for (let i = array.length - 1; i > 0; i--) {
   const j = Math.floor(Math.random() * (i + 1))
   ;[array[i], array[j]] = [array[j], array[i]]
  }
  return array
 }
 // カテゴリのリストを抽出
 extractCategories(ideas: Idea[]): string[] {
  const categories = ideas.map((idea) => idea.category)
  return Array.from(new Set(categories))
 }
 //  メイン
 async get(sheetName: string): Promise<{ data: Idea[]; categories: string[] }> {
  const params = {
   crossDomain: true,
   sheetName: sheetName
  }
  const result = await http.get(url, { params })
  const data = result.data.map((idea: Idea, idx: number) => ({ ...idea, index: idx + 0 })) as Idea[]
  const categories = this.extractCategories(data)
  return {
   data,
   categories
  }
 }
}

export default new DataConverter()
