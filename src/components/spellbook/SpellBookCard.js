import React, { Component } from 'react';
import { Link } from "react-router-dom";
import './SpellBookCard.css'

//not in use due to the carousel. 

class SpellBookCard extends Component {
    render() {
        return (
            <div className="spellBook__card">
                <div className="spellBook__card__content">
                    <picture>
                        <img className="wand__image" src={require(`../images/${this.props.spell.image}`)} alt="Lumos" />
                    </picture>
                    <h3>Spell Name: <span className="card__spellbook-name">{this.props.spell.spellName}</span></h3>
                    <p className="card__spellbook-description">Description: {this.props.spell.description}</p>
                    <Link to={`/practice/${this.props.spell.id}`}><button>Practice</button></Link>
                </div>
            </div>
        );
    }
}

export default SpellBookCard;