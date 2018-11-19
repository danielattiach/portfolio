import React, {useState} from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink } from 'reactstrap';
import Logo from '../img/logo-icon.png'
import LoginButton from './LoginButton';
export default function NavigationBar({state}) {

  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => {
    setIsOpen(!isOpen);
  }

  return (
    <div className="shadow-sm bg-white rounded fixed-top">
      <Navbar color="light" light expand="md">
        <NavbarBrand href="/"><img alt="logo" src={Logo} width={24} style={{"marginRight": 10, "marginBottom": 7}}/>Portfolio</NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="ml-auto" navbar>
          <NavItem>
              <NavLink href="/music">Music</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="/about">About</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="/contact">Contact</NavLink>
            </NavItem>
            {state.isAuthenticated ? <NavItem><NavLink href="/profile">Profile</NavLink></NavItem> : null}
            {state.isAuthenticated ? <NavItem><NavLink href="/auth/logout">Log Out</NavLink></NavItem> : <LoginButton />}
          </Nav>
        </Collapse>
      </Navbar>
    </div>
  );
}
