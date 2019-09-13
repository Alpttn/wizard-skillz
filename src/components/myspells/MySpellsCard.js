import React, { Component } from 'react';
import AddMySpellsNotesModal from "./AddMySpellsNotesModal";
// import { Link } from "react-router-dom";


class MySpellsCard extends Component {
    render() {
        return (
            <React.Fragment>
                <div className="mySpells__card">
                    <div className="mySpells__card__content">
                        <picture>
                            <img className="drawn__image" src={`${this.props.mySpell.image}`} alt="spell" />
                        </picture>
                        <h3>Notes: <span className="card__mySpell-name">{this.props.mySpell.notes}</span></h3>
                        {/* <p className="card__spellbook-description">Description: {this.props.spell.description}</p> */}
                        <section className="add__notes--modal__container">
                            <AddMySpellsNotesModal 
                            // key={mySpell.id}
                            // mySpell={mySpell}
                            deleteMySpell={this.deleteMySpell}
                            editAddNotesButton={this.editAddNotesButton}
                            {...this.props} />
                        </section>
                        <button type="button" onClick={() => this.props.deleteMySpell(this.props.mySpell.id)}>Delete This Spell</button>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

export default MySpellsCard;