import React, { Component } from "react";
import ReactCursorPosition from 'react-cursor-position';
import SpellBookManager from "../../modules/SpellBookManager";
import CanvasUseSpell from "../canvas/CanvasUseSpell";
import CanvasCursor from "../canvas/CanvasCursor";
import './UseSpell.css'



class UseSpell extends Component {

    state = {
        spell: {}
    };

    componentDidMount() {
        const spellId = parseInt(this.props.match.params.spellId) //key is spellId and value is the actual id in the url

        SpellBookManager.getSpell(spellId).then((spell) => {
            this.setState({
                spell: spell
            })
        })
    };


    render() {

        return (
            <React.Fragment>
                <div className="heading__directions--conatiner">
                    <h1 className="heading">Lumos!<br />
                    </h1>
                    <p className="directions">Cast your spell!</p>
                </div>
                <div className="canvas__container">
                    <ReactCursorPosition>
                        <div className="canvas__useSpell">
                            <CanvasUseSpell spell={this.state.spell} {...this.props} />
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