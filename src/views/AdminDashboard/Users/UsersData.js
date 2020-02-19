import React, { Component } from 'react';
import MUIDataTable from "mui-datatables";

class UsersData extends Component {
  
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
        firstName: userData.firstName +' '+ userData.lastName,
        email: userData.email,
        phoneNumber: userData.phoneNumber || " ",
        address: userData.address || " ",
        status: userData.status ? "Active" : "Inactive",   
        action: <div><button className="btn-edit" disabled={this.state.buttonProcessing} onClick={() => 
          this.editUserRow(i)}><i className="fa fa-pencil"></i> </button>
          <a href="#!" className="btn-delete" disabled={this.state.buttonProcessing} onClick={() => { if(window.confirm('Are you sure you want to delete this record?')){ this.deleteUserRow(i) };}} ><i className="fa fa-trash"></i></a></div>,       
      }      
      rowsItem.push(userInfo);
    }      
    const columns = [      
      {
        label: 'User',
        name: 'firstName',
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
        label: 'Address',
        name: 'address',
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
          noMatch: this.props.dataTableLoadingStatus ? "Proccessing........" : "Sorry, no matching records found",
          toolTip: "Sort",
          columnHeaderTooltip: column => `Sort for ${column.label}`
        },
      },
      fixedHeaderOptions: { xAxis: false, yAxis: false }

    };
    
    
    return (
      <MUIDataTable
        title={"Users List"}
        data={rowsItem}
        columns={columns}
        options={options}
      />
    );
  }
}

export default UsersData;



/*
import React, { Component } from 'react';
import  { Link } from 'react-router-dom';
import { Table } from 'reactstrap';
function UsersRow(props) {
  const Users = props.Users;

  const getStatus = (status) => {
    return status === true ? 'Active' : 'Inactive'
  }  
  return (
    <tr>      
      <td><div className="profileImage userImg">{Users.firstName.substring(0, 1)}</div></td>
      <td>{Users.firstName}</td>
      <td>{Users.email}</td>
      <td>{Users.phoneNumber}</td>
      <td>{Users.address}</td>
      <td>{getStatus(Users.status)}</td>
      <td>{Users.action}</td>
    </tr>
  )
} 
class UsersData extends Component {
  
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
  
  render() {
    
    let rowsItem = [];
    
    for(const [i, userInfo] of this.props.data.entries()){    
      let userDetail = {
        firstName: userInfo.firstName,
        email: userInfo.email,
        phoneNumber: userInfo.phoneNumber || " ",
        address: userInfo.address || " ",
        status: userInfo.status || true,
        action: <p><Link to={`/admin/user/${userInfo.profileId}`} className="btn-edit"><i className="fa fa-eye"></i> </Link>
          <a href="#!" disabled={this.state.buttonProcessing} className="btn-delete" ><i className="fa fa-trash"></i></a></p>,

      }  
      rowsItem.push(userDetail);
    }       
    
    
    
    return (
      <Table responsive hover>
        <thead>
          <tr>            
            <th scope="col" className="th-user-img"><i className="icon-people"></i></th>
            <th scope="col">Name</th> 
            <th scope="col">Email</th>
            <th scope="col">Phone</th>
            <th scope="col">Address</th>      
            <th scope="col">Status</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          {rowsItem.map((Users, index) =>
            <UsersRow key={index} Users={Users}/>
          )}
        </tbody>
      </Table>
    );
  }
}

export default UsersData;
*/