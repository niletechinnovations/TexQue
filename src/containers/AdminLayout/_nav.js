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
          url: '/admin/organization/truck-listing',
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
      url: '/admin/enquiries',
    },
    {
      name: 'Manage Plans',
      url: '/admin/pricing-plans',
      icon: 'fa fa-money',
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
