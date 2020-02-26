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
      data: '',
      enquiryLists: [],
      loading: false
    };
  }

  // Fetch the Enquiry List
  componentDidMount() {     
    this.enquiryLists({});   
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
    const { loading, enquiryLists }  = this.state;
    let loaderElement = '';
    if(loading)        
      loaderElement = <Loader />

    return (
      <div className="user-dashboard">
        {loaderElement}
        <Row>
          <Col xs="6" sm="6" md="4" lg="4">
            <Card className="card-stats">
              <CardBody>
                <Row>
                  <Col md="4" lg="5">
                    <div className="icon-big text-center icon-warning">
                      <img src="/images/listing-icon.png" alt="listings" width="64" />
                    </div>
                  </Col>
                  <Col md="84" lg="7">
                    <div className="numbers">
                      <p className="card-category">Total Listing</p>
                      <p className="card-title">1,000</p>
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
            <Card className="card-stats">
              <CardBody>
                <Row>
                  <Col md="4" lg="5">
                    <div className="icon-big text-center icon-warning">
                      <img src="/images/message-icon.png" alt="Enquiries" width="64" />
                    </div>
                  </Col>
                  <Col md="84" lg="7">
                    <div className="numbers">
                      <p className="card-category">Enquiries</p>
                      <p className="card-title">5,000</p>
                    </div>
                  </Col>
                </Row>
              </CardBody>
              <CardFooter>
                <hr />
                <div className="stats"><Link className="btn btn-sm btn-outline-secondary" to="/user/enquiries"><i className="fa fa-eye"></i> Browse All Enquiries</Link></div>
              </CardFooter>
            </Card>
          </Col>
          <Col xs="6" sm="6" md="4" lg="4">
            <Card className="card-stats">
              <CardBody>
                <Row>
                  <Col md="4" lg="5">
                    <div className="icon-big text-center icon-warning">
                      <img src="/images/user-rating-icon.png" alt="Review" width="64" />
                    </div>
                  </Col>
                  <Col md="84" lg="7">
                    <div className="numbers">
                      <p className="card-category">Total Reviews</p>
                      <p className="card-title">700</p>
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
              <CardHeader tag="h4">Recent Enquiries</CardHeader>
              <CardBody>
                <Table size="sm" className="listing-table">
                  <thead>
                    <tr>
                      <th>#</th>
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
