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
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
var react_redux_1 = require("react-redux");
var prop_types_1 = __importDefault(require("prop-types"));
var RoomContext_1 = require("../RoomContext");
var BotMessageRegex = new RegExp('^@bot (.*)');
var ChatInput = /** @class */ (function (_super) {
    __extends(ChatInput, _super);
    function ChatInput(props) {
        var _this = _super.call(this, props) || this;
        _this.state =
            {
                text: ''
            };
        // TextArea element got via React ref.
        // @type {HTMLElement}
        _this._textareaElem = null;
        return _this;
    }
    ChatInput.prototype.render = function () {
        var _this = this;
        var _a = this.props, connected = _a.connected, chatDataProducer = _a.chatDataProducer, botDataProducer = _a.botDataProducer;
        var text = this.state.text;
        var disabled = !connected || (!chatDataProducer && !botDataProducer);
        return (react_1.default.createElement("div", { "data-component": 'ChatInput' },
            react_1.default.createElement("textarea", { ref: function (elem) { _this._textareaElem = elem; }, placeholder: disabled ? 'Chat unavailable' : 'Write here...', dir: 'auto', autoComplete: 'off', disabled: disabled, value: text, onChange: this.handleChange.bind(this), onKeyPress: this.handleKeyPress.bind(this) })));
    };
    ChatInput.prototype.handleChange = function (event) {
        var text = event.target.value;
        this.setState({ text: text });
    };
    ChatInput.prototype.handleKeyPress = function (event) {
        // If Shift + Enter do nothing.
        if (event.key !== 'Enter' || (event.shiftKey || event.ctrlKey))
            return;
        // Don't add the sending Enter into the value.
        event.preventDefault();
        var text = this.state.text.trim();
        this.setState({ text: '' });
        if (text) {
            var roomClient = this.props.roomClient;
            var match = BotMessageRegex.exec(text);
            // Chat message.
            if (!match) {
                text = text.trim();
                roomClient.sendChatMessage(text);
            }
            // Message to the bot.
            else {
                text = match[1].trim();
                roomClient.sendBotMessage(text);
            }
        }
    };
    return ChatInput;
}(react_1.default.Component));
ChatInput.propTypes =
    {
        roomClient: prop_types_1.default.any.isRequired,
        connected: prop_types_1.default.bool.isRequired,
        chatDataProducer: prop_types_1.default.any,
        botDataProducer: prop_types_1.default.any
    };
var mapStateToProps = function (state) {
    var dataProducersArray = Object.values(state.dataProducers);
    var chatDataProducer = dataProducersArray
        .find(function (dataProducer) { return dataProducer.label === 'chat'; });
    var botDataProducer = dataProducersArray
        .find(function (dataProducer) { return dataProducer.label === 'bot'; });
    return {
        connected: state.room.state === 'connected',
        chatDataProducer: chatDataProducer,
        botDataProducer: botDataProducer
    };
};
var ChatInputContainer = RoomContext_1.withRoomContext(react_redux_1.connect(mapStateToProps, undefined)(ChatInput));
exports.default = ChatInputContainer;
