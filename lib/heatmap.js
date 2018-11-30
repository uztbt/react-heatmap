"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var _ = require("underscore");
function createInitialHeatmapData(rows, cols) {
    var array = [];
    for (var i = 0; i < rows; i++) {
        array[i] = [];
        for (var j = 0; j < cols; j++)
            array[i].push(0);
    }
    return array;
}
exports.createInitialHeatmapData = createInitialHeatmapData;
var Heatmap = (function (_super) {
    __extends(Heatmap, _super);
    function Heatmap(props) {
        var _this = _super.call(this, props) || this;
        _this.canvasRef = React.createRef();
        _this.erase = function () {
            return _this.ctx.clearRect(0, 0, _this.props.width, _this.props.height);
        };
        _this.drawCell = function (x, y, v) {
            _this.setColor(v);
            _this.ctx.strokeRect(x, y, _this.cellWidth, _this.cellHeight);
        };
        _this.getMax = function () {
            var max = 0;
            for (var i = 0; i < _this.props.rows; i++)
                for (var j = 0; j < _this.props.cols; j++)
                    max = max > _this.props.heatmapArray[i][j] ? max : _this.props.heatmapArray[i][j];
            return max;
        };
        _this.draw = function () {
            var max = _this.getMax();
            for (var i = 0; i < _this.props.rows; i++)
                for (var j = 0; j < _this.props.cols; j++) {
                    _this.drawCell(i * _this.cellWidth, j * _this.cellHeight, _this.props.heatmapArray[i][j] / max * 255);
                }
        };
        _this.cellHeight = props.height / props.rows;
        _this.cellWidth = props.width / props.cols;
        return _this;
    }
    Heatmap.prototype.componentDidMount = function () {
        this.ctx = this.getContext();
        if (this.props.heatmapArray) {
            this.ctx.clearRect(0, 0, this.props.width, this.props.height);
            this.draw();
        }
    };
    Heatmap.prototype.componentDidUpdate = function (prevProps) {
        if (typeof prevProps === "object" &&
            typeof this.props === "object" &&
            !_.isEqual(prevProps, this.props)) {
            this.erase();
            this.draw();
        }
    };
    Heatmap.prototype.getContext = function () {
        var canvas = this.canvasRef.current;
        if (canvas) {
            var ctx = canvas.getContext('2d');
            if (ctx)
                return ctx;
        }
        throw new Error("Reference to canvas is null");
    };
    Heatmap.prototype.setColor = function (v) {
        var alphaMax = this.props.style.opacity ? this.props.style.opacity : 0.8;
        if (0 <= v && v < 128)
            this.ctx.fillStyle = this.ctx.strokeStyle = "rgba(" + 2 * v + ", 255, 0, " + alphaMax * v / 256 + ")";
        if (128 <= v && v < 256)
            this.ctx.fillStyle = this.ctx.strokeStyle = "rgba(255, " + (255 - 2 * (v - 128)) + ", 0, " + alphaMax * v / 256 + ")";
    };
    Heatmap.prototype.render = function () {
        return (React.createElement("canvas", { ref: this.canvasRef, className: this.props.className, height: this.props.height, width: this.props.width, style: this.props.style }));
    };
    return Heatmap;
}(React.Component));
exports.Heatmap = Heatmap;
//# sourceMappingURL=heatmap.js.map