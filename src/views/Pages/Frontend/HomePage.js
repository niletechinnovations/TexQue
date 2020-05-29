import React from "react";
import { Link } from 'react-router-dom';
import commonService from '../../../core/services/commonService';

import OfferSlider from "../../Sliders/OfferSlider";
import ProductSlider from "../../Sliders/ProductSlider";
import HomeSlider from "../../Sliders/HomeSlider";
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
            <div className="home-slider">
                <HomeSlider />
            </div>
            <div className="home-slider-content-info">
                <div className="container">
                    <div className="row d-flex align-items-center">
                        <div className="col-md-8">
                            <div className="homepage-search-title">
                                <h1>Food that finds you!</h1>
                                <h5>The Food Truck app the Pros & Foodies use.</h5>
                                <Link to="/register" className="btn btn-get">Get Started</Link>
                                <p className="mt-5 pt-5">
                                <a href="https://play.google.com/store/apps/details?id=com.texque&hl=en" target="_blank" rel="noopener noreferrer">
                                    <img className="img-fluid" src="/images/google-play-store-icon.png" width="200" alt="Google Play Store" />
                                </a>
                                <a href="https://apps.apple.com/us/app/texque/id1502952657?ls=1" target="_blank" rel="noopener noreferrer">
                                    <img className="img-fluid" src="/images/app-store-app-sm.png" width="200" alt="iTunes PlayStore" />
                                </a>
                                </p>
                            </div>
                        </div>

                        <div className="col-md-4">
                            <div className="offer-slider pl-4 pt-3" id="homepage-slider">
                                <OfferSlider data={dataAdvertismentList} />
                            </div>
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
                                <p>Registering your Food Truck with TexQue enlists you in our global database of Food Truck vendors all over the world. Access to new customers will lead to increased sales and resultant profit.</p>
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
                                <p>Customers can search for your Food Truck in just a few clicks and post inquiries for catering their event. If the deal suits you, TexQue will help you connect with the customer.</p>
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
                                <p>Customers will have the ability to access your current and future location, hours of operation, menu, daily specials, reviews/ratings, and photos.</p>
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

                        <div className="col-md-4 col-lg-3"  key={index}>
                            <div className={ ( index===1 ? 'plan-intro-card current-plan' : 'plan-intro-card' ) }>
                                { ( index===1 ? <div className="ribbon">Best Value</div> : '' ) }
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
                                    <li><strong>30 Days Free Trial</strong></li>
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
                    <p>The Food Truck app the Pros use! The app will be simple and <br />
                    effective for the everyday seller and buyer of delicious meals on wheels.</p>
                </div>
                <div className="row">
                    <div className="col-md-6 col-lg-4">
                        <div className="howitwork-card">
                        <div className="howitwork-card-media">
                            <img src="/images/step1.svg" height="80" alt="Register Food Truck" />
                        </div>
                            <div className="howitwork-card-content">
                                <h2>Food Truck Registration</h2>
                                <p>Place your business and food truck in our database for immediate business opportunities.</p>
                            </div>
                        </div>
                    </div>

                    <div className="col-md-6 col-lg-4">
                        <div className="howitwork-card">
                        <div className="howitwork-card-media">
                            <img src="/images/listing.svg" height="80" alt="List Your Menu" />
                        </div>
                            <div className="howitwork-card-content">
                                <h2>Menu</h2>
                                <p>You will have complete control of uploading and modifying your Menu at any time.</p>
                            </div>
                        </div>
                    </div>
                    
                    <div className="col-md-6 col-lg-4">
                        <div className="howitwork-card">
                        <div className="howitwork-card-media">
                            <img src="/images/location-marker.svg" height="80" alt="Location" />
                        </div>
                            <div className="howitwork-card-content">
                                <h2>Location</h2>
                                <p>Wherever you go, the app will always reflect your live location. You can also add future locations at your discretion.</p>
                            </div>
                        </div>
                    </div>

                    <div className="col-md-6 col-lg-4">
                        <div className="howitwork-card">
                        <div className="howitwork-card-media">
                            <img src="/images/inquiry.svg" height="80" alt="Customer Access" />
                        </div>
                            <div className="howitwork-card-content">
                                <h2>Customer Access</h2>
                                <p>In addition to location, customers can access your menu, daily specials, special events, reviews/ratings, and photos.</p>
                            </div>
                        </div>
                    </div>

                    <div className="col-md-6 col-lg-4">
                        <div className="howitwork-card">
                        <div className="howitwork-card-media">
                            <img src="/images/Inquiries.svg" height="80" alt="Catering Inquiries" />
                        </div>
                            <div className="howitwork-card-content">
                                <h2>Catering Inquiries</h2>
                                <p>Post catering availability and accept or reject opportunities accordingly.</p>
                            </div>
                        </div>
                    </div>

                    <div className="col-md-6 col-lg-4">
                        <div className="howitwork-card">
                        <div className="howitwork-card-media">
                            <img src="/images/Availability.svg" height="80" alt="Update Availability" />
                        </div>
                            <div className="howitwork-card-content">
                                <h2>Availability</h2>
                                <p>Add your actual and projected business hours & availability with the corresponding location.</p>
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
                    <p className="text-center">Selected fleet of Food Trucks from our global TexQue database.</p>
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