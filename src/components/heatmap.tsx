import * as React from 'react';

export interface HeatmapProps{
    id?: string,
    src?: string,
    height: number,
    width: number,
    opacity?: number,
    heatmapArray: number[][]
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
    private rows: number
    private cols: number
    private cellHeight: number
    private cellWidth: number
    
    constructor(props:HeatmapProps){
        super(props)
        this.setSize(props)
    }

    /* ******************* */
    /* Component functions */
    /* ******************* */
    
    componentDidMount = ():void => {
        this.ctx = this.getContext()
        if(this.props.heatmapArray){
            this.draw()
        }
    }

    componentDidUpdate = (prevProps:HeatmapProps):void => {
        if(
            typeof prevProps === "object" &&
            typeof this.props === "object" &&
            JSON.stringify(prevProps) !== JSON.stringify(this.props)
            // !_.isEqual(prevProps, this.props)
            ){
            this.erase()
            this.setSize(this.props)
            this.draw()
        }
    }

    render = (): JSX.Element =>
        <div
            id={`outside-wrapper ${this.props.id}`}
            style={{width: this.props.width, height: this.props.height}}
        >
            <div
                id={`inside-wrapper ${this.props.id}`}
                style={{width: "100%", height: "100%", position: "relative"}}
            >
                <img
                    id={`image ${this.props.id}`}
                    src={this.props.src}
                    style={{width: "100%", height: "100%", position: "absolute", top: "0px", left: "0px"}}
                />
                <canvas
                    ref={this.canvasRef}
                    id={`canvas ${this.props.id}`}
                    height={this.props.height}
                    width={this.props.width}
                    style={{width: "100%", height: "100%", position: "absolute", top: "0px", left: "0px", opacity: this.props.opacity}}
                />
            </div>
        </div>

    /* *********** */
    /* Draw family */
    /* *********** */

    draw = ():void => {
        const max = this.getMax();
        for(let i=0; i < this.rows; i++)
            for(let j=0; j < this.cols; j++)
                this.drawCell(j*this.cellWidth, i*this.cellHeight, this.props.heatmapArray[i][j]/max*255)
    }

    drawCell = (x:number, y:number, v:number):void =>{
        this.setColor(v)
        this.ctx.fillRect(x, y, this.cellWidth, this.cellHeight)
    }

    getMax = ():number => {
        let max = 0
        for(let i=0; i < this.rows; i++)
            for(let j=0; j < this.cols; j++)
                max = max > this.props.heatmapArray[i][j] ? max : this.props.heatmapArray[i][j]
        return max;
    }

    setColor (v:number):void {
        const alphaMax = this.props.opacity ? this.props.opacity : 0.8
        if(0 <= v && v < 128)
            this.ctx.fillStyle = this.ctx.strokeStyle = `rgba(${2*v}, 255, 0, ${alphaMax*v/256})`
        if(128 <= v && v < 256)
            this.ctx.fillStyle = this.ctx.strokeStyle = `rgba(255, ${255-2*(v-128)}, 0, ${alphaMax*v/256})`
    }

    /* ****** */
    /* Others */
    /* ****** */

    getContext = ():CanvasRenderingContext2D =>{
        const canvas = this.canvasRef.current
        if(canvas){
            const ctx = canvas.getContext('2d')
            if(ctx)
                return ctx
        }
        throw new Error("Reference to canvas is null")
    }

    erase = ():void => 
        this.ctx.clearRect(0, 0, this.props.width, this.props.height)

    setSize = (props: HeatmapProps):void => {
        this.rows = props.heatmapArray.length
        this.cols = props.heatmapArray[0].length
        this.cellHeight = props.height / this.rows
        this.cellWidth  = props.width  / this.cols
    }
}
