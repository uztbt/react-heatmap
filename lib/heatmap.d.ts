import * as React from 'react';
export interface HeatmapProps {
    id?: string;
    src?: string;
    height: number;
    width: number;
    opacity?: number;
    heatmapArray: number[][];
}
export declare function createInitialHeatmapData(rows: number, cols: number): number[][];
export declare class Heatmap extends React.Component<HeatmapProps, {}> {
    private canvasRef;
    private ctx;
    private rows;
    private cols;
    private cellHeight;
    private cellWidth;
    constructor(props: HeatmapProps);
    componentDidMount: () => void;
    componentDidUpdate: (prevProps: HeatmapProps) => void;
    render: () => JSX.Element;
    draw: () => void;
    drawCell: (x: number, y: number, v: number) => void;
    getMax: () => number;
    setColor(v: number): void;
    getContext: () => CanvasRenderingContext2D;
    erase: () => void;
    setSize: (props: HeatmapProps) => void;
}
