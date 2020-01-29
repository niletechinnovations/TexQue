import React, { Component } from 'react';
import {
 // Badge,
 Card,
  CardBody,
  Col,
  Row,
} from 'reactstrap';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import commonService from '../../../core/services/commonService';

import {
  PeopleAlt,
  LocalShipping,
  MailOutline,
  SupervisorAccount
} from '@material-ui/icons';

import NewUserData from './NewUsersData';

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
     loading: false,
      dashBoardStats: {organizationCount: 0, usersCount: 0},
      userList: [],
      organizationData: []
    };
  }

  componentDidMount() { 
    this.setState( { loading: true}, () => {
      commonService.getAPIWithAccessToken('profile/list?pageNo=1&pageSize=10')
        .then( res => {
          console.log(res);
           
          if ( undefined === res.data.data || !res.data.status ) {
            this.setState( {  loading: false } );
            toast.error(res.data.message);    
            return;
          }  
          const responseData = res.data.data;
          this.setState({loading:false, userList: responseData.profileList});     
         
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
 

  loading = () => <div className="animated fadeIn pt-1 text-center">Loading...</div>

  render() {

    return (
      <div className="animated fadeIn admin-dashboard">
        <Row>
          <Col xs="12" sm="6" lg="3">
            <Card className="text-white bg-info">
              <CardBody>
                <div className="float-right">
                  <PeopleAlt />
                </div>
                <div className="text-value">4,000</div>
                <div>Total Users</div>
              </CardBody>
            </Card>
          </Col>
          <Col xs="12" sm="6" lg="3">
            <Card className="text-white bg-warning">
              <CardBody>
                <div className="float-right">
                  <SupervisorAccount />
                </div>
                <div className="text-value">150</div>
                <div>Total Food Truck Owners</div>
              </CardBody>
            </Card>
          </Col>
          <Col xs="12" sm="6" lg="3">
            <Card className="text-white bg-success">
              <CardBody>
                <div className="float-right">
                  <LocalShipping />
                </div>
                <div className="text-value">850</div>
                <div>Total Food Truck Listings</div>
              </CardBody>              
            </Card>
          </Col>
          <Col xs="12" sm="6" lg="3">
            <Card className="text-white bg-danger">
              <CardBody>
                <div className="float-right">
                  <MailOutline />
                </div>
                <div className="text-value">8,230</div>
                <div>Total Enquiries</div>
              </CardBody>
            </Card>
          </Col>
        </Row>
        <Row>
          <Col>
            <Card>
              <CardBody>
                <NewUserData data={this.state.userList} />

              </CardBody>              
            </Card>
          </Col>
        </Row>
        
        
      
      </div>
    );
  }
}

export default Dashboard;
