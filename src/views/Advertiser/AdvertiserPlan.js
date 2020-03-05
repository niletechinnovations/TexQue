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

  //Cancel subscription
  cancelSubscription(subscriberId){
    if(subscriberId!==''){
      if (window.confirm('Are you sure you want to cancel this subscription?')) {
        const formData = {
          "subscriberId": subscriberId
        }
        this.setState( { loading:true }, () =>{
          commonService.postAPIWithAccessToken('subscription/cancel', formData)
          .then( res => {
            if ( undefined === res.data.data || !res.data.status ) {           
              this.setState( { loading: false} );
              toast.error(res.data.message);
              return;
            }
            toast.success(res.data.message);
            this.planList();
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
                <h2 className="pageHeading">Advertiser Plan</h2>
                <hr className="divider" />
                <Row>
                  { planList.map( (planInfo, index) =>
                    <Col lg={6} className="mb-4" key={index}>
                        <div className={'card mb-5 mb-lg-0 '+(planInfo.isPlanActive ? 'active' :'' ) }>
                        <div className="card-body">
                            <h5 className="card-title text-muted text-uppercase text-center">{planInfo.planName}</h5>
                            <h6 className="card-price text-center">${planInfo.amount}<span className="period">/{getPlanType(planInfo.duration)}</span></h6>
                            <hr />
                            <div className="plan-description">
                              Upto {planInfo.advertisementAccess} Ads<br />
                              {planInfo.description}
                            </div>
                            <button className="btn btn-block btn-primary text-uppercase" onClick={ () =>  ( planInfo.isPlanActive ? '' : this.choosePlan(planInfo.planId) ) } disabled={ (planInfo.isPlanActive ? 'disabled' : '' ) }>{ (planInfo.isPlanActive ? 'Current Plan' : 'Buy Now' ) }</button>
                            { ( planInfo.isPlanActive ? <p className="text-center mb-0"><button className="btn-sm btn-danger mt-3" onClick={ () => this.cancelSubscription(planInfo.subscriberId) }>Cancel Subscription</button></p> : '' ) }
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