import React, { Component, Suspense } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';


// routes config
import commonRoutes from '../../routes/commonRoutes';

class CommonLayout extends Component {

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
            <main>                
              <Suspense fallback={this.loading()}>
                <Switch>
                  {commonRoutes.map((route, idx) => {
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
                  <Redirect from="/common" to="/" />
                </Switch>
              </Suspense>
            </main>            
        </div>
      </div>
    );
  }
}

export default CommonLayout;
