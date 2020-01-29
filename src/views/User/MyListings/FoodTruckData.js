import React, { Component } from 'react';
import { Button } from 'reactstrap';
import {Link} from 'react-router-dom';
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
  editStoreItem(value, tableMeta, updateValue){
    alert( JSON.stringify(tableMeta.rowIndex) );
    //this.props.editStoreAction(rowIndex);
  }

 

  render() {
    
    let rowsItem = []; 
   
    for(const [i, orgnization] of this.props.data.entries()){
      console.log(i);
      let orgInfo = {
        organizationName: orgnization.organizationName,  
        contactPerson: orgnization.contactPerson,
        truckName: orgnization.truckName,
        phoneNumber: orgnization.phoneNumber || " ",
        address: orgnization.address || " ",
        status: orgnization.status ? "Active" : "Inactive",   
        createdAt: (new Date(orgnization.createdAt)).toLocaleDateString("en-US"),
        indexVal: i,
        foodTruckId: orgnization.foodTruckId,
        action: orgnization
       /* action: <p><button className="btn-edit" disabled={this.state.buttonProcessing} onClick={() => 
          this.editStoreItem(i)}><i className="fa fa-pencil"></i> </button>
          <button href className="btn-delete" disabled={this.state.buttonProcessing} onClick={() => 
          this.deleteStoreItem(i)}><i className="fa fa-trash"></i></button></p>,      */ 
      }      
      rowsItem.push(orgInfo);
    }      
    
   


    const columns = [ 
      {
        label: 'Listing',
        name: 'truckName',
      }, 
      {
        label: 'Location',
        name: 'address',
      },
      {
        label: 'Date',
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
          empty: true,
          customBodyRender: (value, tableMeta, updateValue) => {
            
            return (  <>
              <Link to={`/user/my-listings/${value.foodTruckId}`} className="btn btn-info btn-sm"><i className="fa fa-pencil"></i></Link>
             &nbsp;
              <Button color="danger" size="sm" disabled={this.state.buttonProcessing} onClick={() => {
          if (window.confirm('Are you sure you wish to delete this food truck?')) this.props.deleteFoodTruckAction(tableMeta.rowIndex) }} ><i className="fa fa-trash"></i></Button>&nbsp;
              <Button color="primary" size="sm" disabled={this.state.buttonProcessing} onClick={() => {
                const { rowsItem } = this.state;
                rowsItem.shift();
                this.setState({ rowsItem });
              }}><i className="fa fa-eye"></i></Button>
              </>     
            );
          }
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
        title={"Food Truck Lists"}
        data={rowsItem}
        columns={columns}
        options={options}
      />
    );
  }
}

export default FoodTruckData;