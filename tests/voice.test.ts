import { PromptVoiceSender, CodeVoiceSender, TtsVoiceSender } from '../src/voice'
let appID: number = xxxxx
let appKey: string = 'xxxxx'
let templId: number = 1234
let nationCode: string = '86'
let phoneNumber: string = 'xxxxx'
let prompttype: number = 2
let msg: string = '您的验证码是 1 2 3 4 5 6'
let playtimes: number = 2
let ext: string = 'xxxxx'
let params: Array<string> = ['123456']

const PromptVoice = new PromptVoiceSender(appID, appKey)
const CodeVoice = new CodeVoiceSender(appID, appKey)
const TtsVoice = new TtsVoiceSender(appID, appKey)

describe('tencentcloudsms:voice', () => {
  test('PromptVoice.send(): true', async () => {
    expect.assertions(1)
    let data = await PromptVoice.send(nationCode, phoneNumber, prompttype, msg, playtimes, ext)
    expect(data.result).toBe(0)
  })

  test('CodeVoice.send(): true', async () => {
    expect.assertions(1)
    let data = await CodeVoice.send(nationCode, phoneNumber, msg = '1234', playtimes, ext)
    expect(data.result).toBe(0)
  })

  test('TtsVoice.send(): true', async () => {
    expect.assertions(1)
    let data = await TtsVoice.send(nationCode, phoneNumber, templId, params, playtimes, ext)
    expect(data.result).toBe(0)
  })
})