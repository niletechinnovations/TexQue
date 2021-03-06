import React from "react";
import  { Link } from 'react-router-dom';
import { Col, Row, Button, Form, FormGroup,FormFeedback, Label, Input } from 'reactstrap';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import commenService from '../../../core/services/commonService';
import Loader from '../../../views/Loader/Loader';
import AutoCompletePlaces from '../../../core/google-map/AutoCompletePlaces';

import "../Login/loginPage.css";

import VerifyOtp from './VerifyOtp';

class RegisterPage extends React.Component {
  constructor( props ){
    super( props );

    this.state = {
      firstName: '',
      lastName: "",
      email: '',
      phoneNumber:'',
      password: '',
      confirmPassword: '',
      organizationName: '',
      address: '',
      latitude:'',
      longitude:'',
      loading: false,
      isRegistered: false,
      errors: {}
    };

    this.changeHandler = this.changeHandler.bind(this);
    this.submituserRegistrationForm = this.submituserRegistrationForm.bind(this);
    this.setLatitudeLongitude = this.setLatitudeLongitude.bind(this);
  }

  componentDidMount() {
    window.scrollTo(0, 0);
  }
  
  submituserRegistrationForm(e) {
    e.preventDefault();
    e.target.className += " was-validated";
      let addressError = {};
      if(this.state.address===''){
        addressError['address'] = 'Please filld your business adress!';
        this.setState( { errors:addressError } );
        toast.error('Address field should not be empty!');
        return;
      }else{
        let addressError = {};
        addressError['address'] = '';
        this.setState( { errors:addressError } );
      }
    
      if (this.validateForm()) {
        const signupData = {
          firstName: this.state.firstName,
          lastName: this.state.lastName,
          email: this.state.email.toLowerCase(),
          phoneNumber: this.state.phoneNumber,
          password: this.state.password,
          organizationName: this.state.organizationName,
          address: this.state.address,
          latitude: this.state.latitude,
          longitude: this.state.longitude,
          role: 'organization'
        };

        if( localStorage.getItem( 'choosedPlanId' ) ){
          signupData['planId'] = localStorage.getItem( 'choosedPlanId' );
          signupData['planVariationId'] = localStorage.getItem( 'choosedplanVariationId' );
        }

        this.setState( { loading: true }, () => {
          commenService.postAPI( `auth/sign-up`, signupData )
            .then( res => {
              if ( undefined === res.data || !res.data.status ) {
                this.setState( { loading: false } );
                toast.error(res.data.message);
                return;
              }
              
              this.setState({loading: false, isRegistered: true, organizationName: "",firstName: "",lastName: "",phoneNumber: "",password: "",confirmPassword: "", address: '', latitude:'',longitude:'' });
              toast.success(res.data.message);
                    
            } )
            .catch( err => {
              toast.error(err.message);
              this.setState( { loading: false} );
            } )
        } )
      }else{
        //console.log("Outside validation area.");
      }
  };

  changeHandler(e) {  
    this.setState({ [e.target.name]: e.target.value });
  };
  
  validateForm() {
    let errors = {};
    let formIsValid = true;
    if (!this.state.firstName) {
        formIsValid = false;
        errors["firstName"] = "*Please enter first name.";
    }
    if (typeof this.state.firstName !== "undefined") {
        if (!this.state.firstName.match(/^[a-zA-Z ]*$/)) {
            formIsValid = false;
            errors["firstName"] = "*Please enter alphabet characters only.";
        }
    }
    if (!this.state.lastName) {
      formIsValid = false;
      errors["lastName"] = "*Please enter last name.";
    }
    if (!this.state.email) {
        formIsValid = false;
        errors["email"] = "*Please enter your email-ID.";
    }
    if (typeof this.state.email !== "undefined") {
        //regular expression for email validation
        var pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
        if (!pattern.test(this.state.email)) {
            formIsValid = false;
            errors["email"] = "*Please enter valid email-ID.";
        }
    }
    if (!this.state.phoneNumber) {
        formIsValid = false;
        errors["phoneNumber"] = "*Please enter your mobile no.";
    }
    if (typeof this.state.phoneNumber !== "undefined") {
        if (!this.state.phoneNumber.match(/^[0-9]{10}$/)) {
            formIsValid = false;
            errors["phoneNumber"] = "*Please enter valid mobile no.";
        }
    }
    if (!this.state.password) {
        formIsValid = false;
        errors["password"] = "*Please enter your password.";
    }
    /*if (typeof this.state.password !== "undefined") {
      if (!this.state.password.match(/^.*(?=.{8,})(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%&]).*$/)) {
          formIsValid = false;
          errors["password"] = "*Please enter secure and strong password.";
      }
    }*/
    if (!this.state.confirmPassword) {
      formIsValid = false;
      errors["confirmPassword"] = "*Please re-enter your password.";
    }
    if (this.state.confirmPassword !== this.state.password) {
      formIsValid = false;
      errors["confirmPassword"] = "*Passwords and confirm-password do not match.";
    }
    this.setState({
      loading: false,
      errors: errors
    });
    //console.error(errors);
    return formIsValid;
  }

  // Set address, latitude and longitude
  setLatitudeLongitude(address, latLng){
    this.setState({ latitude:latLng.lat, longitude:latLng.lng, address: address })
  }

  render() {
    const { loading, firstName, lastName, email, password,confirmPassword,phoneNumber,organizationName,errors} = this.state;
    
    let loaderElement = '';
    if(loading)
      loaderElement = <Loader />

      return (
        <>

        <div className="login" id="loginPage">
          <div className="container-fluid">
            <div className="row">
              <div className="col-md-6 col-lg-6 bg-image">

              </div>
              <div className="col-md-6 col-lg-6 col-sm-12 mx-auto">
                <ToastContainer /> 
                {loaderElement} 
                <div className="account-form">
                  <h3 className="login-heading mb-4">
                  { !this.state.isRegistered ? `Sign Up Your Food Truck Today!` : `Verify Account`}
                  </h3>
                  
                  { !this.state.isRegistered ? 

                  <Form onSubmit={this.submituserRegistrationForm} noValidate>
                    <p>The Food Truck app that Pros use! The app will be simple and effective for the everyday seller and buyer of delicious meals on wheels.</p>
                  
                    <Row form>
                      <Col md={6}>
                        <FormGroup>
                          <Label for="firstName">First Name *</Label>
                          <Input type="text" name="firstName" id="firstName" invalid={errors['firstName'] !== undefined && errors['firstName'] !== ""} value={firstName} onChange={this.changeHandler} placeholder="First Name" required />
                          <FormFeedback>{errors['firstName']}</FormFeedback>
                        </FormGroup>
                      </Col>
                      <Col md={6}>
                        <FormGroup>
                          <Label for="lastName">Last Name *</Label>
                          <Input type="text" name="lastName" id="lastName" value={lastName} invalid={errors['lastName'] !== undefined && errors['lastName'] !== ""} onChange={this.changeHandler} placeholder="Last Name" required />
                          <FormFeedback>{errors['lastName']}</FormFeedback>
                        </FormGroup>
                      </Col>
                      <Col md={6}>
                        <FormGroup>
                          <Label for="email">Email *</Label>
                          <Input type="email" name="email" id="email" placeholder="Email" invalid={errors['email'] !== undefined && errors['email'] !== ""} value={email} onChange={this.changeHandler} required />
                          <FormFeedback>{errors['email']}</FormFeedback>
                        </FormGroup>
                      </Col>
                      <Col md={6}>
                        <FormGroup>
                          <Label for="phoneNumber">Mobile no. *</Label>
                          <Input type="number" name="phoneNumber" id="phoneNumber" invalid={errors['phoneNumber'] !== undefined && errors['phoneNumber'] !== ""} placeholder="Mobile no." value={phoneNumber} onChange={this.changeHandler} required />
                          <FormFeedback>{errors['phoneNumber']}</FormFeedback>
                        </FormGroup>
                      </Col>
                      <Col md={6}>
                        <FormGroup>
                          <Label for="password">Password *</Label>
                          <Input type="password" name="password" invalid={errors['password'] !== undefined && errors['password'] !== ""} id="password" value={password} onChange={this.changeHandler} placeholder="Enter Password" required />
                          <FormFeedback>{errors['password']}</FormFeedback>
                          {/* <FormText>Be at least 8 characters, Uppercase, lowercase letters, numbers & special characters</FormText> */}
                        </FormGroup>
                      </Col>
                      <Col md={6}>
                        <FormGroup>
                          <Label for="confirmPassword">Confirm Password *</Label>
                          <Input type="password" name="confirmPassword" id="confirmPassword" invalid={errors['confirmPassword'] !== undefined && errors['confirmPassword'] !== ""} value={confirmPassword} onChange={this.changeHandler}  placeholder="Re-enter Password" required />
                          <FormFeedback>{errors['confirmPassword']}</FormFeedback>
                        </FormGroup>
                      </Col>
                      <Col md={6}>
                        <FormGroup>
                          <Label for="organizationName">Business name *</Label>
                          <Input type="text" name="organizationName" id="organizationName" value={organizationName} invalid={errors['organizationName'] !== undefined && errors['organizationName'] !== ""} onChange={this.changeHandler} placeholder="Organization / Business name" required/>
                          <FormFeedback>{errors['organizationName']}</FormFeedback>
                        </FormGroup>
                      </Col>
                      <Col md={6}>  
                        <FormGroup className={ ( this.state.address==='' ? ' location-error' : '') }>
                          <Label for="address">Address *</Label>
                          <AutoCompletePlaces setLatitudeLongitude={this.setLatitudeLongitude} />
                          <FormFeedback>{errors['address']}</FormFeedback>
                        </FormGroup>
                      </Col>
                    </Row>  
                    <Row>
                      <Col md={6}>
                        <FormGroup>
                          <Button className="Submit-form-button">Sign Up</Button>
                        </FormGroup>
                      </Col>
                    </Row>
                    <FormGroup>
                      <div className="footer-text pt-3">
                        Already have an account? <Link className="sign-up-link" to="/login">Sign In</Link>
                      </div>
                    </FormGroup>
                    
                  </Form>
                  : 
                  <VerifyOtp email = {this.state.email} page="register" />
                   }
                
                </div>
              </div>
            </div>
          </div>
        </div>
        </>
      );
  }
}

export default RegisterPage;
