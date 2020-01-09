import Dashboard from '../views/User/UserDashboard/Dashboard';
//import Profile from './views/User/Profile/Profile';
//import ChangePassword from './views/User/ChangePassword/ChangePassword';
import MyListings from '../views/User/MyListings/FoodTruckLists';
const userRoutes = [
  { path: '/user/', exact: true, name: 'Home' },
  { path: '/user/dashboard', exact: true, name: 'Dashboard', component: Dashboard },  
 // { path: '/user/profile', exact: true,  name: 'Profile', component: Profile }, 
 // { path: '/user/change-password', exact: true,  name: 'Change Password', component: ChangePassword },
  { path: '/user/my-lisgings', exact: true, name: 'My Listings', component: MyListings },
];

export default userRoutes;
