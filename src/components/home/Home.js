import React, { Component } from 'react'
import { Link } from "react-router-dom";
import { Button } from 'reactstrap';
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
        <div className="about__content--second">
          <h3>Click the button below to practice your wand skills. </h3>
        </div>
        <div className="begin__button">
        <Link to={`/spellbook`}><Button outline color="warning">I solemly swear I am up to no good</Button></Link>
        </div>
      </div>
    )
  }
}

export default Home