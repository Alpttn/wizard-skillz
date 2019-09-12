/* eslint react/no-multi-comp: 0, react/prop-types: 0 */

import React from 'react';
import { Button, Modal, Input, Form, FormGroup, Label, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import SpellBookManager from "../../modules/SpellBookManager"

class AddMySpellsNotesModal extends React.Component {
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
    }

    // add handle field change to get the value of the textarea notes the user inputs
    handleFieldChange = evt => {
        // whatever we put in the inputs changes the state
        const stateToChange = {};
        stateToChange[evt.target.id] = evt.target.value;
        this.setState(stateToChange);
    };
    
    updateExistingMySpell = evt => {
      evt.preventDefault();
      const editedMySpell = {
        // creates edited task object with the values that we type in inputs
        image: this.state.image,
        notes: this.state.notes,
        userId:  this.state.userId,
        spellId:  this.state.spellId
      };
  
      // invokes edit task function from task list, passes edited object and the id, and then closes modal
      this.props
        .editAddNotesButton(editedMySpell, this.props.mySpell.id)
        .then(() => this.toggle());
    };
    
    componentDidMount() {
        SpellBookManager.getMySpell(this.props.mySpell.id).then(mySpell => {
          this.setState({
            image: mySpell.image,
            notes: mySpell.notes,
            userId: mySpell.userId,
            spellId: mySpell.spellId
          });
        });
      }


    toggle() {
        this.setState(prevState => ({
            modal: !prevState.modal
        }));
    }

    render() {
        return (
            <div>
        <Form inline onSubmit={e => e.preventDefault()}>
          {" "}
          <Button color="primary" onClick={this.toggle}>
            Add Spell Notes
          </Button>
        </Form>
        <Modal
          isOpen={this.state.modal}
          toggle={this.toggle}
          className={this.props.className}
          unmountOnClose={this.state.unmountOnClose}
        >
          <ModalHeader toggle={this.toggle}>Add A Note to Your Spell</ModalHeader>
          <ModalBody>
            {/* put form info */}
            <FormGroup>
          <Label for="exampleText">Write notes here:</Label>
          <Input type="textarea" name="text" id="notes" onChange={this.handleFieldChange}
              value={this.state.notes} />
        </FormGroup>
            {/* <Input
              id="notes"
              type="textarea"
              onChange={this.handleFieldChange}
              value={this.state.notes}
            /> */}
          </ModalBody>
          <ModalFooter>
            {/* put buttons */}
            <Button color="primary" onClick={this.updateExistingMySpell}> 
              Submit Note
            </Button>
            <Button color="secondary" onClick={this.toggle}>
              Cancel
            </Button>
          </ModalFooter>
        </Modal>
      </div>
        );
    }
}

export default AddMySpellsNotesModal;