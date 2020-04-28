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
var classnames_1 = __importDefault(require("classnames"));
var prop_types_1 = __importDefault(require("prop-types"));
var appPropTypes = __importStar(require("./appPropTypes"));
var stateActions = __importStar(require("../redux/stateActions"));
var transitions_1 = require("./transitions");
var Notifications = function (_a) {
    var notifications = _a.notifications, onClick = _a.onClick;
    return (react_1.default.createElement("div", { "data-component": 'Notifications' }, notifications.map(function (notification) {
        return (react_1.default.createElement(transitions_1.Appear, { key: notification.id, duration: 250 },
            react_1.default.createElement("div", { className: classnames_1.default('notification', notification.type), onClick: function () { return onClick(notification.id); } },
                react_1.default.createElement("div", { className: 'icon' }),
                react_1.default.createElement("div", { className: 'body' },
                    react_1.default.createElement(If, { condition: notification.title },
                        react_1.default.createElement("p", { className: 'title' }, notification.title)),
                    react_1.default.createElement("p", { className: 'text' }, notification.text)))));
    })));
};
Notifications.propTypes =
    {
        notifications: prop_types_1.default.arrayOf(appPropTypes.Notification).isRequired,
        onClick: prop_types_1.default.func.isRequired
    };
var mapStateToProps = function (state) {
    var notifications = state.notifications;
    return { notifications: notifications };
};
var mapDispatchToProps = function (dispatch) {
    return {
        onClick: function (notificationId) {
            dispatch(stateActions.removeNotification(notificationId));
        }
    };
};
var NotificationsContainer = react_redux_1.connect(mapStateToProps, mapDispatchToProps)(Notifications);
exports.default = NotificationsContainer;
