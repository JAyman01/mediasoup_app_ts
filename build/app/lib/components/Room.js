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
var react_tooltip_1 = __importDefault(require("react-tooltip"));
var classnames_1 = __importDefault(require("classnames"));
var clipboard_copy_1 = __importDefault(require("clipboard-copy"));
var appPropTypes = __importStar(require("./appPropTypes"));
var RoomContext_1 = require("../RoomContext");
var requestActions = __importStar(require("../redux/requestActions"));
var transitions_1 = require("./transitions");
var Me_1 = __importDefault(require("./Me"));
var ChatInput_1 = __importDefault(require("./ChatInput"));
var Peers_1 = __importDefault(require("./Peers"));
var Stats_1 = __importDefault(require("./Stats"));
var Notifications_1 = __importDefault(require("./Notifications"));
var NetworkThrottle_1 = __importDefault(require("./NetworkThrottle"));
var Room = /** @class */ (function (_super) {
    __extends(Room, _super);
    function Room() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Room.prototype.render = function () {
        var _a = this.props, roomClient = _a.roomClient, room = _a.room, me = _a.me, amActiveSpeaker = _a.amActiveSpeaker, onRoomLinkCopy = _a.onRoomLinkCopy;
        return (react_1.default.createElement(transitions_1.Appear, { duration: 300 },
            react_1.default.createElement("div", { "data-component": 'Room' },
                react_1.default.createElement(Notifications_1.default, null),
                react_1.default.createElement("div", { className: 'state' },
                    react_1.default.createElement("div", { className: classnames_1.default('icon', room.state) }),
                    react_1.default.createElement("p", { className: classnames_1.default('text', room.state) }, room.state)),
                react_1.default.createElement("div", { className: 'room-link-wrapper' },
                    react_1.default.createElement("div", { className: 'room-link' },
                        react_1.default.createElement("a", { className: 'link', href: room.url, target: '_blank', rel: 'noopener noreferrer', onClick: function (event) {
                                // If this is a 'Open in new window/tab' don't prevent
                                // click default action.
                                if (event.ctrlKey || event.shiftKey || event.metaKey ||
                                    // Middle click (IE > 9 and everyone else).
                                    (event.button && event.button === 1)) {
                                    return;
                                }
                                event.preventDefault();
                                clipboard_copy_1.default(room.url)
                                    .then(onRoomLinkCopy);
                            } }, "invitation link"))),
                react_1.default.createElement(Peers_1.default, null),
                react_1.default.createElement("div", { className: classnames_1.default('me-container', {
                        'active-speaker': amActiveSpeaker
                    }) },
                    react_1.default.createElement(Me_1.default, null)),
                react_1.default.createElement("div", { className: 'chat-input-container' },
                    react_1.default.createElement(ChatInput_1.default, null)),
                react_1.default.createElement("div", { className: 'sidebar' },
                    react_1.default.createElement("div", { className: classnames_1.default('button', 'hide-videos', {
                            on: me.audioOnly,
                            disabled: me.audioOnlyInProgress
                        }), "data-tip": 'Show/hide participants\' video', onClick: function () {
                            me.audioOnly
                                ? roomClient.disableAudioOnly()
                                : roomClient.enableAudioOnly();
                        } }),
                    react_1.default.createElement("div", { className: classnames_1.default('button', 'mute-audio', {
                            on: me.audioMuted
                        }), "data-tip": 'Mute/unmute participants\' audio', onClick: function () {
                            me.audioMuted
                                ? roomClient.unmuteAudio()
                                : roomClient.muteAudio();
                        } }),
                    react_1.default.createElement("div", { className: classnames_1.default('button', 'restart-ice', {
                            disabled: me.restartIceInProgress
                        }), "data-tip": 'Restart ICE', onClick: function () { return roomClient.restartIce(); } })),
                react_1.default.createElement(Stats_1.default, null),
                react_1.default.createElement(If, { condition: window.NETWORK_THROTTLE_SECRET },
                    react_1.default.createElement(NetworkThrottle_1.default, { secret: window.NETWORK_THROTTLE_SECRET })),
                react_1.default.createElement(react_tooltip_1.default, { type: 'light', effect: 'solid', delayShow: 100, delayHide: 100, delayUpdate: 50 }))));
    };
    Room.prototype.componentDidMount = function () {
        var roomClient = this.props.roomClient;
        roomClient.join();
    };
    return Room;
}(react_1.default.Component));
Room.propTypes =
    {
        roomClient: prop_types_1.default.any.isRequired,
        room: appPropTypes.Room.isRequired,
        me: appPropTypes.Me.isRequired,
        amActiveSpeaker: prop_types_1.default.bool.isRequired,
        onRoomLinkCopy: prop_types_1.default.func.isRequired
    };
var mapStateToProps = function (state) {
    return {
        room: state.room,
        me: state.me,
        amActiveSpeaker: state.me.id === state.room.activeSpeakerId
    };
};
var mapDispatchToProps = function (dispatch) {
    return {
        onRoomLinkCopy: function () {
            dispatch(requestActions.notify({
                text: 'Room link copied to the clipboard'
            }));
        }
    };
};
var RoomContainer = RoomContext_1.withRoomContext(react_redux_1.connect(mapStateToProps, mapDispatchToProps)(Room));
exports.default = RoomContainer;
