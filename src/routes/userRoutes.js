import Dashboard from '../views/User/UserDashboard/Dashboard';
import MyProfile from '../views/User/MyProfile/MyProfile';
import ChangePassword from '../views/User/MyProfile/ChangePassword';
import MyListings from '../views/User/MyListings/FoodTruckLists';
import ListingDetails from '../views/User/MyListings/FoodTruckDetails';
import EditFoodTruck from '../views/User/MyListings/EditFoodTruck';
import EnquiryLists from '../views/User/Enquiries/EnquiryLists';
import FoodTruckSubscription from '../views/User/FoodTruckSubscription/FoodTruckSubscription';
import AdvertiserPlan from '../views/Advertiser/AdvertiserPlan';
import AdvertisementList from '../views/Advertiser/Advertisement/AdvertisementList';
import AdvertiserPaymentStatus from '../views/Advertiser/Payment/AdvertiserPaymentStatus';
import AdvertiserProfile from '../views/Advertiser/Profile/Profile';
import ReviewLists from '../views/User/Reviews/ReviewLists';
import TransactionList from '../views/User/Transactions/TransactionLists';
import SubscriptionPaymentStatus from '../views/User/FoodTruckSubscription/SubscriptionPaymentStatus';

const userRoutes = [
  { path: '/user/', exact: true, name: 'Home' },
  { path: '/user/dashboard', exact: true, name: 'Dashboard', component: Dashboard },  
  { path: '/user/my-profile', exact: true,  name: 'Profile', component: MyProfile }, 
  { path: '/user/change-password', exact: true,  name: 'Change Password', component: ChangePassword },
  { path: '/user/my-listings', exact: true, name: 'My Listings', component: MyListings },
  { path: '/user/my-listings/:foodTruckId', exact: true, name: 'Edit Food Truck', component: EditFoodTruck },
  { path: '/user/listing-details', exact: true, name: 'My Listings', component: ListingDetails },
  { path: '/user/inquiries', exact:true, name:'Inquiry Lists', component: EnquiryLists},
  { path: '/user/reviews', exact:true, name:'Review Lists', component: ReviewLists},
  { path: '/user/reviews/:foodtruckId', exact:true, name:'Food Truck Review', component: ReviewLists},
  { path: '/user/subscription', exact: true,  name: 'Subscription', component: FoodTruckSubscription },
  { path: '/user/payment/:status', exact: true,  name: 'Payment Status', component: SubscriptionPaymentStatus },
  { path: '/user/transactions', exact:true, name:'Transaction Lists', component: TransactionList},
  { path: '/advertiser/plan', exact: true,  name: 'Advertiser Plan', component: AdvertiserPlan },
  { path: '/advertiser/ads', exact: true,  name: 'Advertisement List', component: AdvertisementList },
  { path: '/advertiser/payment/:status', exact: true,  name: 'Payment Status', component: AdvertiserPaymentStatus },
  { path: '/advertiser/profile', exact: true,  name: 'Advertiser Profile', component: AdvertiserProfile }
  

];

export default userRoutes;
