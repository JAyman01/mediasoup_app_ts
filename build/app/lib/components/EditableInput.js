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
var prop_types_1 = __importDefault(require("prop-types"));
var riek_1 = require("riek");
var EditableInput = /** @class */ (function (_super) {
    __extends(EditableInput, _super);
    function EditableInput() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    EditableInput.prototype.render = function () {
        var _a = this.props, value = _a.value, propName = _a.propName, className = _a.className, classLoading = _a.classLoading, classInvalid = _a.classInvalid, editProps = _a.editProps, onChange = _a.onChange;
        return (react_1.default.createElement(riek_1.RIEInput, { value: value, propName: propName, className: className, classLoading: classLoading, classInvalid: classInvalid, shouldBlockWhileLoading: true, editProps: editProps, change: function (data) { return onChange(data); } }));
    };
    EditableInput.prototype.shouldComponentUpdate = function (nextProps) {
        if (nextProps.value === this.props.value)
            return false;
        return true;
    };
    return EditableInput;
}(react_1.default.Component));
exports.default = EditableInput;
EditableInput.propTypes =
    {
        value: prop_types_1.default.string,
        propName: prop_types_1.default.string.isRequired,
        className: prop_types_1.default.string,
        classLoading: prop_types_1.default.string,
        classInvalid: prop_types_1.default.string,
        editProps: prop_types_1.default.any,
        onChange: prop_types_1.default.func.isRequired
    };
