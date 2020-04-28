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
var classnames_1 = __importDefault(require("classnames"));
var appPropTypes = __importStar(require("./appPropTypes"));
var transitions_1 = require("./transitions");
var Peer_1 = __importDefault(require("./Peer"));
var Peers = function (_a) {
    var peers = _a.peers, activeSpeakerId = _a.activeSpeakerId;
    return (react_1.default.createElement("div", { "data-component": 'Peers' }, peers.map(function (peer) {
        return (react_1.default.createElement(transitions_1.Appear, { key: peer.id, duration: 1000 },
            react_1.default.createElement("div", { className: classnames_1.default('peer-container', {
                    'active-speaker': peer.id === activeSpeakerId
                }) },
                react_1.default.createElement(Peer_1.default, { id: peer.id }))));
    })));
};
Peers.propTypes =
    {
        peers: prop_types_1.default.arrayOf(appPropTypes.Peer).isRequired,
        activeSpeakerId: prop_types_1.default.string
    };
var mapStateToProps = function (state) {
    var peersArray = Object.values(state.peers);
    return {
        peers: peersArray,
        activeSpeakerId: state.room.activeSpeakerId
    };
};
var PeersContainer = react_redux_1.connect(mapStateToProps, null, null, {
    areStatesEqual: function (next, prev) {
        return (prev.peers === next.peers &&
            prev.room.activeSpeakerId === next.room.activeSpeakerId);
    }
})(Peers);
exports.default = PeersContainer;
