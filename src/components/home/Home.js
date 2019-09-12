import React, { Component } from 'react'
import './Home.css'

class Home extends Component {
  render() {
    return (
      <div className="backgroundHome">
        <div className="welcome__content">
          <h1>Welcome to Wizard Skillz</h1>
        </div>
        <div className="about__content">
          <h3>Become a master wizard in no time</h3>
        </div>
        <div className="begin__button">
          <h3>Begin</h3>
        </div>
      </div>
    )
  }
}

export default Home