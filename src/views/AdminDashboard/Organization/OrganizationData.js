import React, { Component } from 'react';
import  { Link } from 'react-router-dom';
import MUIDataTable from "mui-datatables";

class OrganizationData extends Component {
  
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
  /* Edit Organization Info */
  editOrganizationItem(rowIndex){    
    this.props.editOrganizationAction(rowIndex);
  }

  deleteOrganizationItem(rowIndex){    
    this.props.deleteOrganizationAction(rowIndex);
  }

  render() {
    
    let rowsItem = [];    
    for(const [i, orgnization] of this.props.data.entries()){
      let orgInfo = {
        organizationName: orgnization.organizationName,  
        firstName: orgnization.firstName +' '+ orgnization.lastName,
        email: orgnization.email,
        phoneNumber: orgnization.phoneNumber || " ",
        address: orgnization.address || " ",
        status: orgnization.status ? "Active" : "Inactive",   
        action: <p><button className="btn-edit" disabled={this.state.buttonProcessing} onClick={() => 
          this.editOrganizationItem(i)}><i className="fa fa-pencil"></i> </button>
          <Link className="btn-view" to={`/admin/organization/truck/${orgnization.authId}`}><i className="fa fa-truck"></i> </Link>
          <a href="#!" className="btn-delete" disabled={this.state.buttonProcessing} onClick={() => 
          this.deleteOrganizationItem(i)}><i className="fa fa-trash"></i></a></p>,       
      }      
      rowsItem.push(orgInfo);
    }      
    const columns = [      
      {
        label: 'Organization Name',
        name: 'organizationName',
      },
      {
        label: 'Contact Person',
        name: 'firstName',
      },
      {
        label: 'Email',
        name: 'email',
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
        title={"Truck Owner Lists"}
        data={rowsItem}
        columns={columns}
        options={options}
      />
    );
  }
}

export default OrganizationData;