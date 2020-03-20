import React, { Component } from 'react';
import { 
  Card, CardBody, CardHeader, Col, Row, Button, Form, Input, FormGroup, Label,
  Modal, ModalHeader, ModalBody, ModalFooter
} from 'reactstrap';

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import commonService from '../../../../core/services/commonService';

import EnquiryData from './AdvertisementData';
import Loader from '../../../Loader/Loader';


class AdvertisementList extends Component {
  constructor(props){
    super(props);
    this.state = {
      modal: false,
      formProccessing: false,
      enquiryLists: [],
      loading: true,
      rowIndex: -1,
      formField: { advertisementId: '', adFile: '', adLink:'', status:'' },
    } 
    this.submitHandler = this.submitHandler.bind(this);
    this.handleEditEnquiry = this.handleEditEnquiry.bind(this);
    this.handleDeleteData = this.handleDeleteData.bind(this);
  }

  // Fetch the Ads List
  componentDidMount() {
    this.adsLists({});   
  }

 
  /* Enquiry List API */
  adsLists() {
    this.setState( { loading: true}, () => {
      commonService.getAPIWithAccessToken('advertisement?pageSize=1000')
        .then( res => {
           
          if ( undefined === res.data.data || !res.data.status ) {
            this.setState( { loading: false } );
            toast.error(res.data.message);
            return;
          }   

          this.setState({loading:false, enquiryLists: res.data.data});     
         
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
      const formData = new FormData();
      formData.append('adLink', formInputField.adLink);
      if(this.state.adFile)
        formData.append('adFile', this.state.adFile);

      formData.append('status', formInputField.status);

      const rowIndex = this.state.rowIndex;
      if(rowIndex > -1) {
        commonService.putAPIWithAccessToken('advertisement/update-advertisement/'+formInputField.advertisementId, formData)
        .then( res => {
          if ( undefined === res.data.data || !res.data.status ) {           
            this.setState( { formProccessing: false} );
            toast.error(res.data.message);
            return;
          } 
          
          this.setState({ modal: false, formProccessing: false});
          toast.success(res.data.message);
          this.adsLists();
         
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
        commonService.postAPIWithAccessToken('advertisement', formData)
        .then( res => {
         
          if ( undefined === res.data.data || !res.data.status ) { 
            this.setState( { modal: false, formProccessing: false} );
            toast.error(res.data.message);
            return;
          } 
          
          this.setState({ modal: false, formProccessing: false});
          toast.success(res.data.message);
          this.adsLists();
         
        } )
        .catch( err => {         
          if(err.response !== undefined && err.response.status === 401) {
            localStorage.clear();
            this.props.history.push('/login');
          }
          else
            this.setState( { modal: false, formProccessing: false } );
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

  handleImageChange = (e) => {
    this.setState({
      adFile: e.target.files[0]
    })
  };
  
  toggle = () => {
    this.setState({
      modal: !this.state.modal,
      rowIndex: -1,
      formField: { advertisementId:'', adFile: '', adLink: '', status: '', },
    });
  }

  /* To edit enquiry details/ change status */
  handleEditEnquiry(rowIndex){
      const rowData = this.state.enquiryLists[rowIndex];
      const formField = {
          advertisementId: rowData.advertisementId,
          adImage: rowData.adImage,
          adLink: rowData.adLink,
          userName: rowData.userName,
          createdAt: (new Date(rowData.createdAt)).toLocaleDateString("en-US"),
          status: rowData.adStatus
      }
      this.setState({rowIndex: rowIndex, formField: formField, modal: true });
  }
  handleDeleteData(rowIndex){
    const rowInfo = this.state.enquiryLists[rowIndex];
    this.setState( { loading: true}, () => {
      commonService.deleteAPIWithAccessToken( `advertisement/delete-adevertise/`+rowInfo.advertisementId)
        .then( res => {
          this.setState({loading: false});
          if ( undefined === res.data || !res.data.status ) {            
             toast.error(res.data.message);      
            return;
          }         
          
          toast.success(res.data.message);
          this.adsLists();
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
        
    let loaderElement = '';
    if(loading)        
      loaderElement = <Loader />
    
    const processingBtnText = <>Submit <i className="fa fa-spinner"></i></>;

    return (
      <div className="user-dashboard">
        {loaderElement}
        <Card>
          <CardHeader className="mainHeading">
            <strong>Advertisement</strong>
          </CardHeader>
          <CardBody>
            
            <Row>
              
              <Col md={12}>
                <EnquiryData data={enquiryLists} editEnquiryAction={this.handleEditEnquiry} deleteRowAction={this.handleDeleteData}  dataTableLoadingStatus = {this.state.loading} />
              </Col>
            </Row> 
          </CardBody>
        </Card>

        <Modal isOpen={modal} toggle={this.toggle}  className="full-width-modal-section equiry-modal">
          <ModalHeader toggle={this.toggle}>Advertisement</ModalHeader>
          <Form onSubmit={this.submitHandler} noValidate className="texQueForm">
            <ModalBody>
              
              <Row>
                <Col md={"6"}>
                  <FormGroup> 
                    <Label htmlFor="adFile">Ad File</Label>            
                    <Input type="file" id="adFile" name="adFile" className="form-control" onChange={this.handleImageChange} />
                  </FormGroup>  
                </Col>
                <Col md={"6"}>
                  <FormGroup>
                    {(formField.adImage!=='' ? <img src={formField.adImage} alt="Ad" width="100" className="img-thumbnail" /> : '' )}
                  </FormGroup>  
                </Col>
                <Col md={"6"}>
                  <FormGroup> 
                    <Label htmlFor="adLink">Ad Link (optional)</Label>            
                    <Input type="text" placeholder="" id="adLink" name="adLink" value={formField.adLink} onChange={this.changeHandler} />
                  </FormGroup>
                </Col>
                <Col md={"6"}>
                  <FormGroup> 
                    <Label htmlFor="status">Status</Label>            
                    <Input type="select" name="status" id="status" value={ formField.status } onChange={this.changeHandler} required >
                      <option value="1">Active</option>
                      <option value="2">Approval Pending</option>
                      <option value="3">Inactive</option>
                    </Input>
                  </FormGroup>
                </Col>
                <Col md={"6"}>
                  <FormGroup> 
                    <Label htmlFor="userName">User</Label>            
                    <Input type="text" id="userName" name="userName" value={formField.userName} disabled />
                  </FormGroup>
                </Col>
                <Col md={"6"}>
                  <FormGroup> 
                    <Label htmlFor="createdAt">Created on </Label>            
                    <Input type="text" id="createdAt" name="createdAt" value={formField.createdAt} disabled />
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

export default AdvertisementList;
