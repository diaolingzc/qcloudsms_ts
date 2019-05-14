"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const rpn = require("request-promise-native");
const util_1 = require("./util");
/**
 * SmsSingleSender
 *
 * @param appid   -sdk appid
 * @param appkey  -sdk appkey
 * @constructor
 */
class SmsSingleSender {
    constructor(appid, appkey) {
        this.url = 'https://yun.tim.qq.com/v5/tlssmssvr/sendsms';
        this.appid = appid;
        this.appkey = appkey;
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
    send(msgType, nationCode, phoneNumber, msg, extend = '', ext = '') {
        return __awaiter(this, void 0, void 0, function* () {
            let random = util_1.getRandom();
            let now = util_1.getCurrentTime();
            let options = {
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
                    sig: util_1.calculateSignature(this.appkey, random, now, [phoneNumber]),
                    time: now,
                    extend: extend,
                    ext: ext
                }
            };
            let result = yield rpn(options);
            return result;
        });
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
    sendWithParam(nationCode, phoneNumber, templId, params, sign = '', extend = '', ext = '') {
        return __awaiter(this, void 0, void 0, function* () {
            let random = util_1.getRandom();
            let now = util_1.getCurrentTime();
            let options = {
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
                    sig: util_1.calculateSignature(this.appkey, random, now, [phoneNumber]),
                    time: now,
                    extend: extend,
                    ext: ext
                }
            };
            let result = yield rpn(options);
            return result;
        });
    }
}
exports.SmsSingleSender = SmsSingleSender;
/**
 * SmsMultiSender
 *
 * @param {string}  appid   -sdk appid
 * @param {string}  appkey  -sdk appkey
 * @constructor
 */
class SmsMultiSender {
    constructor(appid, appkey) {
        this.url = 'https://yun.tim.qq.com/v5/tlssmssvr/sendmultisms2';
        this.appid = appid;
        this.appkey = appkey;
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
    send(msgType, nationCode, phoneNumbers, msg, extend = '', ext = '') {
        return __awaiter(this, void 0, void 0, function* () {
            let random = util_1.getRandom();
            let now = util_1.getCurrentTime();
            let options = {
                url: this.url + '?sdkappid=' + this.appid + '&random=' + random,
                method: 'POST',
                json: true,
                body: {
                    tel: phoneNumbers.map(function (pn) { return { nationcode: nationCode, mobile: pn }; }),
                    type: msgType,
                    msg: msg,
                    sig: util_1.calculateSignature(this.appkey, random, now, phoneNumbers),
                    time: now,
                    extend: extend,
                    ext: ext
                }
            };
            let result = yield rpn(options);
            return result;
        });
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
    sendWithParam(nationCode, phoneNumbers, templId, params, sign = '', extend = '', ext = '') {
        return __awaiter(this, void 0, void 0, function* () {
            let random = util_1.getRandom();
            let now = util_1.getCurrentTime();
            let options = {
                url: this.url + '?sdkappid=' + this.appid + '&random=' + random,
                method: 'POST',
                json: true,
                body: {
                    tel: phoneNumbers.map(function (pn) { return { nationcode: nationCode, mobile: pn }; }),
                    sign: sign,
                    tpl_id: templId,
                    params: params,
                    sig: util_1.calculateSignature(this.appkey, random, now, phoneNumbers),
                    time: now,
                    extend: extend,
                    ext: ext
                }
            };
            let result = yield rpn(options);
            return result;
        });
    }
}
exports.SmsMultiSender = SmsMultiSender;
/**
 * SmsStatusPuller
 *
 * @param {string}  appid   -sdk appid
 * @param {string}  appkey  -sdk appkey
 * @constructor
 */
class SmsStatusPuller {
    constructor(appid, appkey) {
        this.url = 'https://yun.tim.qq.com/v5/tlssmssvr/pullstatus';
        this.appid = appid;
        this.appkey = appkey;
    }
    /**
     * Pull SMS message status
     *
     * @param msgType - SMS message type, Enum{0: normal SMS, 1: marketing SMS}
     * @param max - maximum number of message status
     * @private
     */
    _pull(msgType, max) {
        return __awaiter(this, void 0, void 0, function* () {
            let random = util_1.getRandom();
            let now = util_1.getCurrentTime();
            let options = {
                url: this.url + '?sdkappid=' + this.appid + '&random=' + random,
                method: 'POST',
                json: true,
                body: {
                    type: msgType,
                    max: max > 0 ? max : 1,
                    sig: util_1.calculateSignature(this.appkey, random, now),
                    time: now
                }
            };
            let result = yield rpn(options);
            return result;
        });
    }
    /**
     * Pull callback SMS messages status
     *
     * @param max - maximum number of message status
     */
    pullCallback(max) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this._pull(0, max);
        });
    }
    /**
     * Pull reply SMS messages status
     *
     * @param max - maximum number of message status
     */
    pullReply(max) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this._pull(1, max);
        });
    }
}
exports.SmsStatusPuller = SmsStatusPuller;
/**
 * SmsMobileStatusPuller
 *
 * @param {string}  appid   -sdk appid
 * @param {string}  appkey  -sdk appkey
 * @constructor
 */
class SmsMobileStatusPuller {
    constructor(appid, appkey) {
        this.url = 'https://yun.tim.qq.com/v5/tlssmssvr/pullstatus4mobile';
        this.appid = appid;
        this.appkey = appkey;
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
    _pull(msgType, nationCode, mobile, beginTime, endTime, max) {
        return __awaiter(this, void 0, void 0, function* () {
            let random = util_1.getRandom();
            let now = util_1.getCurrentTime();
            let options = {
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
                    sig: util_1.calculateSignature(this.appkey, random, now),
                    time: now
                }
            };
            let result = yield rpn(options);
            return result;
        });
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
    pullCallback(nationCode, mobile, beginTime, endTime, max) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this._pull(0, nationCode, mobile, beginTime, endTime, max);
        });
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
    pullReply(nationCode, mobile, beginTime, endTime, max) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this._pull(0, nationCode, mobile, beginTime, endTime, max);
        });
    }
}
exports.SmsMobileStatusPuller = SmsMobileStatusPuller;
