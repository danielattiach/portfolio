import React from 'react'
import {
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem } from 'reactstrap';
import GoogleIcon from '../../img/google-icon.png';
import GitHubIcon from '../../img/github-icon.png';

export default () => {
  return (
    <div>
      <UncontrolledDropdown nav inNavbar>
        <DropdownToggle nav caret>
          Login
        </DropdownToggle>
        <DropdownMenu right>
          <DropdownItem>
            <NavLink href='/auth/google'> <img alt="google-icon" src={GoogleIcon} width={24}/> Google </NavLink>
          </DropdownItem>
          <DropdownItem>
          <NavLink href='/auth/github'> <img alt="github-icon" src={GitHubIcon} width={24}/> GitHub </NavLink>
          </DropdownItem>
        </DropdownMenu>
      </UncontrolledDropdown>
    </div>
  )
}
