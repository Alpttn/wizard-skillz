import React, { Component } from 'react';
import { Link } from "react-router-dom";
import './NavBar.css'

// import './NavBar.css'

// reactstrap code
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
   } from 'reactstrap';

class NavBar extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false
    };
  }
  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }
  render() {
    return (
      <div>
        <Navbar color="black" light expand="md">
          <NavbarBrand style={{color: '#A3CEF9'}} href="/">Wizard Skillz</NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>
              <NavItem>
                <Link style={{color: '#A3CEF9'}} className="navLink" to="/">Home</Link>
              </NavItem>
              <NavItem>
                <Link style={{color: 'white'}} to="/spellbook">Spell Book</Link>
              </NavItem>
              <NavItem>
                <Link style={{color: 'white'}} to="/myspells">My Spells</Link>
              </NavItem>
              <NavItem>
                <Link style={{color: 'white'}} to="/logout">Logout</Link>
              </NavItem>
            </Nav>
          </Collapse>
        </Navbar>
      </div>
    );
  }
}

export default NavBar;