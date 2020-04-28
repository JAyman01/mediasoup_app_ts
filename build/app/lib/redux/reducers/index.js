"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var redux_1 = require("redux");
var room_1 = __importDefault(require("./room"));
var me_1 = __importDefault(require("./me"));
var producers_1 = __importDefault(require("./producers"));
var dataProducers_1 = __importDefault(require("./dataProducers"));
var peers_1 = __importDefault(require("./peers"));
var consumers_1 = __importDefault(require("./consumers"));
var dataConsumers_1 = __importDefault(require("./dataConsumers"));
var notifications_1 = __importDefault(require("./notifications"));
var reducers = redux_1.combineReducers({
    room: room_1.default,
    me: me_1.default,
    producers: producers_1.default,
    dataProducers: dataProducers_1.default,
    peers: peers_1.default,
    consumers: consumers_1.default,
    dataConsumers: dataConsumers_1.default,
    notifications: notifications_1.default
});
exports.default = reducers;
