import React, { Component } from 'react';
import { Line } from 'react-chartjs-2';

import { Card, CardBody, Col, Row } from 'reactstrap';
import { PeopleAlt, LocalShipping, MailOutline, SupervisorAccount } from '@material-ui/icons';
import { CustomTooltips } from '@coreui/coreui-plugin-chartjs-custom-tooltips';

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import commonService from '../../../core/services/commonService';

import NewUserData from './NewUsersData';
import NewEnquiriesData from './NewEnquiriesData';

const line = {
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
  datasets: [
    {
      label: 'Food Truck Listings',
      fill: false,
      lineTension: 0.1,
      backgroundColor: 'rgba(213,4,43,0.4)',
      borderColor: 'rgba(213,4,43,1)',
      borderCapStyle: 'butt',
      borderDash: [],
      borderDashOffset: 0.0,
      borderJoinStyle: 'miter',
      pointBorderColor: 'rgba(213,4,43,1)',
      pointBackgroundColor: '#D5042B',
      pointBorderWidth: 1,
      pointHoverRadius: 5,
      pointHoverBackgroundColor: 'rgba(213,4,43,1)',
      pointHoverBorderColor: 'rgba(220,220,220,1)',
      pointHoverBorderWidth: 2,
      pointRadius: 1,
      pointHitRadius: 10,
      data: [60, 55, 50, 21, 56, 55, 40, 10, 45, 35, 25, 15],
    },
    {
      label: 'Food Truck Enquiries',
      fill: false,
      lineTension: 0.1,
      backgroundColor: 'rgba(0,33,100,0.4)',
      borderColor: 'rgba(0,33,100,1)',
      borderCapStyle: 'butt',
      borderDash: [],
      borderDashOffset: 0.0,
      borderJoinStyle: 'miter',
      pointBorderColor: 'rgba(0,33,100,1)',
      pointBackgroundColor: '#002164',
      pointBorderWidth: 1,
      pointHoverRadius: 5,
      pointHoverBackgroundColor: 'rgba(0,33,100,1)',
      pointHoverBorderColor: 'rgba(220,220,220,1)',
      pointHoverBorderWidth: 2,
      pointRadius: 1,
      pointHitRadius: 10,
      data: [20, 45, 30, 25, 46, 35, 10, 18, 25, 25, 45, 65],
    }
  ],
};
const options = {
  tooltips: {
    enabled: false,
    custom: CustomTooltips
  },
  maintainAspectRatio: false
}

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
     loading: false,
      dashBoardStats: {organizationCount: 0, usersCount: 0},
      userList: [],
      enquiryList:[],
      organizationData: []
    };
  }

  componentDidMount() { 
    this.setState( { loading: true}, () => {

      commonService.getAPIWithAccessToken('profile/list?pageNo=1&pageSize=10')
        .then( res => {
          if ( undefined === res.data.data || !res.data.status ) {
            this.setState( {  loading: false } );
            toast.error(res.data.message);    
            return;
          }  
          const responseData = res.data.data;
          this.setState({loading:false, userList: responseData.profileList});
        } )
        
      commonService.getAPIWithAccessToken('food-truck/enquiry?pageNo=1&pageSize=10')
        .then( res => {
          if ( undefined === res.data.data || !res.data.status ) {
            this.setState( {  loading: false } );
            toast.error(res.data.message);    
            return;
          }
          console.log(res.data.data);
          this.setState({loading:false, enquiryList: res.data.data.enquiryList});
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
                <div className="chart-wrapper">
                  <Line data={line} options={options} height={85} />
                </div>
              </CardBody>
            </Card>
          </Col>
        </Row>

        {/* New Enquiries Data */}
        <Row>
          <Col>
            <Card>
              <CardBody className="dashboard-card-body">
                <NewEnquiriesData data={this.state.enquiryList} />

              </CardBody>              
            </Card>
          </Col>
        </Row>
        
        {/* New Users Data */}
        <Row>
          <Col>
            <Card>
              <CardBody className="dashboard-card-body">
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
