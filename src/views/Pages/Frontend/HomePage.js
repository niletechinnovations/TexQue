import React from "react";
import { Link } from 'react-router-dom';
import HomepageSlider from "../../Sliders/HomeSlider";
import OfferSlider from "../../Sliders/OfferSlider";
import ProductSlider from "../../Sliders/ProductSlider";
import "./HomePage.css";


class HomePage extends React.Component {
    render() {
        

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
                            <HomepageSlider />
                        </div>

                    </div>

                    <div className="col-md-4">
                        <div className="offer-slider" id="homepage-slider">
                            <OfferSlider />
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <section className="how-it-section">
            <div className="container">
                <div className="heading-title text-center">
                    <h2>How it Work</h2>
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
                        <ProductSlider />
                    </div>
                </div>   
            </div>
        </section>

        <section className="becomemember-section">
            <div className="container">
                <div className="heading-title text-center">
                    <h2>Become a Member</h2>
                    <p>The Food Truck app that Pros use! The app will be simple and <br />effective for the everyday seller and buyer of delicious meals on wheels.</p>
                </div>
                <div className="row">
                    <div className="col-sm-12 text-center">
                        <Link to="/register" className="btn-blue">Create an Account <i className="fa fa-chevron-circle-right"></i>
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