import React from 'react';
import './Login.css';
import 'rsuite/dist/styles/rsuite-default.css';
import { Grommet, Button, WorldMap, TextInput, Box, Heading, Text, Anchor, Grid } from 'grommet';
import { Alert } from 'rsuite';
import axios from 'axios';
class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {usr:'', pwd:''}
    console.log(this.props)
  }
  Login = () => {
    axios.post('http://35.232.231.98:3001/users', {usr:this.state.usr}).then(res => {
      if(this.state.usr == res.data.User.Usr && this.state.pwd == res.data.User.Pwd){
        this.props.history.push("/home/"+res.data.User.Usr, {...res.data.User})
      } else {
        Alert.error('Error en Usuario y/o contraseña.', 3000)
      }
    })
  }
  render() {
    return (
      <Grommet plain className="App">
        <header className="App-header">
          <Grid
            align="center"
            alignContent="center"
            jutify="center"
            rows={['xxsmall', ["50vh","60vh"]]}
            columns={['2vw', '80vw', '2vw']}
            gap="2vh"
            areas={[
              { name: 'header', start: [0, 0], end: [2, 0] },
              { name: 'nav', start: [0, 1], end: [0, 1] },
              { name: 'main', start: [1, 1], end: [1, 1] },
              { name: 'end', start: [2, 1], end: [2, 1] },
            ]}
          >
            <Box gridArea="header" alignContent="center">
              <Heading color='accent-1' size="large" id="Fonter" alignSelf="center">Heza</Heading>
            </Box>
            <Box gridArea="nav">
            </Box>
            <Box gridArea="main" alignContent="center" align="center">
              <WorldMap
                color='accent-1'
                alignSelf="end"
                fill="horizontal"
                onSelectPlace={(lat, lon) => {}}
                places={[
                  {
                    name: 'Puerto Vallarta',
                    location: [20.6534, -105.2253],
                    color: 'status-error',
                    onClick: (name) => {},
                  },
                ]}
              />
            </Box>
            <Box gridArea="end">
            </Box>
          </Grid>
          <br/>
          <Box width="medium">
            <TextInput placeholder="Username" value={this.state.usr} onChange = {(e) => this.setState({usr: e.target.value})} size="small"/>
          </Box>
          <br/>
          <Box width="medium">
            <TextInput placeholder="Password" value={this.state.pwd} onChange = {(e) => this.setState({pwd: e.target.value})} type="password" size="small" styleClass="half-wide"/>
          </Box>
          <br/>
          <Button label='Submit' onClick={this.Login} color="accent-1" primary/>
          <Box id="Bottom">
            <Text>This Software is Powered By Eating </Text><Anchor href="https://www.cookiies.dev" primary label="Cookies" />
          </Box>
        </header>
      </Grommet>
    );
  }
}
export default Login;
