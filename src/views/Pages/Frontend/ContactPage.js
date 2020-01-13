import React from "react";
import "./ContactPage.css";

class ContactPage extends React.Component {
  
  render() {
    return (
      <>        
     
<section className="contact-section">
  <div className="container">
    <div className="row">
      <div className="col-lg-4 col-md-4">
        <div className="contact-info-card">
          <div className="contact-info-icon">
            <img src="/images/location.svg" alt="profile" />
          </div>
          <div className="contact-info-content">
            <h2>Address</h2>
            <p>Tower No-b2 Flat No- 002 Plot No-11 Golf City Sector-75 Noida-201301</p>
          </div>
        </div>
      </div>

       <div className="col-lg-4 col-md-4">
        <div className="contact-info-card">
          <div className="contact-info-icon">
            <img src="/images/email.svg" />
          </div>
          <div className="contact-info-content">
            <h2>Email Address</h2>
            <a href="mailto:hello@textque.com">hello@textque.com</a>
          </div>
        </div>
      </div>

      <div className="col-lg-4 col-md-4">
        <div className="contact-info-card">
          <div className="contact-info-icon">
            <img src="/images/phone-call.svg" />
          </div>
          <div className="contact-info-content">
            <h2>Phone</h2>
            <a href="tel:+1 9325468">+1 9325468</a>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div className="container">
    <div className="heading-title">
      <h2>Drop us Message for any Query</h2>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
    </div>
    <div className="row align-items-center">
        <div className="col-lg-4 col-md-4">
          <div className="contact-image">
            <img src="/images/contact-banner.svg" />
          </div>
        </div>
        <div className="col-lg-8 col-md-8">
          <div className="contact-form">
            <form id="contactForm">
              <div className="row">
                <div className="col-lg-6 col-md-12">
                  <div className="form-group">
                    <input className="form-control" name="name" placeholder="Name" required="" type="text" />
                  </div>
                </div>

                <div className="col-lg-6 col-md-12">
                  <div  className="form-group">
                    <input className="form-control" name="email" placeholder="Email" required="" type="email" />
                  </div>
                </div>

                <div className="col-lg-6 col-md-12">
                  <div  className="form-group">
                    <input className="form-control" name="phone" placeholder="Phone" required="" type="number" />
                  </div>
                </div>

                <div className="col-lg-6 col-md-12">
                  <div  className="form-group">
                    <input className="form-control" name="msg_subject" placeholder="Subject" required="" type="text" />
                  </div>
                </div>

                <div className="col-lg-12 col-md-12">
                  <div  className="form-group">
                    <textarea className="form-control" cols="30" name="message" placeholder="Your Message" required="" rows="5"></textarea>
                  </div>
                </div>

                <div className="col-lg-12 col-md-12">
                  <div className="form-group">
                    <button  className="Send-btn" type="submit">Send Message</button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
</section>
            
      </>
    );
  }
}

export default ContactPage;
