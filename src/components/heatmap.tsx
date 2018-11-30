import * as React from 'react';
import * as _ from "underscore";

type ValueArray = number[][] // 0 - 255

export interface HeatmapProps{
    className: string,
    rows: number,
    cols: number,
    height: number,
    width: number,
    style: {opacity?: number},
    heatmapArray: ValueArray
}

export function createInitialHeatmapData(rows:number, cols:number){
    let array: number[][] = []
    for (let i=0;i<rows;i++){
      array[i]=[]
      for(let j=0; j<cols; j++)
        array[i].push(0)
    }
    return array
  }

export class Heatmap extends React.Component<HeatmapProps, {}>{
    private canvasRef = React.createRef<HTMLCanvasElement>()
    private ctx: CanvasRenderingContext2D
    private cellHeight: number
    private cellWidth: number

    constructor(props:HeatmapProps){
        super(props)
        this.cellHeight = props.height / props.rows
        this.cellWidth  = props.width  / props.cols
    }

    erase = ():void => 
        this.ctx.clearRect(0, 0, this.props.width, this.props.height)
    componentDidMount(){
        this.ctx = this.getContext()
        if(this.props.heatmapArray){
            this.ctx.clearRect(0, 0, this.props.width, this.props.height)
            this.draw()
        }
    }

    componentDidUpdate(prevProps:HeatmapProps){
        if(
            typeof prevProps === "object" &&
            typeof this.props === "object" &&
            !_.isEqual(prevProps, this.props)
            ){
            this.erase()
            this.draw()
        }
    }

    getContext():CanvasRenderingContext2D{
        const canvas = this.canvasRef.current
        if(canvas){
            const ctx = canvas.getContext('2d')
            if(ctx)
                return ctx
        }
        throw new Error("Reference to canvas is null")
    }

    setColor (v:number):void {
        const alphaMax = this.props.style.opacity ? this.props.style.opacity : 0.8
        if(0 <= v && v < 128)
            this.ctx.fillStyle = this.ctx.strokeStyle = `rgba(${2*v}, 255, 0, ${alphaMax*v/256})`
        if(128 <= v && v < 256)
            this.ctx.fillStyle = this.ctx.strokeStyle = `rgba(255, ${255-2*(v-128)}, 0, ${alphaMax*v/256})`
    }

    drawCell = (x:number, y:number, v:number):void =>{
        this.setColor(v)
        this.ctx.strokeRect(x, y, this.cellWidth, this.cellHeight)
    }

    getMax = ():number => {
        let max = 0
        for(let i=0; i < this.props.rows; i++)
            for(let j=0; j < this.props.cols; j++)
                max = max > this.props.heatmapArray[i][j] ? max : this.props.heatmapArray[i][j]
        return max;
    }

    draw = ():void => {
        const max = this.getMax();
        for(let i=0; i < this.props.rows; i++)
            for(let j=0; j < this.props.cols; j++){
                this.drawCell(i*this.cellWidth, j*this.cellHeight, this.props.heatmapArray[i][j]/max*255)
            }
    }

    render(){
        return(
        <canvas
            ref={this.canvasRef} className={this.props.className} height={this.props.height} width={this.props.width} style={this.props.style}
        />
        )
    }
}