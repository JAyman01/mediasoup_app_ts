"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
var initialState = {
    id: null,
    displayName: null,
    displayNameSet: false,
    device: null,
    canSendMic: false,
    canSendWebcam: false,
    canChangeWebcam: false,
    webcamInProgress: false,
    shareInProgress: false,
    audioOnly: false,
    audioOnlyInProgress: false,
    audioMuted: false,
    restartIceInProgress: false
};
var me = function (state, action) {
    if (state === void 0) { state = initialState; }
    switch (action.type) {
        case 'SET_ROOM_STATE':
            {
                var roomState = action.payload.state;
                if (roomState === 'closed') {
                    return __assign(__assign({}, state), { webcamInProgress: false, shareInProgress: false, audioOnly: false, audioOnlyInProgress: false, audioMuted: false, restartIceInProgress: false });
                }
                else {
                    return state;
                }
            }
        case 'SET_ME':
            {
                var _a = action.payload, peerId = _a.peerId, displayName = _a.displayName, displayNameSet = _a.displayNameSet, device = _a.device;
                return __assign(__assign({}, state), { id: peerId, displayName: displayName, displayNameSet: displayNameSet, device: device });
            }
        case 'SET_MEDIA_CAPABILITIES':
            {
                var _b = action.payload, canSendMic = _b.canSendMic, canSendWebcam = _b.canSendWebcam;
                return __assign(__assign({}, state), { canSendMic: canSendMic, canSendWebcam: canSendWebcam });
            }
        case 'SET_CAN_CHANGE_WEBCAM':
            {
                var canChangeWebcam = action.payload;
                return __assign(__assign({}, state), { canChangeWebcam: canChangeWebcam });
            }
        case 'SET_WEBCAM_IN_PROGRESS':
            {
                var flag = action.payload.flag;
                return __assign(__assign({}, state), { webcamInProgress: flag });
            }
        case 'SET_SHARE_IN_PROGRESS':
            {
                var flag = action.payload.flag;
                return __assign(__assign({}, state), { shareInProgress: flag });
            }
        case 'SET_DISPLAY_NAME':
            {
                var displayName = action.payload.displayName;
                // Be ready for undefined displayName (so keep previous one).
                if (!displayName)
                    displayName = state.displayName;
                return __assign(__assign({}, state), { displayName: displayName, displayNameSet: true });
            }
        case 'SET_AUDIO_ONLY_STATE':
            {
                var enabled = action.payload.enabled;
                return __assign(__assign({}, state), { audioOnly: enabled });
            }
        case 'SET_AUDIO_ONLY_IN_PROGRESS':
            {
                var flag = action.payload.flag;
                return __assign(__assign({}, state), { audioOnlyInProgress: flag });
            }
        case 'SET_AUDIO_MUTED_STATE':
            {
                var enabled = action.payload.enabled;
                return __assign(__assign({}, state), { audioMuted: enabled });
            }
        case 'SET_RESTART_ICE_IN_PROGRESS':
            {
                var flag = action.payload.flag;
                return __assign(__assign({}, state), { restartIceInProgress: flag });
            }
        default:
            return state;
    }
};
exports.default = me;
