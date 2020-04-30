import React, { Component } from 'react';
import { Button, Form, Row, Col, FormGroup} from 'reactstrap';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import commonService from '../../../core/services/commonService';
import Loader from '../../Loader/Loader';
import { FormErrors } from '../../Formerrors/Formerrors';


import "./Profile.css";


class Profile extends Component {
   constructor(props){
      super(props);
      this.state = {
         formField: { email: '', firstName: '', lastName: '', phoneNumber: '',organizationName: '', address: '' },
         formErrors: { email: '', firstName: '', lastName: '', error: ''},
         formValid: true,
         profileId: "",
         invalidImage:'',
         loading: true
      };
      this.submitHandler = this.submitHandler.bind(this);
      this.changeHandler = this.changeHandler.bind(this);
    }
    componentDidMount() { 
      this.getProfile();
    }
    /*get profile API*/
    getProfile() {   
  
      this.setState( { loading: true}, () => {
        commonService.getAPIWithAccessToken('profile')
          .then( res => {
  
            if ( undefined === res.data.data || !res.data.status ) {
              this.setState( { loading: false } );
              toast.error(res.data.message);
              return;
            }
            console.log(res.data); 
           
            const userInfo = res.data.data;
            const formField = {
              email: userInfo.email, 
              firstName: userInfo.firstName, 
              lastName: userInfo.lastName,
              phoneNumber: userInfo.phoneNumber,
              profilePic: userInfo.profilePic,
              organizationName: userInfo.organizationName,
              address: userInfo.address, 
            };  
            if(userInfo.profilePic!=='')
              localStorage.setItem( 'profilePic', userInfo.profilePic );

            this.setState({loading:false, formField: formField, formValid: true, profileId: userInfo.profileId});     
          } )
          .catch( err => {         
            if(err.response !== undefined && err.response.status === 401) {
              localStorage.clear();
              this.props.history.push('/login');
            }else
              this.setState( { loading: false } );
              toast.error(err.message);
          } )
      } )
   }
   
   /* Submit Form Handler*/
   submitHandler (event) {
      event.preventDefault();
      //event.target.className += " was-validated";
      this.setState( { loading: true}, () => {
        const formInputField = this.state.formField;
        const formData = {
          "email": formInputField.email,
          "profileId": this.state.profileId,
          "firstName": formInputField.firstName, 
          "lastName": formInputField.lastName, 
          "phoneNumber": formInputField.phoneNumber, 
          "organizationName": formInputField.organizationName, 
          "address": formInputField.address, 
        };
        //debugger;
        commonService.putAPIWithAccessToken('profile', formData)
          .then( res => {
            if ( undefined === res.data.data || !res.data.status ) {
              this.setState( { loading: false} );
              toast.error(res.data.message);
              return;
            }           
            this.setState({ loading: false});
            toast.success(res.data.message);
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
      
    };

    /* Input Field On changes*/
    changeHandler = event => {
      const name = event.target.name;
      const value = event.target.value;
      const formField = this.state.formField
      formField[name] = value;
      this.setState({ formField: formField },
                    () => { this.validateField(name, value) });
    };

    /* Validate Form Field */
   validateField(fieldName, value) {
      let fieldValidationErrors = this.state.formErrors;
      fieldValidationErrors.error = '';
   
      switch(fieldName) {         
      case 'firstName':        
         fieldValidationErrors.firstName = (value !== '') ? '' : ' is required';
         break;
      case 'lastName':        
         fieldValidationErrors.lastName = (value !== '') ? '' : ' is required';
         break;               
      case 'email':        
         fieldValidationErrors.email = (value !== '') ? '' : ' is required';
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
      ( formErrors.firstName === "" && formErrors.lastName === "" && formErrors.email === "" && formField.firstName !== ""  && formField.lastName !== "" && formField.email !== "" ) 
      ? true : false});
   }
   /* Set Error Class*/
   errorClass(error) {
      return(error.length === 0 ? '' : 'has-error');
   }

   //To set profile image
   onProfilePicChange = (e) => {  
      if( e.target.files.length>0){
         const imageFile = e.target.files[0];
         if (!imageFile) {
            this.setState({ invalidImage: 'Please select image.' });
            return false;
         }
         
         if (!imageFile.name.match(/\.(jpg|jpeg|png|gif)$/)) {
            this.setState({ invalidImage: 'Please select valid image.' });
            return false;
         }
         this.setState( { loading: true}, () => {
            const formData = new FormData();
            formData.append('profileImage', imageFile );   
            formData.append('profileId', this.state.profileId);
        
            commonService.putAPIWithAccessToken('profile/picture', formData)
            .then( res => {
               if ( undefined === res.data.data || !res.data.status ) {
                  this.setState( { loading: false} );
                  toast.error(res.data.message);
                  return;
               }
               this.setState({ loading: false});
               toast.success(res.data.message);
               this.getProfile();
            } )
            .catch( err => {         
               if(err.response !== undefined && err.response.status === 401) {
                  localStorage.clear();
                  this.props.history.push('/login');
               }else
               this.setState( { loading: false } );
               toast.error(err.message);
            } )
         } );   
      }
   }

  render() {
   const { loading, invalidImage } = this.state;
    let loaderElement = '';
    if(loading)
      loaderElement = <Loader />

    return (
      <div className="user-dashboard">
         <ToastContainer />
         {loaderElement}
        <div className="profile-form">
            <h3>My Profile</h3>
            <FormErrors formErrors={this.state.formErrors} />
            <Form onSubmit={this.submitHandler} noValidate>
               <div className="row">
                  <div className="col-md-6">
                     <div className="form-group">
                        <label htmlFor="firstName">First Name</label>
                        <input type="text" name="firstName" id="firstName" className="form-control" placeholder="First Name" value={this.state.formField.firstName} onChange={this.changeHandler} required />
                     </div>
                     <div className="form-group">
                        <label htmlFor="lastName">Last Name</label>
                        <input type="text" name="lastName" id="lastName" className="form-control" placeholder="Last Name" value={this.state.formField.lastName} onChange={this.changeHandler} required />
                     </div>
                  </div>
                  <div className="col-md-6">
                     <Row>
                        <Col md="4">
                           <img src={ ( this.state.formField.profilePic!=='' ? this.state.formField.profilePic : '/images/profile_image_dummy.svg' ) } className="img-fluid img-thumbnail profile-pic" alt="Profile" />
                        </Col>
                        <Col md="6">
                           <FormGroup>
                              <label htmlFor="profilePic">Profile Picture</label>
                              <input type="file" id="profilePic" className="form-control" onChange={this.onProfilePicChange}  />
                              <small>The picture you upload here will be used as your Profile image on the Mobile app which the customer can view</small>
                              {invalidImage && <p className="text-danger">{invalidImage}</p>}
                           </FormGroup>
                        </Col>
                     </Row>
                  </div>
                  <div className="col-md-6">
                     <div className="form-group">
                        <label htmlFor="email">Email address</label>
                        <input type="text" name="email" id="email" className="form-control" placeholder="Email address" value={this.state.formField.email} onChange={this.changeHandler} required />
                     </div>
                  </div>
                  <div className="col-md-6">
                     <div className="form-group">
                        <label htmlFor="phoneNumber">Mobile</label>
                        <input type="number" name="phoneNumber" id="phoneNumber" className="form-control" placeholder="Mobile No." value={this.state.formField.phoneNumber} onChange={this.changeHandler} />
                     </div>
                  </div>
                  <div className="col-md-6">
                     <div className="form-group">
                        <label htmlFor="organizationName">Business Name</label>
                        <input type="text" name="organizationName" id="organizationName" className="form-control" placeholder="Business Name" value={this.state.formField.organizationName} onChange={this.changeHandler} />
                     </div>
                  </div>
                  <div className="col-md-6">
                     <div className="form-group">
                        <label htmlFor="address">Address</label>
                        <input type="text" name="address" id="address" className="form-control" placeholder="Address / Location" value={this.state.formField.address} onChange={this.changeHandler} />
                     </div>
                  </div>
                              
                  <div className="col-md-12">
                     <div className="form-group">
                        <Button color="primary" className="pull-right Submit1-form-button" disabled={!this.state.formValid} type="submit">Update Profile</Button>
                     </div>
                  </div>
               </div>
            </Form>
         </div>
      </div>
    );
  }
}

export default Profile;
