import React, { Component } from 'react';
import { Button } from 'reactstrap';

import MUIDataTable from "mui-datatables";

class FoodTruckData extends Component {
  
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
  /* Edit Store Info */
  editStoreItem(rowIndex){    
    this.props.editStoreAction(rowIndex);
  }

  deleteStoreItem(rowIndex){    
    this.props.deleteStoreAction(rowIndex);
  }

  render() {
    
    let rowsItem = []; 
    /*
    for(const [i, Store] of this.props.data.entries()){
      let orgInfo = {  
        storeName: Store.storeName,        
        phoneNumber: Store.phoneNumber || " ",
        address: Store.address || " ",
        city: Store.city || " ",      
        state: Store.state || " ",
        country: Store.country || " ",
        status: Store.status ? 'Active' : 'Inactive',   
        action: <p><button className="btn-edit" disabled={this.state.buttonProcessing} onClick={() => 
          this.editStoreItem(i)}><i className="fa fa-pencil"></i> </button>
          <button href className="btn-delete" disabled={this.state.buttonProcessing} onClick={() => 
          this.deleteStoreItem(i)}><i className="fa fa-trash"></i></button></p>,       
      }      
      rowsItem.push(orgInfo);
    }      
    */
   let actionBtn =  <> 
    <Button color="info" size="sm" disabled={this.state.buttonProcessing} ><i className="fa fa-pencil"></i> </Button>&nbsp;
    <Button color="danger" size="sm" disabled={this.state.buttonProcessing} ><i className="fa fa-trash"></i></Button>&nbsp;
    <Button color="primary" size="sm" disabled={this.state.buttonProcessing} ><i className="fa fa-eye"></i> </Button>
    </>;

    rowsItem = [
    {
      truckImage: <img src="/images/t1.jpg" className="img-fluid img-thumbnail" width="50px" alt="" />,
      truckName: 'Tiger Nixon',
      address: 'Edinburgh',
      status: 'Active',
      date: '2011/04/25',
      action: actionBtn
    },
    {
      truckImage: <img src="/images/t2.jpg" className="img-fluid img-thumbnail" width="50px" alt="" />,
      truckName: 'Garrett Winters',
      address: 'Tokyo',
      status: 'Active',
      date: '2011/07/25',
      action: actionBtn
    },
    {
      truckImage: <img src="/images/t3.jpg" className="img-fluid img-thumbnail" width="50px" alt="" />,
      truckName: 'Ashton Cox',
      address: 'San Francisco',
      status: 'Active',
      date: '2009/01/12',
      action: actionBtn
    }
  ];

    const columns = [ 
      {
        label: 'Listing',
        name: 'truckImage',
      }, 
      {
        label: 'Name',
        name: 'truckName',
      }, 
      {
        label: 'Location',
        name: 'address',
      },
      {
        label: 'Date',
        name: 'date',
      },
      {
        label: 'Status',
        name: 'status',
      },
      {
        label: 'Action',
        name: 'action',
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
        title={"Food Truck Lists"}
        data={rowsItem}
        columns={columns}
        options={options}
      />
    );
  }
}

export default FoodTruckData;