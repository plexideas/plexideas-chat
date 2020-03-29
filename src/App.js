import React, { Component } from 'react';
import {
  Route,
  BrowserRouter as Router,
  Switch,
  Redirect
} from 'react-router-dom';
import Home from './pages/Home/Home';
import Chat from './pages/Chat/Chat';
import Signup from './pages/Signup/Signup';
import Login from './pages/Login/Login';
import { auth } from './services/firebase';

import 'bootstrap/dist/css/bootstrap.min.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      authenticated: false,
      loading: true,
    };
  };

  componentDidMount() {
    auth().onAuthStateChanged((user) => {
      this.setState({
        authenticated: user ? true : false,
        loading: false,
      });
    })
  }

  render() {
    return this.state.loading ? <h2>Loading...</h2> : (
      <Router>
        <Switch>
          <Route exact path="/" component={Home} />
          <PrivateRoute path="/chat" authenticated={this.state.authenticated} component={Chat} />
          <PublicRoute path="/signup" authenticated={this.state.authenticated} component={Signup} />
          <PublicRoute path="/login" authenticated={this.state.authenticated} component={Login} />
        </Switch>
      </Router>
    )
  }
}

function PrivateRoute({component: Component, authenticated, ...rest}) {
  return (
    <Route 
      {...rest}
      render={(props) => authenticated
        ? <Component {...props} />
        : <Redirect
            to={{ pathname: "/login", state: { from: props.location } }}
          />
      }
    />
  );
};

function PublicRoute({component: Component, authenticated, ...rest}) {
  return (
    <Route 
      {...rest}
      render={(props) => !authenticated
        ? <Component {...props} />
        : <Redirect to="/chat" />
      }
    />
  );
};

export default App;
