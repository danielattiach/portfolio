import React from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem } from 'reactstrap';
import { connect } from 'react-redux';
import { getAcc } from '../actions/authActions';

import GoogleIcon from '../img/google-icon.png';
import GitHubIcon from '../img/github-icon.png';
import Logo from '../img/logo-icon.png'

class NavigationBar extends React.Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false,
      name: ""
    };
  }
  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  async componentDidMount() {
    const thing = await fetch('/auth/current');
    const user = await thing.json();
    this.props.getAccount(user);
  }

  render() {
    return (
      <div>
        <Navbar color="light" light expand="md">
          <NavbarBrand href="/"><img src={Logo} width={24} style={{"marginRight": 10, "marginBottom": 10}}/>Portfolio</NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>
              <NavItem>
                <NavLink href="/">Home</NavLink>
              </NavItem>
              {this.props.isAuthenticated ? <NavItem><NavLink href="/profile">Profile</NavLink></NavItem> : null}
              <UncontrolledDropdown nav inNavbar>
                <DropdownToggle nav caret>
                  Login
                </DropdownToggle>
                <DropdownMenu right>
                  <DropdownItem>
                    <NavLink href='/auth/google'> <img src={GoogleIcon} width={24}/> Google </NavLink>
                  </DropdownItem>
                  <DropdownItem>
                  <NavLink href='/auth/github'> <img src={GitHubIcon} width={24}/> GitHub </NavLink>
                  </DropdownItem>
                  {
                    this.props.isAuthenticated ? <div><DropdownItem divider /><DropdownItem><NavLink href='/auth/logout'>Log Out</NavLink></DropdownItem></div> : null
                  }
                </DropdownMenu>
              </UncontrolledDropdown>
            </Nav>
          </Collapse>
        </Navbar>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
      getAccount : (data) => dispatch(getAcc(data))
  }
};

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.auth.isAuthenticated
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(NavigationBar);
