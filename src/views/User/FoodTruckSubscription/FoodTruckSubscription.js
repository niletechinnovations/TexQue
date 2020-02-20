import React from "react";
import { Col, Row } from 'reactstrap';

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import commonService from '../../../core/services/commonService';
import Loader from '../../../views/Loader/Loader';
import "./FoodTruckSubscription.css";

const getPlanType = (planType) => {
    if(planType === 1)
      return 'Month';
    else if(planType === 2)
      return 'Quater';
    if(planType === 3)
      return 'Half Year';
    if(planType === 4)
      return 'Year';
}

class FoodTruckSubscription extends React.Component {
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
      commonService.getAPIWithAccessToken('subscription?planType=1')
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

  choosePlan(planId){
    if(planId!==''){
      const formData = {
        "planId": planId
      }
      this.setState( { loading:true }, () =>{
        commonService.postAPIWithAccessToken('subscription/buy', formData)
        .then( res => {
          if ( undefined === res.data.data || !res.data.status ) {           
            this.setState( { loading: false} );
            toast.error(res.data.message);
            return;
          }
          //console.log(res.data);
          if (typeof window !== 'undefined') {
            window.location.href = res.data.data.redirectUrl;
          }
        })
        .catch( err => {
          if(err.response !== undefined && err.response.status === 401) {
            localStorage.clear();
            this.props.history.push('/login');
          }else{
            this.setState( { loading: false } );
            toast.error(err.message);
          }
        })
      } );
    }
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
                <h2 className="pageHeading">Upgrade Plan</h2>
                <hr className="divider" />
                <Row>
                    <Col lg="4">
                        <div className="card active mb-5 mb-lg-0">
                        <div className="card-body">
                            <h5 className="card-title text-muted text-uppercase text-center">Free</h5>
                            <h6 className="card-price text-center">$0<span className="period">/month</span></h6>
                            <hr />
                            <div className="plan-description">
                                Upto 5 Listings<br />
                                Unlimited Enquiries<br />
                                Unlimited Rating<br />
                                Unlimited Comments
                            </div>
                            <button className="btn btn-block btn-primary text-uppercase">Current Plan</button>
                        </div>
                        </div>
                    </Col>
                    { planList.map( (planInfo, index) =>
                        <Col lg={4} className="mb-2" key={index}>
                            <div className="card mb-5 mb-lg-0">
                            <div className="card-body">
                                <h5 className="card-title text-muted text-uppercase text-center">{planInfo.planName}</h5>
                                <h6 className="card-price text-center">${planInfo.amount}<span className="period">/{getPlanType(planInfo.duration)}</span></h6>
                                <hr />
                                <div className="plan-description">
                                    {planInfo.description}
                                </div>
                                <button className="btn btn-block btn-primary text-uppercase" onClick={() => this.choosePlan(planInfo.planId) }>Upgrade</button>
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

export default FoodTruckSubscription;