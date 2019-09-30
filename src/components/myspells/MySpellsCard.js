import React, { Component } from 'react';
import { Link } from "react-router-dom";
import AddMySpellsNotesModal from "./AddMySpellsNotesModal";
import EditMySpellNotes from "./EditMySpellNotes";
import { Card, Button, CardTitle, CardText } from 'reactstrap';
import './MySpellsCard.css'

// This component is the card for each PNG rendered from the practice canvas. 


class MySpellsCard extends Component {
    render() {
        // console.log("heelo", this.props)
        // console.log("heelo", this.props.mySpell.spellId)

        return (
            <React.Fragment>
                <div className="mySpells__card">
                    <div className="mySpells__card__content">
                        <Card body inverse style={{ backgroundColor: 'black', borderColor: '#333' }}>
                            <picture>
                                <img className="drawn__image" src={`${this.props.mySpell.image}`} alt="spell" />
                            </picture>
                            <h3 style={{ color: 'white' }}>Notes: <span style={{ color: 'white' }} className="card__mySpell-name">{this.props.mySpell.notes}</span></h3>
                            {/* <p className="card__spellbook-description">Description: {this.props.spell.description}</p> */}
                            <div className="addDelete__buttons">
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
                                <div>
                                    <Link to={`/usespell/${this.props.mySpell.spellId}`}><Button color="dark">Use this spell</Button></Link>
                                </div>
                            </div>
                            <Button color="dark" onClick={() => this.props.deleteMySpell(this.props.mySpell.id)}>Delete This Spell</Button>
                        </Card>
                    </div>
                </div>
            </React.Fragment >
        );
    }
}

export default MySpellsCard;