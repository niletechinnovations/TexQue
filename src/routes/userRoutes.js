import Dashboard from '../views/User/UserDashboard/Dashboard';
//import Profile from './views/User/Profile/Profile';
//import ChangePassword from './views/User/ChangePassword/ChangePassword';
//import Inspection from './views/User/Inspection/InspectionLists';
const userRoutes = [
  { path: '/user/', exact: true, name: 'Home' },
  { path: '/user/dashboard', name: 'Dashboard', component: Dashboard },  
 // { path: '/user/profile', exact: true,  name: 'Profile', component: Profile }, 
 // { path: '/user/change-password', exact: true,  name: 'Change Password', component: ChangePassword },
//  { path: '/organization/inspection/assign-inspection', exact: true,  name: 'Assign Inspection', component: AssignInspection },
];

export default userRoutes;
