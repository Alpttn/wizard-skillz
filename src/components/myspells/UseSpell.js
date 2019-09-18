import React, { Component } from "react";
import ReactCursorPosition from 'react-cursor-position';
import SpellBookManager from "../../modules/SpellBookManager";
import CanvasUseSpell from "../canvas/CanvasUseSpell";



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
        console.log("SPELL LIST: Render");

        return (
            <React.Fragment>
                <div className="heading__directions--conatiner">
                    <h1 className="heading">Lumos!<br />
                    </h1>
                    <p className="directions">Cast your spell!</p>
                </div>
                <div className="canvas__container">
                    <ReactCursorPosition>
                        <CanvasUseSpell spell={this.state.spell} {...this.props} />
                    </ReactCursorPosition>
                </div>
            </React.Fragment>
        )
    }
}

export default UseSpell