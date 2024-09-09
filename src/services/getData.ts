import http from '../http-common'

// 下記のスプレッドシートのデータを取得する
// https://docs.google.com/spreadsheets/d/1XBUGCAwoNopXpmxZ1bAN5eofScOlkcV_riqpUTgHRQo
const url =
 'https://script.google.com/macros/s/AKfycbwxZm06fLzdMqtM3wZIoeE89LpdpiUQ1DArgH248BtHL8kUBHDrivVpqyn4sZ_8-Q0M/exec'

class GetData {
 async get(sheetName: string) {
  const params = {
   crossDomain: true,
   sheetName: sheetName ? sheetName : 'demo'
  }
  const result = await http.get(url, { params })
  return result.data
 }
}

export default new GetData()
