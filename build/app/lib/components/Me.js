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
var cookiesManager = __importStar(require("../cookiesManager"));
var appPropTypes = __importStar(require("./appPropTypes"));
var RoomContext_1 = require("../RoomContext");
var stateActions = __importStar(require("../redux/stateActions"));
var PeerView_1 = __importDefault(require("./PeerView"));
var Me = /** @class */ (function (_super) {
    __extends(Me, _super);
    function Me(props) {
        var _this = _super.call(this, props) || this;
        _this._mounted = false;
        _this._rootNode = null;
        return _this;
    }
    Me.prototype.render = function () {
        var _this = this;
        var _a = this.props, roomClient = _a.roomClient, connected = _a.connected, me = _a.me, audioProducer = _a.audioProducer, videoProducer = _a.videoProducer, faceDetection = _a.faceDetection, onSetStatsPeerId = _a.onSetStatsPeerId;
        var micState;
        if (!me.canSendMic)
            micState = 'unsupported';
        else if (!audioProducer)
            micState = 'unsupported';
        else if (!audioProducer.paused)
            micState = 'on';
        else
            micState = 'off';
        var webcamState;
        if (!me.canSendWebcam)
            webcamState = 'unsupported';
        else if (videoProducer && videoProducer.type !== 'share')
            webcamState = 'on';
        else
            webcamState = 'off';
        var changeWebcamState;
        if (Boolean(videoProducer) && videoProducer.type !== 'share' && me.canChangeWebcam)
            changeWebcamState = 'on';
        else
            changeWebcamState = 'unsupported';
        var shareState;
        if (Boolean(videoProducer) && videoProducer.type === 'share')
            shareState = 'on';
        else
            shareState = 'off';
        var videoVisible = Boolean(videoProducer) && !videoProducer.paused;
        var tip;
        if (!me.displayNameSet)
            tip = 'Click on your name to change it';
        return (react_1.default.createElement("div", { "data-component": 'Me', ref: function (node) { return (_this._rootNode = node); }, "data-tip": tip, "data-tip-disable": !tip },
            react_1.default.createElement(If, { condition: connected },
                react_1.default.createElement("div", { className: 'controls' },
                    react_1.default.createElement("div", { className: classnames_1.default('button', 'mic', micState), onClick: function () {
                            micState === 'on'
                                ? roomClient.muteMic()
                                : roomClient.unmuteMic();
                        } }),
                    react_1.default.createElement("div", { className: classnames_1.default('button', 'webcam', webcamState, {
                            disabled: me.webcamInProgress || me.shareInProgress
                        }), onClick: function () {
                            if (webcamState === 'on') {
                                cookiesManager.setDevices({ webcamEnabled: false });
                                roomClient.disableWebcam();
                            }
                            else {
                                cookiesManager.setDevices({ webcamEnabled: true });
                                roomClient.enableWebcam();
                            }
                        } }),
                    react_1.default.createElement("div", { className: classnames_1.default('button', 'change-webcam', changeWebcamState, {
                            disabled: me.webcamInProgress || me.shareInProgress
                        }), onClick: function () { return roomClient.changeWebcam(); } }),
                    react_1.default.createElement("div", { className: classnames_1.default('button', 'share', shareState, {
                            disabled: me.shareInProgress || me.webcamInProgress
                        }), onClick: function () {
                            if (shareState === 'on')
                                roomClient.disableShare();
                            else
                                roomClient.enableShare();
                        } }))),
            react_1.default.createElement(PeerView_1.default, { isMe: true, peer: me, audioProducerId: audioProducer ? audioProducer.id : null, videoProducerId: videoProducer ? videoProducer.id : null, audioRtpParameters: audioProducer ? audioProducer.rtpParameters : null, videoRtpParameters: videoProducer ? videoProducer.rtpParameters : null, audioTrack: audioProducer ? audioProducer.track : null, videoTrack: videoProducer ? videoProducer.track : null, videoVisible: videoVisible, audioCodec: audioProducer ? audioProducer.codec : null, videoCodec: videoProducer ? videoProducer.codec : null, audioScore: audioProducer ? audioProducer.score : null, videoScore: videoProducer ? videoProducer.score : null, faceDetection: faceDetection, onChangeDisplayName: function (displayName) {
                    roomClient.changeDisplayName(displayName);
                }, onChangeMaxSendingSpatialLayer: function (spatialLayer) {
                    roomClient.setMaxSendingSpatialLayer(spatialLayer);
                }, onStatsClick: onSetStatsPeerId }),
            react_1.default.createElement(react_tooltip_1.default, { type: 'light', effect: 'solid', delayShow: 100, delayHide: 100, delayUpdate: 50 })));
    };
    Me.prototype.componentDidMount = function () {
        var _this = this;
        this._mounted = true;
        setTimeout(function () {
            if (!_this._mounted || _this.props.me.displayNameSet)
                return;
            react_tooltip_1.default.show(_this._rootNode);
        }, 4000);
    };
    Me.prototype.componentWillUnmount = function () {
        this._mounted = false;
    };
    Me.prototype.componentDidUpdate = function (prevProps) {
        if (!prevProps.me.displayNameSet && this.props.me.displayNameSet)
            react_tooltip_1.default.hide(this._rootNode);
    };
    return Me;
}(react_1.default.Component));
Me.propTypes =
    {
        roomClient: prop_types_1.default.any.isRequired,
        connected: prop_types_1.default.bool.isRequired,
        me: appPropTypes.Me.isRequired,
        audioProducer: appPropTypes.Producer,
        videoProducer: appPropTypes.Producer,
        faceDetection: prop_types_1.default.bool.isRequired,
        onSetStatsPeerId: prop_types_1.default.func.isRequired
    };
var mapStateToProps = function (state) {
    var producersArray = Object.values(state.producers);
    var audioProducer = producersArray.find(function (producer) { return producer.track.kind === 'audio'; });
    var videoProducer = producersArray.find(function (producer) { return producer.track.kind === 'video'; });
    return {
        connected: state.room.state === 'connected',
        me: state.me,
        audioProducer: audioProducer,
        videoProducer: videoProducer,
        faceDetection: state.room.faceDetection
    };
};
var mapDispatchToProps = function (dispatch) {
    return {
        onSetStatsPeerId: function (peerId) { return dispatch(stateActions.setRoomStatsPeerId(peerId)); }
    };
};
var MeContainer = RoomContext_1.withRoomContext(react_redux_1.connect(mapStateToProps, mapDispatchToProps)(Me));
exports.default = MeContainer;
