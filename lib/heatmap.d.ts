import * as React from 'react';
declare type ValueArray = number[][];
export interface HeatmapProps {
    className: string;
    rows: number;
    cols: number;
    height: number;
    width: number;
    style: {
        opacity?: number;
    };
    heatmapArray: ValueArray;
}
export declare function createInitialHeatmapData(rows: number, cols: number): number[][];
export declare class Heatmap extends React.Component<HeatmapProps, {}> {
    private canvasRef;
    private ctx;
    private cellHeight;
    private cellWidth;
    constructor(props: HeatmapProps);
    erase: () => void;
    componentDidMount(): void;
    componentDidUpdate(prevProps: HeatmapProps): void;
    getContext(): CanvasRenderingContext2D;
    setColor(v: number): void;
    drawCell: (x: number, y: number, v: number) => void;
    getMax: () => number;
    draw: () => void;
    render(): JSX.Element;
}
export {};
