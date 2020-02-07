import React, { Component } from 'react';
import MUIDataTable from "mui-datatables";
import {Link} from "react-router-dom";

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
    for(const [i, Store] of this.props.data.entries()){
      let orgInfo = {   
        organizationName: Store.organizationName,      
        truckName: Store.truckName,        
        featuredImage: Store.featuredImage ? <img src={Store.featuredImage} width="50" alt="Food Truck" className="img-thumbnail" /> : '' ,
        phoneNumber: Store.phoneNumber || " ",
        address: Store.address || " ",
        status: Store.status ? 'Active' : 'Inactive',   
        action: <p><Link className="btn-edit" disabled={this.state.buttonProcessing} to={`/admin/organization/edit-truck/${Store.foodTruckId}`}><i className="fa fa-pencil"></i> </Link>
          <button className="btn-delete" disabled={this.state.buttonProcessing} onClick={() => {if(window.confirm('Are you sure you want to delete this record?')){ this.deleteStoreItem(i) };}} ><i className="fa fa-trash"></i></button></p>,
      }      
      rowsItem.push(orgInfo);
    }      
    
    const columns = [ 
      {
        label: 'Image',
        name: 'featuredImage',
      },     
      {
        label: 'Truck Name',
        name: 'truckName',
      },     
      {
        label: 'Organization Name',
        name: 'organizationName',
      },
      
      {
        label: 'Address',
        name: 'address',
      },
      {
        label: 'Phone Number',
        name: 'phoneNumber',
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
        title={"Food Truck List"}
        data={rowsItem}
        columns={columns}
        options={options}
      />
    );
  }
}

export default FoodTruckData;