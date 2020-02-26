export default {
  items: [
    {
      name: 'Dashboard',
      url: '/admin/dashboard',
      icon: 'icon-speedometer',
    },
    {
      name: 'Food Truck',
      url: '/admin/organization',
      icon: 'fa fa-truck',
      children: [{
          name: 'Food Truck Owners',
          url: '/admin/organization',
          icon: 'icon-people',
        },
        {
          name: 'Food Truck Listings',
          url: '/admin/organization/truck-listing',
          icon: 'fa fa-truck',
        },
      ]    
    },
    {
      name: 'Users',
      url: '/admin/users',
      icon: 'icon-user',
    },
    {
      name: 'Enquiries',      
      icon: 'icon-envelope',
      url: '/admin/enquiries',
    },
    {
      name: 'Reviews',      
      icon: 'fa fa-star',
      url: '/admin/reviews',
    },
    {
      name: 'Transactions',      
      icon: 'fa fa-money',
      url: '/admin/transactions',
    },
    {
      name: 'Advertisements',      
      icon: 'fa fa-picture-o',
      url: '/admin/advertisement',
    },
    {
      name: 'Subscribed Users',
      url: '/admin/subscribed',
      icon: 'fa fa-list',
      children: [{
          name: 'Subscribed Owners',
          url: '/admin/subscribed',
          icon: 'fa fa-user',
        },
        {
          name: 'Subscribed Advertiser',
          url: '/admin/subscribed/advertisers',
          icon: 'fa fa-user',
        },
      ]    
    },
    {
      name: 'Manage Subscription',
      url: '/admin/subscription',
      icon: 'fa fa-credit-card-alt',
      children: [{
          name: 'Advertiser Plan',
          url: '/admin/subscription',
          icon: 'fa fa-credit-card',
        },
        {
          name: 'Food Truck Plan',
          url: '/admin/subscription/food-truck',
          icon: 'fa fa-credit-card',
        },
      ]    
    },
    {
      name: 'Cuisine',
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
