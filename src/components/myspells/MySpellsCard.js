import React, { Component } from 'react';
import { Link } from "react-router-dom";
import AddMySpellsNotesModal from "./AddMySpellsNotesModal";
import EditMySpellNotes from "./EditMySpellNotes";
import { Button } from 'reactstrap';
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
                        <h3 style={{color: '#A3CEF9'}}>Notes: <span style={{color: 'white'}} className="card__mySpell-name">{this.props.mySpell.notes}</span></h3>
                        {/* <p className="card__spellbook-description">Description: {this.props.spell.description}</p> */}

                        {this.props.mySpell.notes === "" ?
                        <section className="add__notes--modal__container">
                            <AddMySpellsNotesModal 
                            // key={mySpell.id}
                            mySpell={this.props.mySpell}
                            deleteMySpell={this.deleteMySpell}
                            editAddNotesButton={this.editAddNotesButton}
                            {...this.props} />
                        </section>
                        :
                        <section className="add__notes--modal__container">
                            <EditMySpellNotes 
                            // key={mySpell.id}
                            myEditedSpell={this.props.mySpell}
                            editMySpellNote={this.editMySpellNote}
                            {...this.props} />
                        </section>
                        }
                        <Button color="primary" onClick={() => this.props.deleteMySpell(this.props.mySpell.id)}>Delete This Spell</Button>
                    <div>
                    <Link to={`/usespell`}><Button color="primary">Use this spell</Button></Link>
                    </div>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

export default MySpellsCard;