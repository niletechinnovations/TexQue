import React from "react";
import { Link } from 'react-router-dom';
import commonService from '../../../core/services/commonService';

import HomepageSlider from "../../Sliders/HomeSlider";
import OfferSlider from "../../Sliders/OfferSlider";
import ProductSlider from "../../Sliders/ProductSlider";
import "./HomePage.css";


class HomePage extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            dataLatestTruckList: [],
            dataTopRatedTruckList: [],
            dataAdvertismentList: [],
            loading: true,
        } 
      }

    componentDidMount() {
        window.scrollTo(0, 0);
        this.latestTruckList();
        this.topRatedTruckList();
        this.advertisementList();
    }

    /* Latest Food Truck List API */
    latestTruckList() {
      this.setState( { loading: true}, () => {
        commonService.getAPIWithAccessToken('food-truck/public/?pageSize=12')
            .then( res => {
                if ( undefined === res.data.data || !res.data.status ) {
                    this.setState( { loading: false } );
                    return;
                }
                this.setState({loading:false, dataLatestTruckList: res.data.data.truckList});     
            } )
        } )
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
    
    render() {
        const { dataLatestTruckList, dataAdvertismentList, dataTopRatedTruckList } = this.state;

        return (
        <>
        <section className="homepage-search-block">
            <div className="container">
                <div className="row d-flex align-items-center">
                    <div className="col-md-8">
                        <div className="homepage-search-title">
                        <h1>Food that finds you!</h1>
                        <h5>The Food Truck app that the Pros & Foodies use.</h5>
                        </div>

                        <div className="homepage-category-list" id="home-category-carousel">
                            <HomepageSlider data={dataLatestTruckList} />
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
        <section className="how-it-section">
            <div className="container">
                <div className="heading-title text-center">
                    <h2>How it Works</h2>
                    <p>The Food Truck app that Pros use! The app will be simple and <br />effective for the everyday seller and buyer of delicious meals on wheels.</p>
                </div>
                <div className="row">
                    <div className="col-md-4">
                        <div className="howitwork-card">
                        <div className="howitwork-card-media">
                            <img src="/images/step1.svg" alt="Step 1" />
                        </div>
                            <div className="howitwork-card-content">
                                <h2>Register Food Truck</h2>
                                <p>Place your business and food truck in our database for immediate business opportunities. </p>
                            </div>
                        </div>
                    </div>

                    <div className="col-md-4">
                        <div className="howitwork-card">
                        <div className="howitwork-card-media">
                            <img src="/images/listing.svg" alt="Step 2" />
                        </div>
                            <div className="howitwork-card-content">
                                <h2>Food Truck Listings</h2>
                                <p>Your food truck will be visible by all foodies in your area and outside.  This will drive more sales! </p>
                            </div>
                        </div>
                    </div>

                    <div className="col-md-4">
                        <div className="howitwork-card">
                        <div className="howitwork-card-media">
                            <img src="/images/inquiry.svg" alt="Step 3" />
                        </div>
                            <div className="howitwork-card-content">
                                <h2>Customer Access</h2>
                                <p>The customer can access your food truck to inquire about daily deals, future locations, catering, etc. </p>
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
                    <h2>Featured Food Trucks of the Month</h2>
                    <p>These Food Trucks use TexQue.com to drive more sales and customers to their locations and food trucks.</p>
                </div>
                <div className="row">
                    <div className="col-md-12">
                        <ProductSlider data={dataTopRatedTruckList} />
                    </div>
                </div>   
            </div>
        </section>

        <section className="becomemember-section">
            <div className="container">
                <div className="heading-title text-center">
                    <h2>Sign Up Your Food Truck Today!</h2>
                    <p>The Food Truck app that Pros use! The app will be simple and <br />effective for the everyday seller and buyer of delicious meals on wheels.</p>
                </div>
                <div className="row">
                    <div className="col-sm-12 text-center">
                        <Link to="/register" className="btn-blue">Get Started <i className="fa fa-chevron-circle-right"></i>
                        </Link>
                    </div>
                </div>
            </div>
        </section>

        </>
    );
  }
}

export default HomePage;