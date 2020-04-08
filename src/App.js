import React from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Login from './Login/Login';
import Home from './Home/Home';
import User from './Users/User';
import ClientReg from './Clients/Clients';
import ClientsList from './ClientsList/ClientsList';


class Main extends React.Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route exact path="/" render = {(props) => <Login {...props}/> }>
          </Route>
          <Route path="/home/:Usr" render = {(props) => <Home {...props}/>} >
          </Route>
          <Route path="/users/:Usr" render = {(props) => <User {...props}/>} >
          </Route>
          <Route path="/clientreg/:Usr" render = {(props) => <ClientReg {...props}/>} >
          </Route>
          <Route path="/clients/:Usr" render = {(props) => <ClientsList {...props}/>} >
          </Route>
        </Switch>
      </Router>
    );
  }
}
export default Main;
