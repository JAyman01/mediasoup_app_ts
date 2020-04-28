"use strict";
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __spread = (this && this.__spread) || function () {
    for (var ar = [], i = 0; i < arguments.length; i++) ar = ar.concat(__read(arguments[i]));
    return ar;
};
Object.defineProperty(exports, "__esModule", { value: true });
var initialState = [];
var notifications = function (state, action) {
    if (state === void 0) { state = initialState; }
    switch (action.type) {
        case 'ADD_NOTIFICATION':
            {
                var notification = action.payload.notification;
                return __spread(state, [notification]);
            }
        case 'REMOVE_NOTIFICATION':
            {
                var notificationId_1 = action.payload.notificationId;
                return state.filter(function (notification) { return notification.id !== notificationId_1; });
            }
        case 'REMOVE_ALL_NOTIFICATIONS':
            {
                return [];
            }
        default:
            return state;
    }
};
exports.default = notifications;
