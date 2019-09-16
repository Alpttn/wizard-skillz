/* eslint react/no-multi-comp: 0, react/prop-types: 0 */

import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
const Deepai = require("deepai")

class CompareMySpellsModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            modal: false
        };

        this.toggle = this.toggle.bind(this);
    }

    toggle() {
        this.setState(prevState => ({
            modal: !prevState.modal
        }));
    }

    //   Here is where I am messing around with the Deepai external API image comparison

    // an async function returns a promise. the values are wrapped in a resolved promise
    test = async () => {
        Deepai.setApiKey("quickstart-QUdJIGlzIGNvbWluZy4uLi4K");
        const resp = await Deepai.callStandardApi("image-similarity", {
            image1: "YOUR_IMAGE_URL", // this.state.mySpell.image ???
            image2: "YOUR_IMAGE_URL", //  image2: fs.createReadStream("/images/.jpg"),
        });
        console.log(resp);
    };



    render() {
        return (
            <div>
                <Button color="warning" onClick={this.test}>Compare This Spell</Button>
                <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
                    <ModalHeader toggle={this.toggle} charCode="Y">Results</ModalHeader>
                    <ModalBody className="yourResultContainerId">
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
          </ModalBody>
                    <ModalFooter>
                        <Button color="primary" onClick={this.toggle}>Do Something</Button>{' '}
                        <Button color="secondary" onClick={this.toggle}>Cancel</Button>
                    </ModalFooter>
                </Modal>
            </div>
        );
    }
}

export default CompareMySpellsModal;

