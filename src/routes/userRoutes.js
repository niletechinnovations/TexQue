import Dashboard from '../views/User/UserDashboard/Dashboard';
import MyProfile from '../views/User/MyProfile/MyProfile';
import ChangePassword from '../views/User/MyProfile/ChangePassword';
import MyListings from '../views/User/MyListings/FoodTruckLists';
import ListingDetails from '../views/User/MyListings/FoodTruckDetails';
import EditFoodTruck from '../views/User/MyListings/EditFoodTruck';
import EnquiryLists from '../views/User/Enquiries/EnquiryLists';
import FoodTruckSubscription from '../views/User/FoodTruckSubscription/FoodTruckSubscription';
import AdvertiserPlan from '../views/Advertiser/AdvertiserPlan';
import AdvertiserProfile from '../views/Advertiser/Profile/Profile';
import ReviewLists from '../views/User/Reviews/ReviewLists';

const userRoutes = [
  { path: '/user/', exact: true, name: 'Home' },
  { path: '/user/dashboard', exact: true, name: 'Dashboard', component: Dashboard },  
  { path: '/user/my-profile', exact: true,  name: 'Profile', component: MyProfile }, 
  { path: '/user/change-password', exact: true,  name: 'Change Password', component: ChangePassword },
  { path: '/user/my-listings', exact: true, name: 'My Listings', component: MyListings },
  { path: '/user/my-listings/:foodTruckId', exact: true, name: 'Edit Food Truck', component: EditFoodTruck },
  { path: '/user/listing-details', exact: true, name: 'My Listings', component: ListingDetails },
  { path: '/user/enquiries', exact:true, name:'Enquiry Lists', component: EnquiryLists},
  { path: '/user/reviews', exact:true, name:'Review Lists', component: ReviewLists},
  { path: '/user/subscription', exact: true,  name: 'Subscription', component: FoodTruckSubscription },
  { path: '/advertiser/plan', exact: true,  name: 'Advertiser Plan', component: AdvertiserPlan },
  { path: '/advertiser/profile', exact: true,  name: 'Advertiser Profile', component: AdvertiserProfile }
  

];

export default userRoutes;
