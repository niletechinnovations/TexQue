import React, { Component } from 'react';
import {
  Row, Col,
  Card, CardHeader, CardBody
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
          <h3>Change Change</h3>
          <form action="#" method="post">
             <div className="row">
                <div className="col-md-6">
                   <div className="form-group">
                      <label for="">New Password</label>
                      <input type="password" name="password" className="form-control" placeholder="Password" />
                   </div>
                </div>

                <div className="col-md-6">
                   <div className="form-group">
                      <label for="">Confirm Password</label>
                      <input type="password" name="Cpassword" className="form-control" placeholder="Confirm Password" />
                   </div>
                </div>

                
                
                <div className="col-md-3">
                   <div className="form-group">
                      <button type="submit" className="Submit-form-button">Change Password</button>
                   </div>
                </div>
             </div>
         </form>
       </div>
      </div>
    );
  }
}

export default ChangePassword;
