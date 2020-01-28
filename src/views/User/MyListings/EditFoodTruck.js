import React, { Component } from 'react';
import {
   Card, CardBody, CardHeader, Col, Row, Button, Form, Input, FormGroup, Label
} from 'reactstrap';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import commonService from '../../../core/services/commonService';
import SetCategoryDropDownItem from '../../../core/commonComponent/categoryDropDown';
import Loader from '../../Loader/Loader';
import { FormErrors } from '../../Formerrors/Formerrors';
import "./EditFoodTruck.css";

class EditFoodTruck extends Component {
  constructor(props) {
    super( props );

    this.state = {
      data: '',      
      loading: false,
      formProccessing: false,
      foodTruckId: "",
      categoryList: [],
      featuredImage: '',
      menuImages: [],
      foodTruckDetail: {},
      formField: { truckName: '', contactPerson: '', phoneNumber:'', address: '',defaultImage: '',category_id:''},
      formErrors: { truckName: '', contactPerson: '', phoneNumber:'', address:'', error: ''},
      formValid: false,
    };
    this.submitHandler = this.submitHandler.bind(this);
  }

  componentDidMount() {     
    const { match: { params } } = this.props;    
    if(params.foodTruckId !== undefined && params.foodTruckId !=="") {
      this.setState({foodTruckId: params.foodTruckId});
      this.getFoodTruckDetail(params.foodTruckId);
    }
    else 
        this.props.history.push('/user/my-listings');
    this.categoryList();
  }

  getFoodTruckDetail(foodTruckId) {
    this.setState( { loading: true}, () => {
        commonService.getAPIWithAccessToken('food-truck/'+foodTruckId)
        .then( res => {
          if ( undefined === res.data.data || !res.data.status ) {
           
            this.setState( { loading: false} );
            toast.error(res.data.message);
            return;
          } 
          const foodTruckDetail = res.data.data;
          let formField = this.state.formField;
          formField.truckName = foodTruckDetail.truckName;
          formField.contactPerson = foodTruckDetail.contactPerson;
          formField.phoneNumber = foodTruckDetail.phoneNumber;
          formField.address = foodTruckDetail.address;
          formField.category_id = foodTruckDetail.categories.length > 0 ? foodTruckDetail.categories[0] : "";

          this.setState({ loading: false, foodTruckDetail: foodTruckDetail, formValid: true, formField: formField});
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
  }
 

  /* Submit Form Handler*/
  submitHandler (event) {
    event.preventDefault();
    event.target.className += " was-validated";
    this.setState( { formProccessing: true}, () => {
      const formInputField = this.state.formField;
      const formData = new FormData();
      formData.append('foodTruckId', this.state.foodTruckId);
      formData.append('truckName', formInputField.truckName);
      formData.append('address', formInputField.address);
      formData.append('contactPerson', formInputField.contactPerson);
      formData.append('phoneNumber', formInputField.phoneNumber);
      formData.append('category_id[0]', formInputField.category_id);
      if(this.state.featuredImage !== "")
        formData.append('featuredImage', this.state.featuredImage);
      
      for(let i =0; i < this.state.menuImages.length; i++){
        formData.append('menuImages', this.state.menuImages[i]);
      }
      
      commonService.putAPIWithAccessToken('food-truck', formData)
      .then( res => {
        debugger;
        if ( undefined === res.data.data || !res.data.status ) { 
          this.setState( { formProccessing: false} );
          toast.error(res.data.message);
          return;
        } 
        
        this.setState({ modal: false});
        toast.success(res.data.message);
        //this.props.history.push('/user/my-listings');
       
      } )
      .catch( err => { 
        debugger;        
        if(err.response !== undefined && err.response.status === 401) {
          localStorage.clear();
          this.props.history.push('/login');
        }
        else
          this.setState( { formProccessing: false } );
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
    const { loading, formProccessing, categoryList, foodTruckDetail } = this.state;
    const processingBtnText = <>Submit <i className="fa fa-spinner"></i></>;
    let loaderElement = '';
    let defaultImagePreview = '';  
    let menuImages = (foodTruckDetail.menu !== undefined && foodTruckDetail.menu.length > 0 ) ? foodTruckDetail.menu: [];
    if(foodTruckDetail.featuredImage !== "")
      defaultImagePreview = <div className="previewDefaultImage"><img alt="default" src={foodTruckDetail.featuredImage} /></div>
   
    
    if(loading)        
      loaderElement = <Loader />
    return (
      <div className="user-dashboard">
        {loaderElement}
        <Card>
          <CardHeader className="mainHeading">
            <strong>Food Truck</strong>
            <Button size="sm" color="secondary" className="addListing pull-right" type="button" ><i className="fa fa-arrow-left"></i> Back</Button>
          </CardHeader>
          <CardBody>
            
            <Form onSubmit={this.submitHandler} noValidate className="texQueForm">
            
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
                <Col md={"12"}>
                  <FormGroup> 
                    <Label htmlFor="address">Address</Label>            
                    <Input type="text" placeholder="Address" id="address" name="address" value={this.state.formField.address} onChange={this.changeHandler}  />
                  </FormGroup>
                </Col>
                <Col md={"6"}>
                  <FormGroup> 
                    <Label htmlFor="defaultImage">Default Image</Label>            
                    <Input type="file" id="defaultImage" name="defaultImage" className="form-control"  onChange={this.handleImageChange} />
                    {defaultImagePreview}
                  </FormGroup>              
                </Col>
                <Col md={"12"}>
                  <FormGroup> 
                    <Label htmlFor="menu">Menu Images</Label>            
                    <Input type="file" id="menu" name="menu" className="form-control" multiple onChange={this.onMenuImageChange} />
                  </FormGroup> 
                  <div className="previewMenuImageArea row">
                      {menuImages.map((imagesInfo, index) =>
                        <SetupMenuImages key={index} imagesInfo={imagesInfo} />
                      )}
                  </div>             
                </Col>
                
              </Row>
              <Button color="primary" disabled={!this.state.formValid || formProccessing} type="submit">{formProccessing ? processingBtnText : 'Submit' }</Button>
              <Button color="secondary" onClick={this.toggle}>Cancel</Button>
            
            </Form> 
          </CardBody>
        </Card>
      </div>
    );
  }
}
function SetupMenuImages(props){
debugger;
        return (<div className="previewMenuImage col-md-3"><img alt="menu" src={props.imagesInfo} /> <i className="fa fa-times"></i></div>);
      
}
export default EditFoodTruck;


