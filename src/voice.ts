import rpn = require('request-promise-native')
import { calculateSignature, getRandom, getCurrentTime } from './util'

/**
 * PromptVoiceSender
 * 
 * @param appid   -sdk appid
 * @param appkey  -sdk appkey
 * @constructor
 */
export class PromptVoiceSender {
  private appid: number
  private appkey: string
  private url: string = 'https://cloud.tim.qq.com/v5/tlsvoicesvr/sendvoiceprompt'

  constructor(appid: number, appkey: string) {
    this.appid = appid
    this.appkey = appkey
  }

  /**
   * Send a prompt voice
   * 
   * @param nationCode - nation dialing code, e.g. China is 86, USA is 1
   * @param phoneNumber -  phone number
   * @param prompttype - voice prompt type, currently value is 2
   * @param msg - prompt voice message
   * @param playtimes - playtimes, optional, max is 3, default is 2
   * @param ext - ext field, content will be returned by server as it is
   */
  public async send(nationCode: string, phoneNumber: string, prompttype: number = 2, msg: string, playtimes: number = 2, ext: string): Promise<any> {
    let random: number = getRandom()
    let now: number = getCurrentTime()
    let options: rpn.Options = {
      url: this.url + '?sdkappid=' + this.appid + '&random=' + random,
      method: 'POST',
      json: true,
      body: {
        tel: {
          nationcode: nationCode,
          mobile: phoneNumber
        },
        prompttype: prompttype,
        promptfile: msg,
        playtimes: playtimes,
        ext: ext,
        sig: calculateSignature(this.appkey, random, now, [phoneNumber]),
        time: now
      }
    }
    let result: rpn.RequestPromise<any> = await rpn(options)
    return result
  }
}

/**
 * CodeVoiceSender
 * 
 * @param appid   -sdk appid
 * @param appkey  -sdk appkey
 * @constructor
 */
export class CodeVoiceSender {
  private appid: number
  private appkey: string
  private url: string = 'https://cloud.tim.qq.com/v5/tlsvoicesvr/sendcvoice'

  constructor(appid: number, appkey: string) {
    this.appid = appid
    this.appkey = appkey
  }

  /**
   * Send a code voice
   * 
   * @param nationCode - nation dialing code, e.g. China is 86, USA is 1
   * @param phoneNumber -  phone number
   * @param msg - voice verify code message
   * @param playtimes - playtimes, optional, max is 3, default is 2
   * @param ext - ext field, content will be returned by server as it is
   */
  public async send(nationCode: string, phoneNumber: string, msg: string, playtimes: number = 2, ext: string): Promise<any> {
    let random: number = getRandom()
    let now: number = getCurrentTime()
    let options: rpn.Options = {
      url: this.url + '?sdkappid=' + this.appid + '&random=' + random,
      method: 'POST',
      json: true,
      body: {
        tel: {
          nationcode: nationCode,
          mobile: phoneNumber
        },
        msg: msg,
        playtimes: playtimes,
        ext: ext,
        sig: calculateSignature(this.appkey, random, now, [phoneNumber]),
        time: now
      }
    }
    let result: rpn.RequestPromise<any> = await rpn(options)
    return result
  }
}

/**
 * TtsVoiceSender
 * 
 * @param appid   -sdk appid
 * @param appkey  -sdk appkey
 * @constructor
 */
export class TtsVoiceSender {
  private appid: number
  private appkey: string
  private url: string = 'https://cloud.tim.qq.com/v5/tlsvoicesvr/sendtvoice'

  constructor(appid: number, appkey: string) {
    this.appid = appid
    this.appkey = appkey
  }

  /**
   * Send a tts voice
   * 
   * @param nationCode - nation dialing code, e.g. China is 86, USA is 1
   * @param phoneNumber -  phone number
   * @param templId - template id
   * @param params - template parameters
   * @param playtimes - playtimes, optional, max is 3, default is 2
   * @param ext - ext field, content will be returned by server as it is
   */
  public async send(nationCode: string, phoneNumber: string, templId: number, params: Array<string>, playtimes: number = 2, ext: string): Promise<any> {
    let random: number = getRandom()
    let now: number = getCurrentTime()
    let options: rpn.Options = {
      url: this.url + '?sdkappid=' + this.appid + '&random=' + random,
      method: 'POST',
      json: true,
      body: {
        tel: {
          nationcode: nationCode,
          mobile: phoneNumber
        },
        tpl_id: templId,
        params: params,
        playtimes: playtimes,
        ext: ext,
        sig: calculateSignature(this.appkey, random, now, [phoneNumber]),
        time: now
      }
    }
    let result: rpn.RequestPromise<any> = await rpn(options)
    return result
  }
}
