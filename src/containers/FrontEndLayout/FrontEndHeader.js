import React from 'react';
import {Link} from 'react-router-dom';
import logo from "../../assets/images/logo.svg";
import { Collapse, Navbar, NavbarToggler, Nav, NavItem, Dropdown, DropdownItem, DropdownToggle, DropdownMenu } from 'reactstrap';

import commonService from '../../core/services/commonService';
import './FrontEndHeader.css';

class FrontEndHeader extends React.Component {
  constructor(props){
      super(props);
      this.state = {
        collapseID: false,
        isLoggedOut: false,
        toggleActive: false,
        dropdownOpen: false,
        setDropdownOpen: false
      }
    this.onToggle = this.onToggle.bind(this);
    this.toggleUserMenu = this.toggleUserMenu.bind(this);

  }
  onToggle() {
    this.setState({ toggleActive: !this.state.toggleActive });
  }
  
  logoutUser() {
    localStorage.clear();
    this.setState({isLoggedOut:true});
  };

  toggleUserMenu = () => {
    this.setState({ dropdownOpen: !this.state.dropdownOpen });
  }


  render(){
   
    let  headerItem = '';
    if(commonService.getAuth()) {
      headerItem = <>
      <Dropdown nav isOpen={this.state.dropdownOpen} toggle={this.toggleUserMenu} className="user-menu">
        <DropdownToggle nav caret>
          <div className="user-name"><span><img src="/images/avatar.jpg" alt="" /></span>Hi, {localStorage.getItem( 'userName' )}!</div>
        </DropdownToggle>
        <DropdownMenu>
          <DropdownItem><Link to="/user/profile"><i className="fa fa-user"></i> My Profile</Link></DropdownItem>
          <DropdownItem><Link to="/user/my-listings"><i className="fa fa-list-ul"></i> My Listings</Link></DropdownItem>
          <DropdownItem><Link to="/user/change-password"><i className="fa fa-key"></i> Change Password</Link></DropdownItem>
          <DropdownItem><Link to= "/" onClick={() => this.logoutUser()}><i className="fa fa-sign-out"></i> Log Out</Link></DropdownItem>
        </DropdownMenu>
      </Dropdown>
      
      </>
      }
      else {
      headerItem = <>
        <NavItem>
          <Link className="nav-link btn-header-white" to="/login">Login</Link>
        </NavItem>
        <NavItem>
          <Link className="nav-link btn-Get" to="/register">Get started for FREE</Link>
        </NavItem>
      </>
    }

    

    return (
      <div className="header">
        <div className="container">
          <div className="header-navigation">
            <Navbar expand="lg">
              <Link className="navbar-brand" to="/">
                <img alt="Logo" className="logo" src={logo}/>
              </Link>
              <NavbarToggler onClick={this.onToggle} />
              <Collapse isOpen={this.state.toggleActive} navbar>
                <Nav className="navbar-navigation ml-auto" navbar>
                  <NavItem>
                    <Link className="nav-link" to="/about-us">About Us</Link>
                  </NavItem>
                  <NavItem>
                    <Link className="nav-link" to="/blog">Blog</Link>
                  </NavItem>
                  <NavItem>
                    <Link className="nav-link" to="/contact-us">Contact Us</Link>
                  </NavItem>

                  {headerItem}

                </Nav>
              </Collapse>
            </Navbar>
          </div>
        </div>  
      </div>
    )
  };
}

export default FrontEndHeader;