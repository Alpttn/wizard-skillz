import React, { Component } from "react";
import { Jumbotron, Button } from 'reactstrap';
import { Link } from "react-router-dom";


class Login extends Component {

    logOut = (event) => {
        sessionStorage.removeItem("activeUser")
        this.props.history.push("/")
      }

  render() {
    return (
        <div>
        <Jumbotron>
          <h1 className="display-3">PortKey to MuggleLand!</h1>
          <p className="lead">You want to leave?</p>
          <hr className="my-2" />
          <p>Please cast spells responsibly</p>
          <p className="lead">
            <Button color="primary" onClick={this.logOut}>Mischief Managed</Button>
            <Link to={`/spellbook`}><Button color="warning">Back to Spell Book</Button></Link>
          </p>
        </Jumbotron>
      </div>
    );
  };
};

export default Login;