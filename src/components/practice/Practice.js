import React, { Component } from 'react'
import Canvas from '../canvas/Canvas';
import SpellBookManager from '../../modules/SpellBookManager';

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
                <div>
                    <h2>Wands at the ready!<br />
                        <small>Practice a spell and save it to your spellbook!</small>
                    </h2>
                </div>
                <div>
                    {this.state.spell.hasOwnProperty('image') ?
                        <Canvas spell={this.state.spell} {...this.props} /> :
                        <h1>"...Loading"</h1>
                    }
                </div>
                <div>
                    <button
                        type="button"
                    // onClick={() => this.props.deleteTask(this.props.task.id)}
                    >
                        Save to Favorites
                    </button>
                </div>
            </React.Fragment>
        );
    }
}

export default Practice