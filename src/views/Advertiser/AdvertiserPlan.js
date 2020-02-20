import React from "react";
import { Col, Row } from 'reactstrap';

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import commonService from '../../core/services/commonService';
import Loader from '../../views/Loader/Loader';
import "./AdvertiserPlan.css";

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
      commonService.getAPIWithAccessToken('subscription?planType=0')
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
                <h2 className="pageHeading">Choose a Plan</h2>
                <hr className="divider" />
                <Row>
                  { planList.map( (planInfo, index) =>
                    <Col lg={6} className="mb-2" key={index}>
                        <div className="card mb-5 mb-lg-0">
                        <div className="card-body">
                            <h5 className="card-title text-muted text-uppercase text-center">{planInfo.planName}</h5>
                            <h6 className="card-price text-center">${planInfo.amount}<span className="period">/{getPlanType(planInfo.duration)}</span></h6>
                            <hr />
                            <div className="plan-description">
                                {planInfo.description}
                            </div>
                            <button className="btn btn-block btn-primary text-uppercase" onClick={() => this.choosePlan(planInfo.planId) }>Choose Plan</button>
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