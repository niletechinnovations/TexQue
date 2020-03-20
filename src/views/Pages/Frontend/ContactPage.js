import React from "react";
import { Container, Row, Col, Form, FormGroup, FormFeedback, Input, Button} from 'reactstrap';
import { ToastContainer, toast } from 'react-toastify';
import commenService from '../../../core/services/commonService';
import Loader from '../../../views/Loader/Loader';

import "./ContactPage.css";

class ContactPage extends React.Component {
  constructor( props ){
    super( props );

    this.state = {
      formField: { userName:'', email:'', phoneNumber:'', msg_subject:'', message:'' },
      loading: false,
      errors: {}
    };

    this.changeHandler = this.changeHandler.bind(this);
    this.submitContactForm = this.submitContactForm.bind(this);
  }

  componentDidMount() {
    window.scrollTo(0, 0);
  }
  
  submitContactForm(e) {
    e.preventDefault();
    e.target.className += " was-validated";
      if (this.validateForm()) {
        const formInputField = this.state.formField;
        const formData = {
          contactPerson: formInputField.userName,
          email: formInputField.email.toLowerCase(),
          phoneNumber: formInputField.phoneNumber,
          subject: formInputField.msg_subject,
          message: formInputField.message,
        };
        this.setState( { loading: true }, () => {
          commenService.postAPI( `common/contact-us`, formData )
            .then( res => {
              if ( undefined === res.data || !res.data.status ) {
                this.setState( { loading: false } );
                toast.error(res.data.message);
                return;
              }
              
              this.props.history.push('/contact-us');
              toast.success(res.data.message);
              this.setState( {
                formField: { userName:'', email:'', phoneNumber:'', msg_subject:'', message:'' },
                loading: false,
                errors: {}
              } )
            } )
            .catch( err => {
              toast.error(err.message);
              this.setState( { loading: false} );
            } )
        } )
      }else{
        //console.log("Outside validation area.");
      }
  };

  validateForm() {
    let errors = {};
    let formIsValid = true;
    const formField = this.state.formField;
    if (!formField.userName) {
        formIsValid = false;
        errors["userName"] = "*Please enter name.";
    }
    if (typeof formField.userName !== "undefined") {
        if (!formField.userName.match(/^[a-zA-Z ]*$/)) {
            formIsValid = false;
            errors["userName"] = "*Please enter alphabet characters only.";
        }
    }
    if (!formField.email) {
        formIsValid = false;
        errors["email"] = "*Please enter your email-ID.";
    }
    if (typeof formField.email !== "undefined") {
        //regular expression for email validation
        var pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
        if (!pattern.test(formField.email)) {
            formIsValid = false;
            errors["email"] = "*Please enter valid email-ID.";
        }
    }
    if (formField.phoneNumber !== "") {
        if (!formField.phoneNumber.match(/^[0-9]{10}$/)) {
            formIsValid = false;
            errors["phoneNumber"] = "*Please enter valid mobile no.";
        }
    }
    if (!formField.msg_subject) {
        formIsValid = false;
        errors["msg_subject"] = "*Please enter your subject.";
    }
    if (!formField.message) {
      formIsValid = false;
      errors["message"] = "*Please enter your query.";
    }
    this.setState({ loading: false, errors: errors });
    return formIsValid;
  }

  changeHandler(e) {  
    const name = e.target.name;
    const value = e.target.value;
    const formField = this.state.formField
    formField[name] = value;
    this.setState({ formField: formField });
  };

  render() {
    const { loading, formField, errors} = this.state;
    let loaderElement = '';
    if(loading)
      loaderElement = <Loader />

    return (
      <>        
        <ToastContainer /> 
        {loaderElement} 
        
        <section className="contact-section">
          <Container>
            <div className="heading-title">
              <h2>We would love to hear from you!</h2>
              <p>Please fill out the form below to inquire about our services.</p>
            </div>
            <Row className="align-items-center">
                <Col md="4" lg="4">
                  <div className="contact-image">
                    <img src="/images/contact-banner.svg" alt="" />
                  </div>
                </Col>
                <Col md="8" lg="8">
                  <div className="contact-form">
                  <Form onSubmit={this.submitContactForm} id="contactForm" noValidate>
                      <Row>
                        <Col md="12" lg="6">
                          <FormGroup>
                            <Input type="text" name="userName" invalid={errors['userName'] !== undefined && errors['userName'] !== ""} value={formField.userName} onChange={this.changeHandler} placeholder="Name *" required />
                            <FormFeedback>{errors['userName']}</FormFeedback>
                          </FormGroup>
                        </Col>

                        <Col md="12" lg="6">
                          <FormGroup>
                            <Input type="email" name="email" id="email" invalid={errors['email'] !== undefined && errors['email'] !== ""} value={formField.email} onChange={this.changeHandler} placeholder="Email *" required />
                            <FormFeedback>{errors['email']}</FormFeedback>
                          </FormGroup>
                        </Col>
                        <Col md="12" lg="6">
                          <FormGroup>
                            <Input type="number" name="phoneNumber" invalid={errors['phoneNumber'] !== undefined && errors['phoneNumber'] !== ""} value={formField.phoneNumber} onChange={this.changeHandler} placeholder="Phone (optional)" />
                            <FormFeedback>{errors['phoneNumber']}</FormFeedback>
                          </FormGroup>
                        </Col>
                        <Col md="12" lg="6">
                          <FormGroup>
                            <Input type="text" name="msg_subject" invalid={errors['msg_subject'] !== undefined && errors['msg_subject'] !== ""} value={formField.msg_subject} onChange={this.changeHandler} placeholder="Subject *" required />
                            <FormFeedback>{errors['msg_subject']}</FormFeedback>
                          </FormGroup>
                        </Col>

                        <Col md="12" lg="6">
                          <FormGroup>
                            <Input type="textarea" name="message" invalid={errors['message'] !== undefined && errors['message'] !== ""} value={formField.message} onChange={this.changeHandler} placeholder="Your Message *" required />
                            <FormFeedback>{errors['message']}</FormFeedback>
                          </FormGroup>
                        </Col>

                        <Col md="12" lg="6">
                          <FormGroup>
                            <Button className="Send-btn">Send Message</Button>
                          </FormGroup>
                        </Col>
                      </Row>
                    </Form>
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
