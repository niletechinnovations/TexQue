export default {
  items: [
    {
      name: 'Dashboard',
      url: '/admin/dashboard',
      icon: 'icon-speedometer',     
    },
    {
      name: 'Manage Food Truck',
      url: '/admin/organization',
      icon: 'fa fa-truck', 
      children: [{
          name: 'Manage Truck Owner',
          url: '/admin/organization',
          icon: 'icon-people',     
        },
        {
          name: 'Manage Truck Listing',
          url: '/admin/organization/listing',
          icon: 'fa fa-truck',     
        },
      ]    
    },
    {
      name: 'Manage Users',
      url: '/admin/users',
      icon: 'icon-user',     
    },
    {
      name: 'Manage Enquiries',      
      icon: 'icon-envelope', 
      url: '/admin/enquiry',  
    },
    {
      name: 'Manage Cuisine',
      url: '/admin/cuisine',
      icon: 'fa fa-cutlery',
    },  
    {
      name: 'Reports',
      url: 'admin/reports',
      icon: 'icon-pie-chart',     
    },
    {
      name: 'Logout',
      url: '#!',
      icon: 'icon-logout',
    }
  ],
};
