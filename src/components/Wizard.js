import React, { Component } from "react"
import NavBar from "./nav/NavBar"
import ApplicationViews from "./ApplicationViews"
// may need wizard.css

class Wizard extends Component {
  render() {
    return (
      <>
      <React.Fragment>
        <NavBar />
        <ApplicationViews />
        <h1>Wizard Skillz</h1>
        <h3>Begin</h3>
        </React.Fragment>
      </>
    )
  }
}

export default Wizard