import React, { Component } from 'react';
import { Row, Col, Form, Input } from 'reactstrap';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import commonService from '../../../core/services/commonService';
import { FormErrors } from '../../Formerrors/Formerrors';
import Loader from '../../Loader/Loader';

import "./ChangePassword.css";

class ChangePassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
        formField: { oldPassword: '', newPassword: '', confirmPassword:'' },
        formErrors: { oldPassword: '', newPassword: '', confirmPassword:'', error: ''},
        formValid: false,
        loading: false
    };
    this.submitHandler = this.submitHandler.bind(this);
    this.changeHandler = this.changeHandler.bind(this);

  }

  /* Submit Form Handler */
  submitHandler (event) {
    event.preventDefault();
    //event.target.className += " was-validated";
    if (this.validateForm()) {
      this.setState( { loading: true}, () => {
        const formInputField = this.state.formField;
        const formData = {
          "oldPassword": formInputField.oldPassword,
          "newPassword": formInputField.newPassword, 
        };
        commonService.postAPIWithAccessToken('auth/change-password', formData)
          .then( res => {
            if ( undefined === res.data.data || !res.data.status ) {
              
              this.setState( { loading: false} );
              toast.error(res.data.message);
              return;
            }
            this.props.history.push('/login');
            this.setState({ loading: false});
            toast.success(res.data.message);
            localStorage.clear();
          } )
          .catch( err => {         
            if(err.response !== undefined && err.response.status === 401) {
              localStorage.clear();
              this.props.history.push('/login');
            }
            else
              this.setState( { loading: false } );
              toast.error(err.message);
          } )
      } );
    }else{ console.log('Outside validation'); }
  };

  /* Input Field On changes*/
  changeHandler = event => {
    const name = event.target.name;
    const value = event.target.value;
    const formField = this.state.formField
    formField[name] = value;
    this.setState({ formField: formField },
                  () => { this.validateField(name, value) });

    console.log(this.state.formValid);
  };

  /* Validate Form Field */
  validateField(fieldName, value) {
    let fieldValidationErrors = this.state.formErrors;
    fieldValidationErrors.error = '';
 
    switch(fieldName) {         
      case 'oldPassword':        
        fieldValidationErrors.oldPassword = (value !== '') ? '' : ' is required';
        break;
      case 'newPassword':        
        fieldValidationErrors.newPassword = (value !== '') ? '' : ' is required';
        break;               
      case 'confirmPassword':        
        fieldValidationErrors.confirmPassword = (value !== '') ? '' : ' is required';
        break;               
      default:
        break;
    }
    this.setState({formErrors: fieldValidationErrors,       
    }, this.validateForm);
  }
  /* Validate Form */
  validateForm() {
    const formErrors = this.state.formErrors;
    const formField = this.state.formField;
    this.setState({formValid: 
    ( formErrors.oldPassword === "" && formErrors.newPassword === "" && formErrors.confirmPassword === "" && formField.oldPassword !== ""  && formField.newPassword !== "" && formField.confirmPassword !== "" && (formField.newPassword === formField.confirmPassword)  ) 
    ? true : false});
    return true;
  }
 /* Set Error Class*/
  errorClass(error) {
    return(error.length === 0 ? '' : 'has-error');
  }

    

  render() {
    const { loading } = this.state;
    let loaderElement = '';
    if(loading)
      loaderElement = <Loader />

    return (
      <div className="user-dashboard">
        <ToastContainer />
        {loaderElement}
        <div className="ChangeChange-form">
            <h3>Change Password</h3>
            <FormErrors formErrors={this.state.formErrors} />
            <Form onSubmit={this.submitHandler} noValidate>
              <Row>
                <Col md="6">
                   <div className="form-group">
                      <label htmlFor="oldPassword">Old Password</label>
                      <Input type="password" name="oldPassword" id="oldPassword" className="form-control" placeholder="Old Password" value={this.state.formField.oldPassword} onChange={this.changeHandler} required />
                   </div>
                </Col>
              </Row>
              <Row>
                <Col md="6">
                   <div className="form-group">
                      <label htmlFor="newPassword">New Password</label>
                      <input type="password" name="newPassword" className="form-control" id="newPassword" placeholder="New Password" value={this.state.formField.newPassword} onChange={this.changeHandler} required />
                   </div>
                </Col>
              </Row>
              <Row>
                <Col md="6">
                   <div className="form-group">
                      <label htmlFor="confirmPassword">Confirm Password</label>
                      <input type="password" name="confirmPassword" className="form-control" placeholder="Confirm Password" value={this.state.formField.confirmPassword} onChange={this.changeHandler} required />
                   </div>
                </Col>                
              </Row>
              <Row>  
                <Col md="3">
                   <div className="form-group">
                      <button type="submit"  disabled={!this.state.formValid} className="Submit-form-button btn btn-primary">Change Password</button>
                   </div>
                </Col>
             </Row>
         </Form>
       </div>
      </div>
    );
  }
}

export default ChangePassword;
