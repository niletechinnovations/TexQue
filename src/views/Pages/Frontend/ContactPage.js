import React from "react";
import { Container, Row, Col} from 'reactstrap';
import "./ContactPage.css";

class ContactPage extends React.Component {
  
  render() {
    return (
      <>        
     
<section className="contact-section">
  <Container>
    <Row>
      <Col md="4" lg="4">
        <div className="contact-info-card">
          <div className="contact-info-icon">
            <img src="/images/location.svg" alt="profile" />
          </div>
          <div className="contact-info-content">
            <h2>Address</h2>
            <p>5716 Jacks St., Edinburg, TX 78542, US</p>
          </div>
        </div>
      </Col>

      <Col md="4" lg="4">
        <div className="contact-info-card">
          <div className="contact-info-icon">
            <img src="/images/email.svg" alt="" />
          </div>
          <div className="contact-info-content">
            <h2>Email Address</h2>
            <a href="mailto:hello@textque.com">hello@textque.com</a>
          </div>
        </div>
      </Col>

      <Col md="4" lg="4">
        <div className="contact-info-card">
          <div className="contact-info-icon">
            <img src="/images/phone-call.svg" alt="" />
          </div>
          <div className="contact-info-content">
            <h2>Phone</h2>
            <a href="tel:+1 9566015773">+1 9566015773</a>
          </div>
        </div>
      </Col>
    </Row>
  </Container>

  <Container>
    <div className="heading-title">
      <h2>Drop us Message for any Query</h2>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
    </div>
    <Row className="align-items-center">
        <Col md="4" lg="4">
          <div className="contact-image">
            <img src="/images/contact-banner.svg" alt="" />
          </div>
        </Col>
        <Col md="8" lg="8">
          <div className="contact-form">
            <form id="contactForm">
              <Row>
                <Col md="12" lg="6">
                  <div className="form-group">
                    <input className="form-control" name="name" placeholder="Name" required="" type="text" />
                  </div>
                </Col>

                <Col md="12" lg="6">
                  <div  className="form-group">
                    <input className="form-control" name="email" placeholder="Email" required="" type="email" />
                  </div>
                </Col>

                <Col md="12" lg="6">
                  <div  className="form-group">
                    <input className="form-control" name="phone" placeholder="Phone" required="" type="number" />
                  </div>
                </Col>

                <Col md="12" lg="6">
                  <div  className="form-group">
                    <input className="form-control" name="msg_subject" placeholder="Subject" required="" type="text" />
                  </div>
                </Col>

                <Col md="12" lg="6">
                  <div  className="form-group">
                    <textarea className="form-control" cols="30" name="message" placeholder="Your Message" required="" rows="5"></textarea>
                  </div>
                </Col>

                <Col md="12" lg="6">
                  <div className="form-group">
                    <button  className="Send-btn" type="submit">Send Message</button>
                  </div>
                </Col>
              </Row>
            </form>
          </div>
        </Col>
      </Row>
  </Container>
</section>
            
      </>
    );
  }
}

export default ContactPage;
