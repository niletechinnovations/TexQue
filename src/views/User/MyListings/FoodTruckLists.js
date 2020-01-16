import React, { Component } from 'react';
import { Card, CardBody, CardHeader, Col, Row, Button, Input, FormGroup, Label} from 'reactstrap';

//import  { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import commonService from '../../../core/services/commonService';

import FoodTruckData from './FoodTruckData';
import Loader from '../../Loader/Loader';

//import "./MyList.css";

class FoodTruckLists extends Component {
  constructor(props){
    super(props);
    this.state = {
      truckLists: [],      
      loading: true,
      formProccessing: false,
      rowIndex: -1,
      formField: { truckName: '', phoneNumber: '', address: '', city: '', state: '', country: '', postalCode: ''},
      formErrors: { truckName: '', error: ''},
      formValid: false,
      filterItem: { filter_organization_id: '', custom_search: ''},
    } 
    this.handleDeleteStore = this.handleDeleteStore.bind(this);
    this.filterTruckLists = this.filterTruckLists.bind(this);
    
  }
  // Fetch the Employee List
  componentDidMount() {     
    this.truckLists({});   
    
  }
  /*Employee List API*/
  truckLists(filterItem = {}) {
    let stroreWalkQuery = "";
    
    if(filterItem.country !== undefined && filterItem.country !== "" ) 
      stroreWalkQuery += (stroreWalkQuery !=="" ) ? "&country="+filterItem.country: "?country="+filterItem.country;
    if(filterItem.state !== undefined && filterItem.state !== "" ) 
      stroreWalkQuery += (stroreWalkQuery !=="" ) ? "&state="+filterItem.state: "?state="+filterItem.state;
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

          this.setState({loading:false, truckLists: res.data.data});     
         
        } )
        .catch( err => {         
          if(err.response !== undefined && err.response.status === 401) {
            localStorage.clear();
            this.props.history.push('/login');
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
      const formData = {       
        "truckName": formInputField.truckName, 
        "phoneNumber": formInputField.phoneNumber, 
        "address": formInputField.address, 
        "city": formInputField.city, 
        "state": formInputField.state, 
        "country": formInputField.country, 
        "postalCode": formInputField.postalCode,      
      };
      const rowIndex = this.state.rowIndex;
      if(rowIndex > -1) {
        const storeInfo = this.state.truckLists[rowIndex];

        commonService.putAPIWithAccessToken('food-truck/'+storeInfo.storeId, formData)
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
        commonService.postAPIWithAccessToken('store', formData)
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
      (formErrors.store_name === "" && formField.store_name !== "") 
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
      formField: { truckName: '', phoneNumber: '', address: '', city: '', state: '', country: '', postalCode: '' },
      formErrors: {truckName: '', error: ''}
    });
  }
  /* Edit Employee*/
  handleEditStore(rowIndex){
      const storeInfo = this.state.truckLists[rowIndex];
      const formField = {        
        truckName: storeInfo.truckName, 
        phoneNumber: storeInfo.phoneNumber, 
        address: storeInfo.address, 
        city: storeInfo.city, 
        state: storeInfo.state, 
        country: storeInfo.country, 
        postalCode: storeInfo.postalCode };
      this.setState({rowIndex: rowIndex, formField: formField, modal: true, formValid: true});
  }
  /* Delete Employee*/
  handleDeleteStore(rowIndex){
   
    
  }
  
 
  selectRegion (val) {
    let formField = this.state.formField;
    formField.state = val
    this.setState({ formField: formField });
  }

  selectFilterCountry (val) {
    let filterItem = this.state.filterItem;
    filterItem.country = val
    this.setState({ filterItem: filterItem });
  }
 
  selectFilterRegion (val) {
    let filterItem = this.state.filterItem;
    filterItem.state = val
    this.setState({ filterItem: filterItem });
  }

  render() {
    const { truckLists, loading } = this.state;     
    let loaderElement = '';
    if(loading)        
      loaderElement = <Loader />

    return (
      <div className="user-dashboard">
        {loaderElement}
        <Card>
          <CardHeader className="mainHeading">
            <strong>Food Truck Lists</strong> <Button color="abc" className="addListing" type="button" onClick={this.toggle}><i className="fa fa-plus"></i> Add New</Button>
          </CardHeader>
          <CardBody>
            
            <Row>
              <Col md={12}>
                <Row>                     
                  <Col md={"5"}>
                    <FormGroup> 
                    <Input type="text" placeholder="Search By Name" name="truckName" value={this.state.formField.truckName} onChange={this.changeFilterHandler} />            
                    </FormGroup>  
                  </Col>
                  <Col md={"5"}>
                    <FormGroup> 
                    <Input type="text" placeholder="Search By Location" name="location" value={this.state.formField.location} onChange={this.changeFilterHandler} />       
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
      </div>
    );
  }
}

export default FoodTruckLists;
