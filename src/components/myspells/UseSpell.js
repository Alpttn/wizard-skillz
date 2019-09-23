import React, { Component } from "react";
import ReactCursorPosition from 'react-cursor-position';
import SpellBookManager from "../../modules/SpellBookManager";
import CanvasUseSpell from "../canvas/CanvasUseSpell";
import CanvasCursor from "../canvas/CanvasCursor";
import './UseSpell.css'



class UseSpell extends Component {

    state = {
        useSpell: {}
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


    render() {
        console.log("flag", this.state.useSpell)
        return (
            <React.Fragment>
                <div className="heading__directions--conatiner">
                    <h1 className="heading">{this.state.useSpell.spellName}!<br />
                    </h1>
                    <p className="directions">Cast your spell!</p>
                </div>
                <div className="canvas__container">
                    <ReactCursorPosition>
                        <div className="canvas__useSpell">
                            <CanvasUseSpell spellId={this.spellId} {...this.props} />
                        </div>
                        <div className="canvas__cursor">
                            <CanvasCursor />
                        </div>
                    </ReactCursorPosition>
                </div>
            </React.Fragment>
        )
    }
}

export default UseSpell