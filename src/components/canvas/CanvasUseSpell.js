import React, { Component } from 'react';
import './CanvasUseSpell.css'

class Canvas extends Component {
    constructor(props) { //can use this format instead of state:
        super(props);
        this.onMouseDown = this.onMouseDown.bind(this); //this represents the canvas. I'm not using arrow functions so I have to bind "this" to the component instance using the bind method. 
        this.onMouseMove = this.onMouseMove.bind(this);
        this.endPaintEvent = this.endPaintEvent.bind(this);
        this.clearCanvas = this.clearCanvas.bind(this);
    }
    // state = {

    // };

    isPainting = false; //we set painting to false first
    // userStrokeStyle is the color of the paint
    userStrokeStyle = '#D3D3D3';
    line = [];
    prevPos = { offsetX: 0, offsetY: 0 };

    onMouseDown({ nativeEvent }) {
        const { offsetX, offsetY } = nativeEvent;
        this.isPainting = true; //when you click on the canvas this will change the is painting to true
        this.prevPos = { offsetX, offsetY }; //this will track/capture the previous position
    }
    // onMouseDown ({ nativeEvent }) => {
    // const { offsetX, offsetY } = nativeEvent;
    // this.isPainting = true; //when you click on the canvas this will change the is painting to true
    // this.prevPos = { offsetX, offsetY }; //this will track/capture the previous position
    // }

    onMouseMove({ nativeEvent }) {
        if (this.isPainting) {
            const { offsetX, offsetY } = nativeEvent;
            const offSetData = { offsetX, offsetY };
            // Set the start and stop position of the paint event.
            const positionData = {
                start: { ...this.prevPos },
                stop: { ...offSetData },
            };
            // Add the position to the line array
            this.line = this.line.concat(positionData); //string the data together to keep track of where my mouse moves
            this.paint(this.prevPos, offSetData, this.userStrokeStyle); //pass the arguments 
        }
    }
    // onMouseMove = (nativeEvent) => {
    // if (this.isPainting) {
    //     const { offsetX, offsetY } = nativeEvent;
    //     const offSetData = { offsetX, offsetY };
    //     // Set the start and stop position of the paint event.
    //     const positionData = {
    //         start: { ...this.prevPos },
    //         stop: { ...offSetData },
    //     };
    //     // Add the position to the line array
    //     this.line = this.line.concat(positionData); //string the data together to keep track of where my mouse moves
    //     this.paint(this.prevPos, offSetData, this.userStrokeStyle); //pass the arguments 
    // }
    // }

    endPaintEvent() { //this event will change the is painting to false to stop tracking the mouse movement. 
        if (this.isPainting) {
            this.isPainting = false;
        }
    }

    // endPaintEvent = () => {
    // if (this.isPainting) {
    //     this.isPainting = false;
    // }
    //}

    paint(prevPos, currPos, strokeStyle) {
        const { offsetX, offsetY } = currPos;
        const { offsetX: x, offsetY: y } = prevPos;
        // the following methods are specific to canvas!
        this.ctx.beginPath(); //ctx is the variable that refers to the getContext("2d") 
        this.ctx.strokeStyle = strokeStyle;
        // Move the the prevPosition of the mouse
        this.ctx.moveTo(x, y);
        // Draw a line to the current position of the mouse
        this.ctx.lineTo(offsetX, offsetY);
        // Visualize the line using the strokeStyle
        this.ctx.stroke();
        this.prevPos = { offsetX, offsetY };
    }

    //  paint = (prevPos, currPos, strokeStyle) => {
    // const { offsetX, offsetY } = currPos;
    // const { offsetX: x, offsetY: y } = prevPos;
    // // the following methods are specific to canvas!
    // this.ctx.beginPath(); //ctx is the variable that refers to the getContext("2d") 
    // this.ctx.strokeStyle = strokeStyle;
    // // Move the the prevPosition of the mouse
    // this.ctx.moveTo(x, y);
    // // Draw a line to the current position of the mouse
    // this.ctx.lineTo(offsetX, offsetY);
    // // Visualize the line using the strokeStyle
    // this.ctx.stroke();
    // this.prevPos = { offsetX, offsetY };
    //}


    clearCanvas() {
        this.ctx = this.canvas.getContext('2d');
        const img = this.refs.image;
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.drawImage(img, 0, 0)
        
    }

    componentDidMount() {
        // Here I set up the properties of the canvas element when the component mounts.
        this.canvas.width = 700; //border of the canvas
        this.canvas.height = 400; //border of the canvas
        this.ctx = this.canvas.getContext('2d'); //get reference to the canvas
        this.ctx.fillStyle = '#A3CEF9';
        const squareOne = this.ctx.fillRect(315, 50, 90, 70);
        const squareTwo =this.ctx.fillRect(200, 300, 90, 70);
        const squareThree =this.ctx.fillRect(430, 300, 90, 70);
    }

    render() {
        console.log(this.props)
        console.log(this.props.position)
        return (
            <div className="canvas__useSpell--container">
                {/* <p className="color__coordinates">x={this.props.position.x}, y={this.props.position.y}</p> */}
                <canvas className="canvasUseSpell"
                    // I use the ref attribute to get direct access to the canvas element. 
                    ref={(ref) => (this.canvas = ref)}
                    style={{ background: 'black' }} //right now the background is black but i'll change it to the practice photo
                    onMouseDown={this.onMouseDown} //invoke these functions below when the event happens
                    onMouseLeave={this.endPaintEvent}
                    onMouseUp={this.endPaintEvent}
                    onMouseMove={this.onMouseMove}
                />
            </div>
        );
    }
}
export default Canvas;