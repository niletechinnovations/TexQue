import React, { Component, Suspense } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { Col,Row } from 'reactstrap';
import { ToastContainer } from 'react-toastify';
// routes config
import userRoutes from '../../routes/userRoutes';

import FrontEndHeader from '../FrontEndLayout/FrontEndHeader';
import FrontEndFooter from '../FrontEndLayout/FrontEndFooter';
import UserNavbar from './UserNavbar';

class UserLayout extends Component {
  
  loading = () => <div className="animated fadeIn pt-1 text-center">Loading...</div>

  signOut(e) {
    e.preventDefault();
    localStorage.clear();
    this.props.history.push('/login')
  }

  render() {
    return (
      <div className="app">
        <div className="flyout">
          <FrontEndHeader />
          <main className="user-profile-section">
            <Container-fluid>
              <Row>
                <Col md={12}>
                  <UserNavbar />
                </Col>  
                <Col md={12}>
                  <ToastContainer />
                  <Suspense fallback={this.loading()}>
                    <Switch>
                      {userRoutes.map((route, idx) => {
                        return route.component ? (
                          <Route
                            key={idx}
                            path={route.path}
                            exact={route.exact}
                            name={route.name}
                            render={props => (
                              <route.component {...props} />
                            )} />
                        ) : (null);
                      })}
                      <Redirect from="/user" to="/user/dashboard" />
                    </Switch>
                  </Suspense>
                </Col>
              </Row>  
            </Container-fluid>
          </main>
          <FrontEndFooter />           
        </div>
      </div>
    );
  }
}

export default UserLayout;
