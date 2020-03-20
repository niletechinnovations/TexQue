import React from "react";

class AboutPage extends React.Component {

    componentDidMount() {
        window.scrollTo(0, 0);
    }

  render() {
    return (
      <>
        <div className="main-content">
            <section className="how-it-section">
              <div className="container">      
                <div className="heading-title text-center">
                    <h2>About TexQue</h2>
                </div>
                <div className="text-center">    
                    <p>TexQue is the premier Food Truck app. We make it easy to find your special food truck or the exact food you want. We offer all types of food listed in every location around the country. TexQue gives you the power to list, find it and eat it all on one simple app. This is the Food Truck app the Pros use and the app the foodies love!</p>
                    <p>Our mission is simple: to help you find your favorite food easier or help people find you. And with millions of downloads in the U.S. and many new listings every day, we're just getting started. Find your Food Truck today!</p>
                        
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
