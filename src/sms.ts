import rpn = require('request-promise-native')
import { calculateSignature, getRandom, getCurrentTime } from './util'

/**
 * SmsSingleSender
 * 
 * @param appid   -sdk appid
 * @param appkey  -sdk appkey
 * @constructor
 */
export class SmsSingleSender {
  private appid: number
  private appkey: string
  private url: string = 'https://yun.tim.qq.com/v5/tlssmssvr/sendsms'

  constructor(appid: number, appkey: string) {
    this.appid = appid
    this.appkey = appkey
  }

  /**
   * Send single SMS message
   * 
   * @param msgType - SMS message type, Enum{0: normal SMS, 1: marketing SMS}
   * @param nationCode -  nation dialing code, e.g. China is 86, USA is 1
   * @param phoneNumber - phone number
   * @param msg - SMS message content
   * @param extend - extend field, default is empty string
   * @param ext - ext field, content will be returned by server as it is
   */
  public async send(msgType: number, nationCode: string, phoneNumber: string, msg: string, extend: string = '', ext: string = ''): Promise<any> {
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
        type: msgType,
        msg: msg,
        sig: calculateSignature(this.appkey, random, now, [phoneNumber]),
        time: now,
        extend: extend,
        ext: ext
      }
    }
    let result: rpn.RequestPromise<any> = await rpn(options)
    return result
  }

  /**
   * Send single SMS message with template paramters
   * 
   * @param nationCode - nation dialing code, e.g. China is 86, USA is 1
   * @param phoneNumber - phone number
   * @param templId - template id
   * @param params - template parameters
   * @param sign - SMS user sign
   * @param extend - extend field, default is empty string
   * @param ext - ext field, content will be returned by server as it is
   */
  public async sendWithParam(nationCode: string, phoneNumber: string, templId: number, params: Array<string>, sign: string = '', extend: string = '', ext: string = ''): Promise<any> {
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
        sign: sign,
        tpl_id: templId,
        params: params,
        sig: calculateSignature(this.appkey, random, now, [phoneNumber]),
        time: now,
        extend: extend,
        ext: ext
      }
    }
    let result: rpn.RequestPromise<any> = await rpn(options)
    return result
  }
}

/**
 * SmsMultiSender
 * 
 * @param {string}  appid   -sdk appid
 * @param {string}  appkey  -sdk appkey
 * @constructor
 */
export class SmsMultiSender {
  private appid: number
  private appkey: string
  private url: string = 'https://yun.tim.qq.com/v5/tlssmssvr/sendmultisms2'

  constructor(appid: number, appkey: string) {
    this.appid = appid
    this.appkey = appkey
  }

  /**
   * Send a SMS messages to multiple phones at once
   * 
   * @param msgType - SMS message type, Enum{0: normal SMS, 1: marketing SMS}
   * @param nationCode - nation dialing code, e.g. China is 86, USA is 1
   * @param phoneNumbers - phone numbers
   * @param msg - SMS message content
   * @param extend - extend field, default is empty string
   * @param ext - ext field, content will be returned by server as it is
   */
  public async send(msgType: number, nationCode: string, phoneNumbers: Array<string>, msg: string, extend: string = '', ext: string = ''): Promise<any> {
    let random: number = getRandom()
    let now: number = getCurrentTime()
    let options: rpn.Options = {
      url: this.url + '?sdkappid=' + this.appid + '&random=' + random,
      method: 'POST',
      json: true,
      body: {
        tel: phoneNumbers.map(function (pn) { return { nationcode: nationCode, mobile: pn } }),
        type: msgType,
        msg: msg,
        sig: calculateSignature(this.appkey, random, now, phoneNumbers),
        time: now,
        extend: extend,
        ext: ext
      }
    }
    let result: rpn.RequestPromise<any> = await rpn(options)
    return result
  }

  /**
   * Send a SMS messages with template parameters to multiple phones at once
   * 
   * @param nationCode - nation dialing code, e.g. China is 86, USA is 1
   * @param phoneNumbers - multiple phone numbers
   * @param templId - template id
   * @param params - template parameters
   * @param sign - SMS user sign
   * @param extend - extend field, default is empty string
   * @param ext - ext field, content will be returned by server as it is
   */
  public async sendWithParam(nationCode: string, phoneNumbers: Array<string>, templId: number, params: Array<string>, sign: string = '', extend: string = '', ext: string = ''): Promise<any> {
    let random: number = getRandom()
    let now: number = getCurrentTime()
    let options: rpn.Options = {
      url: this.url + '?sdkappid=' + this.appid + '&random=' + random,
      method: 'POST',
      json: true,
      body: {
        tel: phoneNumbers.map(function (pn) { return { nationcode: nationCode, mobile: pn } }),
        sign: sign,
        tpl_id: templId,
        params: params,
        sig: calculateSignature(this.appkey, random, now, phoneNumbers),
        time: now,
        extend: extend,
        ext: ext
      }
    }
    let result: rpn.RequestPromise<any> = await rpn(options)
    return result
  }
}

/**
 * SmsStatusPuller
 * 
 * @param {string}  appid   -sdk appid
 * @param {string}  appkey  -sdk appkey
 * @constructor
 */
export class SmsStatusPuller {
  private appid: number
  private appkey: string
  private url: string = 'https://yun.tim.qq.com/v5/tlssmssvr/pullstatus'

  constructor(appid: number, appkey: string) {
    this.appid = appid
    this.appkey = appkey
  }

  /**
   * Pull SMS message status
   * 
   * @param msgType - SMS message type, Enum{0: normal SMS, 1: marketing SMS}
   * @param max - maximum number of message status
   * @private
   */
  private async _pull(msgType: number, max: number): Promise<any> {
    let random: number = getRandom()
    let now: number = getCurrentTime()
    let options: rpn.Options = {
      url: this.url + '?sdkappid=' + this.appid + '&random=' + random,
      method: 'POST',
      json: true,
      body: {
        type: msgType,
        max: max > 0 ? max : 1,
        sig: calculateSignature(this.appkey, random, now),
        time: now
      }
    }
    let result: rpn.RequestPromise<any> = await rpn(options)
    return result
  }

  /**
   * Pull callback SMS messages status
   * 
   * @param max - maximum number of message status
   */
  public async pullCallback(max: number) {
    return await this._pull(0, max)
  }

  /**
   * Pull reply SMS messages status
   * 
   * @param max - maximum number of message status
   */
  public async pullReply(max: number) {
    return await this._pull(1, max)
  }
}

/**
 * SmsMobileStatusPuller
 * 
 * @param {string}  appid   -sdk appid
 * @param {string}  appkey  -sdk appkey
 * @constructor
 */
export class SmsMobileStatusPuller {
  private appid: number
  private appkey: string
  private url: string = 'https://yun.tim.qq.com/v5/tlssmssvr/pullstatus4mobile'

  constructor(appid: number, appkey: string) {
    this.appid = appid
    this.appkey = appkey
  }

  /**
   * Pull SMS messages status for single mobile
   * 
   * @param msgType - SMS message type, Enum{0: normal SMS, 1: marketing SMS}
   * @param nationCode - nation dialing code, e.g. China is 86, USA is 1
   * @param mobile - mobile number
   * @param beginTime - begin time, unix timestamp
   * @param endTime - end time, unix timestamp
   * @param max - maximum number of message status
   * @private
   */
  private async _pull(msgType: number, nationCode: string, mobile: string, beginTime: number, endTime: number, max: number): Promise<any> {
    let random: number = getRandom()
    let now: number = getCurrentTime()
    let options: rpn.Options = {
      url: this.url + '?sdkappid=' + this.appid + '&random=' + random,
      method: 'POST',
      json: true,
      body: {
        type: msgType,
        nationcode: nationCode,
        mobile: mobile,
        begin_time: mobile,
        end_time: endTime,
        max: max > 0 ? max : 1,
        sig: calculateSignature(this.appkey, random, now),
        time: now
      }
    }
    let result: rpn.RequestPromise<any> = await rpn(options)
    return result
  }

  /**
   * Pull callback SMS message status for single mobile
   * 
   * @param nationCode - nation dialing code, e.g. China is 86, USA is 1
   * @param mobile - mobile number
   * @param beginTime - begin time, unix timestamp
   * @param endTime - end time, unix timestamp
   * @param max - maximum number of message status
   */
  public async pullCallback(nationCode: string, mobile: string, beginTime: number, endTime: number, max: number) {
    return await this._pull(0, nationCode, mobile, beginTime, endTime, max)
  }

  /**
   * Pull reply SMS message status for single mobile
   * 
   * @param nationCode - nation dialing code, e.g. China is 86, USA is 1
   * @param mobile - mobile number
   * @param beginTime - begin time, unix timestamp
   * @param endTime - end time, unix timestamp
   * @param max - maximum number of message status
   */
  public async pullReply(nationCode: string, mobile: string, beginTime: number, endTime: number, max: number) {
    return await this._pull(0, nationCode, mobile, beginTime, endTime, max)
  }
}