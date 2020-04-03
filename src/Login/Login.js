import React from 'react';
import './Login.css';
import 'rsuite/dist/styles/rsuite-default.css';
import { Grommet, Button, WorldMap, TextInput, Box, Heading, Text, Anchor, Grid } from 'grommet';
import { Alert } from 'rsuite';
import axios from 'axios';
class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = { usr: '', pwd: '' }
    console.log(this.props)
  }
  Login = () => {
    axios.post('/users', { usr: this.state.usr }).then(res => {
      if (this.state.usr == res.data.User.Usr && this.state.pwd == res.data.User.Pwd) {
        this.props.history.push("/home/" + res.data.User.Usr, { ...res.data.User })
      } else {
        Alert.error('/users', 3000)
      }
    })
  }
  render() {
    return (
      <Grommet plain className="App">
        <header className="App-header">
          <Grid
            alignContent="center"
            rows={['70px', '600px', '250px']}
            columns={['7vw', 'xxlarge', '1px']}
            gap="small"
            areas={[
              { name: 'header', start: [0, 0], end: [2, 0] },
              { name: 'nav', start: [1, 1], end: [1, 1] },
              { name: 'main', start: [0, 2], end: [2, 2] },
            ]}
          >
            <Box gridArea="header">
              <Heading color='accent-1' size="large" id="Fonter" alignSelf="center">Heza</Heading>
            </Box>
            <WorldMap
              fill="vertical"
              margin={{left:'6vw'}}
              gridArea="nav"
              alignSelf="center"
              color="status-ok"
              continents={[
                {
                  name: 'North America',
                  color: 'accent-4',
                },
              ]}
              onSelectPlace={(lat, lon) => { }}
              places={[
                {
                  name: 'Puerto Vallarta',
                  location: [20.685601, -105.229814],
                  color: 'status-critical',
                },
              ]}
              selectColor="accent-2"
            />
            <Box gridArea="main" alignContent="center">
              <Box width="medium" alignSelf="center">
                <TextInput placeholder="Username" value={this.state.usr} onChange={(e) => this.setState({ usr: e.target.value })} size="small" />
              </Box>
              <br />
              <Box width="medium" alignSelf="center">
                <TextInput placeholder="Password" value={this.state.pwd} onChange={(e) => this.setState({ pwd: e.target.value })} type="password" size="small" styleClass="half-wide" />
              </Box>
              <br />
              <Box width="medium" alignSelf="center">
                <Button label='Submit' onClick={this.Login} color="accent-1" primary />
              </Box>
              <br />
              <Box width="medium" alignSelf="center">
                <Text>This Software is Powered By Eating </Text><Anchor href="https://www.cookiies.dev" color="accent-1" label="Cookies" />
              </Box>
            </Box>
          </Grid>
        </header>
      </Grommet>
    );
  }
}
export default Login;
