import HomePage from '../views/Pages/Frontend/HomePage';
import AboutPage from '../views/Pages/Frontend/AboutPage';
// import ContactPage from './views/Pages/Frontend/ContactPage';
// import BlogPage from './views/Pages/Frontend/BlogPage';
import LoginPage from '../views/Pages/Login/LoginPage';
// import ResetPassword from './views/Pages/Frontend/ResetPassword';
import RegisterPage from '../views/Pages/Register/RegisterPage';
import AutoComplePlaces from '../core/google-map/AutoComplePlaces';

const frontendRoutes = [
  { path: '/', exact: true, name: 'Home', component: HomePage },
  { path: '/home', name: 'Home', component: HomePage },  
  { path: '/about-us', exact: true,  name: 'About us', component: AboutPage },
  { path: '/map-location', exact: true,  name: 'Map Location', component: AutoComplePlaces },
  // { path: '/contact-us', exact: true,  name: 'Contact us', component: ContactPage },
  // { path: '/blog', exact: true,  name: 'Blog', component: BlogPage },
  { path: '/login', exact: true, name: 'Login', component: LoginPage },
  { path: '/register', exact: true,  name: 'Register', component: RegisterPage },
  // { path: '/reset-password/:token', exact: true,  name: 'Reset Password', component: ResetPassword }
];

export default frontendRoutes;
