import React, { Component } from 'react'
import Canvas from '../canvas/Canvas';
import SpellBookManager from '../../modules/SpellBookManager';
import './Practice.css'

class Practice extends Component {

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

    // function to clear the canvas
    // ctx.clearRect(0, 0, canvas.width, canvas.height);    I need to clear the canvas but the button is on this page

    render() {
        console.log(this.state.spell)
        return (

            <React.Fragment>
                <div className="heading__directions--conatiner">
                    <h1 className="heading">Wands at the ready!<br />
                    </h1>
                        <p className="directions">Click and drag mouse to trace the spell!</p>
                </div>
                <div className="canvas__container">
                    {this.state.spell.hasOwnProperty('image') ?
                        <Canvas spell={this.state.spell} {...this.props} /> :
                        <h1>"...Loading"</h1>
                    }
                </div>
                <div>
                </div>
            </React.Fragment>
        );
    }
}

export default Practice