import React, { Component } from 'react';
import { Button } from 'reactstrap';
//import MUIDataTable from "mui-datatables";

import "./ReviewData.css";


class ReviewData extends Component {
  
  constructor(props){
    super(props);   
    this.state = {
      buttonProcessing: false,
      rowIndex: '',
      dataTableItem: []
    };
    
  }
  componentDidMount() {   
  }
  /* Edit Enquiry Info */
  editDataItem(rowIndex){    
    this.props.editDataAction(rowIndex);
  }
 

  render() {
    
    let rowsItem = []; 
   
    for(const [i, enquiry] of this.props.data.entries()){
      let resInfo = {
        reviewedBY: enquiry.reviewedBY,
        truckName: enquiry.truckName,
        rating: enquiry.rating || " ",
        message: enquiry.message || " ",
        status: enquiry.statusLabel ? enquiry.statusLabel : "Pending",   
        createdAt: (new Date(enquiry.createdAt)).toLocaleDateString("en-US"),
        indexVal: i,
        reviewId: enquiry.reviewId,
        action: <Button className="btn-edit btn-info" size='sm' disabled={this.state.buttonProcessing} onClick={() => 
          this.editDataItem(i)}><i className="fa fa-pencil"></i> </Button>
      }      
      rowsItem.push(resInfo);
    }

  /*   const columns = [ 
        {
            label: 'User',
            name: 'reviewedBY',
        },
        {
            label: 'Message',
            name: 'message',
        },
        { label: 'Truck Name', name: 'truckName' },
        { label: 'Rating', name: 'rating' },
        {
            label: 'Date',
            name: 'createdAt',
        },
        { label: 'Status', name: 'status' },
        {
            name: "action",
            label: "Action",
            options: {
                filter: false,
                sort: false,
            }
        },
    ];

    
    const options = {
      search: true,
      filter: false,
      searchOpen: false,
      print: false,
      download: false,
      responsive: 'stacked',
      selectableRows: 'none',
      textLabels: {
        body: {
          noMatch: this.props.dataTableLoadingStatus ? "Processing........" : "Sorry, no matching records found",
          toolTip: "Sort",
          columnHeaderTooltip: column => `Sort for ${column.label}`
        },
      },
      fixedHeaderOptions: { xAxis: false, yAxis: false }

    }; */

     
    return (
      <>  
       <div className="mainHeading card-header"><strong>Food Truck Reviews</strong></div>
       
	<div className="container">
	  <div className="row mt-3">
	    <div className="col-lg-2 col-2 ">
	    	<img className="img-thumnail" src="/images/avatar.jpg" alt="listings" width="100%"/>
	    	<figcaption className="figure-caption text-center mt-1">A caption for the above image.</figcaption>
	    </div>
	    <div className="col-lg-2 col-2 ">
	    	<img className="img-thumnail" src="/images/avatar.jpg" alt="listings" width="100%"/>
	    	<figcaption className="figure-caption text-center mt-1">A caption for the above image.</figcaption>
	    </div>
	    <div className="col-lg-2 col-2 ">
	    	<img className="img-thumnail" src="/images/avatar.jpg" alt="listings" width="100%"/>
	    	<figcaption className="figure-caption text-center mt-1">A caption for the above image.</figcaption>
	    </div>
	    <div className="col-lg-2 col-2 ">
	    	<img className="img-thumnail" src="/images/avatar.jpg" alt="listings" width="100%"/>
	    	<figcaption className="figure-caption text-center mt-1">A caption for the above image.</figcaption>
	    </div>
	    <div className="col-lg-2 col-2 ">
	    	<img className="img-thumnail" src="/images/avatar.jpg" alt="listings" width="100%"/>
	    	<figcaption className="figure-caption text-center mt-1">A caption for the above image.</figcaption>
	    </div>
	    <div className="col-lg-2 col-2 ">
	    	<img className="img-thumnail" src="/images/avatar.jpg" alt="listings" width="100%"/>
	    	<figcaption className="figure-caption text-center mt-1">A caption for the above image.</figcaption>
	    </div>
	  </div>
	</div>

        <div className="row d-flex justify-content-center">
          <div className="col-lg-9">
              <div className="card">
                  <div className="comment-widgets">
       				<div className="mainHeading card-header SubHeading"><strong>Reviews</strong></div>
                      <div className="d-flex flex-row comment-row">
                          <div className="userProfile">
                            <img src="/images/avatar.jpg" alt="listings" width="100%"/>
                          </div>
                          <div className="comment-text w-100">
                              <h6 className="font-medium">James Thomas</h6> 
                              <div className="products-rate-1"><i className="fa fa-star-o"></i> 0</div>
                              <p className="description">This is awesome website. I would love to comeback again. </p>
                              <div className="row">
                                <div className="col-lg-9">
                                  <div className="statusContainer">
                                    <p><span>Truck Name:</span> Xyz</p>
                                    <p className="statusPending"><span>Status:</span> Pending</p>
                                    <p className="statusPending"><span>Date:</span> 14-05-2020</p>
                                  </div>
                                </div>
                                <div className="col-lg-3">
                                  <div className="comment-footer float-right">
                                    <button type="button" className="btn btn-cyan btn-sm"><i className="fa fa-edit"></i>  Reply</button>
                                  </div>
                                </div>
                              </div>
                          </div>
                      </div>

                      <div className="d-flex flex-row comment-row">
                          <div className="userProfile">
                            <img src="/images/avatar.jpg" alt="listings" width="100%"/>
                          </div>
                          <div className="comment-text w-100">
                              <h6 className="font-medium">James Thomas</h6> 
                              <div className="products-rate-1"><i className="fa fa-star-o"></i> 0</div>
                              <p className="description">This is awesome website. I would love to comeback again. </p>
                              <div className="row">
                                <div className="col-lg-9">
                                  <div className="statusContainer">
                                    <p><span>Truck Name:</span> Xyz</p>
                                    <p className="statusPending"><span>Status:</span> Pending</p>
                                    <p className="statusPending"><span>Date:</span> 14-05-2020</p>
                                  </div>
                                </div>
                                <div className="col-lg-3">
                                  <div className="comment-footer float-right">
                                    <button type="button" className="btn btn-cyan btn-sm"><i className="fa fa-edit"></i>  Reply</button>
                                  </div>
                                </div>
                              </div>
                          </div>
                      </div>

                      
                      <div className="d-flex flex-row comment-row">
                          <div className="userProfile">
                            <img src="/images/avatar.jpg" alt="listings" width="100%"/>
                          </div>
                          <div className="comment-text w-100">
                              <h6 className="font-medium">Johnathan Doeting</h6> 
                              <div className="products-rate-1"><i className="fa fa-star-o"></i> 0</div>
                              <p className="description">Great industry leaders are not the real heroes of stock market. </p>
                              <div className="row">
                                <div className="col-lg-9">
                                  <div className="statusContainer">
                                    <p><span>Truck Name:</span> Xyz</p>
                                    <p className="statusPending"><span>Status:</span> Pending</p>
                                    <p className="statusPending"><span>Date:</span> 14-05-2020</p>
                                  </div>
                                </div>
                                <div className="col-lg-3">
                                  <div className="comment-footer float-right">
                                    <button type="button" className="btn btn-cyan btn-sm"><i className="fa fa-edit"></i>  Reply</button>
                                  </div>
                                </div>
                              </div>
                          </div>
                      </div>
                  </div>
              </div>
          </div>
      </div>
      </>
    );
  }
}

export default ReviewData;