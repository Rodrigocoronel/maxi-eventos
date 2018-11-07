import React, { Component } from 'react';
import { HashRouter, Route, Switch , Redirect} from 'react-router-dom';
import { connect } from 'react-redux';
import './App.css';
// Styles
// CoreUI Icons Set
import '@coreui/icons/css/coreui-icons.min.css';
// Import Flag Icons Set
import 'flag-icon-css/css/flag-icon.min.css';
// Import Font Awesome Icons Set
import 'font-awesome/css/font-awesome.min.css';
// Import Simple Line Icons Set
import 'simple-line-icons/css/simple-line-icons.css';
// Import Main styles for this application
import './scss/style.css'

// Containers
import { DefaultLayout } from './containers';

//actions 

import * as actions from './actions/auth';

// import { renderRoutes } from 'react-router-config';

class App extends Component {

  componentDidMount() {
        let { authenticated } = this.props.auth;

        if(authenticated) {
            this.props.whoiam();
        }
    }

  render() {

    let user = typeof this.props.auth.user === 'undefined'

  	let {authenticated} = this.props.auth;

  	if(!authenticated){
      return (<Redirect to={{pathname: '/'}} />)
    }     
    else if(!user){
      return (
        <HashRouter>
          <Switch>
            <Route path="/" name="Home" component={DefaultLayout} />
          </Switch>
        </HashRouter>
      )
    }
    else{
      return(<div></div>)
    }
  }
}

function mapStateToProps(state, ownProps) {
    return {
        auth : state.auth
    }
}

export default connect(mapStateToProps, actions)(App);
