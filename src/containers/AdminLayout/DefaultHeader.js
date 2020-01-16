import React, { Component } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Badge, UncontrolledDropdown, DropdownItem, DropdownMenu, DropdownToggle, Nav, NavItem } from 'reactstrap';
import PropTypes from 'prop-types';

import { AppNavbarBrand, AppSidebarToggler } from '@coreui/react';
import logo from './../../assets/images/logo.svg';
import sygnet from './../../assets/images/logo.svg';
import UserAvtar from '../UserLayout/UserAvtar'


const propTypes = {
  children: PropTypes.node,
};

const defaultProps = {};

class DefaultHeader extends Component {
  render() {

    // eslint-disable-next-line
    const { children, ...attributes } = this.props;

    return (
      <React.Fragment>
        <AppSidebarToggler className="d-lg-none" display="md" mobile />
        <AppNavbarBrand
          full={{ src: logo, width: 88, height: 40, alt: 'Construction Logo' }}
          minimized={{ src: sygnet, width: 30, height: 30, alt: 'Construction Logo' }}
        />
        <AppSidebarToggler className="d-md-down-none" display="lg" />

        
        <Nav className="ml-auto" navbar>
          <NavItem className="d-md-down-none mr-2">
            <NavLink to="#" className="nav-link"><i className="icon-bell"></i><Badge pill color="danger">0</Badge></NavLink>
          </NavItem>
          <NavItem className="d-md-down-none dropdown">
            <NavLink to="#" className="nav-link">
              <i className="icon-envelope-letter"></i><Badge pill color="info">20</Badge>
            </NavLink>
          </NavItem>          
          <UncontrolledDropdown nav direction="down">
            <DropdownToggle nav>
              <div className="admin-avatar"><UserAvtar /></div>
            </DropdownToggle>
            <DropdownMenu right>
              <DropdownItem header tag="div" className="text-center"><strong>My Account</strong></DropdownItem>
              <DropdownItem><i className="fa fa-user"></i>My Profile</DropdownItem>
              <DropdownItem><Link to="/admin/change-password" className="profileDropDownLink"><i className="fa fa-lock"></i> Change Password</Link></DropdownItem>
              <DropdownItem onClick={e => this.props.onLogout(e)}><i className="fa fa-lock"></i> Logout</DropdownItem>
            </DropdownMenu>
          </UncontrolledDropdown>
        </Nav>
        
      </React.Fragment>
    );
  }
}

DefaultHeader.propTypes = propTypes;
DefaultHeader.defaultProps = defaultProps;

export default DefaultHeader;
