import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import { Nav, NavItem} from 'reactstrap';
import UserAvtar from "./UserAvtar";

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
            {/* <img src="/images/avatar.jpg" alt="profile" /> */}
            <UserAvtar />
          </div>
          <div className="user-profile-info-content">
            <h2>{localStorage.getItem( 'userName' )}</h2>
            <h4 className="locality">{localStorage.getItem( 'userEmail' )}</h4>	
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
              <Link to="/user/my-listings">
                <span className="icon-orders"><img src="/images/food-truck-icon.png" height="20" alt="My Listing" /></span>
                <span className="value-orders">My Listings</span>
              </Link>
            </NavItem>
            <NavItem>
              <Link to="/user/enquiries">
                <span className="icon-orders"><img src="/images/message-icon.png" height="20" alt="Enquiries" /></span>
                <span className="value-orders">Enquiries</span>
              </Link>
            </NavItem>
            <NavItem>
              <Link to="/user/reviews">
                <span className="icon-orders"><img src="/images/review-icon.png" height="20" alt="Enquiries" /></span>
                <span className="value-orders">Reviews</span>
              </Link>
            </NavItem>
            <NavItem>
              <Link to="/user/my-profile">
                <span className="icon-orders"><img src="/images/user-icon.svg" height="20" alt="My Profile" /></span>
                <span className="value-orders">My Profile</span>
              </Link>
            </NavItem>
            <NavItem>
              <Link to="/user/change-password">
                <span className="icon-orders"><img src="/images/lock-icon.png" height="20" alt="Change Password" /></span>
                <span className="value-orders">Change Password</span>
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
