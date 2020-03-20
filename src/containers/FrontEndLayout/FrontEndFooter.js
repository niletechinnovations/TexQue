import React from 'react';
import {Link} from 'react-router-dom';

const frontEndFooter = () => {
    return (

        <section>
          <div className="footer">
            <div className="container">
              <div className="row">
                <div className="col-md-3 col-12 col-sm-12">
                  <div className="about-app">
                    <h2>DOWNLOAD APP</h2>
                    <p className="about-text">The Food Truck app that Pros use! The app will be simple and effective for the everyday seller and buyer of delicious meals on wheels.</p>
                    <a href="https://play.google.com/store/apps/details?id=com.texque&hl=en" target="_blank" rel="noopener noreferrer">
                      <img className="img-fluid" src="/images/google.png" alt="Google Play Store" />
                      </a>
                      <a href="https://apps.apple.com/us/app/texque/id1502952657?ls=1" target="_blank" rel="noopener noreferrer">
                      <img className="img-fluid" src="/images/apple.png" alt="iTunes PlayStore" />
                      </a>
                  </div>
                </div>
                <div className="col-md-3 col-6 col-sm-4">
                  <div className="footer-link">
                    <h2>About Texque</h2>
                    <ul>
                        <li><Link to="/about-us">About Us</Link></li>
                        <li><Link to="/contact-us">Contact Us</Link></li>
                    </ul>
                  </div>
                </div>
                <div className="col-md-3 col-6 col-sm-4">
                  <div className="footer-link">
                    <h2>For Food Truck</h2>
                    <ul>
                        <li><Link to="/privacy-policy"> Privacy Policy</Link></li>
                        <li><Link to="/terms-of-service"> Terms of Service</Link></li>
                        <li><Link to="/faq">Faq's</Link></li>
                    </ul>
                  </div>
                </div>
                <div className="col-md-3 col-6 col-sm-4">
                  <div className="footer-link">
                    <h2>Information</h2>
                    <ul className="footer-contact-info">
<<<<<<< HEAD
                      <li><i className="fa fa-envelope"></i> Email:&nbsp;<a href="mailto:contact@texque.com">support@texque.com</a></li>
                      <li>
                        <a href="https://www.facebook.com/TexQueApp/" target="_blank" rel="noopener noreferrer"><i className="fa fa-facebook-square"></i> Facebook</a>
                      </li>
=======
                      <li><i className="fa fa-envelope"></i> Email:&nbsp;<a href="mailto:support@texque.com">support@texque.com</a></li>
>>>>>>> 182f9d510d3ee438378b93e0bf11b056bb50b6d7
                    </ul>
                    </div>
                  </div>
                </div>
            </div>
          </div>

          <div className="footer-copyright">
            <div className="container">
              <p>&copy; Copyright 2020 TexQue. All Rights Reserved.</p>
            </div>
          </div>
        </section>

    );
}

export default frontEndFooter;