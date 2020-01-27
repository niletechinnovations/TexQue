import React, { Component } from 'react';
import { 
  Card, CardBody, CardHeader, Col, Row, Button, Form, Input, FormGroup, Label,
  Modal, ModalHeader, ModalBody, ModalFooter
} from 'reactstrap';

//import  { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import commonService from '../../../core/services/commonService';

import FoodTruckData from './FoodTruckData';
import Loader from '../../Loader/Loader';
import { FormErrors } from '../../Formerrors/Formerrors';

import "./MyList.css";

class FoodTruckLists extends Component {
  constructor(props){
    super(props);
    this.state = {
      modal: false,
      truckLists: [],
      categoryList: [],
      loading: true,
      formProccessing: false,
      rowIndex: -1,
      featuredImage: '',
      menuImages: [],
      formField: { truckName: '', contactPerson: '', phoneNumber:'', address: '',defaultImage: '',category_id:''},
      formErrors: { truckName: '', contactPerson: '', phoneNumber:'', address:'', error: ''},
      formValid: false,
      filterItem: { filter_organization_id: '', truckName: '', location: '', custom_search: ''}
    } 
    this.filterTruckLists = this.filterTruckLists.bind(this);
    this.submitHandler = this.submitHandler.bind(this);
    this.handleEditTruck = this.handleEditTruck.bind(this);
    this.handleDeleteTruck = this.handleDeleteTruck.bind(this);
  }
  // Fetch the Employee List
  componentDidMount() {     
    this.truckLists({});   
    this.categoryList();
  }
  /*Employee List API*/
  truckLists(filterItem = {}) {
    let stroreWalkQuery = "";
    
    if(filterItem.truckName !== undefined && filterItem.truckName !== "" ) 
      stroreWalkQuery += (stroreWalkQuery !=="" ) ? "&truckName="+filterItem.truckName: "?truckName="+filterItem.truckName;
    if(filterItem.location !== undefined && filterItem.location !== "" ) 
      stroreWalkQuery += (stroreWalkQuery !=="" ) ? "&address="+filterItem.location: "?address="+filterItem.location;
    if(filterItem.custom_search !== undefined && filterItem.custom_search !== "" ) 
      stroreWalkQuery += (stroreWalkQuery !=="" ) ? "&keyword="+filterItem.custom_search: "?keyword="+filterItem.custom_search;
    this.setState( { loading: true}, () => {
      commonService.getAPIWithAccessToken('food-truck'+stroreWalkQuery)
        .then( res => {
           
          if ( undefined === res.data.data || !res.data.status ) {
            this.setState( { loading: false } );
            toast.error(res.data.message);
            return;
          }   

          this.setState({loading:false, truckLists: res.data.data.truckList});     
         
        } )
        .catch( err => {         
          if(err.response !== undefined && err.response.status === 401) {
            localStorage.clear();
            //this.props.history.push('/login');
          }
          else {
            this.setState( { loading: false } );
            toast.error(err.message);
          }
        } )
    } )
  }

  
  filterTruckLists(){
    const filterItem = this.state.filterItem;
    this.truckLists(filterItem);
  }
  /* Submit Form Handler*/
  submitHandler (event) {
    event.preventDefault();
    event.target.className += " was-validated";
    this.setState( { formProccessing: true}, () => {
      const formInputField = this.state.formField;
      const formData = new FormData();
      formData.append('truckName', formInputField.truckName);
      formData.append('address', formInputField.address);
      formData.append('contactPerson', formInputField.contactPerson);
      formData.append('phoneNumber', formInputField.phoneNumber);
      formData.append('category_id', formInputField.category_id);
      formData.append('featuredImage', this.state.featuredImage, this.state.featuredImage.name);
      formData.append('menu', this.state.menuImages);
     

      
      const rowIndex = this.state.rowIndex;
      if(rowIndex > -1) {
        const storeInfo = this.state.truckLists[rowIndex];

        commonService.postMultipartDataAPIWithAccessToken('food-truck/'+storeInfo.storeId, formData)
        .then( res => {
          
           
          if ( undefined === res.data.data || !res.data.status ) {
           
            this.setState( { formProccessing: false} );
            toast.error(res.data.message);
            return;
          } 
          
          this.setState({ modal: false, formProccessing: false});
          toast.success(res.data.message);
          this.truckLists();
         
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
        commonService.postAPIWithAccessToken('food-truck', formData)
        .then( res => {
         
          if ( undefined === res.data.data || !res.data.status ) { 
            this.setState( { formProccessing: false} );
            toast.error(res.data.message);
            return;
          } 
          
          this.setState({ modal: false});
          toast.success(res.data.message);
          this.truckLists();
         
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
  handleImageChange = (e) => {
    this.setState({
      featuredImage: e.target.files[0]
    })
  };
  onMenuImageChange = event => {
    this.setState({
      menuImages: event.target.files,
    });
  };

  changeFilterHandler = event => {
    const name = event.target.name;
    const value = event.target.value;
    const filterItem = this.state.filterItem
    filterItem[name] = value;
    this.setState({ filterItem: filterItem });
  };
  
  /* Validate Form Field */
  validateField(fieldName, value) {
    let fieldValidationErrors = this.state.formErrors;
    fieldValidationErrors.error = '';
   
    switch(fieldName) {   
      
      case 'truckName':        
        fieldValidationErrors.truckName = (value !== '') ? '' : ' is required';
        break;
      case 'contactPerson':        
        fieldValidationErrors.contactPerson = (value !== '') ? '' : ' is required';
        break;
      case 'phoneNumber':        
        fieldValidationErrors.phoneNumber = (value !== '') ? '' : ' is required';
        break;
      case 'address':        
        fieldValidationErrors.address = (value !== '') ? '' : ' is required';
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
      (formErrors.truckName === "" && formField.truckName !== "") 
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
      formField: { truckName: '', contactPerson: '', phoneNumber:'', address: '', },
      formErrors: {truckName: '', error: ''}
    });
  }
  /* Edit Food Truck*/
  handleEditTruck(rowIndex){
      const storeInfo = this.state.truckLists[rowIndex];
      const formField = {        
        truckName: storeInfo.truckName, 
        contactPerson: storeInfo.contactPerson, 
        phoneNumber: storeInfo.phoneNumber,
        address: storeInfo.address, 
        defaultImage: storeInfo.defaultImage };
      this.setState({rowIndex: rowIndex, formField: formField, modal: true, formValid: true});
  }
  /* Delete Food Truck*/
  handleDeleteTruck(rowIndex){
   
    
  }

  /*Category List API*/
  categoryList() {   
    
    commonService.getAPIWithAccessToken('category')
      .then( res => {       
         
        if ( undefined === res.data.data || !res.data.status ) {
          this.setState( { loading: false } );
          toast.error(res.data.message);
          return;
        }   
        this.setState({loading:false, categoryList: res.data.data});     
      } )
      .catch( err => {         
        if(err.response !== undefined && err.response.status === 401) {
          localStorage.clear();
          this.props.history.push('/login');
        }
        else 
          this.setState( { loading: false } );
      } )
    
  }
  

  render() {
    const { truckLists, loading, modal, formProccessing, categoryList } = this.state;
    const processingBtnText = <>Submit <i className="fa fa-spinner"></i></>;
    let loaderElement = '';
    if(loading)        
      loaderElement = <Loader />

    return (
      <div className="user-dashboard">
        {loaderElement}
        <Card>
          <CardHeader className="mainHeading">
            <strong>Food Truck Lists</strong>
            <Button size="sm" color="secondary" className="addListing pull-right" type="button" onClick={this.toggle}><i className="fa fa-plus"></i> Add New</Button>
          </CardHeader>
          <CardBody>
            
            <Row>
              <Col md={12}>
                <Row>                     
                  <Col md={"5"}>
                    <FormGroup> 
                    <Input type="text" placeholder="Search By Name" name="truckName" value={this.state.filterItem.truckName} onChange={this.changeFilterHandler} />            
                    </FormGroup>  
                  </Col>
                  <Col md={"5"}>
                    <FormGroup> 
                    <Input type="text" placeholder="Search By Location" name="location" value={this.state.filterItem.location} onChange={this.changeFilterHandler} />       
                    </FormGroup>  
                  </Col>
                  <Col md={"2"}>
                    <FormGroup className="filter-button-section"> 
                      <Label htmlFor="filter_organization_id">&nbsp;</Label> 
                      <Button color="success" type="button" onClick={this.filterTruckLists}>Search</Button> 
                    </FormGroup>             
                  </Col>
                </Row>  
              </Col>
              <Col md={12}>
                <FoodTruckData data={truckLists} editStoreAction={this.handleEditStore} deleteStoreAction={this.handleDeleteStore} dataTableLoadingStatus = {this.state.loading} />
              </Col>
            </Row> 
          </CardBody>
        </Card>

        <Modal isOpen={modal} toggle={this.toggle} className="full-width-modal-section employee-modal">
          <ModalHeader toggle={this.toggle}>Food Truck</ModalHeader>
          <Form onSubmit={this.submitHandler} noValidate className="texQueForm">
            <ModalBody>
              <FormErrors formErrors={this.state.formErrors} />
              <Row>
                <Col md={"6"}>
                  <FormGroup> 
                    <Label htmlFor="truckName">Truck Name *</Label>            
                    <Input type="text" placeholder="Truck Name *" id="truckName" name="truckName" value={this.state.formField.truckName} onChange={this.changeHandler} required />
                  </FormGroup>  
                </Col>
                <Col md={"6"}>
                  <FormGroup> 
                    <Label htmlFor="contactPerson">Contact Person *</Label>            
                    <Input type="text" placeholder="Contact Person" id="contactPerson" name="contactPerson" value={this.state.formField.contactPerson} onChange={this.changeHandler}  />
                  </FormGroup>
                </Col>
                <Col md={"6"}>
                  <FormGroup> 
                    <Label htmlFor="phoneNumber">Phone Number *</Label>            
                    <Input type="text" placeholder="Phone Number" id="phoneNumber" name="phoneNumber" value={this.state.formField.phoneNumber} onChange={this.changeHandler}  />
                  </FormGroup>
                </Col>
                <Col md={"6"}>
                  <FormGroup> 
                    <Label htmlFor="category_id">Category</Label>            
                    <Input type="select" placeholder="Category *" id="category_id" name="category_id" value={this.state.formField.category_id} onChange={this.changeHandler} >
                      <option value="">Select Category</option>
                      {categoryList.map((categoryInfo, index) =>
                        <SetCategoryDropDownItem key={index} categoryInfo={categoryInfo} />
                      )}
                    </Input>
                    {/*        
                    <FormGroup check inline>
                      <Label check>
                        <Input type="checkbox" id="checkbox2" /> Check me out
                      </Label>
                      <Label check>
                        <Input type="checkbox" id="checkbox2" /> Check me out
                      </Label>
                    </FormGroup>
                    */}
                  </FormGroup>
                </Col>
                <Col md={"6"}>
                  <FormGroup> 
                    <Label htmlFor="defaultImage">Default Image *</Label>            
                    <Input type="file" id="defaultImage" name="defaultImage" className="form-control"  onChange={this.handleImageChange} required />
                  </FormGroup>              
                </Col>
                <Col md={"6"}>
                  <FormGroup> 
                    <Label htmlFor="menu">Menu Images</Label>            
                    <Input type="file" id="menu" name="menu" className="form-control" multiple onChange={this.onMenuImageChange} />
                  </FormGroup>              
                </Col>
                <Col md={"12"}>
                  <FormGroup> 
                    <Label htmlFor="address">Address</Label>            
                    <Input type="text" placeholder="Address" id="address" name="address" value={this.state.formField.address} onChange={this.changeHandler}  />
                  </FormGroup>
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

  

    );
  }
}

function SetCategoryDropDownItem (props) {
  const categoryInfo = props.categoryInfo;
  return (<option value={categoryInfo.categoryId} >{categoryInfo.categoryName}</option>)
}

export default FoodTruckLists;
