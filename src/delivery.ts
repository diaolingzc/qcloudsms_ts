import rpn = require('request-promise-native')
import { calculateSignature, getRandom, getCurrentTime } from './util'

/**
 * pullSendStatus
 * 
 * @param {string}  appid   -sdk appid
 * @param {string}  appkey  -sdk appkey
 * @constructor
 */
export class pullSendStatus {
  private appid: number
  private appkey: string
  private url: string = 'https://yun.tim.qq.com/v5/tlssmssvr/pullsendstatus'

  constructor(appid: number, appkey: string) {
    this.appid = appid
    this.appkey = appkey
  }

  /**
   * Delivery Statistics
   * 
   * @param begin_date - Time to start pulling, which is accurate to hour. Format: yyyymmddhh
   * @param end_date - Time to end pulling, which is accurate to hour. Format: yyyymmddhh
   */
  public async pull(begin_date: number, end_date: number): Promise<any> {
    let random: number = getRandom()
    let now: number = getCurrentTime()
    let options: rpn.Options = {
      url: this.url + '?sdkappid=' + this.appid + '&random=' + random,
      method: 'POST',
      json: true,
      body: {
        begin_date: begin_date,
        end_date: end_date,
        sig: calculateSignature(this.appkey, random, now),
        time: now
      }
    }
    let result: rpn.RequestPromise<any> = await rpn(options)
    return result
  }
}

/**
 * pullCallbackStatus
 * 
 * @param {string}  appid   -sdk appid
 * @param {string}  appkey  -sdk appkey
 * @constructor
 */
export class pullCallbackStatus {
  private appid: number
  private appkey: string
  private url: string = 'https://yun.tim.qq.com/v5/tlssmssvr/pullcallbackstatus'

  constructor(appid: number, appkey: string) {
    this.appid = appid
    this.appkey = appkey
  }

  /**
   * Devlivery Report Statistics
   * 
   * @param begin_date - Time to start pulling, which is accurate to hour. Format: yyyymmddhh
   * @param end_date - Time to end pulling, which is accurate to hour. Format: yyyymmddhh
   */
  public async pull(begin_date: number, end_date: number): Promise<any> {
    let random: number = getRandom()
    let now: number = getCurrentTime()
    let options: rpn.Options = {
      url: this.url + '?sdkappid=' + this.appid + '&random=' + random,
      method: 'POST',
      json: true,
      body: {
        begin_date: begin_date,
        end_date: end_date,
        sig: calculateSignature(this.appkey, random, now),
        time: now
      }
    }
    let result: rpn.RequestPromise<any> = await rpn(options)
    return result
  }
}