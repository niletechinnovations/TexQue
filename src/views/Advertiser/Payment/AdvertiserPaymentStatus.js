import React from "react";
import { Card, CardHeader, CardBody, Col, Row } from 'reactstrap';
import queryString from 'query-string';


import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import commonService from '../../../core/services/commonService';
import Loader from '../../../views/Loader/Loader';

class AdvertiserPaymentStatus extends React.Component {
  constructor( props ){
    super( props );
    this.state = {
        paymentStatus: '',
        paymentData: '',
        loading: false,
    };
  }

  componentDidMount() {
    const { match: { params } } = this.props;
    
    if(params.status !== undefined && params.status !=="") {
        if(params.status==='success'){
            const value=queryString.parse(this.props.location.search);
            const token=value.token;
            localStorage.setItem( 'isActivePlan', true );
            localStorage.setItem( 'isAdvertiser', true );
            this.setState({paymentStatus: params.status, token: token });
            this.getPaymentDetail(token);
        }else{
            if(params.status==='cancel')
                toast.error('You have cancelled your transaction');
            else
                toast.error('Your transaction has been '+params.status);
           
            this.props.history.push('/advertiser-plan');
            return;
        }
        
    }else 
        this.props.history.push('/advertiser-plan');
  }

  
  getPaymentDetail(token){
    if(token!==''){
      const formData = {
        "token": token
      }
      this.setState( { loading:true }, () =>{
        commonService.postAPIWithAccessToken('subscription/verify', formData)
        .then( res => {
          if ( undefined === res.data.data || !res.data.status ) {           
            this.setState( { loading: false} );
            toast.error(res.data.message);
            return;
          }
          this.setState( { loading: true, paymentData:res.data.data } );
          this.props.history.push('/advertiser/transactions');
        })
        .catch( err => {
          if(err.response !== undefined && err.response.status === 401) {
            localStorage.clear();
            this.props.history.push('/login');
          }else{
            this.setState( { loading: false } );
            toast.error(err.message);
          }
        })
      } );
    }
  }

  render() {
    const { loading, paymentData } = this.state;
    
    let loaderElement = '';
    if(loading)
      loaderElement = <Loader />

      return (
        <>
      <section>
        {loaderElement}
        <Card className="mb-3">
          <CardHeader className="mainHeading">
            <h5 className="m-0 p-0">Subscription Details</h5>
          </CardHeader>
          <CardBody className="transaction-details">
            <Row>
              <Col lg={2}>Subscription ID:</Col>
              <Col lg={10}>
                  {paymentData.subscriberId}
              </Col>
              <Col lg={2}>Payer ID:</Col>
              <Col lg={10}>
                  { (paymentData.payerId )}
              </Col>
              <Col lg={2}>Amount:</Col>
              <Col lg={10}>
                  ${paymentData.amount}
              </Col>
              <Col lg={2}>Status:</Col>
              <Col lg={10}>
                  { (paymentData.status ? 'Active' : 'Inactive' )}
              </Col>
              <Col lg={2}>Created On:</Col>
              <Col lg={10}>
                  { (new Date(paymentData.createdAt)).toLocaleDateString("en-US")}
              </Col>
              <Col lg={2}>Start Date:</Col>
              <Col lg={10}>
                  { (new Date(paymentData.startDate)).toLocaleDateString("en-US")}
              </Col>
              <Col lg={2}>End Date:</Col>
              <Col lg={10}>
                  { (new Date(paymentData.endDate)).toLocaleDateString("en-US")}
              </Col>
            </Row>
          </CardBody>
        </Card>  
      </section>

        </>
      );
  }
}

export default AdvertiserPaymentStatus;