import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import Loader from './views/Loader/Loader';

// Containers
const FrontEndLayout = React.lazy(() => import('./containers/FrontEndLayout/FrontEndLayout'));
const CommonLayout = React.lazy(() => import('./containers/CommonLayout/CommonLayout'));
const UserLayout = React.lazy(() => import('./containers/UserLayout/UserLayout'));

const loading = () => <Loader />;

class App extends Component {
  render(){
    return (
      <Router>
          <React.Suspense fallback={loading()}>
            <Switch>
              {/* <PrivateRoute path="/admin" name="Admin" component={AdminLayout} /> */}
              <Route path="/common" name="Common" component={CommonLayout} />
              <Route path="/user" name="User" component={UserLayout} />
              <Route path="/" name="Home" component={FrontEndLayout} />
              
            </Switch>
          </React.Suspense>
      </Router>
    );
  }
}

export default App;
