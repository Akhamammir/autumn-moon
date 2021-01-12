import React from 'react';
import './Login.css';
import 'rsuite/dist/styles/rsuite-default.css';
import { Alert, Input, Button } from 'rsuite';
import axios from 'axios';
class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = { usr: '', pwd: '' }
    console.log(this.props)
  }
  Login = () => {
    axios.post('/users', { usr: this.state.usr, pwd: this.state.pwd }).then(res => {
      console.log(res.data)
      if(res.status === 202){
        this.props.history.push("/home/" + res.data.Usr, { ...res.data.Usr })
      } else {
        Alert.error('Datos incorrectos', 3000)
      }
    }).catch(()=>{Alert.error('Datos incorrectos', 3000)})
  }
  render() {
    //<img src={logo} className="App-logo" alt="logo" />
    return (
      <div className="App">
        <header className="App-header">
        <h3>Heza Consultoria Integral S.C.</h3>
        <br/>
        <Input
          style={{ width: 300 }}
          placeholder="Usuario"
          className="inputLog"
          value={this.state.usr}
          onChange={(e) => this.setState({ usr: e }) }
        />
        <br/>
        <Input
          style={{ width: 300 }}
          placeholder="Contraseña"
          className="inputLog"
          value={this.state.pwd}
          type="password"
          onChange={(e) => this.setState({ pwd: e })}
        />
        <br/>
        <Button appearance="primary" onClick={this.Login} >Entrar</Button>
        <br/>
          <p>
            Este software se alimenta de:
            <br/>
            <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Cookies
          </a>
          </p>
        </header>
      </div>
    );
  }
}
export default Login;
