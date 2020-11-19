import React from 'react';
import './Home.css';
import Manager from './../Manager/Manager';
import UsrBar from './../UsrBar/UsrBar';
import NavBar from './../NavBar/NavBar';
import { Grommet, Box, Grid} from 'grommet';
import axios from 'axios';
class Home extends React.Component {
  constructor(props) {
    super(props);
    console.log(this.props)
    this.state = {usr:this.props.location.state}
    axios.post('/users/role', {role:this.state.usr.Role}).then( res => {
      console.log(res.data.Role)
    });
  }
  render() {
    return (
      <Grommet plain className="App">
        <UsrBar usr={this.state.usr}/>
        <Grid
          rows={[process.env.REACT_APP_SCREEN_WIDTH]}
          columns={[process.env.REACT_APP_NAVBAR_WIDTH, process.env.REACT_APP_MAIN_WIDTH]}
          gap="10px"
          areas={[
            { name: 'nav', start: [0, 0], end: [0, 0] },
            { name: 'main', start: [1, 0], end: [1, 0] },
          ]}
        >
          <Box gridArea="nav" height="100vh" background={process.env.REACT_APP_NAVBAR_COLOR} width={process.env.REACT_APP_NAVBAR_WIDTH} elevation="small">
            <NavBar usr={this.state.usr} history = {this.props.history}/>
          </Box>
          <Box gridArea="main">
            <Manager{...this.props.location.state}/>
          </Box>
        </Grid>
      </Grommet>
    );
  }
}
export default Home;
