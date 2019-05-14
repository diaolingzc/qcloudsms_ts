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
 * pullSendStatus
 *
 * @param {string}  appid   -sdk appid
 * @param {string}  appkey  -sdk appkey
 * @constructor
 */
class pullSendStatus {
    constructor(appid, appkey) {
        this.url = 'https://yun.tim.qq.com/v5/tlssmssvr/pullsendstatus';
        this.appid = appid;
        this.appkey = appkey;
    }
    /**
     * Delivery Statistics
     *
     * @param begin_date - Time to start pulling, which is accurate to hour. Format: yyyymmddhh
     * @param end_date - Time to end pulling, which is accurate to hour. Format: yyyymmddhh
     */
    pull(begin_date, end_date) {
        return __awaiter(this, void 0, void 0, function* () {
            let random = util_1.getRandom();
            let now = util_1.getCurrentTime();
            let options = {
                url: this.url + '?sdkappid=' + this.appid + '&random=' + random,
                method: 'POST',
                json: true,
                body: {
                    begin_date: begin_date,
                    end_date: end_date,
                    sig: util_1.calculateSignature(this.appkey, random, now),
                    time: now
                }
            };
            let result = yield rpn(options);
            return result;
        });
    }
}
exports.pullSendStatus = pullSendStatus;
/**
 * pullCallbackStatus
 *
 * @param {string}  appid   -sdk appid
 * @param {string}  appkey  -sdk appkey
 * @constructor
 */
class pullCallbackStatus {
    constructor(appid, appkey) {
        this.url = 'https://yun.tim.qq.com/v5/tlssmssvr/pullcallbackstatus';
        this.appid = appid;
        this.appkey = appkey;
    }
    /**
     * Devlivery Report Statistics
     *
     * @param begin_date - Time to start pulling, which is accurate to hour. Format: yyyymmddhh
     * @param end_date - Time to end pulling, which is accurate to hour. Format: yyyymmddhh
     */
    pull(begin_date, end_date) {
        return __awaiter(this, void 0, void 0, function* () {
            let random = util_1.getRandom();
            let now = util_1.getCurrentTime();
            let options = {
                url: this.url + '?sdkappid=' + this.appid + '&random=' + random,
                method: 'POST',
                json: true,
                body: {
                    begin_date: begin_date,
                    end_date: end_date,
                    sig: util_1.calculateSignature(this.appkey, random, now),
                    time: now
                }
            };
            let result = yield rpn(options);
            return result;
        });
    }
}
exports.pullCallbackStatus = pullCallbackStatus;
