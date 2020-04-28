"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var random_string_1 = __importDefault(require("random-string"));
var stateActions = __importStar(require("./stateActions"));
// This returns a redux-thunk action (a function).
exports.notify = function (_a) {
    var _b = _a.type, type = _b === void 0 ? 'info' : _b, text = _a.text, title = _a.title, timeout = _a.timeout;
    if (!timeout) {
        switch (type) {
            case 'info':
                timeout = 3000;
                break;
            case 'error':
                timeout = 5000;
                break;
        }
    }
    var notification = {
        id: random_string_1.default({ length: 6 }).toLowerCase(),
        type: type,
        title: title,
        text: text,
        timeout: timeout
    };
    return function (dispatch) {
        dispatch(stateActions.addNotification(notification));
        setTimeout(function () {
            dispatch(stateActions.removeNotification(notification.id));
        }, timeout);
    };
};
