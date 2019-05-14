import { pullSendStatus, pullCallbackStatus } from '../src/delivery'

let appID: number = xxxxx
let appKey: string = 'xxxxxxx'
let beginDate: number = 2019051300
let endDate: number = 2019051323

const pullSend = new pullSendStatus(appID, appKey)
const pullCallback = new pullCallbackStatus(appID, appKey)

describe('tencentcloudsms:delivery', () => {
  test('pullSend.send(): true: ', async () => {
    expect.assertions(1)
    let data = await pullSend.pull(beginDate, endDate)
    expect(data.result).toBe(0)
  })

  test('pullCallback.send(): true: ', async () => {
    expect.assertions(1)
    let data = await pullCallback.pull(beginDate, endDate)
    expect(data.result).toBe(0)
  })

})