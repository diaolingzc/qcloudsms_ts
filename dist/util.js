"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const CryptoJS = require("crypto-js");
function getRandom() {
    return Math.round(Math.random() * 99999);
}
exports.getRandom = getRandom;
function getCurrentTime() {
    return Math.floor(Date.now() / 1000);
}
exports.getCurrentTime = getCurrentTime;
function calculateSignature(appkey, random, time, phoneNumbers) {
    let key;
    if (phoneNumbers) {
        key = "appkey=" + appkey + "&random=" + random + "&time=" + time
            + "&mobile=" + phoneNumbers.join(",");
    }
    else {
        key = "appkey=" + appkey + "&random=" + random + "&time=" + time;
    }
    let signature = CryptoJS.SHA256(key).toString();
    console.log(signature);
    return signature;
}
exports.calculateSignature = calculateSignature;
