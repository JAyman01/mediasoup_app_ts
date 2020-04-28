"use strict";
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
var appPropTypes = __importStar(require("./appPropTypes"));
var RoomContext_1 = require("../RoomContext");
var stateActions = __importStar(require("../redux/stateActions"));
var PeerView_1 = __importDefault(require("./PeerView"));
var Peer = function (props) {
    var roomClient = props.roomClient, peer = props.peer, audioConsumer = props.audioConsumer, videoConsumer = props.videoConsumer, audioMuted = props.audioMuted, faceDetection = props.faceDetection, onSetStatsPeerId = props.onSetStatsPeerId;
    var audioEnabled = (Boolean(audioConsumer) &&
        !audioConsumer.locallyPaused &&
        !audioConsumer.remotelyPaused);
    var videoVisible = (Boolean(videoConsumer) &&
        !videoConsumer.locallyPaused &&
        !videoConsumer.remotelyPaused);
    return (react_1.default.createElement("div", { "data-component": 'Peer' },
        react_1.default.createElement("div", { className: 'indicators' },
            react_1.default.createElement(If, { condition: !audioEnabled },
                react_1.default.createElement("div", { className: 'icon mic-off' })),
            react_1.default.createElement(If, { condition: !videoConsumer },
                react_1.default.createElement("div", { className: 'icon webcam-off' }))),
        react_1.default.createElement(PeerView_1.default, { peer: peer, audioConsumerId: audioConsumer ? audioConsumer.id : null, videoConsumerId: videoConsumer ? videoConsumer.id : null, audioRtpParameters: audioConsumer ? audioConsumer.rtpParameters : null, videoRtpParameters: videoConsumer ? videoConsumer.rtpParameters : null, consumerSpatialLayers: videoConsumer ? videoConsumer.spatialLayers : null, consumerTemporalLayers: videoConsumer ? videoConsumer.temporalLayers : null, consumerCurrentSpatialLayer: videoConsumer ? videoConsumer.currentSpatialLayer : null, consumerCurrentTemporalLayer: videoConsumer ? videoConsumer.currentTemporalLayer : null, consumerPreferredSpatialLayer: videoConsumer ? videoConsumer.preferredSpatialLayer : null, consumerPreferredTemporalLayer: videoConsumer ? videoConsumer.preferredTemporalLayer : null, consumerPriority: videoConsumer ? videoConsumer.priority : null, audioTrack: audioConsumer ? audioConsumer.track : null, videoTrack: videoConsumer ? videoConsumer.track : null, audioMuted: audioMuted, videoVisible: videoVisible, videoMultiLayer: videoConsumer && videoConsumer.type !== 'simple', audioCodec: audioConsumer ? audioConsumer.codec : null, videoCodec: videoConsumer ? videoConsumer.codec : null, audioScore: audioConsumer ? audioConsumer.score : null, videoScore: videoConsumer ? videoConsumer.score : null, faceDetection: faceDetection, onChangeVideoPreferredLayers: function (spatialLayer, temporalLayer) {
                roomClient.setConsumerPreferredLayers(videoConsumer.id, spatialLayer, temporalLayer);
            }, onChangeVideoPriority: function (priority) {
                roomClient.setConsumerPriority(videoConsumer.id, priority);
            }, onRequestKeyFrame: function () {
                roomClient.requestConsumerKeyFrame(videoConsumer.id);
            }, onStatsClick: onSetStatsPeerId })));
};
Peer.propTypes =
    {
        roomClient: prop_types_1.default.any.isRequired,
        peer: appPropTypes.Peer.isRequired,
        audioConsumer: appPropTypes.Consumer,
        videoConsumer: appPropTypes.Consumer,
        audioMuted: prop_types_1.default.bool,
        faceDetection: prop_types_1.default.bool.isRequired,
        onSetStatsPeerId: prop_types_1.default.func.isRequired
    };
var mapStateToProps = function (state, _a) {
    var id = _a.id;
    var me = state.me;
    var peer = state.peers[id];
    var consumersArray = peer.consumers
        .map(function (consumerId) { return state.consumers[consumerId]; });
    var audioConsumer = consumersArray.find(function (consumer) { return consumer.track.kind === 'audio'; });
    var videoConsumer = consumersArray.find(function (consumer) { return consumer.track.kind === 'video'; });
    return {
        peer: peer,
        audioConsumer: audioConsumer,
        videoConsumer: videoConsumer,
        audioMuted: me.audioMuted,
        faceDetection: state.room.faceDetection
    };
};
var mapDispatchToProps = function (dispatch) {
    return {
        onSetStatsPeerId: function (peerId) { return dispatch(stateActions.setRoomStatsPeerId(peerId)); }
    };
};
var PeerContainer = RoomContext_1.withRoomContext(react_redux_1.connect(mapStateToProps, mapDispatchToProps)(Peer));
exports.default = PeerContainer;
