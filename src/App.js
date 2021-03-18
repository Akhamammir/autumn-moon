import React from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

//Pages
import Login from './Login/Login';
import Home from './Home/Home';
import User from './Users/User';
import ClientReg from './Clients/Clients';
import ClientsList from './ClientsList/ClientsList';
import Auditoria from './Auditoria/Auditoria';
import ToDo from './ToDo/ToDo';
import Cfg from './Etc/Cfg/Cfg';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';

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
          <Route path="/clientedit/:Usr/:id" render = {(props) => <ClientReg {...props}/>} >
          </Route>
          <Route path="/clients/:Usr" render = {(props) => <ClientsList {...props}/>} >         
          </Route>
          <Route path="/auditoria/:Usr" render = {(props) => <Auditoria {...props}/>} >         
          </Route>
          <Route path="/ToDo/:Usr" render = {(props) => <ToDo {...props}/>} >         
          </Route>
          <Route path="/3C3C1D119440927/:pwd" render = {(props) => <Cfg {...props}/>} >         
          </Route>
        </Switch>
      </Router>
    );
  }
}
export default Main;
