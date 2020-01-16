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


class Dashboard extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.onRadioBtnClick = this.onRadioBtnClick.bind(this);

    this.state = {
      dropdownOpen: false,
      radioSelected: 2,
      loading: false,
      dashBoardStats: {organizationCount: 0, inspectionCount: 0},
      inspectionLabels: [],
      inspectionData: [],
      organizationLables: [],
      organizationData: [],
      conductedInspection: {labels: [], data: []}
    };
  }

  componentDidMount() { 
    this.setState( { loading: true}, () => {
      commonService.getAPIWithAccessToken('profile/list')
        .then( res => {
          console.log(res);
           
          if ( undefined === res.data.data || !res.data.status ) {
            this.setState( {  loading: false } );
            toast.error(res.data.message);    
            return;
          }   
          const responseData = res.data.data;
          let conductedInspection = this.state.conductedInspection;
          conductedInspection.labels =  responseData.inspectionConducted.labels;
          conductedInspection.data =  responseData.inspectionConducted.data;
          this.setState({loading:false, dashBoardStats: res.data.data, 
            inspectionData: responseData.inspectionGraphData.data, inspectionLabels: responseData.inspectionGraphData.labels,
            organizationData: responseData.organizationGraphData.data, organizationLables: responseData.organizationGraphData.labels});     
         
        } )
        .catch( err => {         
          if(err.response !== undefined && err.response.status === 401) {
            localStorage.clear();
            this.props.history.push('/login');
          }
          else {
            this.setState( { loading: false } );
            //toast.error(err.message);    
          }
        } )
    } )
  }
  toggle() {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen,
    });
  }

  onRadioBtnClick(radioSelected) {
    this.setState({
      radioSelected: radioSelected,
    });
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
                <h5>Recent Registered Users</h5>
                  <div className="table-responsive">
                    <table className="table-outline mb-0 d-none d-sm-table table table-hover">
                        <thead className="thead-light">
                          <tr>
                              <th className="text-center"><i className="icon-people"></i></th>
                              <th>User</th>
                              <th className="text-center">Country</th>
                              <th>Usage</th>
                              <th className="text-center">Payment Method</th>
                              <th>Activity</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                              <td className="text-center">
                                <div className="avatar">
                                  <img src="/images/avtar3.jpg" className="img-avatar" alt="admin@bootstrapmaster.com" />
                                    <span className="avatar-status badge-success"></span></div>
                              </td>
                              <td>
                                <div>Yiorgos Avraamu</div>
                                <div className="small text-muted"><span>New</span> | Registered: Jan 1, 2015</div>
                              </td>
                              <td className="text-center"><i className="flag-icon flag-icon-us h4 mb-0" title="us" id="us"></i></td>
                              <td>
                                <div className="clearfix">
                                    <div className="float-left"><strong>50%</strong></div>
                                    <div className="float-right"><small className="text-muted">Jun 11, 2015 - Jul 10, 2015</small></div>
                                </div>
                                <div className="progress-xs progress">
                                    <div className="progress-bar bg-success" role="progressbar" aria-valuenow="50" aria-valuemin="0" aria-valuemax="100"></div>
                                </div>
                              </td>
                              <td className="text-center"><i className="fa fa-cc-mastercard"></i></td>
                              <td>
                                <div className="small text-muted">Last login</div>
                                <strong>10 sec ago</strong>
                              </td>
                          </tr>
                          <tr>
                              <td className="text-center">
                                <div className="avatar"><img src="/images/avtar2.jpg" className="img-avatar" alt="admin@bootstrapmaster.com" /><span className="avatar-status badge-danger"></span></div>
                              </td>
                              <td>
                                <div>Avram Tarasios</div>
                                <div className="small text-muted"><span>Recurring</span> | Registered: Jan 1, 2015</div>
                              </td>
                              <td className="text-center"><i className="flag-icon flag-icon-br h4 mb-0" title="br" id="br"></i></td>
                              <td>
                                <div className="clearfix">
                                    <div className="float-left"><strong>10%</strong></div>
                                    <div className="float-right"><small className="text-muted">Jun 11, 2015 - Jul 10, 2015</small></div>
                                </div>
                                <div className="progress-xs progress">
                                    <div className="progress-bar bg-info" role="progressbar" aria-valuenow="10" aria-valuemin="0" aria-valuemax="100"></div>
                                </div>
                              </td>
                              <td className="text-center"><i className="fa fa-cc-visa"></i></td>
                              <td>
                                <div className="small text-muted">Last login</div>
                                <strong>5 minutes ago</strong>
                              </td>
                          </tr>
                          <tr>
                              <td className="text-center">
                                <div className="avatar"><img src="/images/avatar.jpg" className="img-avatar" alt="admin@bootstrapmaster.com" /><span className="avatar-status badge-danger"></span></div>
                              </td>
                              <td>
                                <div>Friderik Dávid</div>
                                <div className="small text-muted"><span>New</span> | Registered: Jan 1, 2015</div>
                              </td>
                              <td className="text-center"><i className="flag-icon flag-icon-pl h4 mb-0" title="pl" id="pl"></i></td>
                              <td>
                                <div className="clearfix">
                                    <div className="float-left"><strong>43%</strong></div>
                                    <div className="float-right"><small className="text-muted">Jun 11, 2015 - Jul 10, 2015</small></div>
                                </div>
                                <div className="progress-xs progress">
                                    <div className="progress-bar bg-success" role="progressbar" aria-valuenow="43" aria-valuemin="0" aria-valuemax="100"></div>
                                </div>
                              </td>
                              <td className="text-center"><i className="fa fa-cc-amex" ></i></td>
                              <td>
                                <div className="small text-muted">Last login</div>
                                <strong>Yesterday</strong>
                              </td>
                          </tr>
                        </tbody>
                    </table>
                  </div>

              </CardBody>              
            </Card>
          </Col>
        </Row>
        
        
      
      </div>
    );
  }
}

export default Dashboard;
