import React, { Component } from 'react';
import { Button, Form, Input, Col, FormGroup, Label} from 'reactstrap';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import commonService from '../../../core/services/commonService';
import Loader from '../../Loader/Loader';
import { FormErrors } from '../../Formerrors/Formerrors';


import "./MyProfile.css";


class MyProfile extends Component {
   constructor(props){
      super(props);
      this.state = {
         formField: { organizationName: '', email: '', firstName: '', lastName: '', phoneNumber: '', address: '' },
         formErrors: {organization_name: '', email: '', firstName: '', lastName: '', error: ''},
         formValid: true,
         organizationId: "",
         orgDocument: [],
         organizationDocuments: [],
         loading: true

      };
      this.submitHandler = this.submitHandler.bind(this);
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
           
            const organizationInfo = res.data.data;
            const formField = {
               organizationName: organizationInfo.organizationName, 
              email: organizationInfo.email, 
              firstName: organizationInfo.firstName, 
              lastName: organizationInfo.lastName,
              phoneNumber: organizationInfo.phoneNumber, 
              address: organizationInfo.address, 
              city: organizationInfo.city, 
              state: organizationInfo.state, 
              country: organizationInfo.country, 
              postalCode: organizationInfo.postalCode };  
  
            this.setState({loading:false, organizationDocuments:organizationInfo.documents, formField: formField, formValid: true, organizationId: organizationInfo.organizationId});     
           
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
      } )
   }
   
   /* Submit Form Handler*/
   submitHandler (event) {
      event.preventDefault();
      event.target.className += " was-validated";
      this.setState( { loading: true}, () => {
        const formInputField = this.state.formField;
        const formData = {
          "email": formInputField.email,
          "profileId": this.state.organizationId,
          "firstName": formInputField.firstName, 
          "lastName": formInputField.lastName, 
          "phoneNumber": formInputField.phoneNumber, 
          "address": formInputField.address, 
          "organizationName": formInputField.organizationName
        };
        debugger;
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

      console.log(this.state.formValid);
    };

    /* Validate Form Field */
   validateField(fieldName, value) {
      let fieldValidationErrors = this.state.formErrors;
      fieldValidationErrors.error = '';
   
      switch(fieldName) {         
      case 'organizationName':        
         fieldValidationErrors.organizationName = (value !== '') ? '' : ' is required';
         break;
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
      (formErrors.organizationName === ""  && formErrors.firstName === "" && formErrors.lastName === "" && formErrors.email === "" && formField.organizationName !== "" && formField.firstName !== ""  && formField.lastName !== "" && formField.email !== "" ) 
      ? true : false});
   }
   /* Set Error Class*/
   errorClass(error) {
      return(error.length === 0 ? '' : 'has-error');
   }

   //Set organization document on change
  onDocumentChange = event => {   
   this.setState({
     orgDocument: event.target.files,
   });
   if( event.target.files.length>0){
     const formData = new FormData();
     for(let i =0; i < event.target.files.length; i++){
       formData.append('documents', event.target.files[i]);
     }

     formData.append('organizationId', this.state.organizationId);
     
      commonService.putAPIWithAccessToken('organization/documents', formData)
      .then( res => {
        
        if ( undefined === res.data.data || !res.data.status ) {
          this.setState( { loading: false} );
          toast.error(res.data.message);
          return;
        }
        this.setState({ loading: false});
        toast.success(res.data.message);
        this.props.history.push('/user/dashboard');
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
   }
 }

  render() {
   const { loading, organizationDocuments} = this.state;
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
                  </div>
                  <div className="col-md-6">
                     <div className="form-group">
                        <label htmlFor="lastName">Last Name</label>
                        <input type="text" name="lastName" id="lastName" className="form-control" placeholder="Last Name" value={this.state.formField.lastName} onChange={this.changeHandler} required />
                     </div>
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
                        <label htmlFor="organizationName">Organization Name</label>
                        <input type="text" name="organizationName" className="form-control" placeholder="Organization Name" value={this.state.formField.organizationName} onChange={this.changeHandler} />
                     </div>
                  </div>
                  <Col md={"4"}>  
                     <FormGroup> 
                        <Label htmlFor="orgDoc">Company Documents</Label>            
                        <Input type="file" id="orgDoc" className="chooseOrgDoc form-control" name="orgDoc" multiple onChange={this.onDocumentChange} />
                     </FormGroup>
                  </Col>
                  <Col md={"2"}>
                     <Label htmlFor="downloadOrgDoc" className="downloadOrgDocLabel">&nbsp;</Label>   
                     {organizationDocuments.map((doc, index) =>
                     <div className="docBtnArea" key={index}>
                        <a className="btn btn-primary btn-sm" href={doc} target="_blank" rel="noopener noreferrer" > <i className="fa fa-file-o"></i></a>
                     </div>
                     )}
                  </Col>
                  <div className="col-md-12">
                     <div className="form-group">
                        <label htmlFor="address">Address</label>
                        <Input type="text" placeholder="Address" id="address" className="form-control" name="address" value={this.state.formField.address} onChange={this.changeHandler}  />
                     </div>
                  </div>              
                  <div className="col-md-6">
                     <div className="form-group">
                        <Button color="primary" className="Submit-form-button" type="submit">Update Profile</Button>
                     </div>
                  </div>
               </div>
            </Form>
         </div>
      </div>
    );
  }
}

export default MyProfile;
