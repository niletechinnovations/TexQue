import React from "react";

class AboutPage extends React.Component {

    componentDidMount() {
        window.scrollTo(0, 0);
    }

  render() {
    return (
      <>
        <div className="main-content ">
            <section className="how-it-section ">
              <div className="container">      
                <div className="heading-title text-center mt-4">
                    <h2>About TexQue</h2>
                </div>
                <div className="products-section">
                <div className="heading-title text-center">    
                    <p className="text-white">TexQue is the premiere Food Truck app the Pros use and the Foodies love!</p>
                    <p className="text-white">Our mission is simple: we aim to help Foodies discover Food Trucks with ease and convenience based on their preference and location. As for our Vendors, we strive to increase your clientele and their satisfaction as a result.</p>
                    </div>
                </div>
                <div className="heading-title text-center pt-5">
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
              
          
        </div>
      </>
    );
  }
}

export default AboutPage;
