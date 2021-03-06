import React, { Component } from 'react';
import { 
  Card, CardBody, Col, Row, Button, Form, Input, FormGroup, Label,
  Modal, ModalHeader, ModalBody, ModalFooter
} from 'reactstrap';

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import commonService from '../../../../core/services/commonService';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import EnquiryData from './FoodTruckReviewListData';
import Loader from '../../../Loader/Loader';


class FoodTruckReviewList extends Component {
  constructor(props){
    super(props);
    this.state = {
      modal: false,
      enquiryLists: [],
      organizationList: [],
      loading: true,
      rowIndex: -1,
      formField: { reviewId: '', truckName: '', reviewedBY: '', rating:'', message:'', comment:'', status:'' },
      filterItem: { filter_organization_id: '', filterFrom:'',  filterTo:'', filterStatus:'' },    
    } 
    this.submitHandler = this.submitHandler.bind(this);
    this.handleEditEnquiry = this.handleEditEnquiry.bind(this);
    this.handleDeleteEnquiry = this.handleDeleteEnquiry.bind(this);
    this.filterEnquiryList = this.filterEnquiryList.bind(this);
  }

  // Fetch the Enquiry List
  componentDidMount() {     
    this.enquiryLists({});   
    this.organizationList();
  }

  /* Enquiry List API */
  enquiryLists(filterItem = {}) {
    let filterQuery = "?pageSize=20000";
    if(filterItem.filter_organization_id !== undefined && filterItem.filter_organization_id !== "" ) 
      filterQuery += (filterQuery !=="" ) ? "&organizationAuthId="+filterItem.filter_organization_id: "&organizationAuthId="+filterItem.filter_organization_id;
    if(filterItem.filterFrom !== undefined && filterItem.filterFrom !== "" ){
      let newFromDate = this.getFormatDate( filterItem.filterFrom );
      filterQuery += (filterQuery !=="" ) ? "&start_date="+newFromDate : "?start_date="+newFromDate;
    }
    if(filterItem.filterTo !== undefined && filterItem.filterTo !== "" ){
      let newToDate = this.getFormatDate( filterItem.filterTo );
      filterQuery += (filterQuery !=="" ) ? "&end_date="+newToDate: "?end_date="+newToDate;
    }
    if(filterItem.filterStatus !== undefined && filterItem.filterStatus !== "" ) 
      filterQuery += (filterQuery !=="" ) ? "&status="+filterItem.filterStatus: "?status="+filterItem.filterStatus;
    
    this.setState( { loading: true}, () => {
      commonService.getAPIWithAccessToken('food-truck/reviews'+filterQuery)
        .then( res => {
          if ( undefined === res.data.data || !res.data.status ) {
            this.setState( { loading: false } );
            toast.error(res.data.message);
            return;
          }   

          this.setState({loading:false, enquiryLists: res.data.data.reviewList});     
         
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

  /* Submit Form Handler*/
  submitHandler (event) {
    event.preventDefault();
    event.target.className += " was-validated";
    this.setState( { formProccessing: true}, () => {
      const formInputField = this.state.formField;
      const formData = {
        "reviewId": formInputField.reviewId,
        "status": formInputField.status, 
        "message": formInputField.comment
      };
      
      const rowIndex = this.state.rowIndex;
      if(rowIndex > -1) {
        commonService.putAPIWithAccessToken('food-truck/reviews/status/', formData)
        .then( res => {
          if ( undefined === res.data.data || !res.data.status ) {           
            this.setState( { formProccessing: false} );
            toast.error(res.data.message);
            return;
          } 
          
          this.setState({ modal: false, formProccessing: false});
          toast.success(res.data.message);
          this.enquiryLists();
         
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
    this.setState({ formField: formField });
  };
  
  toggle = () => {
    this.setState({
      modal: !this.state.modal,
      rowIndex: -1,
      formField: { truckName: '', reviewedBY: '', rating:'', message:'', comment:'', status: '', },
    });
  }

  /* To edit enquiry details/ change status */
  handleEditEnquiry(rowIndex){
    const rowData = this.state.enquiryLists[rowIndex];
    const formField = {
      reviewId: rowData.reviewId,
      truckName: rowData.truckName,
      reviewedBY: rowData.reviewedBY,
      rating: rowData.rating,
      message: rowData.message,
      comment: rowData.replyMessage,
      status: rowData.status,
    }
    this.setState({rowIndex: rowIndex, formField: formField, modal: true });
  }
  
  handleDeleteEnquiry(rowIndex){
    const rowInfo = this.state.enquiryLists[rowIndex];
    const delFormData = {
      "reviewId": rowInfo.reviewId,
    };
    this.setState( { loading: true}, () => {
      commonService.deleteAPIWithAccessToken( `food-truck/reviews/`, delFormData)
        .then( res => {
          this.setState({loading: false});
          if ( undefined === res.data || !res.data.status ) {            
             toast.error(res.data.message);      
            return;
          }         
          
          toast.success(res.data.message);
          this.enquiryLists();
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

  /*Organization List API*/
  organizationList() {      
    commonService.getAPIWithAccessToken('organization?pageSize=10000')
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
        }else 
          this.setState( { loading: false } );
      } )
  }

  filterEnquiryList(){
    const filterItem = this.state.filterItem;
    this.enquiryLists(filterItem);
  }
  
  changeFilterHandler = event => {
    const name = event.target.name;
    const value = event.target.value;
    const filterItem = this.state.filterItem
    filterItem[name] = value;
    this.setState({ filterItem: filterItem });
  };
  setFilterFromDate = date => {
    let filterFormField = this.state.filterItem;
    filterFormField.filterFrom = date;
    this.setState({ filterItem: filterFormField });
  };
  setFilterToDate = date => {
    let filterFormField = this.state.filterItem;
    filterFormField.filterTo = date;
    this.setState({ filterItem: filterFormField });
  };

  resetfilterForm = () => {
    this.setState({
      filterItem: { filter_organization_id: '', filterFrom:'',  filterTo:'', filterStatus:'' }
    });
    this.enquiryLists();
  }
  
  getFormatDate(date) {
    var year = date.getFullYear().toString();
    var month = (date.getMonth() + 101).toString().substring(1);
    var day = (date.getDate() + 100).toString().substring(1);
    return year + "-" + month + "-" + day;
  }

  render() {
    const { enquiryLists, organizationList, loading, modal, formField, formProccessing, filterItem } = this.state;
    
    const processingBtnText = <>Submit <i className="fa fa-spinner"></i></>;
    let loaderElement = '';
    if(loading)        
      loaderElement = <Loader />

    return (
      <div className="animated fadeIn user-dashboard">
        {loaderElement}
        <Card>
          <CardBody>
            <Row>
              <Col md={12}>
                <Row className="filterRow">                      
                  <Col md={"4"} className="pl-3">
                    <FormGroup> 
                      <Label htmlFor="filter_organization_id">Organization</Label>            
                      <Input type="select" placeholder="Organization *" id="filter_organization_id" name="filter_organization_id" value={filterItem.filter_organization_id} onChange={this.changeFilterHandler} >
                        <option value="">All</option>
                        {organizationList.map((organizationInfo, index) =>
                          <SetOrganizationDropDownItem key={index} organizationInfo={organizationInfo} />
                        )}
                      </Input>
                    </FormGroup> 
                  </Col>
                  <Col md={"2"}>
                    <FormGroup> 
                      <Label>Status</Label>
                      <Input type="select" name="filterStatus" value={filterItem.filterStatus} onChange={this.changeFilterHandler}>
                        <option value="">All</option>
                        <option value="2">Pending</option>
                        <option value="1">Approved</option>
                        <option value="3">Rejected</option>
                      </Input>
                    </FormGroup>  
                  </Col>
                  <Col md={"2"}>
                    <FormGroup> 
                      <Label>Date From</Label>
                      <DatePicker className="form-control" selected={ filterItem.filterFrom } onChange={this.setFilterFromDate} dateFormat="MM/dd/yyyy" />
                    </FormGroup>  
                  </Col>
                  <Col md={"2"}>
                    <FormGroup> 
                      <Label>Date To</Label>
                      <DatePicker className="form-control" selected={ filterItem.filterTo } onChange={this.setFilterToDate} dateFormat="MM/dd/yyyy" />
                    </FormGroup>  
                  </Col>
                  <Col md={"1"} className="p-0">
                    <FormGroup> 
                      <Label>&nbsp;</Label><br />
                      <Button color="success" type="button" size="sm" onClick={this.filterEnquiryList} title="Filter Reviews"><i className="fa fa-search"></i></Button>&nbsp;
                      <Button color="danger" type="reset" size="sm" onClick={this.resetfilterForm} title="Clear Fields"><i className="fa fa-refresh"></i></Button>
                    </FormGroup>             
                  </Col>
                </Row>
              </Col>
              
              <Col md={12}>
                <EnquiryData data={enquiryLists} editEnquiryAction={this.handleEditEnquiry} deleteEnquiryAction={this.handleDeleteEnquiry} dataTableLoadingStatus = {this.state.loading} />
              </Col>
            </Row> 
          </CardBody>
        </Card>

        <Modal isOpen={modal} toggle={this.toggle} size="lg" className="full-width-modal-section equiry-modal">
          <ModalHeader toggle={this.toggle}>Enquiry Message</ModalHeader>
          <Form onSubmit={this.submitHandler} noValidate className="texQueForm">
            <ModalBody>
              
              <Row>
                <Col md={"6"}>
                  <FormGroup> 
                    <Label htmlFor="truckName">Truck Name</Label>            
                    <Input type="text" placeholder="Truck Name" id="truckName" name="truckName" value={formField.truckName} disabled />
                  </FormGroup>  
                </Col>
                <Col md={"6"}>
                  <FormGroup> 
                    <Label htmlFor="contactPerson">Reviewed Person</Label>            
                    <Input type="text" placeholder="Contact Person" id="contactPerson" value={formField.reviewedBY} disabled />
                  </FormGroup>
                </Col>
                <Col md={"6"}>
                  <FormGroup> 
                    <Label htmlFor="rating">Rating</Label>            
                    <Input type="text" placeholder="Phone Number" id="rating" value={formField.rating} disabled />
                  </FormGroup>
                </Col>
                <Col md={"6"}>
                  <FormGroup> 
                    <Label htmlFor="status">Status</Label>
                    <Input type="select" name="status" id="status" value={(formField.status ? formField.status : 2 ) } onChange={this.changeHandler} required >
                      <option value="1">Approved</option>
                      <option value="2">Pending</option>
                      <option value="3">Rejected</option>
                    </Input>   
                  </FormGroup>
                </Col>
                
                <Col md={"12"}>
                  <FormGroup> 
                    <Label htmlFor="message">Message</Label>            
                    <Input type="textarea" id="message" name="message" value={formField.message} disabled />
                  </FormGroup>
                </Col>
                
                <Col md={"12"}>
                  <FormGroup> 
                    <Label htmlFor="comment">Comment</Label>            
                    <Input type="textarea" placeholder="Put your comments here" id="comment" name="comment" value={formField.comment} onChange={this.changeHandler} />
                  </FormGroup>
                </Col>
              </Row>
            </ModalBody>
            <ModalFooter>
              <Button color="primary"  type="submit">{formProccessing ? processingBtnText : 'Update Details' }</Button>
              <Button color="secondary" onClick={this.toggle}>Cancel</Button>
            </ModalFooter>
          </Form>
        </Modal>
      </div>

    );
  }
}

function SetOrganizationDropDownItem (props) {
  const organizationInfo = props.organizationInfo;
  return (<option value={organizationInfo.authId} >{organizationInfo.organizationName}</option>)
}

export default FoodTruckReviewList;
