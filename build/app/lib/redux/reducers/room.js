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
    url: null,
    state: 'new',
    activeSpeakerId: null,
    statsPeerId: null,
    faceDetection: false
};
var room = function (state, action) {
    if (state === void 0) { state = initialState; }
    switch (action.type) {
        case 'SET_ROOM_URL':
            {
                var url = action.payload.url;
                return __assign(__assign({}, state), { url: url });
            }
        case 'SET_ROOM_STATE':
            {
                var roomState = action.payload.state;
                if (roomState === 'connected')
                    return __assign(__assign({}, state), { state: roomState });
                else
                    return __assign(__assign({}, state), { state: roomState, activeSpeakerId: null, statsPeerId: null });
            }
        case 'SET_ROOM_ACTIVE_SPEAKER':
            {
                var peerId = action.payload.peerId;
                return __assign(__assign({}, state), { activeSpeakerId: peerId });
            }
        case 'SET_ROOM_STATS_PEER_ID':
            {
                var peerId = action.payload.peerId;
                if (state.statsPeerId === peerId)
                    return __assign(__assign({}, state), { statsPeerId: null });
                return __assign(__assign({}, state), { statsPeerId: peerId });
            }
        case 'SET_FACE_DETECTION':
            {
                var flag = action.payload;
                return __assign(__assign({}, state), { faceDetection: flag });
            }
        case 'REMOVE_PEER':
            {
                var peerId = action.payload.peerId;
                var newState = __assign({}, state);
                if (peerId && peerId === state.activeSpeakerId)
                    newState.activeSpeakerId = null;
                if (peerId && peerId === state.statsPeerId)
                    newState.statsPeerId = null;
                return newState;
            }
        default:
            return state;
    }
};
exports.default = room;
