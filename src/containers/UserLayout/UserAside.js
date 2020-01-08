import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import { Nav, NavItem} from 'reactstrap';

import './UserLayout.css';

class UserAside extends Component {

  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      activeTab: '1',
      isLoggedOut: false,
    };
  }

  toggle(tab) {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab,
      });
    }
  }
  logoutUser() {
    localStorage.clear();
      this.setState({isLoggedOut:true});
  };

  render() {

    return (
      <div className="user-sidebar">
        <div className="user-widget-info">
          <div className="user-profile-info-media">
            <img src="/images/avatar.jpg" alt="profile" />
          </div>
          <div className="user-profile-info-content">
            <h2>John Doe</h2>
            <h4 className="locality">John.Doe@gmail.com</h4>	
          </div>
        </div>
        <div className="user-widget-info">
          <Nav vertical className="user-widget-list">
            <NavItem>
              <Link to="/user/dashboard">
                <span className="icon-orders"><img src="/images/dashboard.svg" height="20" alt="Dashboard" /></span>
                <span className="value-orders">Dashboard</span>
              </Link>
            </NavItem>
            <NavItem>
              <Link to="/user/my-account">
                <span className="icon-orders"><img src="/images/user-icon.svg" height="20" alt="My Profile" /></span>
                <span className="value-orders">My Profile</span>
              </Link>
            </NavItem>
            <NavItem>
              <Link to="/user/my-account">
                <span className="icon-orders"><img src="/images/shopcard.svg" height="20" alt="Orders" /></span>
                <span className="value-orders">Orders</span>
              </Link>
            </NavItem>
            <NavItem>
              <Link to="/user/my-account">
                <span className="icon-orders"><img src="/images/cards.svg" height="20" alt="My Account" /></span>
                <span className="value-orders">Payment</span>
              </Link>
            </NavItem>
            <NavItem>
              <Link to= "/" onClick={() => this.logoutUser()}>
                <span className="icon-orders"><img src="/images/logout.svg" height="20" alt="My Account" /></span>
                <span className="value-orders">Logout</span>
              </Link>
            </NavItem>
          </Nav>
        </div>
    </div>
    );
  }
}

export default UserAside;
