import React, { Component } from 'react'
import { Button, Modal, Input, Form, FormGroup, Label, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import './Home.css'

class Home extends Component {
  render() {
    return (
      <div className="backgroundHome">
        <div className="welcome__content">
          <h1>Welcome to WizardSkillz</h1>
        </div>
        <div className="about__content">
          <h3>Did you just get your acceptance letter to Hogwarts? </h3>
        </div>
        <div className="begin__button">
        <Button outline color="warning">Practice those wand skills!</Button>{' '}
        </div>
      </div>
    )
  }
}

export default Home