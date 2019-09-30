import React, { Component } from 'react'
import { Link } from "react-router-dom";
import { Button } from 'reactstrap';
import './Home.css'

//this component holds the homepage

class Home extends Component {
  render() {
    return (
      <div className="backgroundHome">
        <div className="welcome__content">
          <h1>WizardSkillz</h1>
        </div>
        <div className="about__content">
          <p>Falling behind in your classes at Hogwarts and need to level up?  </p>
        </div>
        <div className="about__content--second">
          <p>Click the button below to begin practicing your spell casting skills </p>
        </div>
        <div className="begin__button">
        <Link to={`/spellbook`}><Button outline color="dark">I solemly swear I am up to no good</Button></Link>
        </div>
      </div>
    )
  }
}

export default Home