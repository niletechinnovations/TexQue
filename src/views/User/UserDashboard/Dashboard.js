import React, { Component } from 'react';
//import { Bar, Line } from 'react-chartjs-2';
import {
  Row, Col, Table,
  Card, CardHeader, CardBody, CardFooter
} from 'reactstrap';

import './Dashboard.css';

class Dashboard extends Component {
  constructor(props) {
    super( props );

    this.state = {
      data: '',
    };
  }


  loading = () => <div className="animated fadeIn pt-1 text-center">Loading...</div>

  render() {

    return (
      <div className="user-dashboard">
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
                      <p className="card-category">Total Booking</p>
                      <p className="card-title">15,000</p>
                    </div>
                  </Col>
                </Row>
              </CardBody>
              <CardFooter>
                <hr />
                <div className="stats"><i className="fa fa-eye"></i> Browse All Bookings</div>
              </CardFooter>
            </Card>
          </Col>
          <Col xs="6" sm="6" md="4" lg="4">
            <Card className="card-stats">
              <CardBody>
                <Row>
                  <Col md="4" lg="5">
                    <div className="icon-big text-center icon-warning">
                      <img src="/images/message-icon.png" alt="Message" width="64" />
                    </div>
                  </Col>
                  <Col md="84" lg="7">
                    <div className="numbers">
                      <p className="card-category">Messages</p>
                      <p className="card-title">5,000</p>
                    </div>
                  </Col>
                </Row>
              </CardBody>
              <CardFooter>
                <hr />
                <div className="stats"><i className="fa fa-eye"></i> Browse Lists</div>
              </CardFooter>
            </Card>
          </Col>
          <Col xs="6" sm="6" md="4" lg="4">
            <Card className="card-stats">
              <CardBody>
                <Row>
                  <Col md="4" lg="5">
                    <div className="icon-big text-center icon-warning">
                      <img src="/images/review-icon.png" alt="Review" width="64" />
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
                <div className="stats"><i className="fa fa-eye"></i> Browse Lists</div>
              </CardFooter>
            </Card>
          </Col>

            
        </Row>

        <Row>
          <Col md="12" className="mt-4">
            <Card>
              <CardHeader tag="h4">Recent Requests</CardHeader>
              <CardBody>
                <Table size="sm" className="listing-table">
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Name</th>
                      <th>Phone</th>
                      <th>Email</th>
                      <th>Created on</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <th scope="row">1</th>
                      <td>Royal Real Estates	</td>
                      <td>9898989898</td>
                      <td>abc@mdo.com</td>
                      <td>02 Jan 2020</td>
                    </tr>
                    <tr>
                      <th scope="row">2</th>
                      <td>Colors Car Services	</td>
                      <td>8787878788</td>
                      <td>xyz@fat.com</td>
                      <td>02 Jan 2020</td>
                    </tr>
                    <tr>
                      <th scope="row">3</th>
                      <td>Larry</td>
                      <td>9898989898</td>
                      <td>text@twitter.com</td>
                      <td>02 Jan 2020</td>
                    </tr>
                    <tr>
                      <th scope="row">4</th>
                      <td>Larry</td>
                      <td>9898989898</td>
                      <td>test@twitter.com</td>
                      <td>02 Jan 2020</td>
                    </tr>
                    <tr>
                      <th scope="row">5</th>
                      <td>Jb Montesari School	</td>
                      <td>9898989898</td>
                      <td>aa@twitter.com</td>
                      <td>02 Jan 2020</td>
                    </tr>
                    <tr>
                      <th scope="row">6</th>
                      <td>Larry Panna</td>
                      <td>9898989898</td>
                      <td>te@twitter.com</td>
                      <td>02 Jan 2020</td>
                    </tr>
                    <tr>
                      <th scope="row">7</th>
                      <td>Goman Travels	</td>
                      <td>9898989898</td>
                      <td>tt@twitter.co</td>
                      <td>02 Jan 2020</td>
                    </tr>
                    <tr>
                      <th scope="row">8</th>
                      <td>Pearl Perfumes	</td>
                      <td>9898989898</td>
                      <td>ttt@twitter.co</td>
                      <td>02 Jan 2020</td>
                    </tr>
                    <tr>
                      <th scope="row">9</th>
                      <td>Taj Luxury Hotel	</td>
                      <td>9898989898</td>
                      <td>eee@twitter.co</td>
                      <td>02 Jan 2020</td>
                    </tr>
                    <tr>
                      <th scope="row">10</th>
                      <td>National Auto Care	</td>
                      <td>9898989898</td>
                      <td>aaaa@twitter.co</td>
                      <td>02 Jan 2020</td>
                    </tr>
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
