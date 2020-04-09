import React from "react";
import { Row} from 'reactstrap';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import commonService from '../../../core/services/commonService';

import Loader from '../../../views/Loader/Loader';
import "../../../containers/CommonLayout/planSwitcher.css";
import "./AdvertiserPlan.css";

class AdvertiserPlan extends React.Component {
  constructor(props){
    super(props);
    this.state = {  
      loading: true,
      paymentProcess: false,      
      planId: "",
      planList: [],
      activePlanType: 1,
    }    
    this.choosePlan = this.choosePlan.bind(this);  
  }

  componentDidMount() {    
    this.subscriptionPlanList();
  }

  subscriptionPlanList() {
    let getPlanListURL = '';
    if ( localStorage.getItem( 'accessToken' ) ) 
      getPlanListURL = commonService.getAPIWithAccessToken('subscription?planType=0')
    else
      getPlanListURL = commonService.getAPI('subscription?planType=0')

    this.setState( { loading: true}, () => {
      getPlanListURL
        .then( res => {
          if ( undefined === res.data.data || !res.data.status ) {
            this.setState( {  loading: false } );
            toast.error(res.data.message);             
            return;
          } 
          const subscriptionPlanData = res.data.data;
          this.setState( { loading: false,  planList: subscriptionPlanData} );
        } )
        .catch( err => {         
          this.setState( { loading: false } );
          toast.error(err.message);    
        } )
    } ) 
  }
 
  changePlanType = () => {
    if(this.state.activePlanType===1)
      this.setState( { activePlanType: 4 } );
    else
      this.setState( { activePlanType: 1 } );
  }

  choosePlan(planId, index){
    if(planId!=='' && index!==''){
      let choosedPlanInfo = this.state.planList[index];
      let planVariationId = '';
      if(this.state.activePlanType===1)
        planVariationId = choosedPlanInfo.planVariation[0].id;
      else
        planVariationId = choosedPlanInfo.planVariation[1].id;
      
      if ( localStorage.getItem( 'accessToken' ) ) {
        const formData = {
          "planId": planId,
          "planVariationId": planVariationId
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
      }else{      
        localStorage.setItem( 'choosedPlanId', planId );
        localStorage.setItem( 'choosedplanVariationId', planVariationId );
        this.props.history.push('/become-an-advertiser');
      }
    }else{
      alert('Please choose a plan!');
      return false;
    }
  }

  render() {
    const { planList, activePlanType, loading } = this.state;
    let loaderElement = '';
    if(loading)
        loaderElement = <Loader />
    
       return (
        <section className="advertiser-plan-section plan-section">
            {loaderElement}
            <div className="container p-4">
                <div className="heading-title text-center">
                    <h2>Advertisement Plans</h2>
                    <p className="text-center">The Food Truck app that Pros use! The app will be simple and
                    <br />effective for the everyday seller and buyer of delicious meals on wheels.</p>
                </div>
                <div className="OfferContentSecond">
                    <h4>How it works</h4>
                    <ul>
                        <li>Log in to your account. If you don’t have an account yet, create one first.</li>
                        <li>Select your preferred advertisement plan</li>
                        <li>Easily pay through PayPal</li>
                        <li>Upload an advertisement that fits the dimensions(300x250) on TexQue mobile app</li>
                        <li>Enter your website’s URL and upload the advertisement</li>
                        <li>Your advertisement is immediately visible on the TexQue mobile app</li>
                    </ul>
                    <p>If you have any questions about our advertisement plans, feel free to <Link to="/contact-us"> contact us </Link> </p>
                </div>
                
                <div className="pricing-section mt-5">
                <label className={ ( activePlanType===1 ? 'toggler toggler--is-active' : 'toggler' ) } id="filt-monthly">Monthly</label>
                <div className="toggle">
                    <input type="checkbox" id="switcher" className="check" onClick={ () =>  this.changePlanType() } />
                    <b className="b switch"></b>
                </div>
                <label className={ ( activePlanType===4 ? 'toggler toggler--is-active' : 'toggler' ) } id="filt-yearly">Yearly</label>
                </div>
                
                <div className="pricing-table mb-4">
                    <Row>
                    { planList.map( (planInfo, index) =>

                        <div className="col-md-3"  key={index}>
                            <div className="item">
                                { ( index===1 ? <div className="ribbon">Best Value</div> : '' ) }
                                <div className="heading">
                                    <h4>{planInfo.planName}</h4>
                                </div>
                                <p>Up to {planInfo.advertisementAccess} Ads</p>
                                {
                                    planInfo.description.split("\n").map(function(item, idx) {
                                        return (
                                            <p key={idx}>
                                                {item}
                                            </p>
                                        )
                                    })
                                }
                                        
                                { (activePlanType===1) ? 
                                    <div className="price-info">
                                        <div className="price">${planInfo.planVariation[0].amount}
                                            <span className="price-per">/ per month</span>
                                        </div>
                                    </div>
                                :
                                    <div className="price-info">
                                        <div className="price">${planInfo.planVariation[1].amount}
                                        <span className="price-per">/ per year</span>
                                        </div>
                                    </div>
                                }                      
                                <button onClick={ ()=> this.choosePlan(planInfo.planId, index)  } className={ ( index===1 ? "btn btn-block SubmitBtn outline-SubmitBtn" : "btn btn-block btn-outline-primary outline-SubmitBtn" )} disabled={ (planInfo.isPlanActive ? 'disabled' : '' ) }>{ (planInfo.isPlanActive ? 'ACTIVE PLAN' : 'BUY NOW' ) }</button>
                            </div>
                        </div>
                    )}

                    </Row>
                </div>  
            </div>      
        </section>
        );
    }
}

export default AdvertiserPlan;