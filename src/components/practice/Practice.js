import React, { Component } from 'react'
import Canvas from '../canvas/Canvas';

class Practice extends Component {


    render() {

        return (
            <React.Fragment>
                <div>
                    <h2>Wands at the ready!<br />
                        <small>Practice a spell and save it to your spellbook!</small>
                    </h2>
                </div>
                <div>
                    <Canvas />
                </div>
            </React.Fragment>
        );
    }
}

export default Practice