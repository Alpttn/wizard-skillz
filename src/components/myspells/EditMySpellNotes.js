import React from 'react';
import { Button, Modal, Input, FormGroup, Label, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import SpellBookManager from "../../modules/SpellBookManager"
import './EditMySpellNotes.css'

class EditMySpellNotes extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            modal: false,
            image: "",
            notes: "",
            userId: "",
            spellId: ""
        };

        this.toggle = this.toggle.bind(this);
    };

    handleFieldChange = evt => {
        // whatever I put in the input changes the state
        const stateToChange = {};
        stateToChange[evt.target.id] = evt.target.value;
        this.setState(stateToChange);
    };

    updateExistingNote = evt => {
        evt.preventDefault();
        const editedNote = {
            // creates edited spell object with the values that I type in inputs
            image: this.state.image,
            notes: this.state.notes,
            userId: this.state.userId,
            spellId: this.state.spellId
        };
        this.props
            .editMySpellNote(editedNote, this.props.mySpell.id)
            .then(() => this.toggle());
    };

    getMySpell = () => {
        return SpellBookManager.getMySpell(this.props.mySpell.id).then(mySpell => {
            this.setState({
                image: mySpell.image,
                notes: mySpell.notes,
                userId: mySpell.userId,
                spellId: mySpell.spellId
            });
        });
    }

    componentDidMount() {
        this.getMySpell()
    }

    // look for props and if they are different then update state
    componentDidUpdate(preProps, prevState) {
        if (preProps.mySpell !== this.props.mySpell) {
            this.getMySpell()
        }
    }

    toggle() {
        this.setState(prevState => ({
            modal: !prevState.modal
        }));
    }

    render() {
        return (
            <div>
                <Button color="primary" onClick={this.toggle}>Edit Spell Notes</Button>
                <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
                    <ModalHeader toggle={this.toggle} charCode={<i class="icon-foo">&#xf0e7</i>}>Edit Spell Notes</ModalHeader>
                    <ModalBody>
                        <FormGroup>
                            <Label for="exampleText">Change notes here:</Label>
                            <Input type="textarea" name="text" id="notes" onChange={this.handleFieldChange}
                                value={this.state.notes} />
                        </FormGroup>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" onClick={this.updateExistingNote}>Save Note</Button>
                        <Button color="secondary" onClick={this.toggle}>Cancel</Button>
                    </ModalFooter>
                </Modal>
            </div>
        );
    }
}

export default EditMySpellNotes;