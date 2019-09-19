// need to fix
import React, { Component } from "react";
import { Link } from "react-router-dom";
import Authentication from "../../modules/AuthenticationManager";


//potato
class Login extends Component {
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
//check to see if there is a user, then iterates over the array. If there is a user set that user in session storage
  handleLogin = e => {
    e.preventDefault();
    console.log(Authentication);
    Authentication.checkUser(this.state.username, this.state.password).then(
      userArray => {
        if (userArray.length > 0) {
          sessionStorage.setItem("activeUser", JSON.stringify(userArray[0].id));
          this.props.history.push("/"); 
        } else {
          alert("Invalid username or password");
        }
      }
    );
  };

  render() {
    return (
      <form onSubmit={this.handleLogin}>
        <fieldset>
          <h3>Please Login</h3>
          <div className="login__form">
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
          <button type="submit">Login</button>

          <Link to={`/register`}>
            <button>New User?</button>
          </Link>
        </fieldset>
      </form>
    );
  }
}

export default Login;