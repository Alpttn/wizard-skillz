import React, { Component } from 'react';
class SpellBookCard extends Component {
    render() {
        return (
            <div className="spellBook__card">
                <div className="spellBook__card__content">
                    <picture>
                        <img src={require(`../images/${this.props.spell.image}`)} alt="Lumos" />
                    </picture>
                    <h3>Spell Name: <span className="card__spellbook-name">Lumos</span></h3>
                    <p className="card__spellbook-description">Description: This spell creates light.</p>
                </div>
            </div>
        );
    }
}

export default SpellBookCard;