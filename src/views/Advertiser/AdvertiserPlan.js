import React from "react";
//import  { Link } from 'react-router-dom';
//import { Col, Row, Button, Form, FormGroup,FormFeedback, Label, Input } from 'reactstrap';

//import { ToastContainer, toast } from 'react-toastify';
//import 'react-toastify/dist/ReactToastify.css';
//import commenService from '../../core/services/commonService';
import Loader from '../../views/Loader/Loader';
import "./AdvertiserPlan.css";

class AdvertiserPlan extends React.Component {
  constructor( props ){
    super( props );
    this.state = {
        loading: false,
    };
  }

  componentDidMount() {
    
  }

  render() {
    const { loading } = this.state;
    
    let loaderElement = '';
    if(loading)
      loaderElement = <Loader />

      return (
        <>
        <section className="pricing py-3 px-2">
            <div className="container">
                {loaderElement}
                <h2 className="pageHeading">Choose a Plan</h2>
                <hr className="divider" />
                <div className="row">
                    <div className="col-lg-6">
                        <div className="card active mb-5 mb-lg-0">
                        <div className="card-body">
                            <h5 className="card-title text-muted text-uppercase text-center">Free</h5>
                            <h6 className="card-price text-center">$2.9<span className="period">/month</span></h6>
                            <hr />
                            <ul className="fa-ul">
                                <li><span className="fa-li"><i className="fa fa-check"></i></span><strong>Upto 2 Ads</strong></li>
                                <li><span className="fa-li"><i className="fa fa-check"></i></span>Unlimited Views</li>
                            </ul>
                            <button className="btn btn-block btn-primary text-uppercase">Current Plan</button>
                        </div>
                        </div>
                    </div>
                    <div className="col-lg-6">
                        <div className="card mb-5 mb-lg-0">
                        <div className="card-body">
                            <h5 className="card-title text-muted text-uppercase text-center">Yearly</h5>
                            <h6 className="card-price text-center">$19<span className="period">/year</span></h6>
                            <hr />
                            <ul className="fa-ul">
                                <li><span className="fa-li"><i className="fa fa-check"></i></span><strong>Unlimited Ads</strong></li>
                                <li><span className="fa-li"><i className="fa fa-check"></i></span>Unlimited Views</li>
                            </ul>
                            <button className="btn btn-block btn-primary text-uppercase">Upgrade</button>
                        </div>
                        </div>
                    </div>
                
                    
                </div>
            </div>
        </section>

        </>
      );
  }
}

export default AdvertiserPlan;