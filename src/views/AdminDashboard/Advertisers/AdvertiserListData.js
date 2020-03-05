import React, { Component } from 'react';
import MUIDataTable from "mui-datatables";

class AdvertiserListData extends Component {
  
  constructor(props){
    super(props);   
    this.state = {
      buttonProcessing: false,
      rowIndex: '',
      dataTableItem: [],
    };
    
  }
  componentDidMount() {   
  }
  
  editUserRow(rowIndex){    
    this.props.editUserAction(rowIndex);
  }
  deleteUserRow(rowIndex){    
    this.props.deleteUserAction(rowIndex);
  }
  
  render() {
   
    let rowsItem = [];    
    for(const [i, userData] of this.props.data.entries()){
      let userInfo = {
        userName: userData.userName,
        email: userData.email,
        phoneNumber: userData.phoneNumber || " ",
        status: userData.status ? "Active" : "Inactive",   
        action: <div><button className="btn-edit" disabled={this.state.buttonProcessing} onClick={() => 
          this.editUserRow(i)}><i className="fa fa-pencil"></i> </button>
          <a href="#!" className="btn-delete" disabled={this.state.buttonProcessing} onClick={() => { if(window.confirm('Are you sure you want to delete this record?')){ this.deleteUserRow(i) };}} ><i className="fa fa-trash"></i></a></div>,       
      }      
      rowsItem.push(userInfo);
    }      
    const columns = [      
      {
        label: 'Advertiser Name',
        name: 'userName',
      },
      {
        label: 'Email ID',
        name: 'email',
      },
      {
        label: 'Phone no.',
        name: 'phoneNumber',
      },
      {
        label: 'Status',
        name: 'status',
      },
      {
        label: 'Action',
        name: 'action',
        options: {
          filter: false,
          sort: false
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

    };
    
    
    return (
      <MUIDataTable
        title={"Advertiser List"}
        data={rowsItem}
        columns={columns}
        options={options}
      />
    );
  }
}

export default AdvertiserListData;
