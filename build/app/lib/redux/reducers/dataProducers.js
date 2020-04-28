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
var dataProducers = function (state, action) {
    var _a;
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
        case 'ADD_DATA_PRODUCER':
            {
                var dataProducer = action.payload.dataProducer;
                return __assign(__assign({}, state), (_a = {}, _a[dataProducer.id] = dataProducer, _a));
            }
        case 'REMOVE_DATA_PRODUCER':
            {
                var dataProducerId = action.payload.dataProducerId;
                var newState = __assign({}, state);
                delete newState[dataProducerId];
                return newState;
            }
        default:
            {
                return state;
            }
    }
};
exports.default = dataProducers;
