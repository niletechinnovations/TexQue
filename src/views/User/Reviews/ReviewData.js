import React, { Component } from 'react';
import { Button } from 'reactstrap';
import MUIDataTable from "mui-datatables";

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

    const columns = [ 
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
          noMatch: this.props.dataTableLoadingStatus ? "Proccessing........" : "Sorry, no matching records found",
          toolTip: "Sort",
          columnHeaderTooltip: column => `Sort for ${column.label}`
        },
      },
      fixedHeaderOptions: { xAxis: false, yAxis: false }

    };
    
    return (
      <MUIDataTable
        title={"Reviews"}
        data={rowsItem}
        columns={columns}
        options={options}
      />
    );
  }
}

export default ReviewData;