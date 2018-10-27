import React from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink } from 'reactstrap';
import { connect } from 'react-redux';
import { getAcc } from '../actions/authActions';
import Logo from '../img/logo-icon.png'
import LoginButton from './LoginButton';

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
      <div className="shadow-sm bg-white rounded fixed-top">
        <Navbar color="light" light expand="md">
          <NavbarBrand href="/"><img alt="logo" src={Logo} width={24} style={{"marginRight": 10, "marginBottom": 7}}/>Portfolio</NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>
              <NavItem>
                <NavLink href="/contact">Contact</NavLink>
              </NavItem>
              {this.props.isAuthenticated ? <NavItem><NavLink href="/profile">Profile</NavLink></NavItem> : null}
              {this.props.isAuthenticated ? <NavItem><NavLink href="/auth/logout">Log Out</NavLink></NavItem> : <LoginButton />}
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
    isAuthenticated: state.auth.isAuthenticated,
    isAdmin: state.auth.isAdmin
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(NavigationBar);
