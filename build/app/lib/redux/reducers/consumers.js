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
var consumers = function (state, action) {
    var _a, _b, _c, _d, _e, _f, _g, _h;
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
        case 'ADD_CONSUMER':
            {
                var consumer = action.payload.consumer;
                return __assign(__assign({}, state), (_a = {}, _a[consumer.id] = consumer, _a));
            }
        case 'REMOVE_CONSUMER':
            {
                var consumerId = action.payload.consumerId;
                var newState = __assign({}, state);
                delete newState[consumerId];
                return newState;
            }
        case 'SET_CONSUMER_PAUSED':
            {
                var _j = action.payload, consumerId = _j.consumerId, originator = _j.originator;
                var consumer = state[consumerId];
                var newConsumer = void 0;
                if (originator === 'local')
                    newConsumer = __assign(__assign({}, consumer), { locallyPaused: true });
                else
                    newConsumer = __assign(__assign({}, consumer), { remotelyPaused: true });
                return __assign(__assign({}, state), (_b = {}, _b[consumerId] = newConsumer, _b));
            }
        case 'SET_CONSUMER_RESUMED':
            {
                var _k = action.payload, consumerId = _k.consumerId, originator = _k.originator;
                var consumer = state[consumerId];
                var newConsumer = void 0;
                if (originator === 'local')
                    newConsumer = __assign(__assign({}, consumer), { locallyPaused: false });
                else
                    newConsumer = __assign(__assign({}, consumer), { remotelyPaused: false });
                return __assign(__assign({}, state), (_c = {}, _c[consumerId] = newConsumer, _c));
            }
        case 'SET_CONSUMER_CURRENT_LAYERS':
            {
                var _l = action.payload, consumerId = _l.consumerId, spatialLayer = _l.spatialLayer, temporalLayer = _l.temporalLayer;
                var consumer = state[consumerId];
                var newConsumer = __assign(__assign({}, consumer), { currentSpatialLayer: spatialLayer, currentTemporalLayer: temporalLayer });
                return __assign(__assign({}, state), (_d = {}, _d[consumerId] = newConsumer, _d));
            }
        case 'SET_CONSUMER_PREFERRED_LAYERS':
            {
                var _m = action.payload, consumerId = _m.consumerId, spatialLayer = _m.spatialLayer, temporalLayer = _m.temporalLayer;
                var consumer = state[consumerId];
                var newConsumer = __assign(__assign({}, consumer), { preferredSpatialLayer: spatialLayer, preferredTemporalLayer: temporalLayer });
                return __assign(__assign({}, state), (_e = {}, _e[consumerId] = newConsumer, _e));
            }
        case 'SET_CONSUMER_PRIORITY':
            {
                var _o = action.payload, consumerId = _o.consumerId, priority = _o.priority;
                var consumer = state[consumerId];
                var newConsumer = __assign(__assign({}, consumer), { priority: priority });
                return __assign(__assign({}, state), (_f = {}, _f[consumerId] = newConsumer, _f));
            }
        case 'SET_CONSUMER_TRACK':
            {
                var _p = action.payload, consumerId = _p.consumerId, track = _p.track;
                var consumer = state[consumerId];
                var newConsumer = __assign(__assign({}, consumer), { track: track });
                return __assign(__assign({}, state), (_g = {}, _g[consumerId] = newConsumer, _g));
            }
        case 'SET_CONSUMER_SCORE':
            {
                var _q = action.payload, consumerId = _q.consumerId, score = _q.score;
                var consumer = state[consumerId];
                if (!consumer)
                    return state;
                var newConsumer = __assign(__assign({}, consumer), { score: score });
                return __assign(__assign({}, state), (_h = {}, _h[consumerId] = newConsumer, _h));
            }
        default:
            {
                return state;
            }
    }
};
exports.default = consumers;
