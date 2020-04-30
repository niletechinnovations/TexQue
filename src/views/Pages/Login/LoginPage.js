import React, { Component } from "react";
import  { Redirect, Link } from 'react-router-dom';
import { Col, Row, Button, Form, FormGroup, Label, Input, FormFeedback, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import commenService from '../../../core/services/commonService';
import Loader from '../../../views/Loader/Loader';

import "./loginPage.css";

class LoginPage extends Component {
  constructor( props ){
    super( props );

    this.state = {
      email: '',
      password: '',
      modal: false,
      loggedIn: false,
      loading: false,
      errors: {}
    };
    
  }
  
  componentDidMount() {
    window.scrollTo(0, 0);
  }
  
  submitHandler = event => {
    event.preventDefault();
    event.target.className += " was-validated";
    const formErrors = this.state.errors;
    const loginData = {
      email: this.state.email.toLowerCase(),
      password: this.state.password
    };
    if(this.state.email === '' && this.state.password === '' ) {
      formErrors["email"] = 'Please enter your email id.';
      formErrors["password"] = 'Please enter your password.';
      this.setState({   errors: formErrors });
      toast.error("Please enter your email and password!");
      return;
    }
    this.setState( { loading: true }, () => {
      commenService.postAPI( `auth/sign-in`, loginData )
        .then( res => {
         
          if ( undefined === res.data || !res.data.status ) {
            this.setState( { loading: false } );
            if(res.data.errors){
              if(res.data.errors.email){
                formErrors["email"] = res.data.errors.email;
                this.setState({   errors: formErrors });
                toast.error('Error: '+res.data.errors.email);
              }
              else if(res.data.errors.password){
                formErrors["password"] = res.data.errors.password;
                this.setState({   errors: formErrors });
                toast.error('Error: '+res.data.errors.password);
              }else{
                toast.error(res.data.message);
              }
                
            }else{
              if(res.data.message === 'Invalid password!'){
                formErrors["password"] = res.data.message;
                this.setState({ formErrors: formErrors });
                toast.error(res.data.message);
              }else if(res.data.message === 'Email address not registered with us!'){
                formErrors["email"] = res.data.message;
                this.setState({ formErrors: formErrors });
                toast.error(res.data.message);
              }else{
                toast.error(res.data.message);
              }
              
            }
            return;
          }
  
          const loggedInfo = res.data;
          if(loggedInfo.data.role.toLowerCase() === 'user'){
            this.setState( { loading: false } );
            toast.error('Your are not authorized to access! Please use our mobile application.');
            return;
          }
          localStorage.setItem( 'accessToken', loggedInfo.data.accessToken );
          //localStorage.setItem( 'refreshToken', loggedInfo.data.refreshToken );
          localStorage.setItem( 'role', loggedInfo.data.role );
          localStorage.setItem( 'authId', loggedInfo.data.authId );
          localStorage.setItem( 'userName', loggedInfo.data.firstName+' '+loggedInfo.data.lastName );
          localStorage.setItem( 'userEmail', loggedInfo.data.email );
          localStorage.setItem( 'profilePic', loggedInfo.data.profilePic );
          localStorage.setItem( 'isActivePlan', loggedInfo.data.isActivePlan );
          localStorage.setItem( 'isAdvertiser', loggedInfo.data.isAdvertiser );
          localStorage.setItem( 'isOrganization', loggedInfo.data.isOrganization );
          
          this.setState( { loading: false, loggedIn: true } )
          
          toast.success(res.data.message);
          if(loggedInfo.data.role.toLowerCase() === 'admin'){
            this.props.history.push('/admin/dashboard');
          }else if( localStorage.getItem( 'choosedPlanId' ) ){
            this.props.history.push('/proceed-to-payment');
          }else if(loggedInfo.data.role.toLowerCase() === 'organization'){
            if(loggedInfo.data.isActivePlan)
              this.props.history.push('/user/dashboard');
            else
              this.props.history.push('/subscription-plan');
          }else if(loggedInfo.data.role.toLowerCase() === 'advertiser'){
            if(loggedInfo.data.isActivePlan)
              this.props.history.push('/advertiser/ads');
            else
              this.props.history.push('/advertiser-plan');
          }else
            this.props.history.push('/');
        } )
        .catch( err => {
          toast.error(err.message);
          this.setState( { loading: false} );
        } )
    } )
  };

  changeHandler = event => {
    this.setState({ [event.target.name]: event.target.value });
  };
  /*Handle Forgot Password Field*/
  changeForgotPasswordHandler = event => {

    this.setState({ [event.target.name]: event.target.value });
  }
  /*Forgot Password */
  submitForgotPasswordHandler = event => {
    event.preventDefault();
    event.target.className += " was-validated";
    const forgotData = {
      email: this.state.forgotPasswordEmail
    };
    this.setState( { loading: true }, () => {
      commenService.postAPI( `auth/forgot-password`, forgotData )
        .then( res => {
         
          console.log(res);
          if ( undefined === res.data || !res.data.status ) {
            this.setState( { loading: false } );
            toast.error(res.data.message);
            return;
          } 
  
          this.setState( {
            loading: false,
            modal: false
          } )
          toast.success(res.data.message);          
        } )
        .catch( err => {          
          toast.error(err.message);
          this.setState( { loading: false} );
        } )
    } )
  }
  /*Hide Modal*/
  toggle = () => {
    this.setState({
      modal: !this.state.modal,
      forgotPasswordEmail: ""
    });
  }

  render() {
    const { email, password, loggedIn, loading, forgotPasswordEmail, errors} = this.state;
    
    if ( loggedIn || localStorage.getItem( 'accessToken' ) ) {
      if(localStorage.getItem( 'role' ).toLowerCase() === "admin")
			  return ( <Redirect to={`/admin/dashboard`} noThrow /> )
      else if(localStorage.getItem( 'role' ).toLowerCase() === "organization")
        return ( <Redirect to={`/organization/dashboard`} noThrow /> )
      else
        return ( <Redirect to={`/`} noThrow /> )

		} else {
      let loaderElement = '';
      if(loading)
        loaderElement = <Loader />
      return (
        <>

        <div className="" id="loginPage">
          <div className="container-fluid">
            <div className="row">
              <div className="col-md-7 col-lg-7 bg-image">

              </div>
              <div className="col-md-5 col-lg-5 col-sm-12 mx-auto">
                <ToastContainer /> 
                <div className="account-form">
                  <h3 className="login-heading mb-4">Sign in to TexQue</h3>
                  {loaderElement} 
                  <Form onSubmit={this.submitHandler} noValidate>
                    <Row form>
                      <Col md={12}>
                        <FormGroup>
                          <Label for="email">Email</Label>
                          <Input type="email" name="email" id="email" placeholder="Email *" value={email} onChange={this.changeHandler} invalid={errors['email'] !== undefined && errors['email'] !== ""} required />
                          <FormFeedback>{errors['email']}</FormFeedback>
                        </FormGroup>
                      </Col>
                      <Col md={12}>
                        <FormGroup>
                          <Label for="password">Password</Label>
                          <Input type="password" name="password" id="password" value={password} placeholder="Enter Password"  onChange={this.changeHandler} invalid={errors['password'] !== undefined && errors['password'] !== ""} required />
                          <FormFeedback>{errors['password']}</FormFeedback>
                        </FormGroup>
                      </Col>
                      <Col md={6}>
                        <FormGroup check>
                          <Label check>
                            <Input type="checkbox" name="keepme" /> Keep me signed in
                          </Label>
                        </FormGroup>
                      </Col>
                      <Col md={6}>
                        <FormGroup>
                          <p className="text-right"><a href="#!" className="footer-text" onClick={this.toggle}>Forgot Password?</a></p>
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col md={6}>
                        <FormGroup>
                          <Button className="Submit-form-button">Sign In</Button>
                        </FormGroup>
                      </Col>
                    </Row>
                    <FormGroup>
                      <div className="footer-text pt-3">
                      <p>Don’t have an account? <br />
                        <Link className="sign-up-link" to="/register">Sign up as Food Truck Owner</Link> <br />
                        OR <br />
                        <Link className="sign-up-link" to="/advertiser-plan">Sign up as an Advertiser</Link>
                      </p>
                      </div>
                    </FormGroup>
                    
                  </Form>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Modal isOpen={this.state.modal} toggle={this.toggle} className="forgot-password-modal">
          <ModalHeader toggle={this.toggle}>Reset your password</ModalHeader>
          <Form className="default-form needs-validation" onSubmit={this.submitForgotPasswordHandler} noValidate>
            <ModalBody>
              <p>Enter your user account's verified email address and we will send you a password reset link.</p>
              <Row form>
                <Col md={12}>
                  <FormGroup>
                    <Label for="forgotEmail">Email</Label>
                    <Input type="email" name="forgotPasswordEmail" id="forgotEmail" placeholder="Enter your email address *" value={forgotPasswordEmail} onChange={this.changeForgotPasswordHandler} required />
                  </FormGroup>
                </Col>
              </Row>
            </ModalBody>
            <ModalFooter>
              <Button className="primary-button" color="primary">Send recovery email</Button>{' '}
              <Button color="secondary" onClick={this.toggle}>Cancel</Button>
            </ModalFooter>.
          </Form>  
        </Modal>
        </>
      );
    }
  }
}

export default LoginPage;
