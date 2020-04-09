import React from "react";
import { Link } from 'react-router-dom';
import commonService from '../../../core/services/commonService';

import OfferSlider from "../../Sliders/OfferSlider";
import ProductSlider from "../../Sliders/ProductSlider";
import "./HomePage.css";
import "../../../containers/CommonLayout/planSwitcher.css";

class HomePage extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            dataTopRatedTruckList: [],
            dataAdvertismentList: [],
            planList: [],
            activePlanType: 1,
            loading: true,
        } 
      }

    componentDidMount() {
        window.scrollTo(0, 0);
        this.topRatedTruckList();
        this.advertisementList();
        this.planList();
    }
    
    /* Advertisement List API */
    advertisementList() {
        this.setState( { loading: true}, () => {
          commonService.getAPIWithAccessToken('advertisement/public/?pageSize=12')
              .then( res => {
                  if ( undefined === res.data.data || !res.data.status ) {
                      this.setState( { loading: false } );
                      return;
                  }
                  this.setState({loading:false, dataAdvertismentList: res.data.data});     
              } )
          } )
      }

    /* Top Rated Food Truck List API */
    topRatedTruckList() {
        this.setState( { loading: true}, () => {
          commonService.getAPIWithAccessToken('food-truck/public/?sortedBy=rating_high_to_low&pageSize=9')
            .then( res => {
                if ( undefined === res.data.data || !res.data.status ) {
                    this.setState( { loading: false } );
                    return;
                }
                this.setState({loading:false, dataTopRatedTruckList: res.data.data.truckList});     
            } )
        } )
    }
        
    /*Plan List API*/
    planList() {
        this.setState( { loading: true}, () => {
        commonService.getAPI('subscription?planType=1')
            .then( res => {
            if ( undefined === res.data.data || !res.data.status ) {
                this.setState( { loading: false } );
                return;
            }
            this.setState({loading:false, planList: res.data.data});
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
            
            localStorage.setItem( 'choosedPlanId', planId );
            localStorage.setItem( 'choosedplanVariationId', planVariationId );
            this.props.history.push('/register');
        }else{
            alert('Please choose a plan!');
            return false;
        }
    }    

    render() {
        const { dataAdvertismentList, dataTopRatedTruckList, planList, activePlanType } = this.state;

        return (
        <>
        <section className="homepage-search-block">
            <div className="container">
                <div className="row d-flex align-items-center">
                    <div className="col-md-8">
                        <div className="homepage-search-title">
                            <h1>Food that finds you!</h1>
                            <h5>The Food Truck app that the Pros & Foodies use.</h5>
                            <Link to="/register" className="btn btn-get">Get Started</Link>
                        </div>
                    </div>

                    <div className="col-md-4">
                        <div className="offer-slider pl-4 pt-3" id="homepage-slider">
                            <OfferSlider data={dataAdvertismentList} />
                        </div>
                    </div>
                </div>
            </div>
        </section>
        
        <section className="Benefits-section">
            <div className="container">
                <div className="heading-title text-center">
                    <h2>Why TexQue?</h2>
                    <p>Provides a platform to connect food trucks with customers in real-time!</p>
                </div>
                <div className="Benefits-list-card">
                    <div className="row">
                        <div className="col-md-4">
                        <div className="Benefits-card-media">
                            <img src="/images/Benefits1.png" alt="Increase reachability to customers" />
                        </div>
                        </div>
                        <div className="col-md-8">
                            <div className="Benefits-card-content">
                                <h2>Increase reachability to customers</h2>
                                <p>Registering your food truck on texque will help your business to gain more customers. Indeed more sales more profit!</p>
                            </div>
                        </div>
                    </div>
                </div>   

                <div className="Benefits-list-card margin-right">
                    <div className="row flex-column-reverse flex-md-row">
                        <div className="col-md-4">
                        <div className="Benefits-card-media">
                            <img src="/images/Benefits2.png" alt="Accept Inquiries as per your ease" />
                        </div>
                        </div>
                        <div className="col-md-8">
                            <div className="Benefits-card-content">
                                <h2>Catering Inquiries at your fingertips</h2>
                                <p>Customers can search your food truck in few clicks and post inquiries to cater their event. If the deal suits you, texque will help you to connect with the customers.</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="Benefits-list-card">
                    <div className="row">
                        <div className="col-md-4">
                        <div className="Benefits-card-media">
                            <img src="/images/Benefits3.png" alt="Business Scalability" />
                        </div>
                        </div>
                        <div className="col-md-8">
                            <div className="Benefits-card-content">
                                <h2>Business Scalability</h2>
                                <p>Customer can view your ratings, photos, and live location. Location is super important because you are mobile. Wherever you go, the app will always reflect your live location - making it super easy for customers to find you.</p>
                            </div>
                        </div>
                    </div>
                </div>   
            </div>
        </section>

        <section className="plan-section">
            <div className="container">
                <div className="heading-title text-center">
                    <h2>Subscription Plans</h2>
                    <p className="text-center">Choose the plan that suits your business best.</p>
                </div>

                <div className="pricing-section">
                  <label className={ ( activePlanType===1 ? 'toggler toggler--is-active' : 'toggler' ) } id="filt-monthly">Monthly</label>
                  <div className="toggle">
                    <input type="checkbox" id="switcher" className="check" onClick={ () =>  this.changePlanType() } />
                    <b className="b switch"></b>
                  </div>
                  <label className={ ( activePlanType===4 ? 'toggler toggler--is-active' : 'toggler' ) } id="filt-yearly">Yearly</label>
                </div>
                
                <div className="plan-content-intro">
                    <div className="row">
                    { planList.map( (planInfo, index) =>

                        <div className="col-md-3"  key={index}>
                            <div className={ ( index===2 ? 'plan-intro-card current-plan' : 'plan-intro-card' ) }>
                                <h2>{planInfo.planName}</h2>
                                
                                { (activePlanType===1) ? 
                                    <div className="price-info">
                                        <div className="price-value">${planInfo.planVariation[0].amount}</div>
                                        <span className="price-per">/ per month</span>
                                    </div>
                                  :
                                  <div className="price-info">
                                        <div className="price-value">${planInfo.planVariation[1].amount}</div>
                                        <span className="price-per">/ per year</span>
                                    </div>
                                }                              
                                <div className="plan-point-list">
                                    <h4>Includes:</h4>
                                    <ul>
                                    <li>Up to {planInfo.advertisementAccess} Listings</li>
                                    {
                                        planInfo.description.split("\n").map(function(item, idx) {
                                            return (
                                                <li key={idx}>
                                                    {item}
                                                </li>
                                            )
                                        })
                                    }
                                    </ul>
                                </div>
                                <button onClick={ ()=> this.choosePlan(planInfo.planId, index)  } className="btn btn-conversion">Subscribe Now</button>
                            </div>
                        </div>
                    )}

                    </div>
                </div>  
            </div>      
        </section>

        <section className="how-it-section">
            <div className="container">
                <div className="heading-title text-center">
                    <h2>How it Works</h2>
                    <p>The Food Truck app that Pros use! The app will be simple and <br />
                    effective for the everyday seller and buyer of delicious meals on wheels.</p>
                </div>
                <div className="row">
                    <div className="col-md-4">
                        <div className="howitwork-card">
                        <div className="howitwork-card-media">
                            <img src="/images/step1.svg" height="80" alt="Register Food Truck" />
                        </div>
                            <div className="howitwork-card-content">
                                <h2>Register Food Truck</h2>
                                <p>Place your business and food truck in our database for immediate business opportunities.</p>
                            </div>
                        </div>
                    </div>

                    <div className="col-md-4">
                        <div className="howitwork-card">
                        <div className="howitwork-card-media">
                            <img src="/images/listing.svg" height="80" alt="List Your Menu" />
                        </div>
                            <div className="howitwork-card-content">
                                <h2>List Your Menu</h2>
                                <p>Your food truck will be visible by all foodies in your area and outside.  This will drive more sales! </p>
                            </div>
                        </div>
                    </div>

                    <div className="col-md-4">
                        <div className="howitwork-card">
                        <div className="howitwork-card-media">
                            <img src="/images/inquiry.svg" height="80" alt="Customer Access" />
                        </div>
                            <div className="howitwork-card-content">
                                <h2>Customer Access</h2>
                                <p>The customer can access your food truck to inquire about daily deals, future locations, catering, etc. </p>
                            </div>
                        </div>
                    </div>

                    <div className="col-md-4">
                        <div className="howitwork-card">
                        <div className="howitwork-card-media">
                            <img src="/images/Inquiries.svg" height="80" alt="Receive Inquiries" />
                        </div>
                            <div className="howitwork-card-content">
                                <h2>Receive Inquiries</h2>
                                <p>Accept or reject inquiries, notify your customer you are ready to cater.</p>
                            </div>
                        </div>
                    </div>

                    <div className="col-md-4">
                        <div className="howitwork-card">
                        <div className="howitwork-card-media">
                            <img src="/images/menu-control.svg" height="80" alt="Menu Control" />
                        </div>
                            <div className="howitwork-card-content">
                                <h2>Menu Control</h2>
                                <p>Edit menu images, and descriptions.</p>
                            </div>
                        </div>
                    </div>

                    <div className="col-md-4">
                        <div className="howitwork-card">
                        <div className="howitwork-card-media">
                            <img src="/images/Availability.svg" height="80" alt="Update Availability" />
                        </div>
                            <div className="howitwork-card-content">
                                <h2>Update Availability</h2>
                                <p>Set your availability according to days and time</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        
        {/* Featured products section */}
        <section className="products-section">
            <div className="container">
                <div className="heading-title text-center">
                    <h2>Trending Food Trucks</h2>
                    <p className="text-center">These Food Trucks use TexQue.com to drive more sales and customers to their locations and food trucks.</p>
                </div>
                <div className="row">
                    <div className="col-md-12">
                        <ProductSlider data={dataTopRatedTruckList} />
                    </div>
                </div>   
            </div>
        </section>

        </>
    );
  }
}

export default HomePage;