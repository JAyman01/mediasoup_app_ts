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
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
var prop_types_1 = __importDefault(require("prop-types"));
var react_tooltip_1 = __importDefault(require("react-tooltip"));
var classnames_1 = __importDefault(require("classnames"));
var react_spinner_1 = __importDefault(require("react-spinner"));
var clipboard_copy_1 = __importDefault(require("clipboard-copy"));
var hark_1 = __importDefault(require("hark"));
var faceapi = __importStar(require("face-api.js"));
var Logger_1 = __importDefault(require("../Logger"));
var appPropTypes = __importStar(require("./appPropTypes"));
var EditableInput_1 = __importDefault(require("./EditableInput"));
var logger = new Logger_1.default('PeerView');
var tinyFaceDetectorOptions = new faceapi.TinyFaceDetectorOptions({
    inputSize: 160,
    scoreThreshold: 0.5
});
var PeerView = /** @class */ (function (_super) {
    __extends(PeerView, _super);
    function PeerView(props) {
        var _this = _super.call(this, props) || this;
        _this.state =
            {
                audioVolume: 0,
                showInfo: window.SHOW_INFO || false,
                videoResolutionWidth: null,
                videoResolutionHeight: null,
                videoCanPlay: false,
                videoElemPaused: false,
                maxSpatialLayer: null
            };
        // Latest received video track.
        // @type {MediaStreamTrack}
        _this._audioTrack = null;
        // Latest received video track.
        // @type {MediaStreamTrack}
        _this._videoTrack = null;
        // Hark instance.
        // @type {Object}
        _this._hark = null;
        // Periodic timer for reading video resolution.
        _this._videoResolutionPeriodicTimer = null;
        // requestAnimationFrame for face detection.
        _this._faceDetectionRequestAnimationFrame = null;
        return _this;
    }
    PeerView.prototype.render = function () {
        var _this = this;
        var _a = this.props, isMe = _a.isMe, peer = _a.peer, audioProducerId = _a.audioProducerId, videoProducerId = _a.videoProducerId, audioConsumerId = _a.audioConsumerId, videoConsumerId = _a.videoConsumerId, videoRtpParameters = _a.videoRtpParameters, consumerSpatialLayers = _a.consumerSpatialLayers, consumerTemporalLayers = _a.consumerTemporalLayers, consumerCurrentSpatialLayer = _a.consumerCurrentSpatialLayer, consumerCurrentTemporalLayer = _a.consumerCurrentTemporalLayer, consumerPreferredSpatialLayer = _a.consumerPreferredSpatialLayer, consumerPreferredTemporalLayer = _a.consumerPreferredTemporalLayer, consumerPriority = _a.consumerPriority, audioMuted = _a.audioMuted, videoVisible = _a.videoVisible, videoMultiLayer = _a.videoMultiLayer, audioCodec = _a.audioCodec, videoCodec = _a.videoCodec, audioScore = _a.audioScore, videoScore = _a.videoScore, onChangeDisplayName = _a.onChangeDisplayName, onChangeMaxSendingSpatialLayer = _a.onChangeMaxSendingSpatialLayer, onChangeVideoPreferredLayers = _a.onChangeVideoPreferredLayers, onChangeVideoPriority = _a.onChangeVideoPriority, onRequestKeyFrame = _a.onRequestKeyFrame, onStatsClick = _a.onStatsClick;
        var _b = this.state, audioVolume = _b.audioVolume, showInfo = _b.showInfo, videoResolutionWidth = _b.videoResolutionWidth, videoResolutionHeight = _b.videoResolutionHeight, videoCanPlay = _b.videoCanPlay, videoElemPaused = _b.videoElemPaused, maxSpatialLayer = _b.maxSpatialLayer;
        return (react_1.default.createElement("div", { "data-component": 'PeerView' },
            react_1.default.createElement("div", { className: 'info' },
                react_1.default.createElement("div", { className: 'icons' },
                    react_1.default.createElement("div", { className: classnames_1.default('icon', 'info', { on: showInfo }), onClick: function () { return _this.setState({ showInfo: !showInfo }); } }),
                    react_1.default.createElement("div", { className: classnames_1.default('icon', 'stats'), onClick: function () { return onStatsClick(peer.id); } })),
                react_1.default.createElement("div", { className: classnames_1.default('box', { visible: showInfo }) },
                    react_1.default.createElement(If, { condition: audioProducerId || audioConsumerId },
                        react_1.default.createElement("h1", null, "audio"),
                        react_1.default.createElement(If, { condition: audioProducerId },
                            react_1.default.createElement("p", null,
                                'id: ',
                                react_1.default.createElement("span", { className: 'copiable', "data-tip": 'Copy audio producer id to clipboard', onClick: function () { return clipboard_copy_1.default("\"" + audioProducerId + "\""); } }, audioProducerId)),
                            react_1.default.createElement(react_tooltip_1.default, { type: 'light', effect: 'solid', delayShow: 1500, delayHide: 50 })),
                        react_1.default.createElement(If, { condition: audioConsumerId },
                            react_1.default.createElement("p", null,
                                'id: ',
                                react_1.default.createElement("span", { className: 'copiable', "data-tip": 'Copy video producer id to clipboard', onClick: function () { return clipboard_copy_1.default("\"" + audioConsumerId + "\""); } }, audioConsumerId)),
                            react_1.default.createElement(react_tooltip_1.default, { type: 'light', effect: 'solid', delayShow: 1500, delayHide: 50 })),
                        react_1.default.createElement(If, { condition: audioCodec },
                            react_1.default.createElement("p", null,
                                "codec: ",
                                audioCodec)),
                        react_1.default.createElement(If, { condition: audioProducerId && audioScore }, this._printProducerScore(audioProducerId, audioScore)),
                        react_1.default.createElement(If, { condition: audioConsumerId && audioScore }, this._printConsumerScore(audioConsumerId, audioScore))),
                    react_1.default.createElement(If, { condition: videoProducerId || videoConsumerId },
                        react_1.default.createElement("h1", null, "video"),
                        react_1.default.createElement(If, { condition: videoProducerId },
                            react_1.default.createElement("p", null,
                                'id: ',
                                react_1.default.createElement("span", { className: 'copiable', "data-tip": 'Copy audio consumer id to clipboard', onClick: function () { return clipboard_copy_1.default("\"" + videoProducerId + "\""); } }, videoProducerId)),
                            react_1.default.createElement(react_tooltip_1.default, { type: 'light', effect: 'solid', delayShow: 1500, delayHide: 50 })),
                        react_1.default.createElement(If, { condition: videoConsumerId },
                            react_1.default.createElement("p", null,
                                'id: ',
                                react_1.default.createElement("span", { className: 'copiable', "data-tip": 'Copy video consumer id to clipboard', onClick: function () { return clipboard_copy_1.default("\"" + videoConsumerId + "\""); } }, videoConsumerId)),
                            react_1.default.createElement(react_tooltip_1.default, { type: 'light', effect: 'solid', delayShow: 1500, delayHide: 50 })),
                        react_1.default.createElement(If, { condition: videoCodec },
                            react_1.default.createElement("p", null,
                                "codec: ",
                                videoCodec)),
                        react_1.default.createElement(If, { condition: videoVisible && videoResolutionWidth !== null },
                            react_1.default.createElement("p", null,
                                "resolution: ",
                                videoResolutionWidth,
                                "x",
                                videoResolutionHeight)),
                        react_1.default.createElement(If, { condition: videoVisible &&
                                videoProducerId &&
                                videoRtpParameters.encodings.length > 1 },
                            react_1.default.createElement("p", null,
                                "max spatial layer: ",
                                maxSpatialLayer > -1 ? maxSpatialLayer : 'none',
                                react_1.default.createElement("span", null, ' '),
                                react_1.default.createElement("span", { className: classnames_1.default({
                                        clickable: maxSpatialLayer > -1
                                    }), onClick: function (event) {
                                        event.stopPropagation();
                                        var newMaxSpatialLayer = maxSpatialLayer - 1;
                                        onChangeMaxSendingSpatialLayer(newMaxSpatialLayer);
                                        _this.setState({ maxSpatialLayer: newMaxSpatialLayer });
                                    } }, '[ down ]'),
                                react_1.default.createElement("span", null, ' '),
                                react_1.default.createElement("span", { className: classnames_1.default({
                                        clickable: maxSpatialLayer < videoRtpParameters.encodings.length - 1
                                    }), onClick: function (event) {
                                        event.stopPropagation();
                                        var newMaxSpatialLayer = maxSpatialLayer + 1;
                                        onChangeMaxSendingSpatialLayer(newMaxSpatialLayer);
                                        _this.setState({ maxSpatialLayer: newMaxSpatialLayer });
                                    } }, '[ up ]'))),
                        react_1.default.createElement(If, { condition: !isMe && videoMultiLayer },
                            react_1.default.createElement("p", null, "current spatial-temporal layers: " + consumerCurrentSpatialLayer + " " + consumerCurrentTemporalLayer),
                            react_1.default.createElement("p", null, "preferred spatial-temporal layers: " + consumerPreferredSpatialLayer + " " + consumerPreferredTemporalLayer,
                                react_1.default.createElement("span", null, ' '),
                                react_1.default.createElement("span", { className: 'clickable', onClick: function (event) {
                                        event.stopPropagation();
                                        var newPreferredSpatialLayer = consumerPreferredSpatialLayer;
                                        var newPreferredTemporalLayer;
                                        if (consumerPreferredTemporalLayer > 0) {
                                            newPreferredTemporalLayer = consumerPreferredTemporalLayer - 1;
                                        }
                                        else {
                                            if (consumerPreferredSpatialLayer > 0)
                                                newPreferredSpatialLayer = consumerPreferredSpatialLayer - 1;
                                            else
                                                newPreferredSpatialLayer = consumerSpatialLayers - 1;
                                            newPreferredTemporalLayer = consumerTemporalLayers - 1;
                                        }
                                        onChangeVideoPreferredLayers(newPreferredSpatialLayer, newPreferredTemporalLayer);
                                    } }, '[ down ]'),
                                react_1.default.createElement("span", null, ' '),
                                react_1.default.createElement("span", { className: 'clickable', onClick: function (event) {
                                        event.stopPropagation();
                                        var newPreferredSpatialLayer = consumerPreferredSpatialLayer;
                                        var newPreferredTemporalLayer;
                                        if (consumerPreferredTemporalLayer < consumerTemporalLayers - 1) {
                                            newPreferredTemporalLayer = consumerPreferredTemporalLayer + 1;
                                        }
                                        else {
                                            if (consumerPreferredSpatialLayer < consumerSpatialLayers - 1)
                                                newPreferredSpatialLayer = consumerPreferredSpatialLayer + 1;
                                            else
                                                newPreferredSpatialLayer = 0;
                                            newPreferredTemporalLayer = 0;
                                        }
                                        onChangeVideoPreferredLayers(newPreferredSpatialLayer, newPreferredTemporalLayer);
                                    } }, '[ up ]'))),
                        react_1.default.createElement(If, { condition: !isMe && videoCodec && consumerPriority > 0 },
                            react_1.default.createElement("p", null, "priority: " + consumerPriority,
                                react_1.default.createElement("span", null, ' '),
                                react_1.default.createElement("span", { className: classnames_1.default({
                                        clickable: consumerPriority > 1
                                    }), onClick: function (event) {
                                        event.stopPropagation();
                                        onChangeVideoPriority(consumerPriority - 1);
                                    } }, '[ down ]'),
                                react_1.default.createElement("span", null, ' '),
                                react_1.default.createElement("span", { className: classnames_1.default({
                                        clickable: consumerPriority < 255
                                    }), onClick: function (event) {
                                        event.stopPropagation();
                                        onChangeVideoPriority(consumerPriority + 1);
                                    } }, '[ up ]'))),
                        react_1.default.createElement(If, { condition: !isMe && videoCodec },
                            react_1.default.createElement("p", null,
                                react_1.default.createElement("span", { className: 'clickable', onClick: function (event) {
                                        event.stopPropagation();
                                        if (!onRequestKeyFrame)
                                            return;
                                        onRequestKeyFrame();
                                    } }, '[ request keyframe ]'))),
                        react_1.default.createElement(If, { condition: videoProducerId && videoScore }, this._printProducerScore(videoProducerId, videoScore)),
                        react_1.default.createElement(If, { condition: videoConsumerId && videoScore }, this._printConsumerScore(videoConsumerId, videoScore)))),
                react_1.default.createElement("div", { className: classnames_1.default('peer', { 'is-me': isMe }) },
                    react_1.default.createElement(Choose, null,
                        react_1.default.createElement(When, { condition: isMe },
                            react_1.default.createElement(EditableInput_1.default, { value: peer.displayName, propName: 'displayName', className: 'display-name editable', classLoading: 'loading', classInvalid: 'invalid', shouldBlockWhileLoading: true, editProps: {
                                    maxLength: 20,
                                    autoCorrect: 'false',
                                    spellCheck: 'false'
                                }, onChange: function (_a) {
                                    var displayName = _a.displayName;
                                    return onChangeDisplayName(displayName);
                                } })),
                        react_1.default.createElement(Otherwise, null,
                            react_1.default.createElement("span", { className: 'display-name' }, peer.displayName))),
                    react_1.default.createElement("div", { className: 'row' },
                        react_1.default.createElement("span", { className: classnames_1.default('device-icon', peer.device.flag) }),
                        react_1.default.createElement("span", { className: 'device-version' },
                            peer.device.name,
                            " ",
                            peer.device.version || null)))),
            react_1.default.createElement("video", { ref: 'videoElem', className: classnames_1.default({
                    'is-me': isMe,
                    hidden: !videoVisible || !videoCanPlay,
                    'network-error': (videoVisible && videoMultiLayer && consumerCurrentSpatialLayer === null)
                }), autoPlay: true, muted: true, controls: false }),
            react_1.default.createElement("audio", { ref: 'audioElem', autoPlay: true, muted: isMe || audioMuted, controls: false }),
            react_1.default.createElement("canvas", { ref: 'canvas', className: classnames_1.default('face-detection', { 'is-me': isMe }) }),
            react_1.default.createElement("div", { className: 'volume-container' },
                react_1.default.createElement("div", { className: classnames_1.default('bar', "level" + audioVolume) })),
            react_1.default.createElement(If, { condition: videoVisible && videoScore < 5 },
                react_1.default.createElement("div", { className: 'spinner-container' },
                    react_1.default.createElement(react_spinner_1.default, null))),
            react_1.default.createElement(If, { condition: videoElemPaused },
                react_1.default.createElement("div", { className: 'video-elem-paused' }))));
    };
    PeerView.prototype.componentDidMount = function () {
        var _a = this.props, audioTrack = _a.audioTrack, videoTrack = _a.videoTrack;
        this._setTracks(audioTrack, videoTrack);
    };
    PeerView.prototype.componentWillUnmount = function () {
        if (this._hark)
            this._hark.stop();
        clearInterval(this._videoResolutionPeriodicTimer);
        cancelAnimationFrame(this._faceDetectionRequestAnimationFrame);
        var videoElem = this.refs.videoElem;
        if (videoElem) {
            videoElem.oncanplay = null;
            videoElem.onplay = null;
            videoElem.onpause = null;
        }
    };
    PeerView.prototype.componentWillUpdate = function () {
        var _a = this.props, isMe = _a.isMe, audioTrack = _a.audioTrack, videoTrack = _a.videoTrack, videoRtpParameters = _a.videoRtpParameters;
        var maxSpatialLayer = this.state.maxSpatialLayer;
        if (isMe && videoRtpParameters && maxSpatialLayer === null) {
            this.setState({
                maxSpatialLayer: videoRtpParameters.encodings.length - 1
            });
        }
        else if (isMe && !videoRtpParameters && maxSpatialLayer !== null) {
            this.setState({ maxSpatialLayer: null });
        }
        this._setTracks(audioTrack, videoTrack);
    };
    PeerView.prototype._setTracks = function (audioTrack, videoTrack) {
        var _this = this;
        var faceDetection = this.props.faceDetection;
        if (this._audioTrack === audioTrack && this._videoTrack === videoTrack)
            return;
        this._audioTrack = audioTrack;
        this._videoTrack = videoTrack;
        if (this._hark)
            this._hark.stop();
        this._stopVideoResolution();
        if (faceDetection)
            this._stopFaceDetection();
        var _a = this.refs, audioElem = _a.audioElem, videoElem = _a.videoElem;
        if (audioTrack) {
            var stream = new MediaStream;
            stream.addTrack(audioTrack);
            audioElem.srcObject = stream;
            audioElem.play()
                .catch(function (error) { return logger.warn('audioElem.play() failed:%o', error); });
            this._runHark(stream);
        }
        else {
            audioElem.srcObject = null;
        }
        if (videoTrack) {
            var stream = new MediaStream;
            stream.addTrack(videoTrack);
            videoElem.srcObject = stream;
            videoElem.oncanplay = function () { return _this.setState({ videoCanPlay: true }); };
            videoElem.onplay = function () {
                _this.setState({ videoElemPaused: false });
                audioElem.play()
                    .catch(function (error) { return logger.warn('audioElem.play() failed:%o', error); });
            };
            videoElem.onpause = function () { return _this.setState({ videoElemPaused: true }); };
            videoElem.play()
                .catch(function (error) { return logger.warn('videoElem.play() failed:%o', error); });
            this._startVideoResolution();
            if (faceDetection)
                this._startFaceDetection();
        }
        else {
            videoElem.srcObject = null;
        }
    };
    PeerView.prototype._runHark = function (stream) {
        var _this = this;
        if (!stream.getAudioTracks()[0])
            throw new Error('_runHark() | given stream has no audio track');
        this._hark = hark_1.default(stream, { play: false });
        // eslint-disable-next-line no-unused-vars
        this._hark.on('volume_change', function (dBs, threshold) {
            // The exact formula to convert from dBs (-100..0) to linear (0..1) is:
            //   Math.pow(10, dBs / 20)
            // However it does not produce a visually useful output, so let exagerate
            // it a bit. Also, let convert it from 0..1 to 0..10 and avoid value 1 to
            // minimize component renderings.
            var audioVolume = Math.round(Math.pow(10, dBs / 85) * 10);
            if (audioVolume === 1)
                audioVolume = 0;
            if (audioVolume !== _this.state.audioVolume)
                _this.setState({ audioVolume: audioVolume });
        });
    };
    PeerView.prototype._startVideoResolution = function () {
        var _this = this;
        this._videoResolutionPeriodicTimer = setInterval(function () {
            var _a = _this.state, videoResolutionWidth = _a.videoResolutionWidth, videoResolutionHeight = _a.videoResolutionHeight;
            var videoElem = _this.refs.videoElem;
            if (videoElem.videoWidth !== videoResolutionWidth ||
                videoElem.videoHeight !== videoResolutionHeight) {
                _this.setState({
                    videoResolutionWidth: videoElem.videoWidth,
                    videoResolutionHeight: videoElem.videoHeight
                });
            }
        }, 500);
    };
    PeerView.prototype._stopVideoResolution = function () {
        clearInterval(this._videoResolutionPeriodicTimer);
        this.setState({
            videoResolutionWidth: null,
            videoResolutionHeight: null
        });
    };
    PeerView.prototype._startFaceDetection = function () {
        var _this = this;
        var _a = this.refs, videoElem = _a.videoElem, canvas = _a.canvas;
        var step = function () { return __awaiter(_this, void 0, void 0, function () {
            var detection, width, height, resizedDetections;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        // NOTE: Somehow this is critical. Otherwise the Promise returned by
                        // faceapi.detectSingleFace() never resolves or rejects.
                        if (!this._videoTrack || videoElem.readyState < 2) {
                            this._faceDetectionRequestAnimationFrame = requestAnimationFrame(step);
                            return [2 /*return*/];
                        }
                        return [4 /*yield*/, faceapi.detectSingleFace(videoElem, tinyFaceDetectorOptions)];
                    case 1:
                        detection = _a.sent();
                        if (detection) {
                            width = videoElem.offsetWidth;
                            height = videoElem.offsetHeight;
                            canvas.width = width;
                            canvas.height = height;
                            resizedDetections = faceapi.resizeResults(detection, { width: width, height: height });
                            faceapi.draw.drawDetections(canvas, resizedDetections);
                        }
                        else {
                            // Trick to hide the canvas rectangle.
                            canvas.width = 0;
                            canvas.height = 0;
                        }
                        this._faceDetectionRequestAnimationFrame =
                            requestAnimationFrame(function () { return setTimeout(step, 100); });
                        return [2 /*return*/];
                }
            });
        }); };
        step();
    };
    PeerView.prototype._stopFaceDetection = function () {
        cancelAnimationFrame(this._faceDetectionRequestAnimationFrame);
        var canvas = this.refs.canvas;
        canvas.width = 0;
        canvas.height = 0;
    };
    PeerView.prototype._printProducerScore = function (id, score) {
        var scores = Array.isArray(score) ? score : [score];
        return (react_1.default.createElement(react_1.default.Fragment, { key: id },
            react_1.default.createElement("p", null, "streams:"),
            scores
                .sort(function (a, b) {
                if (a.rid)
                    return (a.rid > b.rid ? 1 : -1);
                else
                    return (a.ssrc > b.ssrc ? 1 : -1);
            })
                .map(function (_a, idx) {
                var ssrc = _a.ssrc, rid = _a.rid, score = _a.score;
                return ( // eslint-disable-line no-shadow
                react_1.default.createElement("p", { key: idx, className: 'indent' },
                    react_1.default.createElement(Choose, null,
                        react_1.default.createElement(When, { condition: rid !== undefined }, "rid:" + rid + ", ssrc:" + ssrc + ", score:" + score),
                        react_1.default.createElement(Otherwise, null, "ssrc:" + ssrc + ", score:" + score))));
            })));
    };
    PeerView.prototype._printConsumerScore = function (id, score) {
        return (react_1.default.createElement("p", { key: id }, "score:" + score.score + ", producerScore:" + score.producerScore));
    };
    return PeerView;
}(react_1.default.Component));
exports.default = PeerView;
PeerView.propTypes =
    {
        isMe: prop_types_1.default.bool,
        peer: prop_types_1.default.oneOfType([appPropTypes.Me, appPropTypes.Peer]).isRequired,
        audioProducerId: prop_types_1.default.string,
        videoProducerId: prop_types_1.default.string,
        audioConsumerId: prop_types_1.default.string,
        videoConsumerId: prop_types_1.default.string,
        audioRtpParameters: prop_types_1.default.object,
        videoRtpParameters: prop_types_1.default.object,
        consumerSpatialLayers: prop_types_1.default.number,
        consumerTemporalLayers: prop_types_1.default.number,
        consumerCurrentSpatialLayer: prop_types_1.default.number,
        consumerCurrentTemporalLayer: prop_types_1.default.number,
        consumerPreferredSpatialLayer: prop_types_1.default.number,
        consumerPreferredTemporalLayer: prop_types_1.default.number,
        consumerPriority: prop_types_1.default.number,
        audioTrack: prop_types_1.default.any,
        videoTrack: prop_types_1.default.any,
        audioMuted: prop_types_1.default.bool,
        videoVisible: prop_types_1.default.bool.isRequired,
        videoMultiLayer: prop_types_1.default.bool,
        audioCodec: prop_types_1.default.string,
        videoCodec: prop_types_1.default.string,
        audioScore: prop_types_1.default.any,
        videoScore: prop_types_1.default.any,
        faceDetection: prop_types_1.default.bool.isRequired,
        onChangeDisplayName: prop_types_1.default.func,
        onChangeMaxSendingSpatialLayer: prop_types_1.default.func,
        onChangeVideoPreferredLayers: prop_types_1.default.func,
        onChangeVideoPriority: prop_types_1.default.func,
        onRequestKeyFrame: prop_types_1.default.func,
        onStatsClick: prop_types_1.default.func.isRequired
    };
