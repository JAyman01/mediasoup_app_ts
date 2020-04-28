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
var initialState = {};
var producers = function (state, action) {
    var _a, _b, _c, _d, _e;
    if (state === void 0) { state = initialState; }
    switch (action.type) {
        case 'SET_ROOM_STATE':
            {
                var roomState = action.payload.state;
                if (roomState === 'closed')
                    return {};
                else
                    return state;
            }
        case 'ADD_PRODUCER':
            {
                var producer = action.payload.producer;
                return __assign(__assign({}, state), (_a = {}, _a[producer.id] = producer, _a));
            }
        case 'REMOVE_PRODUCER':
            {
                var producerId = action.payload.producerId;
                var newState = __assign({}, state);
                delete newState[producerId];
                return newState;
            }
        case 'SET_PRODUCER_PAUSED':
            {
                var producerId = action.payload.producerId;
                var producer = state[producerId];
                var newProducer = __assign(__assign({}, producer), { paused: true });
                return __assign(__assign({}, state), (_b = {}, _b[producerId] = newProducer, _b));
            }
        case 'SET_PRODUCER_RESUMED':
            {
                var producerId = action.payload.producerId;
                var producer = state[producerId];
                var newProducer = __assign(__assign({}, producer), { paused: false });
                return __assign(__assign({}, state), (_c = {}, _c[producerId] = newProducer, _c));
            }
        case 'SET_PRODUCER_TRACK':
            {
                var _f = action.payload, producerId = _f.producerId, track = _f.track;
                var producer = state[producerId];
                var newProducer = __assign(__assign({}, producer), { track: track });
                return __assign(__assign({}, state), (_d = {}, _d[producerId] = newProducer, _d));
            }
        case 'SET_PRODUCER_SCORE':
            {
                var _g = action.payload, producerId = _g.producerId, score = _g.score;
                var producer = state[producerId];
                if (!producer)
                    return state;
                var newProducer = __assign(__assign({}, producer), { score: score });
                return __assign(__assign({}, state), (_e = {}, _e[producerId] = newProducer, _e));
            }
        default:
            {
                return state;
            }
    }
};
exports.default = producers;
