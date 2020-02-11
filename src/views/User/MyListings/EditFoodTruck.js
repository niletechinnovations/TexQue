import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import {
   Card, CardBody, CardHeader, Col, Row, Button, Form, Input, FormGroup, Label, Media
} from 'reactstrap';
import Select from 'react-select';

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import commonService from '../../../core/services/commonService';
//import SetCategoryDropDownItem from '../../../core/commonComponent/categoryDropDown';
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
      galleryImages:[],
      menuImages: [],
      selectedCategories: [],
      foodTruckDetail: {},
      formField: { truckName: '', contactPerson: '', phoneNumber:'', address: '',defaultImage: '',category_id:''},
      formErrors: { truckName: '', contactPerson: '', phoneNumber:'', address:'', error: ''},
      formValid: false,
    };
    this.submitHandler = this.submitHandler.bind(this);
    this.deleteTruckImage = this.deleteTruckImage.bind(this);
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
          formField.category_id = foodTruckDetail.categories.length > 0 ? foodTruckDetail.categories : "";

          let selectedOption = [];
          let c = 0;
          if(foodTruckDetail.categories !== undefined && foodTruckDetail.categories.length > 0){
            for(const [k, cat] of foodTruckDetail.categories.entries()){
              let catInfo = {
                label: cat.categoryName,
                value: cat.categoryId
              }
              selectedOption.push(catInfo);
              c = c+k;
            }
            this.setState({ selectedCategories: selectedOption });
          }
          

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
      if(this.state.featuredImage !== "")
        formData.append('featuredImage', this.state.featuredImage);
      
      for(let i =0; i < this.state.galleryImages.length; i++){
        formData.append('truckImages', this.state.galleryImages[i]);
      }
      
      for(let j =0; j < this.state.menuImages.length; j++){
        formData.append('menuImages', this.state.menuImages[j]);
      }

      for(let j =0; j < this.state.selectedCategories.length; j++){
        formData.append('categoryId', this.state.selectedCategories[j].value );
      }
      
      //console.log(this.state.selectedCategories);
      //return;
      commonService.putAPIWithAccessToken('food-truck', formData)
      .then( res => {
        //debugger;
        if ( undefined === res.data.data || !res.data.status ) { 
          this.setState( { formProccessing: false} );
          toast.error(res.data.message);
          return;
        } 
        
        this.setState({ modal: false});
        toast.success(res.data.message);
        this.props.history.push('/user/my-listings');
       
      } )
      .catch( err => { 
        //debugger;        
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
  onGalleryImageChange = event => {   
    this.setState({
      galleryImages: event.target.files,
    });
  };

  handleCategoryChange = (selectedOptions) => {
    this.setState({ selectedCategories: selectedOptions });
  }

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
          toast.error(err.response);
        }
        else 
          this.setState( { loading: false } );
      } )
  }
  
  deleteTruckImage(rowIndex,imageType){
    let formdata = {
      "foodTruckId":this.state.foodTruckId,
      deleteIndex:rowIndex,
      deleteType:imageType
    }

    this.setState( { loading: true}, () => {
      commonService.deleteAPIWithAccessToken( 'food-truck/images',formdata)
        .then( res => {
          this.setState({loading: false});
          if ( undefined === res.data || !res.data.status ) {            
             toast.error(res.data.message);      
            return;
          }         
          toast.success(res.data.message);
          //this.props.history.push(`/user/my-listings/`+this.state.foodTruckId);
          window.location.reload();
        } )
        .catch( err => {       
            
          if(err.response !== undefined && err.response.status === 401) {
            localStorage.clear();
            this.props.history.push('/login');
          }
          else{
            this.setState( { loading: false } );
            toast.error(err.message);
          }
      } )
    })
  }


  render() {
    const { loading, formProccessing, categoryList, foodTruckDetail,selectedCategories } = this.state;
    const processingBtnText = <>Submit <i className="fa fa-spinner"></i></>;
    let loaderElement = '';
    let defaultImagePreview = '';  
    let truckImages = (foodTruckDetail.images !== undefined && foodTruckDetail.images.length > 0 ) ? foodTruckDetail.images: [];
    if(foodTruckDetail.featuredImage !== "")
      defaultImagePreview = <div className="previewDefaultImage"><img alt="default" width="100" className="img-fluid img-thumbnail" src={foodTruckDetail.featuredImage} /></div>
    
    let menuImages = (foodTruckDetail.menu !== undefined && foodTruckDetail.menu.length > 0 ) ? foodTruckDetail.menu: [];
    
    let categoryItems = []; 
    let counter = 0;
    for(const [i, category] of categoryList.entries()){
      let categoryInfo = {
        label: category.categoryName,
        value: category.categoryId
      }
      categoryItems.push(categoryInfo);
      counter = counter+i;
    }

    
    
    if(loading)        
      loaderElement = <Loader />
    return (
      <div className="user-dashboard">
        {loaderElement}
        <Card>
          <CardHeader className="mainHeading">
            <strong>Food Truck</strong>
            <Link to="/user/my-listings" className="btn btn-sm btn-secondary addListing pull-right"><i className="fa fa-arrow-left"></i> Back</Link>
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
                    <Label htmlFor="category_id">Cuisine </Label>            
                    <Select name="category_id" id="category_id" options={categoryItems} value={selectedCategories} onChange={this.handleCategoryChange} isMulti />
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
                  </FormGroup>              
                </Col>
                <Col md={"6"}>{defaultImagePreview}</Col>
                <Col md={"6"}>
                  <FormGroup> 
                    <Label htmlFor="truckImages">Gallery Images</Label>            
                    <Input type="file" id="truckImages" name="truckImages" className="form-control" multiple onChange={this.onGalleryImageChange} />
                  </FormGroup> 
                </Col>  
                <Col md={"6"}>
                  <div className="previewTruckImageArea row">
                      {truckImages.map((truckImgInfo, index) =>
                        <Media className="previewTruckImage col-md-2" key={index}>
                          <img className="img-fluid img-thumbnail" width="80" alt="Truck" src={truckImgInfo} /> <i className="fa fa-times text-danger" onClick={() => {if(window.confirm('Are you sure, you want to delete this image?')){ this.deleteTruckImage(index,'image') };}}></i>
                        </Media>
                      )}
                  </div>             
                </Col>
                <Col md={"6"}>
                  <FormGroup> 
                    <Label htmlFor="menu">Menu Images</Label>            
                    <Input type="file" id="menu" name="menu" className="form-control" multiple onChange={this.onMenuImageChange} />
                  </FormGroup> 
                </Col>
                <Col md={"6"}>
                  <div className="previewMenuImageArea row">
                      {menuImages.map((imagesInfo, index) =>
                        <Media className="previewMenuImage col-md-2" key={index}>
                          <img className="img-fluid img-thumbnail" width="80" alt="menu" src={imagesInfo} /> <i className="fa fa-times text-danger" onClick={() => {if(window.confirm('Are you sure, you want to delete this image?')){ this.deleteTruckImage(index,'menu') };}}></i>
                        </Media>
                      )}
                  </div>             
                </Col>
                
              </Row>
              <Button color="primary" disabled={!this.state.formValid || formProccessing} type="submit">{formProccessing ? processingBtnText : 'Submit' }</Button>
              &nbsp; 
              <Link className="btn btn-secondary" to='/user/my-listings'>Cancel</Link>
            
            </Form> 
          </CardBody>
        </Card>
      </div>
    );
  }
}

export default EditFoodTruck;


