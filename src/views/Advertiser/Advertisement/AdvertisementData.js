import React, { Component } from 'react';
import { Button } from 'reactstrap';
import MUIDataTable from "mui-datatables";

class AdvertisementData extends Component {
  
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
  /* Edit Ads Info */
  editRowItem(rowIndex){    
    this.props.editEnquiryAction(rowIndex);
  }
  /* Delete Ads Info */
  deleteRowItem(rowIndex){    
    this.props.deleteRowAction(rowIndex);
  }

  render() {
    
    let rowsItem = []; 
   
    for(const [i, rowData] of this.props.data.entries()){
      //console.log(i);
      let resInfo = {
        adImage: <img src={rowData.adImage} width="100" className="img-thumbnail" alt="Ad" />,
        adView: rowData.adView,
        adClick: rowData.adClick,
        status: ( rowData.adStatus===1 ? 'Active' : rowData.adStatus===2 ? 'Approval Pending' : "Inactive" ),
        createdAt: (new Date(rowData.createdAt)).toLocaleDateString("en-US"),
        indexVal: i,
        enquiryId: rowData.enquiryId,
        action: 
          <>
          <Button className="btn-edit btn-info" size='sm' disabled={this.state.buttonProcessing} onClick={() => 
          this.editRowItem(i)}><i className="fa fa-pencil"></i> </Button> &nbsp;
          <Button className="btn-delete btn-danger" size='sm' disabled={this.state.buttonProcessing} onClick={() => { if(window.confirm('Are you sure you want to delete this record?')){ this.deleteRowItem(i) };}}><i className="fa fa-trash"></i> </Button>
          </>  
      }      
      rowsItem.push(resInfo);
    }

    const columns = [ 
        {
            label: 'Ad Image',
            name: 'adImage',
        },
        {
            label: 'Posted on',
            name: 'createdAt',
        },
        {
            label: 'Status',
            name: 'status',
        },
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
          noMatch: this.props.dataTableLoadingStatus ? "Loading........" : "",
          toolTip: "Sort",
          columnHeaderTooltip: column => `Sort for ${column.label}`
        },
      },
      fixedHeaderOptions: { xAxis: false, yAxis: false }

    };
    
    return (
      <MUIDataTable
        title={"Advertisement List"}
        data={rowsItem}
        columns={columns}
        options={options}
      />
    );
  }
}

export default AdvertisementData;