import React, { Component } from 'react';
import { Card, CardBody, CardHeader, Media, Col, Row, Button, Form, Input, FormGroup, Label, Modal, ModalHeader, ModalBody, ModalFooter} from 'reactstrap';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import commonService from '../../../core/services/commonService';
import { FormErrors } from '../../Formerrors/Formerrors';

import Loader from '../../Loader/Loader';
import OrganizationData from './OrganizationData';
import './Organization.css'

class Organization extends Component {
  constructor(props){
    super(props);
    this.state = {
      modal: false,      
      organizationList: [],
      orgDocument: [],
      organizationDocuments: [],
      loading: true,
      rowIndex: -1,
      formProccessing: false,
      formField: {organization_name: '', email: '', first_name: '', last_name: '', phoneNumber: '', address: '' },
      formErrors: {organization_name: '', email: '', first_name: '', last_name: '', error: ''},
      formValid: false,
      filterItem: { filter_organization_id: '',organization_name: '', location: '', custom_search: ''},
    } 
    this.handleEditOrganization = this.handleEditOrganization.bind(this);
    this.submitHandler = this.submitHandler.bind(this);
    this.handleDeleteOrganization = this.handleDeleteOrganization.bind(this);
    this.filterOragnizationList = this.filterOragnizationList.bind(this);
    this.uploadOrgDocument = this.uploadOrgDocument.bind(this);
  }
  // Fetch the organization List
  componentDidMount() { 
    this.organizationList();
  }
  /*organization List API*/
  organizationList(filterItem = {}) {
    let organizationQuery = "";
    
    if(filterItem.organization_name !== undefined && filterItem.organization_name !== "" ) 
      organizationQuery += (organizationQuery !=="" ) ? "&organization_name="+filterItem.organization_name: "?organization_name="+filterItem.organization_name;
    if(filterItem.state !== undefined && filterItem.state !== "" ) 
      organizationQuery += (organizationQuery !=="" ) ? "&state="+filterItem.state: "?state="+filterItem.state;
    if(filterItem.custom_search !== undefined && filterItem.custom_search !== "" ) 
      organizationQuery += (organizationQuery !=="" ) ? "&keyword="+filterItem.custom_search: "?keyword="+filterItem.custom_search;
    this.setState( { loading: true}, () => {
      commonService.getAPIWithAccessToken('organization?pageSize=10000'+organizationQuery)
        .then( res => {
          
           
          if ( undefined === res.data.data || !res.data.status ) {
            this.setState( { loading: false } );
            toast.error(res.data.message);
            return;
          }   

          this.setState({loading:false, organizationList: res.data.data.profileList});     
         
        } )
        .catch( err => {         
          if(err.response !== undefined && err.response.status === 401) {
            localStorage.clear();
            this.props.history.push('/login');
          }else {
            this.setState( { loading: false } );
            toast.error(err.message);
          }
        } )
    } )
  }
  /* Submit Form Handler*/
  submitHandler (event) {
    event.preventDefault();
    event.target.className += " was-validated";
    this.setState( { formProccessing: true}, () => {
      const formInputField = this.state.formField;
      const formData = {
        "email": formInputField.email,
        "firstName": formInputField.first_name, 
        "lastName": formInputField.last_name, 
        "phoneNumber": formInputField.phoneNumber, 
        "address": formInputField.address, 
        "organizationName": formInputField.organization_name
      };

      const rowIndex = this.state.rowIndex;
      if(rowIndex > -1) {
       const organizationInfo = this.state.organizationList[rowIndex];
       formData['profileId'] = organizationInfo.profileId;
        commonService.putAPIWithAccessToken('organization', formData)
        .then( res => {
          
           
          if ( undefined === res.data.data || !res.data.status ) {
           
            this.setState( { formProccessing: false} );
            toast.error(res.data.message);
            return;
          } 
          
          this.setState({ modal: false, formProccessing: false});
          toast.success(res.data.message);
          this.organizationList();
         
        } )
        .catch( err => {         
          if(err.response !== undefined && err.response.status === 401) {
            localStorage.clear();
            this.props.history.push('/login');
          }
          else
            this.setState( { formProccessing: false } );
            toast.error(err.message);
        } )
      }
      else{
        commonService.postAPIWithAccessToken('organization', formData)
        .then( res => {
           
          if ( undefined === res.data.data || !res.data.status ) { 
            this.setState( { formProccessing: false} );
            toast.error(res.data.message);
            return;
          } 
          
          this.setState({ modal: false});
          toast.success(res.data.message);
          this.organizationList();
         
        } )
        .catch( err => {         
          if(err.response !== undefined && err.response.status === 401) {
            localStorage.clear();
            this.props.history.push('/login');
          }
          else
            this.setState( { formProccessing: false } );
            toast.error(err.message);
        } )
      }
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
      case 'organization_name':        
        fieldValidationErrors.organization_name = (value !== '') ? '' : ' is required';
        break; 
      case 'email':        
        fieldValidationErrors.email = (value !== '') ? '' : ' is required';
        break; 
      case 'first_name':        
        fieldValidationErrors.contact_person = (value !== '') ? '' : ' is required';
        break; 
      case 'last_name':
        fieldValidationErrors.contact_person = (value !== '') ? '' : ' is required';
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
      (formErrors.organization_name === ""  && formErrors.email === "" && formErrors.first_name === "" && formField.organization_name !== "" && formField.first_name !== "" && formField.email !== "") 
      ? true : false});
  }
  /* Set Error Class*/
  errorClass(error) {
    return(error.length === 0 ? '' : 'has-error');
  }

  toggle = () => {
    this.setState({
      modal: !this.state.modal,
      rowIndex: -1,
      formValid: false,
      formField: {organization_name: '', email: '', first_name: '', last_name: '', phoneNumber: '', address: '' },
      formErrors: {organization_name: '', email: '', first_name: '', last_name: '', error: ''}
    });
  }
  /* Edit organization*/
  handleEditOrganization(rowIndex){
      const organizationInfo = this.state.organizationList[rowIndex];
      const formField = {
        organization_name: organizationInfo.organizationName,
        email: organizationInfo.email, 
        first_name: organizationInfo.firstName, 
        last_name: organizationInfo.lastName, 
        phoneNumber: organizationInfo.phoneNumber, 
        address: organizationInfo.address, 
       };
      this.setState({rowIndex: rowIndex, formField: formField, organizationDocuments:organizationInfo.documents, modal: true, formValid: true});
  }
  /* Delete organization*/
  handleDeleteOrganization(rowIndex){

    const orgInfo = this.state.organizationList[rowIndex];
    //console.log(orgInfo);return;
    let formdata = { "profileId":orgInfo.profileId }

    this.setState( { loading: true}, () => {
      commonService.deleteAPIWithAccessToken( 'organization',formdata)
        .then( res => {
          this.setState({loading: false});
          if ( undefined === res.data || !res.data.status ) {            
             toast.error(res.data.message);      
            return;
          }         
          toast.success(res.data.message);
          this.organizationList();
        } )
        .catch( err => {       
          if(err.response !== undefined && err.response.status === 401) {
            localStorage.clear();
            this.props.history.push('/login');
          }else{
            this.setState( { loading: false } );
            toast.error(err.message);
          }
      } )
    })
    
  }
  filterOragnizationList(){
    const filterItem = this.state.filterItem;
    this.organizationList(filterItem);
  }
  
  changeFilterHandler = event => {
    const name = event.target.name;
    const value = event.target.value;
    const filterItem = this.state.filterItem
    filterItem[name] = value;
    this.setState({ filterItem: filterItem });
  };

  //Set organization document on change
  onDocumentChange = event => {   
    this.setState({
      orgDocument: event.target.files,
    });
  };
  
  //To upload organization documentes
  uploadOrgDocument(event) {
    event.preventDefault();
    const rowIndex = this.state.rowIndex;
    if( rowIndex > -1 && this.state.orgDocument.length>0){
      const formData = new FormData();
      for(let i =0; i < this.state.orgDocument.length; i++){
        formData.append('documents', this.state.orgDocument[i]);
      }

      const orgInfo = this.state.organizationList[rowIndex];
      formData.append('organizationId', orgInfo.organizationId);
      
       commonService.putAPIWithAccessToken('organization/documents', formData)
       .then( res => {
         
         if ( undefined === res.data.data || !res.data.status ) {
           this.setState( { formProccessing: false} );
           toast.error(res.data.message);
           return;
         }
         this.setState({ modal: false, formProccessing: false});
         toast.success(res.data.message);
         this.organizationList();
       } )
       .catch( err => {         
         if(err.response !== undefined && err.response.status === 401) {
           localStorage.clear();
           this.props.history.push('/login');
         }
         else
           this.setState( { formProccessing: false } );
           toast.error(err.message);
       } )
    }
  }



  render() {

    const { organizationList,organizationDocuments, loading, modal, formProccessing } = this.state;     
    let loaderElement = '';
    if(loading)        
      loaderElement = <Loader />
    const processingBtnText = <>Submit <i className="fa fa-spinner"></i></>;
    
    return (
      <div className="animated fadeIn">
        <Row>
          
          {loaderElement}
          <Col lg={12}>
            <Card>
              <CardHeader className="mainHeading">
                <strong>Food Truck Owner Lists</strong>
                {/* <Button color="primary" className="categoryAdd" type="button" onClick={this.toggle}><i className="fa fa-plus"></i> Add New</Button> */}
              </CardHeader>
              <CardBody>
                <Row>
                  <Col md={12}>
                    <Row>                      
                      <Col md={"3"}>
                        <FormGroup> 
                          <Input id="organizationName" name="organizationName" placeholder="Organization Name" className="form-control" value={this.state.filterItem.organizationName}  onChange={this.changeFilterHandler} />
                        </FormGroup>  
                      </Col>
                      <Col md={"3"}>
                        <FormGroup> 
                          <Input id="location" name="location" placeholder="Location" className="form-control" value={this.state.filterItem.location}  onChange={this.changeFilterHandler} /> 
                        </FormGroup>  
                      </Col>
                      <Col md={"4"}>
                        <FormGroup> 
                          <Input type="text" placeholder="Search By Email/ Name" id="custom_search" name="custom_search" value={this.state.formField.custom_search} onChange={this.changeFilterHandler} />
                        </FormGroup>  
                      </Col>
                      <Col md={"2"}>
                        <FormGroup> 
                          <Button color="success" type="button" onClick={this.filterOragnizationList}>Search</Button> 
                        </FormGroup>             
                      </Col>
                    </Row>  
                  </Col>
                  <Col lg={12}>
                    <OrganizationData data={organizationList} editOrganizationAction={this.handleEditOrganization} deleteOrganizationAction={this.handleDeleteOrganization} dataTableLoadingStatus = {this.state.loading} />
                  </Col>  
                </Row>
              </CardBody>
            </Card>
          </Col>
        </Row>
        <Modal isOpen={modal} toggle={this.toggle} className="full-width-modal-section organization-modal">
          <ModalHeader toggle={this.toggle}>Food Truck Owner</ModalHeader>
          <Form onSubmit={this.submitHandler} noValidate>
            <ModalBody>
              <FormErrors formErrors={this.state.formErrors} />
              <Row>
                <Col md={"6"}>  
                  <FormGroup> 
                    <Label htmlFor="first_name">First Name</Label>            
                    <Input type="text" placeholder="First Person *" id="first_name" name="first_name" value={this.state.formField.first_name} onChange={this.changeHandler} required />
                  </FormGroup>
                </Col>
                <Col md={"6"}>  
                  <FormGroup> 
                    <Label htmlFor="last_name">Last Name</Label>            
                    <Input type="text" placeholder="Last Person *" id="last_name" name="last_name" value={this.state.formField.last_name} onChange={this.changeHandler} />
                  </FormGroup>
                </Col>
                <Col md={"6"}>
                  <FormGroup> 
                    <Label htmlFor="organization_name">Organization Name</Label>            
                    <Input type="text" placeholder="Organization Name *" id="organization_name" name="organization_name" value={this.state.formField.organization_name} onChange={this.changeHandler} required />
                  </FormGroup>
                </Col>  
                <Col md={"6"}>  
                  <FormGroup> 
                    <Label htmlFor="email">Email</Label>            
                    <Input type="text" placeholder="Email *" id="email" name="email" value={this.state.formField.email} onChange={this.changeHandler} required />
                  </FormGroup>
                </Col>
                <Col md={"6"}>  
                  <FormGroup> 
                    <Label htmlFor="phoneNumber">Contact Number</Label>            
                    <Input type="text" placeholder="Contact Number " id="phoneNumber" name="phoneNumber" value={this.state.formField.phoneNumber} onChange={this.changeHandler}  />
                  </FormGroup>
                </Col>
                <Col md={"6"}>  
                  <FormGroup> 
                    <Label htmlFor="address">Address</Label>            
                    <Input type="text" placeholder="Address" id="address" name="address" value={this.state.formField.address} onChange={this.changeHandler}  />
                  </FormGroup>
                </Col>
                <Col md={"6"}>  
                  <FormGroup> 
                    <Label htmlFor="orgDoc">Company Documents</Label>            
                    <Input type="file" id="orgDoc" className="chooseOrgDoc" name="orgDoc" multiple onChange={this.onDocumentChange} />
                    <Button color="info" className="uploadDocBtn" size="sm" onClick={this.uploadOrgDocument}>Upload</Button>
                  </FormGroup>
                </Col>
                <Col md={"12"} className="mt-2"> 
                  {organizationDocuments.map((doc, index) =>
                    <Media className="docBtnArea" key={index}>
                      <a className="btn btn-primary btn-sm" href={doc} target="_blank" rel="noopener noreferrer" > <i className="fa fa-download"></i></a>
                    </Media>
                  )}
                </Col>             
                
              </Row>           
            </ModalBody>
            <ModalFooter>
              <Button color="primary" disabled={!this.state.formValid || formProccessing} type="submit">{formProccessing ? processingBtnText : 'Submit' }</Button>
              <Button color="secondary" onClick={this.toggle}>Cancel</Button>
            </ModalFooter>
          </Form>
        </Modal>
      </div>

    )
  }
}

export default Organization;
