"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var prop_types_1 = __importDefault(require("prop-types"));
exports.Room = prop_types_1.default.shape({
    url: prop_types_1.default.string.isRequired,
    state: prop_types_1.default.oneOf(['new', 'connecting', 'connected', 'closed']).isRequired,
    activeSpeakerName: prop_types_1.default.string
});
exports.Device = prop_types_1.default.shape({
    flag: prop_types_1.default.string.isRequired,
    name: prop_types_1.default.string,
    version: prop_types_1.default.string
});
exports.Me = prop_types_1.default.shape({
    id: prop_types_1.default.string.isRequired,
    displayName: prop_types_1.default.string,
    displayNameSet: prop_types_1.default.bool.isRequired,
    device: exports.Device.isRequired,
    canSendMic: prop_types_1.default.bool.isRequired,
    canSendWebcam: prop_types_1.default.bool.isRequired,
    canChangeWebcam: prop_types_1.default.bool.isRequired,
    webcamInProgress: prop_types_1.default.bool.isRequired,
    audioOnly: prop_types_1.default.bool.isRequired,
    audioOnlyInProgress: prop_types_1.default.bool.isRequired,
    restartIceInProgress: prop_types_1.default.bool.isRequired
});
exports.Producer = prop_types_1.default.shape({
    id: prop_types_1.default.string.isRequired,
    deviceLabel: prop_types_1.default.string,
    type: prop_types_1.default.oneOf(['front', 'back', 'share']),
    paused: prop_types_1.default.bool.isRequired,
    track: prop_types_1.default.any.isRequired,
    rtpParameters: prop_types_1.default.object.isRequired,
    codec: prop_types_1.default.string.isRequired
});
exports.DataProducer = prop_types_1.default.shape({
    id: prop_types_1.default.string.isRequired,
    sctpStreamParameters: prop_types_1.default.object.isRequired
});
exports.Peer = prop_types_1.default.shape({
    id: prop_types_1.default.string.isRequired,
    displayName: prop_types_1.default.string,
    device: exports.Device.isRequired,
    consumers: prop_types_1.default.arrayOf(prop_types_1.default.string).isRequired
});
exports.Consumer = prop_types_1.default.shape({
    id: prop_types_1.default.string.isRequired,
    locallyPaused: prop_types_1.default.bool.isRequired,
    remotelyPaused: prop_types_1.default.bool.isRequired,
    currentSpatialLayer: prop_types_1.default.number,
    preferredSpatialLayer: prop_types_1.default.number,
    track: prop_types_1.default.any,
    codec: prop_types_1.default.string
});
exports.DataConsumer = prop_types_1.default.shape({
    id: prop_types_1.default.string.isRequired,
    sctpStreamParameters: prop_types_1.default.object.isRequired
});
exports.Notification = prop_types_1.default.shape({
    id: prop_types_1.default.string.isRequired,
    type: prop_types_1.default.oneOf(['info', 'error']).isRequired,
    timeout: prop_types_1.default.number
});
