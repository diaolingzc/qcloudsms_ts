import { SmsSingleSender, SmsMultiSender, SmsStatusPuller, SmsMobileStatusPuller } from '../src/sms'

let appID: number = xxxxx
let appKey: string = 'xxxxx'
let msgType: number = 0
let nationCode: string = '86'
let phoneNumber: string = 'xxxxx'
let phoneNumbers: Array<string> = ['xxxxx', 'xxxxxx']
let msg: string = '【腾讯云】您的验证码是111111，请在5分钟内填写，如非本人操作，请忽略。'
let params: Array<string> = ['111111']
let extend: string = 'xxxx'
let ext: string = 'xxxx'
let templId: number = 1234
let sign: string = '腾讯云'
let max = 50
let betinTime = Math.floor(Date.now() / 1000) - 24 * 60 * 60
let endTime = Math.floor(Date.now() / 1000)


const smsSingle = new SmsSingleSender(appID, appKey)
const smsMulti = new SmsMultiSender(appID, appKey)
const SmsStatus = new SmsStatusPuller(appID, appKey)
const SmsMobile = new SmsMobileStatusPuller(appID, appKey)

describe('tencentcloudsms:sms', () => {
  test('smsSingle.send(): true', async () => {
    expect.assertions(1)
    let data = await smsSingle.send(msgType, nationCode, phoneNumber, msg, extend, ext)
    expect(data.result).toBe(0)
  })

  test('smsSingle.sendWithParam(): true', async () => {
    expect.assertions(1)
    let data = await smsSingle.sendWithParam(nationCode, phoneNumber, templId, params, sign, extend, ext)
    expect(data.result).toBe(0)
  })

  test('smsMulti.send(): true', async () => {
    expect.assertions(1)
    let data = await smsMulti.send(msgType, nationCode, phoneNumbers, msg, extend, ext)
    console.log(data)
    expect(data.result).toBe(0)
  })

  test('smsMulti.sendWithParam(): true', async () => {
    expect.assertions(1)
    let data = await smsMulti.sendWithParam(nationCode, phoneNumbers, templId, params, sign, extend, ext)
    expect(data.result).toBe(0)
  })

  test('SmsStatus.pullCallback(): true', async () => {
    expect.assertions(1)
    let data = await SmsStatus.pullCallback(max)
    expect(data.result).toBe(0)
  })

  test('SmsStatus.pullReply(): true', async () => {
    expect.assertions(1)
    let data = await SmsStatus.pullReply(max)
    expect(data.result).toBe(0)
  })

  test('SmsMobile.pullCallback(): true', async () => {
    expect.assertions(1)
    let data = await SmsMobile.pullCallback(nationCode, phoneNumber, betinTime, endTime, max)
    expect(data.result).toBe(0)
  })

  test('SmsMobile.pullReply(): true', async () => {
    expect.assertions(1)
    let data = await SmsMobile.pullReply(nationCode, phoneNumber, betinTime, endTime, max)
    expect(data.result).toBe(0)
  })
})