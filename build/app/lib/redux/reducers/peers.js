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
var initialState = {};
var peers = function (state, action) {
    var _a, _b, _c, _d, _e, _f;
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
        case 'ADD_PEER':
            {
                var peer = action.payload.peer;
                return __assign(__assign({}, state), (_a = {}, _a[peer.id] = peer, _a));
            }
        case 'REMOVE_PEER':
            {
                var peerId = action.payload.peerId;
                var newState = __assign({}, state);
                delete newState[peerId];
                return newState;
            }
        case 'SET_PEER_DISPLAY_NAME':
            {
                var _g = action.payload, displayName = _g.displayName, peerId = _g.peerId;
                var peer = state[peerId];
                if (!peer)
                    throw new Error('no Peer found');
                var newPeer = __assign(__assign({}, peer), { displayName: displayName });
                return __assign(__assign({}, state), (_b = {}, _b[newPeer.id] = newPeer, _b));
            }
        case 'ADD_CONSUMER':
            {
                var _h = action.payload, consumer = _h.consumer, peerId = _h.peerId;
                var peer = state[peerId];
                if (!peer)
                    throw new Error('no Peer found for new Consumer');
                var newConsumers = __spread(peer.consumers, [consumer.id]);
                var newPeer = __assign(__assign({}, peer), { consumers: newConsumers });
                return __assign(__assign({}, state), (_c = {}, _c[newPeer.id] = newPeer, _c));
            }
        case 'REMOVE_CONSUMER':
            {
                var _j = action.payload, consumerId = _j.consumerId, peerId = _j.peerId;
                var peer = state[peerId];
                // NOTE: This means that the Peer was closed before, so it's ok.
                if (!peer)
                    return state;
                var idx = peer.consumers.indexOf(consumerId);
                if (idx === -1)
                    throw new Error('Consumer not found');
                var newConsumers = peer.consumers.slice();
                newConsumers.splice(idx, 1);
                var newPeer = __assign(__assign({}, peer), { consumers: newConsumers });
                return __assign(__assign({}, state), (_d = {}, _d[newPeer.id] = newPeer, _d));
            }
        case 'ADD_DATA_CONSUMER':
            {
                var _k = action.payload, dataConsumer = _k.dataConsumer, peerId = _k.peerId;
                // special case for bot DataConsumer.
                if (!peerId)
                    return state;
                var peer = state[peerId];
                if (!peer)
                    throw new Error('no Peer found for new DataConsumer');
                var newDataConsumers = __spread(peer.dataConsumers, [dataConsumer.id]);
                var newPeer = __assign(__assign({}, peer), { dataConsumers: newDataConsumers });
                return __assign(__assign({}, state), (_e = {}, _e[newPeer.id] = newPeer, _e));
            }
        case 'REMOVE_DATA_CONSUMER':
            {
                var _l = action.payload, dataConsumerId = _l.dataConsumerId, peerId = _l.peerId;
                // special case for bot DataConsumer.
                if (!peerId)
                    return state;
                var peer = state[peerId];
                // NOTE: This means that the Peer was closed before, so it's ok.
                if (!peer)
                    return state;
                var idx = peer.dataConsumers.indexOf(dataConsumerId);
                if (idx === -1)
                    throw new Error('DataConsumer not found');
                var newDataConsumers = peer.dataConsumers.slice();
                newDataConsumers.splice(idx, 1);
                var newPeer = __assign(__assign({}, peer), { dataConsumers: newDataConsumers });
                return __assign(__assign({}, state), (_f = {}, _f[newPeer.id] = newPeer, _f));
            }
        default:
            {
                return state;
            }
    }
};
exports.default = peers;
