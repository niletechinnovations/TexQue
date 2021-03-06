import React, { Component } from 'react';
import {
  Row, Col, Table,
  Card, CardHeader, CardBody, CardFooter
} from 'reactstrap';
import commonService from '../../../core/services/commonService';
import Loader from '../../Loader/Loader';
import './Dashboard.css';
import { Link } from 'react-router-dom';

class Dashboard extends Component {
  constructor(props) {
    super( props );

    this.state = {
      loading: false,
      dashBoardStats: { foodTruckCount: 0, enquiryCount:0, reviewsCount:0 },
      enquiryLists: []
    };
  }

  componentDidMount() {     
    this.dashboardData({});
    this.enquiryLists({});   
  }

  /* Get Dashboard data from API */
  dashboardData() {
    commonService.getAPIWithAccessToken('dashboard')
    .then( res => {
      if( undefined === res.data.data || !res.data.status ){
        this.setState( {loading: false });
        return;
      }
      const dashData = res.data.data;
      this.setState({ loading:false, dashBoardStats:dashData  })
    }
    )
  }

  /* Enquiry List API */
  enquiryLists() {
    this.setState( { loading: true}, () => {
      commonService.getAPIWithAccessToken('food-truck/enquiry?pageSize=10')
        .then( res => {
          if ( undefined === res.data.data || !res.data.status ) {
            this.setState( { loading: false } );
            return;
          }   
          this.setState({loading:false, enquiryLists: res.data.data.enquiryList});     
         
        } )
        .catch( err => {         
          if(err.response !== undefined && err.response.status === 401) {
            localStorage.clear();
            this.props.history.push('/login');
          }
          else {
            this.setState( { loading: false } );
          }
        } )
    } )
  }


  loading = () => <div className="animated fadeIn pt-1 text-center">Loading...</div>

  render() {
    const { loading, enquiryLists,dashBoardStats }  = this.state;
    let loaderElement = '';
    if(loading)        
      loaderElement = <Loader />

    return (
      <div className="user-dashboard">
        {loaderElement}
        <Row>
          <Col xs="6" sm="6" md="4" lg="4">
            <Card className="card-stats bgcard-1">
              <CardBody>
                <Row>
                  <Col md="4" lg="5">
                    <div className="icon-big text-center icon-warning bgImg-1">
                      <img src="/images/listing-icon.png" alt="listings" width="64" />
                    </div>
                  </Col>
                  <Col md="84" lg="7">
                    <div className="numbers">
                      <p className="card-category">Total Listing</p>
                      <p className="card-title">{dashBoardStats.foodTruckCount}</p>
                    </div>
                  </Col>
                </Row>
              </CardBody>
              <CardFooter>
                <hr />
                <div className="stats"><Link className="btn btn-sm btn-outline-secondary" to="/user/my-listings"><i className="fa fa-eye"></i> Browse All Listings</Link></div>
              </CardFooter>
            </Card>
          </Col>
          <Col xs="6" sm="6" md="4" lg="4">
            <Card className="card-stats bgcard-2">
              <CardBody>
                <Row>
                  <Col md="4" lg="5">
                    <div className="icon-big text-center icon-warning bgImg-2">
                      <img src="/images/message-icon.png" alt="Inquiries" width="64" />
                    </div>
                  </Col>
                  <Col md="84" lg="7">
                    <div className="numbers">
                      <p className="card-category">Inquiries</p>
                      <p className="card-title">{dashBoardStats.enquiryCount}</p>
                    </div>
                  </Col>
                </Row>
              </CardBody>
              <CardFooter>
                <hr />
                <div className="stats"><Link className="btn btn-sm btn-outline-secondary" to="/user/enquiries"><i className="fa fa-eye"></i> Browse All Inquiries</Link></div>
              </CardFooter>
            </Card>
          </Col>
          <Col xs="6" sm="6" md="4" lg="4">
            <Card className="card-stats bgcard-3">
              <CardBody>
                <Row>
                  <Col md="4" lg="5">
                    <div className="icon-big text-center icon-warning bgImg-3">
                      <img src="/images/user-rating-icon.png" alt="Review" width="64" />
                    </div>
                  </Col>
                  <Col md="84" lg="7">
                    <div className="numbers">
                      <p className="card-category">Total Reviews</p>
                      <p className="card-title">{dashBoardStats.reviewsCount}</p>
                    </div>
                  </Col>
                </Row>
              </CardBody>
              <CardFooter>
                <hr />
                <div className="stats"><Link className="btn btn-sm btn-outline-secondary" to="/user/reviews"><i className="fa fa-eye"></i> Browse All Reviews</Link></div>
              </CardFooter>
            </Card>
          </Col>

            
        </Row>

        <Row>
          <Col md="12" className="mt-4">
            <Card className="card-list-info">
              <CardHeader tag="h4">Recent Inquiries</CardHeader>
              <CardBody>
                <Table size="sm" className="listing-table">
                  <thead>
                    <tr>
                      <th>Sr. No.</th>
                      <th>Name</th>
                      <th>Phone</th>
                      <th>Food Truck</th>
                      <th>Date</th>
                    </tr>
                  </thead>
                  <tbody>
                  {enquiryLists.map((enqInfo, index) => 
                    <tr key={index}>
                      <th scope="row">{index+1}</th>
                      <td>{enqInfo.contactPerson}</td>
                      <td>{enqInfo.contactNo}</td>
                      <td>{enqInfo.truckName}</td>
                      <td>{(new Date(enqInfo.createdAt)).toLocaleDateString("en-US")}</td>
                    </tr>
                  )}
                  
                  </tbody>
                </Table>
              </CardBody>
            </Card>
          </Col>
        </Row>

      </div>
    );
  }
}

export default Dashboard;
