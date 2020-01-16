import React, { Component } from 'react';
import {
  Row, Col
} from 'reactstrap';

import "./ChangePassword.css";


class ChangePassword extends Component {
  constructor(props) {
    super( props );

    this.state = {
      data: '',
    };
  }

  render() {

    return (
      <div className="user-dashboard">
        <div className="ChangeChange-form">
            <h3>Change Password</h3>
            <form action="#" method="post">
              <Row>
                <Col md="6">
                   <div className="form-group">
                      <label htmlFor="password">New Password</label>
                      <input type="password" name="password" className="form-control" placeholder="Password" />
                   </div>
                </Col>
              </Row>
              <Row>
                <Col md="6">
                   <div className="form-group">
                      <label htmlFor="confirmPassword">Confirm Password</label>
                      <input type="password" name="confirmPassword" className="form-control" placeholder="Confirm Password" />
                   </div>
                </Col>                
              </Row>
              <Row>  
                <Col md="3">
                   <div className="form-group">
                      <button type="submit" className="Submit-form-button">Change Password</button>
                   </div>
                </Col>
             </Row>
         </form>
       </div>
      </div>
    );
  }
}

export default ChangePassword;
