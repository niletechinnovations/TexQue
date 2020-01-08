import React, { Component, Suspense } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { Container,Col,Row } from 'reactstrap';

// routes config
import userRoutes from '../../routes/userRoutes';

import FrontEndHeader from '../FrontEndLayout/FrontEndHeader';
import FrontEndFooter from '../FrontEndLayout/FrontEndFooter';
import UserSidebar from './UserAside';

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
            <Container>
              <Row>
                <Col md={3}><UserSidebar /></Col>
                <Col md={9}>
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
            </Container>
          </main>
          <FrontEndFooter />           
        </div>
      </div>
    );
  }
}

export default UserLayout;
