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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
var react_draggable_1 = __importDefault(require("react-draggable"));
var prop_types_1 = __importDefault(require("prop-types"));
var RoomContext_1 = require("../RoomContext");
var NetworkThrottle = /** @class */ (function (_super) {
    __extends(NetworkThrottle, _super);
    function NetworkThrottle(props) {
        var _this = _super.call(this, props) || this;
        _this.state =
            {
                uplink: '',
                downlink: '',
                rtt: '',
                disabled: false
            };
        return _this;
    }
    NetworkThrottle.prototype.render = function () {
        var _this = this;
        var _a = this.state, uplink = _a.uplink, downlink = _a.downlink, rtt = _a.rtt, disabled = _a.disabled;
        return (react_1.default.createElement(react_draggable_1.default, { bounds: 'parent', defaultPosition: { x: 20, y: 20 }, handle: 'h1.draggable' },
            react_1.default.createElement("form", { "data-component": 'NetworkThrottle', onSubmit: function (event) {
                    event.preventDefault();
                    _this._apply();
                } },
                react_1.default.createElement("h1", { className: 'draggable' }, "Network Throttle"),
                react_1.default.createElement("div", { className: 'inputs' },
                    react_1.default.createElement("div", { className: 'row' },
                        react_1.default.createElement("p", { className: 'key' }, "UPLINK (kbps)"),
                        react_1.default.createElement("input", { className: 'value', type: 'text', placeholder: 'NO LIMIT', disabled: disabled, pattern: '[0-9]*', value: uplink, autoCorrect: 'false', spellCheck: 'false', onChange: function (event) { return _this.setState({ uplink: event.target.value }); } })),
                    react_1.default.createElement("div", { className: 'row' },
                        react_1.default.createElement("p", { className: 'key' }, "DOWNLINK (kbps)"),
                        react_1.default.createElement("input", { className: 'value', type: 'text', placeholder: 'NO LIMIT', disabled: disabled, pattern: '[0-9]*', value: downlink, autoCorrect: 'false', spellCheck: 'false', onChange: function (event) { return _this.setState({ downlink: event.target.value }); } })),
                    react_1.default.createElement("div", { className: 'row' },
                        react_1.default.createElement("p", { className: 'key' }, "RTT (ms)"),
                        react_1.default.createElement("input", { className: 'value', type: 'text', placeholder: 'NOT SET', disabled: disabled, pattern: '[0-9]*', value: rtt, autoCorrect: 'false', spellCheck: 'false', onChange: function (event) { return _this.setState({ rtt: event.target.value }); } }))),
                react_1.default.createElement("div", { className: 'buttons' },
                    react_1.default.createElement("button", { type: 'button', className: 'reset', disabled: disabled, onClick: function () { return _this._reset(); } }, "RESET"),
                    react_1.default.createElement("button", { type: 'submit', className: 'apply', disabled: disabled ||
                            (!uplink.trim() && !downlink.trim() && !rtt.trim()) }, "APPLY")))));
    };
    NetworkThrottle.prototype.componentWillUnmount = function () {
        var roomClient = this.props.roomClient;
        roomClient.resetNetworkThrottle({ silent: true });
    };
    NetworkThrottle.prototype._apply = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a, roomClient, secret, _b, uplink, downlink, rtt;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _a = this.props, roomClient = _a.roomClient, secret = _a.secret;
                        _b = this.state, uplink = _b.uplink, downlink = _b.downlink, rtt = _b.rtt;
                        uplink = Number(uplink) || 0;
                        downlink = Number(downlink) || 0;
                        rtt = Number(rtt) || 0;
                        this.setState({ disabled: true });
                        return [4 /*yield*/, roomClient.applyNetworkThrottle({ uplink: uplink, downlink: downlink, rtt: rtt, secret: secret })];
                    case 1:
                        _c.sent();
                        window.onunload = function () {
                            roomClient.resetNetworkThrottle({ silent: true, secret: secret });
                        };
                        this.setState({ disabled: false });
                        return [2 /*return*/];
                }
            });
        });
    };
    NetworkThrottle.prototype._reset = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a, roomClient, secret;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = this.props, roomClient = _a.roomClient, secret = _a.secret;
                        this.setState({
                            uplink: '',
                            downlink: '',
                            rtt: '',
                            disabled: false
                        });
                        this.setState({ disabled: true });
                        return [4 /*yield*/, roomClient.resetNetworkThrottle({ secret: secret })];
                    case 1:
                        _b.sent();
                        this.setState({ disabled: false });
                        return [2 /*return*/];
                }
            });
        });
    };
    return NetworkThrottle;
}(react_1.default.Component));
NetworkThrottle.propTypes =
    {
        roomClient: prop_types_1.default.any.isRequired,
        secret: prop_types_1.default.string.isRequired
    };
exports.default = RoomContext_1.withRoomContext(NetworkThrottle);
