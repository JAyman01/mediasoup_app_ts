"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var js_cookie_1 = __importDefault(require("js-cookie"));
var USER_COOKIE = 'mediasoup-demo.user';
var DEVICES_COOKIE = 'mediasoup-demo.devices';
function getUser() {
    return js_cookie_1.default.getJSON(USER_COOKIE);
}
exports.getUser = getUser;
function setUser(_a) {
    var displayName = _a.displayName;
    js_cookie_1.default.set(USER_COOKIE, { displayName: displayName });
}
exports.setUser = setUser;
function getDevices() {
    return js_cookie_1.default.getJSON(DEVICES_COOKIE);
}
exports.getDevices = getDevices;
function setDevices(_a) {
    var webcamEnabled = _a.webcamEnabled;
    js_cookie_1.default.set(DEVICES_COOKIE, { webcamEnabled: webcamEnabled });
}
exports.setDevices = setDevices;
