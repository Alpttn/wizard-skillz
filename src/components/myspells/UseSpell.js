import React, { Component } from "react";
import ReactCursorPosition from 'react-cursor-position';
import SpellBookManager from "../../modules/SpellBookManager";
import CanvasUseSpell from "../canvas/CanvasUseSpell";
import CanvasCursor from "../canvas/CanvasCursor";
import './UseSpell.css'



class UseSpell extends Component {

    state = {
        useSpell: {},
        isInBox: false,
        lastBoxTouched: 0,
        spellProgress: 0,
        posX: 0,
        posY: 0,
        didIWin: "no"
    };

    spellId = parseInt(this.props.match.params.spellId) //key is spellId and value is the actual id in the url
    componentDidMount() {
        // console.log("hiiii", this.props.match.params.spellId)
        SpellBookManager.getSpell(this.spellId).then((useSpell) => {
            // console.log("render", useSpell)
            this.setState({
                useSpell: useSpell
            })
        })
    };

    checkInBox = (position) => {

        const spell = this.state.useSpell;
        const posX = position.position.x;
        const posY = position.position.y;

        const spellBoxes = [
            {
                boxNum: 1,
                xMin: spell.boxOneXCord,
                xMax: spell.boxOneXCord + 90,
                yMin: spell.boxOneYCord,
                yMax: spell.boxOneYCord + 70
            },
            {
                boxNum: 2,
                xMin: spell.boxTwoXCord,
                xMax: spell.boxTwoXCord + 90,
                yMin: spell.boxTwoYCord,
                yMax: spell.boxTwoYCord + 70
            },
            {
                boxNum: 3,
                xMin: spell.boxThreeXCord,
                xMax: spell.boxThreeXCord + 90,
                yMin: spell.boxThreeYCord,
                yMax: spell.boxThreeYCord + 70
            },
        ]

        // console.log('hey', spellBoxes)

        let isInBox = false;
        let lastBoxTouched = this.state.lastBoxTouched;
        let boxMousedOver = 0;
        let didIWin = this.state.didIWin;

        spellBoxes.forEach(box => {
            // console.log('I"M NOT IN  A BOX YET!!!!!!!!!!!!!!!!');
            // console.log('XXX::', posX, '   XMin::', box.xMin, '  XMax::', box.xMax)
            // console.log('YYY::', posY, '   YMin::', box.yMin, '  YMax::', box.yMax)
            if (posX >= box.xMin && posX <= box.xMax && posY >= box.yMin && posY <= box.yMax) {
                // console.log('I"M IN A BOX!!!!!!!!!!!!!!!!');
                isInBox = true;
                boxMousedOver = box.boxNum;
            }
        })

        if (isInBox && boxMousedOver === lastBoxTouched + 1) {
            lastBoxTouched = boxMousedOver;

            if (lastBoxTouched === 3) {
                didIWin = "you win";
            }
        } else if (isInBox && boxMousedOver !== lastBoxTouched) {
            // console.log('test BBBBB!')
            lastBoxTouched = 0;
        } 

        // console.log('about to set lastBoxTouched To:', lastBoxTouched);

        this.setState({

            isInBox: isInBox,
            lastBoxTouched: lastBoxTouched,
            posX: posX,
            posY: posY,
            didIWin: didIWin
        })
    }

    render() {
        // console.log("flag", this.state.useSpell)
        return (
            <React.Fragment>
                <div className="heading__directions--conatiner">
                    <h1 className="heading">{this.state.useSpell.spellName}!<br />
                    </h1>
                    <p className="directions">Cast your spell!</p>
                    <p>posX={this.state.posX} posY={this.state.posY} inABox={this.state.isInBox ? "yes" : "no"} lastBoxTouched={this.state.lastBoxTouched} didIWin={this.state.didIWin}</p>
                </div>
                <div className="canvas__container">
                    <ReactCursorPosition {...{
                        onPositionChanged: props => this.checkInBox(props)
                    }}>
                        {/* <React.Fragment> */}
                        <CanvasUseSpell spellId={this.spellId} isInBox={this.state.isInBox} lastBoxTouched={this.state.lastBoxTouched} {...this.props} />
                        {/* <CanvasCursor /> */}
                        {/* </React.Fragment> */}
                    </ReactCursorPosition>
                </div>
            </React.Fragment>
        )
    }
}

export default UseSpell