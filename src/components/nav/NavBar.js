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
        <Navbar className="navBorder" style={{ background: 'black' }} light expand="md">
          <Link className= "navLink" style={{color: 'white'}} to="/">Wizard Skillz</Link>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>
              <NavItem className="navLink">
                <Link className= "link" style={{color: 'white'}} to="/">Home</Link>
              </NavItem>
              <NavItem className="navLink">
                <Link className= "link" style={{color: 'white'}} to="/spellbook">Spell Book</Link>
              </NavItem>
              <NavItem className="navLink">
                <Link className= "link" style={{color: 'white'}} to="/myspells">My Spells</Link>
              </NavItem>
              <NavItem className="navLink">
                <Link className= "link" style={{color: 'white'}} to="/logout">Logout</Link>
              </NavItem>
            </Nav>
          </Collapse>
        </Navbar>
      </div>
    );
  }
}

export default NavBar;