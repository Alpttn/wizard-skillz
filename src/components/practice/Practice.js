import React, { Component } from 'react'
import Canvas from '../canvas/Canvas';
import SpellBookManager from '../../modules/SpellBookManager';
import './Practice.css'

//this component is the main component for the practice page. It renders the canvas that allows the user to trace the background image and save it to myspells.

class Practice extends Component {

    state = {
        spell: {}
    };
//the route props return history, match, and location. 
    componentDidMount() {
        const spellId = parseInt(this.props.match.params.spellId) //key is spellId and value is the actual id in the url
        console.log('spellId: ', spellId);
console.log("hi there", this.props.match.params, "hi there")
        //I want to get one spell from the spellbook.
        SpellBookManager.getSpell(spellId).then((spell) => {
            this.setState({
                spell: spell
            })
        })
    };
// has ownproptery-it was rendering the canvas before the image so I slowed it down with the has own property. It says, hey do I have a property of image? if so render the canvas, otherwise show loading
    render() {
        console.log(this.state.spell) //did state grab the correct spell object?
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
            </React.Fragment>
        );
    }
}

export default Practice