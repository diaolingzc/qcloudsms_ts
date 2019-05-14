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
 * PromptVoiceSender
 *
 * @param appid   -sdk appid
 * @param appkey  -sdk appkey
 * @constructor
 */
class PromptVoiceSender {
    constructor(appid, appkey) {
        this.url = 'https://cloud.tim.qq.com/v5/tlsvoicesvr/sendvoiceprompt';
        this.appid = appid;
        this.appkey = appkey;
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
    send(nationCode, phoneNumber, prompttype = 2, msg, playtimes = 2, ext) {
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
                    prompttype: prompttype,
                    promptfile: msg,
                    playtimes: playtimes,
                    ext: ext,
                    sig: util_1.calculateSignature(this.appkey, random, now, [phoneNumber]),
                    time: now
                }
            };
            let result = yield rpn(options);
            return result;
        });
    }
}
exports.PromptVoiceSender = PromptVoiceSender;
/**
 * CodeVoiceSender
 *
 * @param appid   -sdk appid
 * @param appkey  -sdk appkey
 * @constructor
 */
class CodeVoiceSender {
    constructor(appid, appkey) {
        this.url = 'https://cloud.tim.qq.com/v5/tlsvoicesvr/sendcvoice';
        this.appid = appid;
        this.appkey = appkey;
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
    send(nationCode, phoneNumber, msg, playtimes = 2, ext) {
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
                    msg: msg,
                    playtimes: playtimes,
                    ext: ext,
                    sig: util_1.calculateSignature(this.appkey, random, now, [phoneNumber]),
                    time: now
                }
            };
            let result = yield rpn(options);
            return result;
        });
    }
}
exports.CodeVoiceSender = CodeVoiceSender;
/**
 * TtsVoiceSender
 *
 * @param appid   -sdk appid
 * @param appkey  -sdk appkey
 * @constructor
 */
class TtsVoiceSender {
    constructor(appid, appkey) {
        this.url = 'https://cloud.tim.qq.com/v5/tlsvoicesvr/sendtvoice';
        this.appid = appid;
        this.appkey = appkey;
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
    send(nationCode, phoneNumber, templId, params, playtimes = 2, ext) {
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
                    tpl_id: templId,
                    params: params,
                    playtimes: playtimes,
                    ext: ext,
                    sig: util_1.calculateSignature(this.appkey, random, now, [phoneNumber]),
                    time: now
                }
            };
            let result = yield rpn(options);
            return result;
        });
    }
}
exports.TtsVoiceSender = TtsVoiceSender;
