import React, { Component } from 'react';
import { Card, CardBody, Col, Row, Button, Form, Input, FormGroup, Label, Modal, ModalHeader, ModalBody, ModalFooter} from 'reactstrap';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import commonService from '../../../core/services/commonService';

import { FormErrors } from '../../Formerrors/Formerrors';
import Loader from '../../Loader/Loader';
import UsersData from './AdvertiserListData';

class AdvertiserList extends Component {
  constructor(props){
    super(props);
    this.state = {
      loading: true,
      userList: [],
      rowIndex: -1,
      changeStatusBtn:'',
      formProccessing: false,
      formField: {profileId:'', email: '', first_name: '', last_name: '', phoneNumber: '', address: '', profilePic:'' },
      formErrors: { email: '', first_name: '', last_name: '', error: ''},
      formValid: false,
      profileImage:'',
      filterItem: { user_name: '', location: '', custom_search: ''},
    }

    this.handleEditUser = this.handleEditUser.bind(this);
    this.onProfileImgChange = this.onProfileImgChange.bind(this)

  }
  componentDidMount() { 
    this.userList();
  }

  /*User List API*/
  userList() {
    
    this.setState( { loading: true}, () => {
      commonService.getAPIWithAccessToken(`statistics/advertiser-list`)
        .then( res => {
          if ( undefined === res.data.data || !res.data.status ) {
            this.setState( {  loading: false } );
            toast.error(res.data.message);    
            return;
          }
          this.setState({loading:false, userList: res.data.data.listItem});
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

   /* Input Field On changes*/
   changeHandler = event => {
    const name = event.target.name;
    const value = event.target.value;
    const formField = this.state.formField
    formField[name] = value;
    this.setState({ formField: formField });
  };

  /* Edit User*/
  handleEditUser(rowIndex){
    const userInfo = this.state.userList[rowIndex];
    const formField = {
      profileId:userInfo.profileId,
      email: userInfo.email, 
      first_name: userInfo.firstName, 
      last_name: userInfo.lastName, 
      phoneNumber: userInfo.phoneNumber, 
      address: userInfo.address,
      profilePic: userInfo.profilePic
    };
    const statusBtn = <Button type="button" size="sm" className={`changeStatusBtn `+( userInfo.status ? 'btn-danger' : 'btn-success' )} onClick={() => 
      this.changeProfileStatus(userInfo.profileId, userInfo.status )} >{ ( userInfo.status ? 'De-Activate Account' : 'Activate Account' )}</Button>
    
    this.setState({rowIndex: rowIndex, formField: formField, modal: true, changeStatusBtn:statusBtn, formValid: true});
  }

  //Set profile picture on change
  onProfileImgChange = (event) => {
    this.setState({
      profileImage: event.target.files[0],
    });
    if(event.target.files.length > 0){
      this.setState( { loading: true}, () => {  
        const formData = new FormData();
        formData.append('profileImage', this.state.profileImage );
        formData.append('profileId', this.state.formField.profileId);
      
        commonService.putAPIWithAccessToken('profile/picture', formData)
        .then( res => {
          if ( undefined === res.data.data || !res.data.status ) {
            this.setState( { loading: false} );
            toast.error(res.data.message);
            return;
          }
          this.setState({ loading: false});
          this.userList();
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
      } ) 
    }
     
  }
 
  toggle = () => {
    this.setState({
      modal: !this.state.modal,
      rowIndex: -1,
      changeStatusBtn: '',
      formValid: false,
      formField: { profileId:'', email: '', first_name: '', last_name: '', phoneNumber: '', address: '', profilePic: '' },
      formErrors: { email: '', first_name: '', last_name: '', error: ''}
    });
  }

  render() {

    const { userList, loading, modal, changeStatusBtn, formProccessing } = this.state;     
    let loaderElement = '';
    if(loading) 
      loaderElement = <Loader />

      const processingBtnText = <>Submit <i className="fa fa-spinner"></i></>;

    return (
      <div className="animated fadeIn">
        <Row>
          <Col lg={12}>
            <Card>
              <CardBody>
                <ToastContainer />
                {loaderElement}
                <UsersData data={userList} editUserAction={this.handleEditUser} deleteUserAction={this.handleDeleteUser} dataTableLoadingStatus = {this.state.loading} />
              </CardBody>
            </Card>
          </Col>
        </Row>

        <Modal isOpen={modal} toggle={this.toggle} className="full-width-modal-section organization-modal">
          <ModalHeader toggle={this.toggle}>Advertiser Info</ModalHeader>
          <Form onSubmit={this.submitHandler} noValidate>
            <ModalBody>
              <FormErrors formErrors={this.state.formErrors} />
              <Row>
                <Col md={"6"}>  
                  <FormGroup> 
                    <Label htmlFor="first_name">First Name</Label>            
                    <Input type="text" placeholder="First Name *" id="first_name" name="first_name" value={this.state.formField.first_name} onChange={this.changeHandler} required />
                  </FormGroup>
                </Col>
                <Col md={"6"}>  
                  <FormGroup> 
                    <Label htmlFor="last_name">Last Name</Label>            
                    <Input type="text" placeholder="Last Name *" id="last_name" name="last_name" value={this.state.formField.last_name} onChange={this.changeHandler} />
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
                </Row>           
            </ModalBody>
            <ModalFooter>
              {changeStatusBtn}
              <Button color="primary" disabled={!this.state.formValid || formProccessing} type="submit">{formProccessing ? processingBtnText : 'Submit' }</Button>
              <Button color="secondary" onClick={this.toggle}>Cancel</Button>
            </ModalFooter>
          </Form>
        </Modal>
       
      </div>

    )
  }
}

export default AdvertiserList;
