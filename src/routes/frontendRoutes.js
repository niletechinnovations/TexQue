import HomePage from '../views/Pages/Frontend/HomePage';
import AboutPage from '../views/Pages/Frontend/AboutPage';
import ContactPage from '../views/Pages/Frontend/ContactPage';
import BlogPage from '../views/Pages/Frontend/BlogPage';
import SingleBlogPage from '../views/Pages/Frontend/SingleBlogPage';
import LoginPage from '../views/Pages/Login/LoginPage';
 import ResetPassword from '../views/Pages/Login/ResetPassword';
import RegisterPage from '../views/Pages/Register/RegisterPage';
import VerifyEmailPage from '../views/Pages/Login/VerifyEmailPage';
import AdvertiserSignup from '../views/Advertiser/AdvertiserSignup';

const frontendRoutes = [
  { path: '/', exact: true, name: 'Home', component: HomePage },
  { path: '/home', name: 'Home', component: HomePage },  
  { path: '/about-us', exact: true,  name: 'About us', component: AboutPage },
  { path: '/contact-us', exact: true,  name: 'Contact us', component: ContactPage },
  { path: '/blog', exact: true,  name: 'Blog', component: BlogPage },
  { path: '/blog/:token', exact: true,  name: 'Single Blog', component: SingleBlogPage },
  { path: '/login', exact: true, name: 'Login', component: LoginPage },
  { path: '/register', exact: true,  name: 'Register', component: RegisterPage },
  { path: '/verify-email/:token', exact: true,  name: 'Verify Email', component: VerifyEmailPage },
  { path: '/reset-password/:token', exact: true,  name: 'Reset Password', component: ResetPassword },
  { path: '/become-an-advertiser', exact: true,  name: 'Become an advertiser', component: AdvertiserSignup }  
];

export default frontendRoutes;
