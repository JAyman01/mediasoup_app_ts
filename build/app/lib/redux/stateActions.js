"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setRoomUrl = function (url) {
    return {
        type: 'SET_ROOM_URL',
        payload: { url: url }
    };
};
exports.setRoomState = function (state) {
    return {
        type: 'SET_ROOM_STATE',
        payload: { state: state }
    };
};
exports.setRoomActiveSpeaker = function (peerId) {
    return {
        type: 'SET_ROOM_ACTIVE_SPEAKER',
        payload: { peerId: peerId }
    };
};
exports.setRoomStatsPeerId = function (peerId) {
    return {
        type: 'SET_ROOM_STATS_PEER_ID',
        payload: { peerId: peerId }
    };
};
exports.setRoomFaceDetection = function (flag) {
    return {
        type: 'SET_FACE_DETECTION',
        payload: flag
    };
};
exports.setMe = function (_a) {
    var peerId = _a.peerId, displayName = _a.displayName, displayNameSet = _a.displayNameSet, device = _a.device;
    return {
        type: 'SET_ME',
        payload: { peerId: peerId, displayName: displayName, displayNameSet: displayNameSet, device: device }
    };
};
exports.setMediaCapabilities = function (_a) {
    var canSendMic = _a.canSendMic, canSendWebcam = _a.canSendWebcam;
    return {
        type: 'SET_MEDIA_CAPABILITIES',
        payload: { canSendMic: canSendMic, canSendWebcam: canSendWebcam }
    };
};
exports.setCanChangeWebcam = function (flag) {
    return {
        type: 'SET_CAN_CHANGE_WEBCAM',
        payload: flag
    };
};
exports.setDisplayName = function (displayName) {
    return {
        type: 'SET_DISPLAY_NAME',
        payload: { displayName: displayName }
    };
};
exports.setAudioOnlyState = function (enabled) {
    return {
        type: 'SET_AUDIO_ONLY_STATE',
        payload: { enabled: enabled }
    };
};
exports.setAudioOnlyInProgress = function (flag) {
    return {
        type: 'SET_AUDIO_ONLY_IN_PROGRESS',
        payload: { flag: flag }
    };
};
exports.setAudioMutedState = function (enabled) {
    return {
        type: 'SET_AUDIO_MUTED_STATE',
        payload: { enabled: enabled }
    };
};
exports.setRestartIceInProgress = function (flag) {
    return {
        type: 'SET_RESTART_ICE_IN_PROGRESS',
        payload: { flag: flag }
    };
};
exports.addProducer = function (producer) {
    return {
        type: 'ADD_PRODUCER',
        payload: { producer: producer }
    };
};
exports.removeProducer = function (producerId) {
    return {
        type: 'REMOVE_PRODUCER',
        payload: { producerId: producerId }
    };
};
exports.setProducerPaused = function (producerId) {
    return {
        type: 'SET_PRODUCER_PAUSED',
        payload: { producerId: producerId }
    };
};
exports.setProducerResumed = function (producerId) {
    return {
        type: 'SET_PRODUCER_RESUMED',
        payload: { producerId: producerId }
    };
};
exports.setProducerTrack = function (producerId, track) {
    return {
        type: 'SET_PRODUCER_TRACK',
        payload: { producerId: producerId, track: track }
    };
};
exports.setProducerScore = function (producerId, score) {
    return {
        type: 'SET_PRODUCER_SCORE',
        payload: { producerId: producerId, score: score }
    };
};
exports.addDataProducer = function (dataProducer) {
    return {
        type: 'ADD_DATA_PRODUCER',
        payload: { dataProducer: dataProducer }
    };
};
exports.removeDataProducer = function (dataProducerId) {
    return {
        type: 'REMOVE_DATA_PRODUCER',
        payload: { dataProducerId: dataProducerId }
    };
};
exports.setWebcamInProgress = function (flag) {
    return {
        type: 'SET_WEBCAM_IN_PROGRESS',
        payload: { flag: flag }
    };
};
exports.setShareInProgress = function (flag) {
    return {
        type: 'SET_SHARE_IN_PROGRESS',
        payload: { flag: flag }
    };
};
exports.addPeer = function (peer) {
    return {
        type: 'ADD_PEER',
        payload: { peer: peer }
    };
};
exports.removePeer = function (peerId) {
    return {
        type: 'REMOVE_PEER',
        payload: { peerId: peerId }
    };
};
exports.setPeerDisplayName = function (displayName, peerId) {
    return {
        type: 'SET_PEER_DISPLAY_NAME',
        payload: { displayName: displayName, peerId: peerId }
    };
};
exports.addConsumer = function (consumer, peerId) {
    return {
        type: 'ADD_CONSUMER',
        payload: { consumer: consumer, peerId: peerId }
    };
};
exports.removeConsumer = function (consumerId, peerId) {
    return {
        type: 'REMOVE_CONSUMER',
        payload: { consumerId: consumerId, peerId: peerId }
    };
};
exports.setConsumerPaused = function (consumerId, originator) {
    return {
        type: 'SET_CONSUMER_PAUSED',
        payload: { consumerId: consumerId, originator: originator }
    };
};
exports.setConsumerResumed = function (consumerId, originator) {
    return {
        type: 'SET_CONSUMER_RESUMED',
        payload: { consumerId: consumerId, originator: originator }
    };
};
exports.setConsumerCurrentLayers = function (consumerId, spatialLayer, temporalLayer) {
    return {
        type: 'SET_CONSUMER_CURRENT_LAYERS',
        payload: { consumerId: consumerId, spatialLayer: spatialLayer, temporalLayer: temporalLayer }
    };
};
exports.setConsumerPreferredLayers = function (consumerId, spatialLayer, temporalLayer) {
    return {
        type: 'SET_CONSUMER_PREFERRED_LAYERS',
        payload: { consumerId: consumerId, spatialLayer: spatialLayer, temporalLayer: temporalLayer }
    };
};
exports.setConsumerPriority = function (consumerId, priority) {
    return {
        type: 'SET_CONSUMER_PRIORITY',
        payload: { consumerId: consumerId, priority: priority }
    };
};
exports.setConsumerTrack = function (consumerId, track) {
    return {
        type: 'SET_CONSUMER_TRACK',
        payload: { consumerId: consumerId, track: track }
    };
};
exports.setConsumerScore = function (consumerId, score) {
    return {
        type: 'SET_CONSUMER_SCORE',
        payload: { consumerId: consumerId, score: score }
    };
};
exports.addDataConsumer = function (dataConsumer, peerId) {
    return {
        type: 'ADD_DATA_CONSUMER',
        payload: { dataConsumer: dataConsumer, peerId: peerId }
    };
};
exports.removeDataConsumer = function (dataConsumerId, peerId) {
    return {
        type: 'REMOVE_DATA_CONSUMER',
        payload: { dataConsumerId: dataConsumerId, peerId: peerId }
    };
};
exports.addNotification = function (notification) {
    return {
        type: 'ADD_NOTIFICATION',
        payload: { notification: notification }
    };
};
exports.removeNotification = function (notificationId) {
    return {
        type: 'REMOVE_NOTIFICATION',
        payload: { notificationId: notificationId }
    };
};
exports.removeAllNotifications = function () {
    return {
        type: 'REMOVE_ALL_NOTIFICATIONS'
    };
};
