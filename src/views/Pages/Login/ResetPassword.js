import React, { Component } from "react";
import { Col, Row, Button, Form, FormGroup, Label, Input } from 'reactstrap';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import commenService from '../../../core/services/commonService';
import Loader from '../../../views/Loader/Loader';

import "./loginPage.css";

class ResetPassword extends Component {
  constructor( props ){
    super( props );

    this.state = {
      newPassword: '',
      confirmPassword: '',
      token: '',
      loading: false
    };
  }

    componentDidMount() {
        const { match: { params } } = this.props;
        localStorage.clear();
        this.setState( { token: params.token})
    }

  scrollToTop = () => window.scrollTo(0, 0);
  
  submitHandler = event => {
    event.preventDefault();
    event.target.className += " was-validated";
    const loginData = {      
      newPassword: this.state.newPassword,
      token: this.state.token
    };
    if(this.state.newPassword === '' && this.state.confirmPassword === '' ) {
        toast.error("Please enter your password and confirm password!");
        return;
    }
    if(this.state.newPassword !== this.state.confirmPassword) {
        toast.error("Password and confirm password does not match!");
        return;
    }
    this.setState( { loading: true }, () => {
      commenService.postAPI( `auth/setup-new-password`, loginData )
        .then( res => {
         
          console.log(res);
          if ( undefined === res.data || !res.data.status ) {
            this.setState( { loading: false } );
            toast.error(res.data.message);
            return;
          }
          this.setState( {
            loading: false
          } )
          toast.success(res.data.message);
          this.props.history.push('/login');
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
  
    render() {
      const { newPassword, confirmPassword, loading } = this.state;
      let loaderElement = '';
      if(loading)
        loaderElement = <Loader />
      return (
        <>

        <div className="">
          <div className="container-fluid">
            <div className="row">
              <div className="col-md-7 col-lg-7 bg-image">

              </div>
              <div className="col-md-5 col-lg-5 col-sm-12 mx-auto">
                <ToastContainer /> 
                <div className="account-form">
                  <h3 className="login-heading mb-4">Setup your password</h3>
                  {loaderElement} 
                  <Form onSubmit={this.submitHandler} noValidate>
                    <Row form>
                      <Col md={12}>
                        <FormGroup>
                          <Label for="newPassword">New password *</Label>
                          <Input type="password" name="newPassword" id="newPassword" placeholder="New password *" value={newPassword} onChange={this.changeHandler} required />
                        </FormGroup>
                      </Col>
                      <Col md={12}>
                        <FormGroup>
                          <Label for="confirmPassword">Confirm password *</Label>
                          <Input type="password" name="confirmPassword" id="confirmPassword" value={confirmPassword} placeholder="Re-enter Password"  onChange={this.changeHandler}  required />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col md={6}>
                        <FormGroup>
                          <Button className="Submit-form-button">Update Password</Button>
                        </FormGroup>
                      </Col>
                    </Row>
                    
                  </Form>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        </>
      );
    
    }
}

export default ResetPassword;
