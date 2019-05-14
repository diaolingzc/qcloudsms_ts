import CryptoJS = require('crypto-js')

export function getRandom(): number {
  return Math.round(Math.random() * 99999)
}

export function getCurrentTime(): number {
  return Math.floor(Date.now() / 1000)
}

export function calculateSignature(appkey: string, random: string | number, time: number, phoneNumbers?: Array<string>): string {
  let key: string
  if (phoneNumbers) {
    key = "appkey=" + appkey + "&random=" + random + "&time=" + time
      + "&mobile=" + phoneNumbers.join(",")
  } else {
    key = "appkey=" + appkey + "&random=" + random + "&time=" + time
  }
  let signature: string = CryptoJS.SHA256(key).toString()
  console.log(signature)
  return signature
}
