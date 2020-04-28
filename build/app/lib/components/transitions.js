"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
var prop_types_1 = __importDefault(require("prop-types"));
var react_transition_group_1 = require("react-transition-group");
var Appear = function (_a) {
    var duration = _a.duration, children = _a.children;
    return (react_1.default.createElement(react_transition_group_1.CSSTransition, { in: true, classNames: 'Appear', timeout: duration || 1000, appear: true }, children));
};
exports.Appear = Appear;
Appear.propTypes =
    {
        duration: prop_types_1.default.number,
        children: prop_types_1.default.any
    };
