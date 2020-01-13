import Dashboard from '../views/User/UserDashboard/Dashboard';
import MyProfile from '../views/User/MyProfile/MyProfile';
import ChangePassword from '../views/User/MyProfile/ChangePassword';
import MyListings from '../views/User/MyListings/FoodTruckLists';
import ListingDetails from '../views/User/MyListings/FoodTruckDetails';

const userRoutes = [
  { path: '/user/', exact: true, name: 'Home' },
  { path: '/user/dashboard', exact: true, name: 'Dashboard', component: Dashboard },  
  { path: '/user/my-profile', exact: true,  name: 'Profile', component: MyProfile }, 
  { path: '/user/change-password', exact: true,  name: 'Change Password', component: ChangePassword },
  { path: '/user/my-listings', exact: true, name: 'My Listings', component: MyListings },
  { path: '/user/listing-details', exact: true, name: 'My Listings', component: ListingDetails },
];

export default userRoutes;
