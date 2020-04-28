"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __values = (this && this.__values) || function(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
};
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
var react_1 = __importDefault(require("react"));
var react_redux_1 = require("react-redux");
var prop_types_1 = __importDefault(require("prop-types"));
var classnames_1 = __importDefault(require("classnames"));
var transitions_1 = require("./transitions");
var RoomContext_1 = require("../RoomContext");
var stateActions = __importStar(require("../redux/stateActions"));
var Stats = /** @class */ (function (_super) {
    __extends(Stats, _super);
    function Stats(props) {
        var _this = _super.call(this, props) || this;
        _this.state =
            {
                sendTransportRemoteStats: null,
                sendTransportLocalStats: null,
                recvTransportRemoteStats: null,
                recvTransportLocalStats: null,
                audioProducerRemoteStats: null,
                audioProducerLocalStats: null,
                videoProducerRemoteStats: null,
                videoProducerLocalStats: null,
                chatDataProducerRemoteStats: null,
                botDataProducerRemoteStats: null,
                audioConsumerRemoteStats: null,
                audioConsumerLocalStats: null,
                videoConsumerRemoteStats: null,
                videoConsumerLocalStats: null,
                chatDataConsumerRemoteStats: null,
                botDataConsumerRemoteStats: null
            };
        _this._delayTimer = null;
        return _this;
    }
    Stats.prototype.render = function () {
        var _a = this.props, peerId = _a.peerId, peerDisplayName = _a.peerDisplayName, isMe = _a.isMe, onClose = _a.onClose;
        var _b = this.state, sendTransportRemoteStats = _b.sendTransportRemoteStats, sendTransportLocalStats = _b.sendTransportLocalStats, recvTransportRemoteStats = _b.recvTransportRemoteStats, recvTransportLocalStats = _b.recvTransportLocalStats, audioProducerRemoteStats = _b.audioProducerRemoteStats, audioProducerLocalStats = _b.audioProducerLocalStats, videoProducerRemoteStats = _b.videoProducerRemoteStats, videoProducerLocalStats = _b.videoProducerLocalStats, chatDataProducerRemoteStats = _b.chatDataProducerRemoteStats, botDataProducerRemoteStats = _b.botDataProducerRemoteStats, audioConsumerRemoteStats = _b.audioConsumerRemoteStats, audioConsumerLocalStats = _b.audioConsumerLocalStats, videoConsumerRemoteStats = _b.videoConsumerRemoteStats, videoConsumerLocalStats = _b.videoConsumerLocalStats, chatDataConsumerRemoteStats = _b.chatDataConsumerRemoteStats, botDataConsumerRemoteStats = _b.botDataConsumerRemoteStats;
        return (react_1.default.createElement("div", { "data-component": 'Stats' },
            react_1.default.createElement("div", { className: classnames_1.default('content', { visible: peerId }) },
                react_1.default.createElement("div", { className: 'header' },
                    react_1.default.createElement("div", { className: 'info' },
                        react_1.default.createElement("div", { className: 'close-icon', onClick: onClose }),
                        react_1.default.createElement(Choose, null,
                            react_1.default.createElement(When, { condition: isMe },
                                react_1.default.createElement("h1", null, "Your Stats")),
                            react_1.default.createElement(Otherwise, null,
                                react_1.default.createElement("h1", null,
                                    "Stats of ",
                                    peerDisplayName)))),
                    react_1.default.createElement("div", { className: 'list' },
                        react_1.default.createElement(If, { condition: sendTransportRemoteStats || sendTransportLocalStats },
                            react_1.default.createElement("p", null,
                                'send transport stats: ',
                                react_1.default.createElement("a", { href: '#send-transport-remote-stats' }, "[remote]"),
                                react_1.default.createElement("span", null, ' '),
                                react_1.default.createElement("a", { href: '#send-transport-local-stats' }, "[local]"))),
                        react_1.default.createElement(If, { condition: recvTransportRemoteStats || recvTransportLocalStats },
                            react_1.default.createElement("p", null,
                                'recv transport stats: ',
                                react_1.default.createElement("a", { href: '#recv-transport-remote-stats' }, "[remote]"),
                                react_1.default.createElement("span", null, ' '),
                                react_1.default.createElement("a", { href: '#recv-transport-local-stats' }, "[local]"))),
                        react_1.default.createElement(If, { condition: audioProducerRemoteStats || audioProducerLocalStats },
                            react_1.default.createElement("p", null,
                                'audio producer stats: ',
                                react_1.default.createElement("a", { href: '#audio-producer-remote-stats' }, "[remote]"),
                                react_1.default.createElement("span", null, ' '),
                                react_1.default.createElement("a", { href: '#audio-producer-local-stats' }, "[local]"))),
                        react_1.default.createElement(If, { condition: videoProducerRemoteStats || videoProducerLocalStats },
                            react_1.default.createElement("p", null,
                                'video producer stats: ',
                                react_1.default.createElement("a", { href: '#video-producer-remote-stats' }, "[remote]"),
                                react_1.default.createElement("span", null, ' '),
                                react_1.default.createElement("a", { href: '#video-producer-local-stats' }, "[local]"))),
                        react_1.default.createElement(If, { condition: chatDataProducerRemoteStats },
                            react_1.default.createElement("p", null,
                                'chat dataproducer stats: ',
                                react_1.default.createElement("a", { href: '#chat-dataproducer-remote-stats' }, "[remote]"),
                                react_1.default.createElement("span", null, ' '),
                                react_1.default.createElement("a", { className: 'disabled' }, "[local]"))),
                        react_1.default.createElement(If, { condition: botDataProducerRemoteStats },
                            react_1.default.createElement("p", null,
                                'bot dataproducer stats: ',
                                react_1.default.createElement("a", { href: '#bot-dataproducer-remote-stats' }, "[remote]"),
                                react_1.default.createElement("span", null, ' '),
                                react_1.default.createElement("a", { className: 'disabled' }, "[local]"))),
                        react_1.default.createElement(If, { condition: audioConsumerRemoteStats || audioConsumerLocalStats },
                            react_1.default.createElement("p", null,
                                'audio consumer stats: ',
                                react_1.default.createElement("a", { href: '#audio-consumer-remote-stats' }, "[remote]"),
                                react_1.default.createElement("span", null, ' '),
                                react_1.default.createElement("a", { href: '#audio-consumer-local-stats' }, "[local]"))),
                        react_1.default.createElement(If, { condition: videoConsumerRemoteStats || videoConsumerLocalStats },
                            react_1.default.createElement("p", null,
                                'video consumer stats: ',
                                react_1.default.createElement("a", { href: '#video-consumer-remote-stats' }, "[remote]"),
                                react_1.default.createElement("span", null, ' '),
                                react_1.default.createElement("a", { href: '#video-consumer-local-stats' }, "[local]"))),
                        react_1.default.createElement(If, { condition: chatDataConsumerRemoteStats },
                            react_1.default.createElement("p", null,
                                'chat dataconsumer stats: ',
                                react_1.default.createElement("a", { href: '#chat-dataconsumer-remote-stats' }, "[remote]"),
                                react_1.default.createElement("span", null, ' '),
                                react_1.default.createElement("a", { className: 'disabled' }, "[local]"))),
                        react_1.default.createElement(If, { condition: botDataConsumerRemoteStats },
                            react_1.default.createElement("p", null,
                                'bot dataconsumer stats: ',
                                react_1.default.createElement("a", { href: '#bot-dataconsumer-remote-stats' }, "[remote]"),
                                react_1.default.createElement("span", null, ' '),
                                react_1.default.createElement("a", { className: 'disabled' }, "[local]"))))),
                react_1.default.createElement("div", { className: 'stats' },
                    react_1.default.createElement(If, { condition: sendTransportRemoteStats }, this._printStats('send transport remote stats', sendTransportRemoteStats)),
                    react_1.default.createElement(If, { condition: sendTransportLocalStats }, this._printStats('send transport local stats', sendTransportLocalStats)),
                    react_1.default.createElement(If, { condition: recvTransportRemoteStats }, this._printStats('recv transport remote stats', recvTransportRemoteStats)),
                    react_1.default.createElement(If, { condition: recvTransportLocalStats }, this._printStats('recv transport local stats', recvTransportLocalStats)),
                    react_1.default.createElement(If, { condition: audioProducerRemoteStats }, this._printStats('audio producer remote stats', audioProducerRemoteStats)),
                    react_1.default.createElement(If, { condition: audioProducerLocalStats }, this._printStats('audio producer local stats', audioProducerLocalStats)),
                    react_1.default.createElement(If, { condition: videoProducerRemoteStats }, this._printStats('video producer remote stats', videoProducerRemoteStats)),
                    react_1.default.createElement(If, { condition: videoProducerLocalStats }, this._printStats('video producer local stats', videoProducerLocalStats)),
                    react_1.default.createElement(If, { condition: chatDataProducerRemoteStats }, this._printStats('chat dataproducer remote stats', chatDataProducerRemoteStats)),
                    react_1.default.createElement(If, { condition: botDataProducerRemoteStats }, this._printStats('bot dataproducer remote stats', botDataProducerRemoteStats)),
                    react_1.default.createElement(If, { condition: audioConsumerRemoteStats }, this._printStats('audio consumer remote stats', audioConsumerRemoteStats)),
                    react_1.default.createElement(If, { condition: audioConsumerLocalStats }, this._printStats('audio consumer local stats', audioConsumerLocalStats)),
                    react_1.default.createElement(If, { condition: videoConsumerRemoteStats }, this._printStats('video consumer remote stats', videoConsumerRemoteStats)),
                    react_1.default.createElement(If, { condition: videoConsumerLocalStats }, this._printStats('video consumer local stats', videoConsumerLocalStats)),
                    react_1.default.createElement(If, { condition: chatDataConsumerRemoteStats }, this._printStats('chat dataconsumer remote stats', chatDataConsumerRemoteStats)),
                    react_1.default.createElement(If, { condition: botDataConsumerRemoteStats }, this._printStats('bot dataconsumer remote stats', botDataConsumerRemoteStats))))));
    };
    Stats.prototype.componentDidUpdate = function (prevProps) {
        var _this = this;
        var peerId = this.props.peerId;
        if (peerId && !prevProps.peerId) {
            this._delayTimer = setTimeout(function () { return _this._start(); }, 250);
        }
        else if (!peerId && prevProps.peerId) {
            this._stop();
        }
        else if (peerId && prevProps.peerId && peerId !== prevProps.peerId) {
            this._stop();
            this._start();
        }
    };
    Stats.prototype._start = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a, roomClient, isMe, audioConsumerId, videoConsumerId, chatDataConsumerId, botDataConsumerId, sendTransportRemoteStats, sendTransportLocalStats, recvTransportRemoteStats, recvTransportLocalStats, audioProducerRemoteStats, audioProducerLocalStats, videoProducerRemoteStats, videoProducerLocalStats, chatDataProducerRemoteStats, botDataProducerRemoteStats, audioConsumerRemoteStats, audioConsumerLocalStats, videoConsumerRemoteStats, videoConsumerLocalStats, chatDataConsumerRemoteStats, botDataConsumerRemoteStats;
            var _this = this;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = this.props, roomClient = _a.roomClient, isMe = _a.isMe, audioConsumerId = _a.audioConsumerId, videoConsumerId = _a.videoConsumerId, chatDataConsumerId = _a.chatDataConsumerId, botDataConsumerId = _a.botDataConsumerId;
                        sendTransportRemoteStats = null;
                        sendTransportLocalStats = null;
                        recvTransportRemoteStats = null;
                        recvTransportLocalStats = null;
                        audioProducerRemoteStats = null;
                        audioProducerLocalStats = null;
                        videoProducerRemoteStats = null;
                        videoProducerLocalStats = null;
                        chatDataProducerRemoteStats = null;
                        botDataProducerRemoteStats = null;
                        audioConsumerRemoteStats = null;
                        audioConsumerLocalStats = null;
                        videoConsumerRemoteStats = null;
                        videoConsumerLocalStats = null;
                        chatDataConsumerRemoteStats = null;
                        botDataConsumerRemoteStats = null;
                        if (!isMe) return [3 /*break*/, 12];
                        return [4 /*yield*/, roomClient.getSendTransportRemoteStats()
                                .catch(function () { })];
                    case 1:
                        sendTransportRemoteStats = _b.sent();
                        return [4 /*yield*/, roomClient.getSendTransportLocalStats()
                                .catch(function () { })];
                    case 2:
                        sendTransportLocalStats = _b.sent();
                        return [4 /*yield*/, roomClient.getRecvTransportRemoteStats()
                                .catch(function () { })];
                    case 3:
                        recvTransportRemoteStats = _b.sent();
                        return [4 /*yield*/, roomClient.getRecvTransportLocalStats()
                                .catch(function () { })];
                    case 4:
                        recvTransportLocalStats = _b.sent();
                        return [4 /*yield*/, roomClient.getAudioRemoteStats()
                                .catch(function () { })];
                    case 5:
                        audioProducerRemoteStats = _b.sent();
                        return [4 /*yield*/, roomClient.getAudioLocalStats()
                                .catch(function () { })];
                    case 6:
                        audioProducerLocalStats = _b.sent();
                        return [4 /*yield*/, roomClient.getVideoRemoteStats()
                                .catch(function () { })];
                    case 7:
                        videoProducerRemoteStats = _b.sent();
                        return [4 /*yield*/, roomClient.getVideoLocalStats()
                                .catch(function () { })];
                    case 8:
                        videoProducerLocalStats = _b.sent();
                        return [4 /*yield*/, roomClient.getChatDataProducerRemoteStats()
                                .catch(function () { })];
                    case 9:
                        chatDataProducerRemoteStats = _b.sent();
                        return [4 /*yield*/, roomClient.getBotDataProducerRemoteStats()
                                .catch(function () { })];
                    case 10:
                        botDataProducerRemoteStats = _b.sent();
                        return [4 /*yield*/, roomClient.getDataConsumerRemoteStats(botDataConsumerId)
                                .catch(function () { })];
                    case 11:
                        botDataConsumerRemoteStats =
                            _b.sent();
                        return [3 /*break*/, 18];
                    case 12: return [4 /*yield*/, roomClient.getConsumerRemoteStats(audioConsumerId)
                            .catch(function () { })];
                    case 13:
                        audioConsumerRemoteStats = _b.sent();
                        return [4 /*yield*/, roomClient.getConsumerLocalStats(audioConsumerId)
                                .catch(function () { })];
                    case 14:
                        audioConsumerLocalStats = _b.sent();
                        return [4 /*yield*/, roomClient.getConsumerRemoteStats(videoConsumerId)
                                .catch(function () { })];
                    case 15:
                        videoConsumerRemoteStats = _b.sent();
                        return [4 /*yield*/, roomClient.getConsumerLocalStats(videoConsumerId)
                                .catch(function () { })];
                    case 16:
                        videoConsumerLocalStats = _b.sent();
                        return [4 /*yield*/, roomClient.getDataConsumerRemoteStats(chatDataConsumerId)
                                .catch(function () { })];
                    case 17:
                        chatDataConsumerRemoteStats =
                            _b.sent();
                        _b.label = 18;
                    case 18:
                        this.setState({
                            sendTransportRemoteStats: sendTransportRemoteStats,
                            sendTransportLocalStats: sendTransportLocalStats,
                            recvTransportRemoteStats: recvTransportRemoteStats,
                            recvTransportLocalStats: recvTransportLocalStats,
                            audioProducerRemoteStats: audioProducerRemoteStats,
                            audioProducerLocalStats: audioProducerLocalStats,
                            videoProducerRemoteStats: videoProducerRemoteStats,
                            videoProducerLocalStats: videoProducerLocalStats,
                            chatDataProducerRemoteStats: chatDataProducerRemoteStats,
                            botDataProducerRemoteStats: botDataProducerRemoteStats,
                            audioConsumerRemoteStats: audioConsumerRemoteStats,
                            audioConsumerLocalStats: audioConsumerLocalStats,
                            videoConsumerRemoteStats: videoConsumerRemoteStats,
                            videoConsumerLocalStats: videoConsumerLocalStats,
                            chatDataConsumerRemoteStats: chatDataConsumerRemoteStats,
                            botDataConsumerRemoteStats: botDataConsumerRemoteStats
                        });
                        this._delayTimer = setTimeout(function () { return _this._start(); }, 2500);
                        return [2 /*return*/];
                }
            });
        });
    };
    Stats.prototype._stop = function () {
        clearTimeout(this._delayTimer);
        this.setState({
            sendTransportRemoteStats: null,
            sendTransportLocalStats: null,
            recvTransportRemoteStats: null,
            recvTransportLocalStats: null,
            audioProducerRemoteStats: null,
            audioProducerLocalStats: null,
            videoProducerRemoteStats: null,
            videoProducerLocalStats: null,
            chatDataProducerRemoteStats: null,
            botDataProducerRemoteStats: null,
            audioConsumerRemoteStats: null,
            audioConsumerLocalStats: null,
            videoConsumerRemoteStats: null,
            videoConsumerLocalStats: null,
            chatDataConsumerRemoteStats: null,
            botDataConsumerRemoteStats: null
        });
    };
    Stats.prototype._printStats = function (title, stats) {
        var anchor = title
            .replace(/[ ]+/g, '-');
        if (typeof stats.values === 'function')
            stats = Array.from(stats.values());
        return (react_1.default.createElement(transitions_1.Appear, { duration: 150 },
            react_1.default.createElement("div", { className: 'items' },
                react_1.default.createElement("h2", { id: anchor }, title),
                stats.map(function (item, idx) { return (react_1.default.createElement("div", { className: 'item', key: idx }, Object.keys(item).map(function (key) { return (react_1.default.createElement("div", { className: 'line', key: key },
                    react_1.default.createElement("p", { className: 'key' }, key),
                    react_1.default.createElement("div", { className: 'value' },
                        react_1.default.createElement(Choose, null,
                            react_1.default.createElement(When, { condition: typeof item[key] === 'number' }, JSON.stringify(Math.round(item[key] * 100) / 100, null, '  ')),
                            react_1.default.createElement(Otherwise, null,
                                react_1.default.createElement("pre", null, JSON.stringify(item[key], null, '  '))))))); }))); }))));
    };
    return Stats;
}(react_1.default.Component));
Stats.propTypes =
    {
        roomClient: prop_types_1.default.any.isRequired,
        peerId: prop_types_1.default.string,
        peerDisplayName: prop_types_1.default.string,
        isMe: prop_types_1.default.bool,
        audioConsumerId: prop_types_1.default.string,
        videoConsumerId: prop_types_1.default.string,
        chatDataConsumerId: prop_types_1.default.string,
        botDataConsumerId: prop_types_1.default.string,
        onClose: prop_types_1.default.func.isRequired
    };
var mapStateToProps = function (state) {
    var e_1, _a, e_2, _b, e_3, _c;
    var room = state.room, me = state.me, peers = state.peers, consumers = state.consumers, dataConsumers = state.dataConsumers;
    var statsPeerId = room.statsPeerId;
    if (!statsPeerId)
        return {};
    var isMe = statsPeerId === me.id;
    var peer = isMe ? me : peers[statsPeerId];
    var audioConsumerId;
    var videoConsumerId;
    var chatDataConsumerId;
    var botDataConsumerId;
    if (isMe) {
        try {
            for (var _d = __values(Object.keys(dataConsumers)), _e = _d.next(); !_e.done; _e = _d.next()) {
                var dataConsumerId = _e.value;
                var dataConsumer = dataConsumers[dataConsumerId];
                if (dataConsumer.label === 'bot')
                    botDataConsumerId = dataConsumer.id;
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (_e && !_e.done && (_a = _d.return)) _a.call(_d);
            }
            finally { if (e_1) throw e_1.error; }
        }
    }
    else {
        try {
            for (var _f = __values(peer.consumers), _g = _f.next(); !_g.done; _g = _f.next()) {
                var consumerId = _g.value;
                var consumer = consumers[consumerId];
                switch (consumer.track.kind) {
                    case 'audio':
                        audioConsumerId = consumer.id;
                        break;
                    case 'video':
                        videoConsumerId = consumer.id;
                        break;
                }
            }
        }
        catch (e_2_1) { e_2 = { error: e_2_1 }; }
        finally {
            try {
                if (_g && !_g.done && (_b = _f.return)) _b.call(_f);
            }
            finally { if (e_2) throw e_2.error; }
        }
        try {
            for (var _h = __values(peer.dataConsumers), _j = _h.next(); !_j.done; _j = _h.next()) {
                var dataConsumerId = _j.value;
                var dataConsumer = dataConsumers[dataConsumerId];
                if (dataConsumer.label === 'chat')
                    chatDataConsumerId = dataConsumer.id;
            }
        }
        catch (e_3_1) { e_3 = { error: e_3_1 }; }
        finally {
            try {
                if (_j && !_j.done && (_c = _h.return)) _c.call(_h);
            }
            finally { if (e_3) throw e_3.error; }
        }
    }
    return {
        peerId: peer.id,
        peerDisplayName: peer.displayName,
        isMe: isMe,
        audioConsumerId: audioConsumerId,
        videoConsumerId: videoConsumerId,
        chatDataConsumerId: chatDataConsumerId,
        botDataConsumerId: botDataConsumerId
    };
};
var mapDispatchToProps = function (dispatch) {
    return {
        onClose: function () { return dispatch(stateActions.setRoomStatsPeerId(null)); }
    };
};
var StatsContainer = RoomContext_1.withRoomContext(react_redux_1.connect(mapStateToProps, mapDispatchToProps)(Stats));
exports.default = StatsContainer;
