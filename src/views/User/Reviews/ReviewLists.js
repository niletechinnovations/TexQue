import React, { Component } from 'react';
import { 
  Card, CardBody, Col, Row, Button, Form, Input, FormGroup, Label,
  Modal, ModalHeader, ModalBody, ModalFooter
} from 'reactstrap';

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import commonService from '../../../core/services/commonService';

import ReviewData from './ReviewData';
import Loader from '../../Loader/Loader';


class ReviewLists extends Component {
  constructor(props){
    super(props);
    this.state = {
      modal: false,
      dataLists: [],
      formProccessing: false,
      loading: true,
      rowIndex: -1,
      formField: { reviewId: '', truckName: '', reviewedBY: '', rating:'', statusLabel:'', comment:'' },
    } 
    this.submitHandler = this.submitHandler.bind(this);
    this.handleEditData = this.handleEditData.bind(this);
  }

  componentDidMount() {     
    this.reviewLists({});   
  }

  /* Review List API */
  reviewLists() {
    this.setState( { loading: true}, () => {
      commonService.getAPIWithAccessToken('food-truck/reviews?pageSize=10000')
        .then( res => {
           
          if ( undefined === res.data.data || !res.data.status ) {
            this.setState( { loading: false } );
            toast.error(res.data.message);
            return;
          }   

          this.setState({loading:false, dataLists: res.data.data.reviewList});     
         
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

  /* Submit Form Handler*/
  submitHandler (event) {
    event.preventDefault();
    event.target.className += " was-validated";
    this.setState( { formProccessing: true}, () => {
      const formInputField = this.state.formField;
      const formData = {
        "reviewId": formInputField.reviewId,
        "comments": formInputField.comment
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
          this.reviewLists();
         
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
          this.reviewLists();
         
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
      //formField: { truckName: '', contactPerson: '', contactNo:'', numberofPerson:'', eventDate:'', message:'', comment:'', status: '', },
    });
  }

  /* To edit review details/ change status */
  handleEditData(rowIndex){
      const rowData = this.state.dataLists[rowIndex];
      const formField = {
          reviewId: rowData.reviewId,
          truckName: rowData.truckName,
          reviewedBY: rowData.reviewedBY,
          rating: rowData.rating,
          eventDate: rowData.eventDate,
          message: rowData.message,
          comment: rowData.comment,
          statusLabel: rowData.statusLabel,
          status: rowData.status,
      }
      this.setState({rowIndex: rowIndex, formField: formField, modal: true });
  }

  
  render() {
    const { dataLists, loading, modal, formField, formProccessing } = this.state;
        
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
                <ReviewData data={dataLists} editDataAction={this.handleEditData} dataTableLoadingStatus = {this.state.loading} />
              </Col>
            </Row> 
          </CardBody>
        </Card>

        <Modal isOpen={modal} toggle={this.toggle} size="lg" className="full-width-modal-section equiry-modal">
          <ModalHeader toggle={this.toggle}>Review Details</ModalHeader>
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
                    <Label htmlFor="reviewedBY">Reviewed BY</Label>            
                    <Input type="text" placeholder="Contact Person" id="reviewedBY" value={formField.reviewedBY} disabled />
                  </FormGroup>
                </Col>
                <Col md={"6"}>
                  <FormGroup> 
                    <Label htmlFor="rating">Rating</Label>            
                    <Input type="text" id="rating" name="rating" value={formField.rating} disabled />
                  </FormGroup>
                </Col>
                <Col md={"6"}>
                  <FormGroup> 
                    <Label htmlFor="statusLabel">Status</Label>            
                    <Input type="text" id="statusLabel" value={formField.statusLabel} disabled />
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
                <Button color="primary" type="submit">{formProccessing ? processingBtnText : 'Submit' }</Button>
                <Button color="secondary" onClick={this.toggle}>Cancel</Button>
            </ModalFooter>
          </Form>
        </Modal>
      </div>

  

    );
  }
}

export default ReviewLists;
