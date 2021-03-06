import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import { Navbar, Collapse, Nav, NavItem} from 'reactstrap';

import './UserNavbar.css';


class UserNavbar extends Component {

  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: true,
      activeTab: '1',
      isLoggedOut: false,
    };
  }

  toggle(tab) {
    if (this.state.activeTab !== tab) {
      this.setState({
        isOpen: true,
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
      <div className="user-navbar">
        <Navbar className="" expand="md">
        <Collapse isOpen={this.state.isOpen} navbar>
          <Nav navbar className="user-widget-list">
          { localStorage.getItem( 'isOrganization' ) === "true" && <>
            <NavItem>
              <Link to="/user/dashboard" className="nav-link">
                <span className="icon-orders"><img src="/images/dashboard.svg" height="20" alt="Dashboard" /></span>
                <span className="value-orders">Dashboard</span>
              </Link>
            </NavItem>
            <NavItem>
              <Link to="/user/my-listings" className="nav-link">
                <span className="icon-orders"><img src="/images/food-truck-icon.png" height="20" alt="My Listing" /></span>
                <span className="value-orders">My Listings</span>
              </Link>
            </NavItem>
            <NavItem>
              <Link to="/user/inquiries" className="nav-link">
                <span className="icon-orders"><img src="/images/message-icon.png" height="20" alt="Inquiries" /></span>
                <span className="value-orders">Inquiries</span>
              </Link>
            </NavItem>
            <NavItem>
              <Link to="/user/reviews" className="nav-link">
                <span className="icon-orders"><img src="/images/review-icon.png" height="20" alt="Reviews" /></span>
                <span className="value-orders">Reviews</span>
              </Link>
            </NavItem>
          </>
          }

          { localStorage.getItem( 'isAdvertiser' )=== "true" && <>  
            <NavItem>
              <Link to="/advertiser/ads" className="nav-link">
                <span className="icon-orders"><img src="/images/advertisment.png" height="20" alt="Advertisment" /></span>
                <span className="value-orders">My Advertisment</span>
              </Link>
            </NavItem>
          </>
          }
          
            <NavItem>
              <Link to={ localStorage.getItem('isOrganization')=== "true" ? "/user/transactions" : "/advertiser/transactions" } className="nav-link">
                <span className="icon-orders"><img src="/images/subscription.svg" height="20" alt="Subscription" /></span>
                <span className="value-orders">My Subscription</span>
              </Link>
            </NavItem>
          
          { localStorage.getItem( 'isOrganization' )=== "true" && <>  
            <NavItem>
              <Link to="/user/my-profile" className="nav-link">
                <span className="icon-orders"><img src="/images/user-icon.svg" height="20" alt="My Profile" /></span>
                <span className="value-orders">My Profile</span>
              </Link>
            </NavItem>
          </>
          } 
          
          {  localStorage.getItem( 'isOrganization' )=== "false" && <>  
            <NavItem>
              <Link to="/advertiser/profile" className="nav-link">
                <span className="icon-orders"><img src="/images/user-icon.svg" height="20" alt="My Profile" /></span>
                <span className="value-orders">My Profile</span>
              </Link>
            </NavItem>
            </>
            }

          </Nav>
          </Collapse>
        </Navbar>
    </div>
    );
  }
}

export default UserNavbar;
