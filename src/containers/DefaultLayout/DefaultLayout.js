import React, { Component } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { Container } from 'reactstrap';
import { connect } from 'react-redux';

import {
  AppAside,
  AppBreadcrumb,
  AppFooter,
  AppHeader,
  AppSidebar,
  AppSidebarFooter,
  AppSidebarForm,
  AppSidebarHeader,
  AppSidebarMinimizer,
  AppSidebarNav,
} from '@coreui/react';
// sidebar nav config
import *as navigation from '../../_nav';
// routes config
import routes from '../../routes';
import DefaultAside from './DefaultAside';
import DefaultFooter from './DefaultFooter';
import DefaultHeader from './DefaultHeader';
import * as actions from '../../actions/dash';

class DefaultLayout extends Component {

  

  render() {

    let {user} = this.props.auth;
    let navigation_user = [];
    if(user.rol == 1){
      navigation_user = navigation.tecnico_nav;
    }else{
      navigation_user = navigation.admin_nav;
    }
    
    return (
      <div className="app">
        <AppHeader fixed>
          <DefaultHeader />
        </AppHeader>
        <div className="app-body">
          <AppSidebar fixed display="lg">
            <AppSidebarHeader />
            <AppSidebarForm />
            <AppSidebarNav navConfig={navigation_user} {...this.props} />
            <AppSidebarFooter />  
            <AppSidebarMinimizer />
          </AppSidebar>
          <main className="main">
            <AppBreadcrumb appRoutes={routes}/>
            <Container fluid style={{padding : '0px'}}>
               <Switch>
                 {routes.map((route, idx) => {
                     return route.component ? (<Route key={idx} path={route.path} exact={route.exact} name={route.name} render={props => (
                         <route.component {...props} />
                       )} />)
                       : (null);
                   },
                 )}
                 <Redirect from="/" to="app/dashboard" />
               </Switch>
             </Container>
          </main>
          <AppAside fixed hidden>
            <DefaultAside />
          </AppAside>
        </div>
        <AppFooter>
          <DefaultFooter />
        </AppFooter>
      </div>
    );
  }
}

function mapStateToProps(state, ownProps) {
    return {
        auth : state.auth
    }
};

export default connect(mapStateToProps, actions)(DefaultLayout)
