import React from "react";

class AboutPage extends React.Component {
  
  render() {
    return (
      <>
        <div className="main-content">
            <section className="how-it-section">
              <div className="container">      
                <div className="heading-title text-center">
                    <h2>About TexQue</h2>
                    <p>The Food Truck app that Pros use! The app will be simple and <br />effective for the everyday seller and buyer of delicious meals on wheels.</p>
                </div>
                <div className="heading-title text-center">
                    <h2>How it Work</h2>
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
              
          
        </div>
      </>
    );
  }
}

export default AboutPage;
