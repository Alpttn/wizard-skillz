import React, { Component } from 'react';
import './CanvasUseSpell.css'
import SpellBookManager from "../../modules/SpellBookManager"
import ReactCursorPosition, { INTERACTIONS } from 'react-cursor-position' //didn't end up needing this. Everything I need is in props

//this component holds the canvas for casting the spell after you click the use spell button

class CanvasUseSpell extends Component {
    constructor(props) { //can use this format instead of state:
        super(props);
        this.onMouseDown = this.onMouseDown.bind(this); //this represents the canvas. I'm not using arrow functions so I have to bind "this" to the component instance using the bind method. 
        this.onMouseMove = this.onMouseMove.bind(this);
        this.endPaintEvent = this.endPaintEvent.bind(this);
        // this.clearCanvas = this.clearCanvas.bind(this);
    }

    state = {
        spell: {},
        isInBox: false
    }

    getSpellRenderCanvas = () => {
        SpellBookManager.getSpell(this.props.spellId).then((spellObj) => {
            // console.log("render", useSpell)
            this.canvas.width = 700; //border of the canvas
            this.canvas.height = 400; //border of the canvas
            this.ctx = this.canvas.getContext('2d'); //get reference to the canvas
            this.ctx.fillStyle = '#A3CEF9';
            this.ctx.lineJoin = 'round'; //makes the line smooth
            this.ctx.lineCap = 'round'; //rounds edges
            this.ctx.lineWidth = 10; //how wide the line is
            //I am dynamically rendering the squares and hardcoding the width and height so they are all the same.
            this.ctx.fillRect(spellObj.boxOneXCord, spellObj.boxOneYCord, 90, 70); //fillRect method draws squares
            console.log("testformount", this.props)
            this.ctx.fillRect(spellObj.boxTwoXCord, spellObj.boxTwoYCord, 90, 70); 
            this.ctx.fillRect(spellObj.boxThreeXCord, spellObj.boxThreeYCord, 90, 70);
            this.setState({
                spell: spellObj
            })
        })
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

    // clearCanvas() {
    //     this.ctx = this.canvas.getContext('2d');
    //     const img = this.refs.image;
    //     this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    //     this.ctx.drawImage(img, 0, 0)

    // }

    // checkInBox = () => {

    // }

    componentDidMount() {
        this.getSpellRenderCanvas()
    }

    render() {
        // console.log("position", this.props) //where I'm checking to see if the mouse is detected from API
        // console.log("testcanvas", this.canvas)
        return (
            <div className="canvas__useSpell--container" >
                {/* console.log("Allie Look", this.props.position.x) */}
                {/* <p className="color__coordinates">x={this.props.position.x}, y={this.props.position.y}, isInBox=        {this.props.isInBox ? "yeah" : "Sry"}, lastBoxTouched={this.props.lastBoxTouched}</p> */}
                <canvas className="canvasUseSpell"
                    // I use the ref attribute to get direct access to the canvas element. 
                    ref={(ref) => (this.canvas = ref)}
                    style={{ background: 'black' }}
                    onMouseDown={this.onMouseDown} //invoke these functions below when the event happens
                    onMouseLeave={this.endPaintEvent}
                    onMouseUp={this.endPaintEvent}
                    onMouseMove={this.onMouseMove}
                />
            </div>
        );
    }
}
export default CanvasUseSpell;