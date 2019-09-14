import React, { Component } from 'react';
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
        <Navbar color="dark" light expand="md">
          <NavbarBrand style={{color: 'yellow'}} href="/">Wizard Skillz</NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>
              <NavItem>
                <NavLink style={{color: 'yellow'}} className="navLink" href="/">Home</NavLink>
              </NavItem>
              <NavItem>
                <NavLink style={{color: 'white'}} href="/spellbook">Spell Book</NavLink>
              </NavItem>
              <NavItem>
                <NavLink style={{color: 'white'}} href="/myspells">My Spells</NavLink>
              </NavItem>
              <NavItem>
                <NavLink style={{color: 'white'}} href="/logout">Logout</NavLink>
              </NavItem>
            </Nav>
          </Collapse>
        </Navbar>
      </div>
    );
  }
}

export default NavBar;