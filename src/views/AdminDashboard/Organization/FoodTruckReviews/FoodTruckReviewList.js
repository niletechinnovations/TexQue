import React, { Component } from 'react';
import { 
  Card, CardBody, Col, Row, Button, Form, Input, FormGroup, Label,
  Modal, ModalHeader, ModalBody, ModalFooter
} from 'reactstrap';

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import commonService from '../../../../core/services/commonService';

import EnquiryData from './FoodTruckReviewListData';
import Loader from '../../../Loader/Loader';


class FoodTruckReviewList extends Component {
  constructor(props){
    super(props);
    this.state = {
      modal: false,
      enquiryLists: [],
      loading: true,
      rowIndex: -1,
      formField: { reviewId: '', truckName: '', reviewedBY: '', rating:'', message:'', comment:'', status:'' },
     
    } 
    this.submitHandler = this.submitHandler.bind(this);
    this.handleEditEnquiry = this.handleEditEnquiry.bind(this);
    this.handleDeleteEnquiry = this.handleDeleteEnquiry.bind(this);

  }

  // Fetch the Enquiry List
  componentDidMount() {     
    this.enquiryLists({});   
  }

  /* Enquiry List API */
  enquiryLists() {
    this.setState( { loading: true}, () => {
      commonService.getAPIWithAccessToken('food-truck/reviews?pageSize=20000')
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

  render() {
    const { enquiryLists, loading, modal, formField, formProccessing } = this.state;
    
    const processingBtnText = <>Submit <i className="fa fa-spinner"></i></>;
    let loaderElement = '';
    if(loading)        
      loaderElement = <Loader />

    return (
      <div className="user-dashboard">
        {loaderElement}
        <Card>
          <CardBody>
            <Row>
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
                    <Input type="select" name="status" id="status" value={(formField.status ? 1 : 0 ) } onChange={this.changeHandler} required >
                      <option value="1">Approve</option>
                      <option value="0">Pending</option>
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

export default FoodTruckReviewList;