export default {
  items: [
    {
      name: 'Dashboard',
      url: '/admin/dashboard',
      icon: 'icon-speedometer',     
    },
    {
      name: 'Manage Menu',
      url: '/admin/menu',
      icon: 'icon-list',
    },  
    {
      name: 'Manage Owners',
      url: '/admin/organization',
      icon: 'icon-people', 
      children: [{
          name: 'Food Truck Owner List',
          url: '/admin/organization',
          icon: 'icon-people',     
        },
        {
          name: 'Food Truck List',
          url: '/admin/organization/employee',
          icon: 'icon-people',     
        },
      ]    
    },
    
    {
      name: 'Manage Enquiries',      
      icon: 'icon-envelope', 
      url: '/admin/enquiry',  
    },
    {
      name: 'Reports',
      url: '#!',
      icon: 'icon-pie-chart',     
    },
    {
      name: 'Logout',
      url: '#!',
      icon: 'icon-logout',     
    }
  ],
};
