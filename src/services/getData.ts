import http from '../http-common'

const url =
 'https://script.google.com/macros/s/AKfycbwxZm06fLzdMqtM3wZIoeE89LpdpiUQ1DArgH248BtHL8kUBHDrivVpqyn4sZ_8-Q0M/exec'
const params = {
 crossDomain: true,
 sheetName: 'demo'
}
class GetData {
 async get() {
  const result = await http.get(url, { params })
  return result.data
 }
}

export default new GetData()
