import React, { Component } from 'react';
import { Button } from 'reactstrap';
import SpellBookManager from '../../modules/SpellBookManager';
import './CanvasUseSpell.css'



class Canvas extends Component {
    constructor(props) { //can use this format instead of state:
        super(props);
        this.onMouseDown = this.onMouseDown.bind(this); //this represents the canvas. I'm not using arrow functions so I have to bind "this" to the component instance using the bind method. 
        this.onMouseMove = this.onMouseMove.bind(this);
        this.endPaintEvent = this.endPaintEvent.bind(this);
        this.createNewCanvasSpell = this.createNewCanvasSpell.bind(this);
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

    createNewCanvasSpell() {
        const dataURL = this.canvas.toDataURL();
        console.log(dataURL);
        const mySpell = {
            image: dataURL,
            notes: "",
            spellId: this.props.spell.id,
            UserId: this.props.activeUser(), //this was passed down from application views
        };
        // Create the canvas spell and redirect user to MySpells page
        SpellBookManager.postCanvasSpell(mySpell)
            .then(() => this.props.history.push("/mySpells"));
    }

    // createNewCanvasSpell = () => {
    // const dataURL = this.canvas.toDataURL();
    // console.log(dataURL);
    // const mySpell = {
    //     image: dataURL,
    //     notes: ""
    // };
    // // Create the canvas spell and redirect user to MySpells page
    // SpellBookManager.postCanvasSpell(mySpell)
    //     .then(() => this.props.history.push("/mySpells"));
    //}

    clearCanvas() {
        this.ctx = this.canvas.getContext('2d');
        const img = this.refs.image;
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.drawImage(img, 0, 0)
        
    }

    componentDidMount() {
        // Here we set up the properties of the canvas element when the component mounts.
        this.canvas.width = 400; //border of the canvas
        this.canvas.height = 400; //border of the canvas
        this.ctx = this.canvas.getContext('2d'); //get reference to the canvas
        this.ctx.fillStyle = 'blue';
        this.ctx.fillRect(195, 50, 10, 10);
        this.ctx.fillRect(50, 300, 10, 10);
        this.ctx.fillRect(340, 300, 10, 10);
    }

    render() {
        console.log(this.props.spell)
        return (
            <div className="canvas__button--container">
                <canvas
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