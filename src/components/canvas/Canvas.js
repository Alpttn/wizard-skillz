// canvas.js

import React, { Component } from 'react';
import './Canvas.css'


class Canvas extends Component {
    constructor(props) { //can use this format instead of state:
        super(props);
        this.onMouseDown = this.onMouseDown.bind(this); //this represents the canvas. I'm not using arrow functions so I have to bind "this" to the component instance using the bind method. 
        this.onMouseMove = this.onMouseMove.bind(this);
        this.endPaintEvent = this.endPaintEvent.bind(this);
    }

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
    endPaintEvent() { //this event will change the is painting to false to stop tracking the mouse movement. 
        if (this.isPainting) {
            this.isPainting = false;
            // this.sendPaintData();
        }
    }
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

    componentDidMount() {
        // Here we set up the properties of the canvas element when the component mounts.
        this.canvas.width = 600; //border of the canvas
        this.canvas.height = 400; //border of the canvas
        this.ctx = this.canvas.getContext('2d'); //get reference to the canvas
        this.ctx.lineJoin = 'round';
        this.ctx.lineCap = 'round';
        this.ctx.lineWidth = 5; //how wide the line is
        const img = this.refs.image
        // new code to mess with from stackoverflow. it enlarges but makes it blurry
        const hRatio = this.canvas.width / img.width;
        const vRatio = this.canvas.height / img.height;
        const ratio = Math.min(hRatio, vRatio);

        img.onload = () => {
            this.ctx.drawImage(img, 0, 0, img.width, img.height, 0,0,img.width*ratio, img.height*ratio)
        }
    }

    render() {
        console.log(this.props.spell)
        return (
            <div>
                <canvas
                    // I use the ref attribute to get direct access to the canvas element. 
                    ref={(ref) => (this.canvas = ref)}
                    style={{ background: 'black' }} //right now the background is black but i'll change it to the practice photo
                    onMouseDown={this.onMouseDown} //invoke these functions below when the event happens
                    onMouseLeave={this.endPaintEvent}
                    onMouseUp={this.endPaintEvent}
                    onMouseMove={this.onMouseMove}
                />
                <picture>
                    <img ref="image" src={require(`../images/${this.props.spell.image}`)} className="hidden" alt={this.props.spell.spellName} />
                </picture>
            </div>
        );
    }
}
export default Canvas;