import React, { Component } from 'react';
import {
  Row, Col,
  Card, CardHeader, CardBody
} from 'reactstrap';

import "./MyProfile.css";


class MyProfile extends Component {
  constructor(props) {
    super( props );

    this.state = {
      data: '',
    };
  }

  render() {

    return (
      <div className="user-dashboard">
        <div className="profile-form">
          <h3>My Profile</h3>
          <form action="#" method="post">
             <div className="row">
                <div className="col-md-6">
                   <div className="form-group">
                      <label for="">First Name</label>
                      <input type="text" name="fname" className="form-control" placeholder="First Name" />
                   </div>
                </div>
                <div className="col-md-6">
                   <div className="form-group">
                      <label for="">Last Name</label>
                      <input type="text" name="lname" className="form-control" placeholder="Last Name" />
                   </div>
                </div>
                <div className="col-md-6">
                   <div className="form-group">
                      <label for="">Email address</label>
                      <input type="text" name="email" className="form-control" placeholder="Email address" />
                   </div>
                </div>
                <div className="col-md-6">
                   <div className="form-group">
                      <label for="">Mobile</label>
                      <input type="number" name="phone" className="form-control" placeholder="Mobile No." />
                   </div>
                </div>
                <div className="col-md-6">
                   <div className="form-group">
                      <label for="">Password</label>
                      <input type="password" name="password" className="form-control" placeholder="Password" />
                   </div>
                </div>

                <div className="col-md-6">
                   <div className="form-group">
                      <label for="">Confirm Password</label>
                      <input type="password" name="Cpassword" className="form-control" placeholder="Confirm Password" />
                   </div>
                </div>

                <div className="col-md-12">
                   <div className="form-group">
                      <label for="">Organization Name</label>
                      <input type="text" name="organizationname" className="form-control" placeholder="Organization Name" />
                   </div>
                </div>

                <div className="col-md-12">
                   <div className="form-group">
                      <label for="">Address 1</label>
                      <input type="text" name="Address" className="form-control" placeholder="Organization Name" />
                   </div>
                </div>

                <div className="col-md-12">
                   <div className="form-group">
                      <label for="">Address 2</label>
                      <input type="text" name="Address" className="form-control" placeholder="Organization Name" />
                   </div>
                </div>
                
                <div className="col-md-6">
                   <div className="form-group">
                      <button type="submit" className="Submit-form-button">Sign Up</button>
                   </div>
                </div>
             </div>
         </form>
       </div>
      </div>
    );
  }
}

export default MyProfile;
