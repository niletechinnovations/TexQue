import React from 'react';

const frontEndFooter = () => {
    return (

        <section>
          <div className="footer">
            <div className="container">
              <div className="row">
                <div className="col-md-3 col-12 col-sm-12">
                  <div className="app">
                    <h2>DOWNLOAD APP</h2>
                    <p>The Food Truck app that Pros use! The app will be simple and effective for the everyday seller and buyer of delicious meals on wheels. Coming soon to a smart phone near you!</p>
                    <a href="/">
                      <img className="img-fluid" src="/images/google.png" alt="Google Play Store" />
                      </a>
                      <a href="/">
                      <img className="img-fluid" src="/images/apple.png" alt="iTunes PlayStore" />
                      </a>
                  </div>
                </div>
                <div className="col-md-3 col-6 col-sm-4">
                  <div className="footer-link">
                    <h2>About Texque</h2>
                    <ul>
                        <li><a href="/">About Us</a></li>
                        <li><a href="/">Blog</a></li>
                        <li><a href="/">Contact</a></li>
                    </ul>
                  </div>
                </div>
                <div className="col-md-3 col-6 col-sm-4">
                  <div className="footer-link">
                    <h2>For Food Truck</h2>
                    <ul>
                        <li><a href="/"> Privacy Policy</a></li>
                        <li><a href="/"> Terms & Conditions</a></li>
                        <li><a href="/">Faq's</a></li>
                    </ul>
                  </div>
                </div>
                <div className="col-md-3 col-6 col-sm-4">
                  <div className="footer-link">
                    <h2>Information</h2>
                    <ul className="footer-contact-info">
                      <li><i className="fa fa-envelope"></i> Email:&nbsp;<a href="mailto:support@texque.com">support@texque.com</a></li>
                    </ul>
                    </div>
                  </div>
                </div>
            </div>
          </div>

          <div className="footer-tag">
            <div className="container">
              <div className="footer-tag-content">
                <h2>POPULAR FOOD</h2>
                <div className="footer-tag-links">
                    <a href="/">Fast Food</a> |  <a href="/">Chinese</a> | <a href="/">Street Food</a> |  <a href="/">Continental</a>  |  <a href="/">Mithai</a> |  <a href="/">Cafe</a>  |  <a href="/">South Indian</a> |  <a href="/">Punjabi Food</a> |  <a href="/">Fast Food</a> |  <a href="/">Chinese</a> | <a href="/">Street Food</a> |  <a href="/">Continental</a>  |  <a href="/">Mithai</a> |  <a href="/">Cafe</a>  |  <a href="/">South Indian</a> |  <a href="/">Punjabi Food</a><a href="/">Fast Food</a> |  <a href="/">Chinese</a> | <a href="/">Street Food</a> |  <a href="/">Continental</a>  |  <a href="/">Mithai</a> |  <a href="/">Cafe</a>  |  <a href="/">South Indian</a> |  <a href="/">Punjabi Food</a> |  <a href="/">Fast Food</a> |  <a href="/">Chinese</a> | <a href="/">Street Food</a> |  <a href="/">Continental</a>  |  <a href="/">Mithai</a> |  <a href="/">Cafe</a>  |  <a href="/">South Indian</a> |  <a href="/">Punjabi Food</a>
                </div>
              </div>
            </div>
          </div>
          <div className="footer-copyright">
            <div className="container">
              <p>&copy; Copyright 2019 TexQue. All Rights Reserved</p>
            </div>
          </div>
        </section>

    );
}

export default frontEndFooter;