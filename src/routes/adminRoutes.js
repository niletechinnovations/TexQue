import Dashboard from '../views/AdminDashboard/Dashboard/Dashboard';
import CuisineList from '../views/AdminDashboard/Category/Category';
import organizationList from '../views/AdminDashboard/Organization/Organization';
import UsersList from '../views/AdminDashboard/Users/Users'
import UserDetails from '../views/AdminDashboard/Users/User';

/*
import ChangePassword from '../views/User/MyProfile/ChangePassword';
*/
const adminRoutes = [
  { path: '/admin/', exact: true, name: 'Admin' },
  { path: '/admin/dashboard', exact: true, name: 'Dashboard', component: Dashboard },  
  { path: '/admin/cuisine', exact: true, name: 'Manage Cuisine', component: CuisineList },
  { path: '/admin/organization', exact: true, name: 'Manage Truck Owner', component: organizationList },
  { path: '/admin/users', exact: true, name: 'Manage Users', component: UsersList },
  { path: '/admin/user', exact: true,  name: 'User Details', component: UserDetails },
 /* { path: '/user/change-password', exact: true,  name: 'Change Password', component: ChangePassword },
  */
];

export default adminRoutes;
