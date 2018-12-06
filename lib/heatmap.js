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
        _this.componentDidMount = function () {
            _this.ctx = _this.getContext();
            if (_this.props.heatmapArray) {
                _this.draw();
            }
        };
        _this.componentDidUpdate = function (prevProps) {
            if (typeof prevProps === "object" &&
                typeof _this.props === "object" &&
                JSON.stringify(prevProps) !== JSON.stringify(_this.props)) {
                _this.erase();
                _this.setSize(_this.props);
                _this.draw();
            }
        };
        _this.render = function () {
            return React.createElement("canvas", { ref: _this.canvasRef, className: _this.props.className, height: _this.props.height, width: _this.props.width, style: _this.props.style });
        };
        _this.draw = function () {
            var max = _this.getMax();
            for (var i = 0; i < _this.rows; i++)
                for (var j = 0; j < _this.cols; j++) {
                    _this.drawCell(j * _this.cellWidth, i * _this.cellHeight, _this.props.heatmapArray[i][j] / max * 255);
                }
        };
        _this.drawCell = function (x, y, v) {
            _this.setColor(v);
            _this.ctx.fillRect(x, y, _this.cellWidth, _this.cellHeight);
        };
        _this.getMax = function () {
            var max = 0;
            for (var i = 0; i < _this.rows; i++)
                for (var j = 0; j < _this.cols; j++)
                    max = max > _this.props.heatmapArray[i][j] ? max : _this.props.heatmapArray[i][j];
            return max;
        };
        _this.getContext = function () {
            var canvas = _this.canvasRef.current;
            if (canvas) {
                var ctx = canvas.getContext('2d');
                if (ctx)
                    return ctx;
            }
            throw new Error("Reference to canvas is null");
        };
        _this.erase = function () {
            return _this.ctx.clearRect(0, 0, _this.props.width, _this.props.height);
        };
        _this.setSize = function (props) {
            _this.rows = props.heatmapArray.length;
            _this.cols = props.heatmapArray[0].length;
            _this.cellHeight = props.height / _this.rows;
            _this.cellWidth = props.width / _this.cols;
        };
        _this.setSize(props);
        return _this;
    }
    Heatmap.prototype.setColor = function (v) {
        var alphaMax = this.props.style.opacity ? this.props.style.opacity : 0.8;
        if (0 <= v && v < 128)
            this.ctx.fillStyle = this.ctx.strokeStyle = "rgba(" + 2 * v + ", 255, 0, " + alphaMax * v / 256 + ")";
        if (128 <= v && v < 256)
            this.ctx.fillStyle = this.ctx.strokeStyle = "rgba(255, " + (255 - 2 * (v - 128)) + ", 0, " + alphaMax * v / 256 + ")";
    };
    return Heatmap;
}(React.Component));
exports.Heatmap = Heatmap;
//# sourceMappingURL=heatmap.js.map