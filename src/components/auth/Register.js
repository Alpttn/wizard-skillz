// need to fix
import React, { Component } from "react";
import Authentication from "../../modules/AuthenticationManager";

class Register extends Component {
  // Set initial state
  state = {
    username: "",
    password: ""
  };

  // Update state whenever an input field is edited
  handleFieldChange = evt => {
    const stateToChange = {};
    stateToChange[evt.target.id] = evt.target.value;
    this.setState(stateToChange);
  };

  // checks to see if new username is in database

  handleRegister = e => {
    e.preventDefault(); //prevents page from reloading

    // if username and password input fields are blank then alert user to fill out username and password
    if (this.state.username === "" || this.state.password === "") {
      window.alert("Please fill out a username and password.");
    } else {
      Authentication.checkUsername(this.state.username).then(usersArray => {
        // call checkusername function from authentication manager pass username from input field as parameter. this will return an array called usersArray
        if (usersArray.length > 0) {
          // check to see if there's a user in the array. if there is alert the user that username is taken.
          window.alert("Username already exists.");
        } else {
          // if usersArray is less than 0. (there's not an existing username)
          const newUserObj = {
            // create newUserObj
            username: this.state.username, // username from input field in state
            password: this.state.password // password from input field in state
          };
          Authentication.postNewUser(newUserObj).then(userObj => {
            // invoke postNewUser fetch (POST method),
            // pass newUserObj as argument. a userObj is returned
            sessionStorage.setItem("activeUser", JSON.stringify(userObj.id)); // stores new user id to session storage (mimics login)
            this.props.history.push("/"); // re directs user to /home with succesful registration
          });
        }
      });
    }
  };

  render() {
    return (
      <form onSubmit={this.handleRegister}>
        <fieldset>
          <h3>Please Register</h3>
          <div className="RegisterForms">
            <input
              onChange={this.handleFieldChange}
              type="email"
              id="username"
              placeholder="Email address"
              required=""
              autoFocus=""
            />
            <label htmlFor="inputEmail">Email address</label>

            <input
              onChange={this.handleFieldChange}
              type="password"
              id="password"
              placeholder="Password"
              required=""
            />
            <label htmlFor="inputPassword">Password</label>
          </div>
          <button type="submit">Register</button>
        </fieldset>
      </form>
    );
  }
}

export default Register;