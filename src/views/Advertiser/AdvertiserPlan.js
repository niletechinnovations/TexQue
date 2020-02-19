import React from "react";
//import  { Link } from 'react-router-dom';
import { Col, Row } from 'reactstrap';

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import commonService from '../../core/services/commonService';
import Loader from '../../views/Loader/Loader';
import "./AdvertiserPlan.css";

class AdvertiserPlan extends React.Component {
  constructor( props ){
    super( props );
    this.state = {
        planList: [],
        loading: false,
    };
  }

  componentDidMount() {
    this.planList();
  }

  /*Plan List API*/
  planList() {
    this.setState( { loading: true}, () => {
      commonService.getAPIWithAccessToken('subscription')
        .then( res => {
           
          if ( undefined === res.data.data || !res.data.status ) {
            this.setState( { loading: false } );
            toast.error(res.data.message);
            return;
          }
          this.setState({loading:false, planList: res.data.data});
        } )
        .catch( err => {         
          if(err.response !== undefined && err.response.status === 401) {
            localStorage.clear();
            this.props.history.push('/login');
          } else {
            this.setState( { loading: false } );
            toast.error(err.message);
          }
        } )
    } )
  }

  render() {
    const { loading, planList } = this.state;
    
    let loaderElement = '';
    if(loading)
      loaderElement = <Loader />

      return (
        <>
        <section className="pricing py-3 px-2">
            <div className="container">
                {loaderElement}
                <h2 className="pageHeading">Choose a Plan</h2>
                <hr className="divider" />
                <Row>
                  { planList.map( (planInfo, index) =>
                    <Col lg={6} className="mb-2">
                        <div className="card mb-5 mb-lg-0">
                        <div className="card-body">
                            <h5 className="card-title text-muted text-uppercase text-center">Free</h5>
                            <h6 className="card-price text-center">$2.9<span className="period">/month</span></h6>
                            <hr />
                            <ul className="fa-ul">
                                <li><span className="fa-li"><i className="fa fa-check"></i></span><strong>Upto 2 Ads</strong></li>
                                <li><span className="fa-li"><i className="fa fa-check"></i></span>Unlimited Views</li>
                            </ul>
                            <button className="btn btn-block btn-primary text-uppercase">Upgrade</button>
                        </div>
                        </div>
                    </Col>
                  )}
                    
                
                    
                </Row>
            </div>
        </section>

        </>
      );
  }
}

export default AdvertiserPlan;