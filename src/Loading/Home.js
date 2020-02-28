import React from 'react';
import './Home.css';
import Cookie from './Cookie.png'
import { Grommet, Image, Box, Heading, Clock } from 'grommet';
import axios from 'axios';
class Home extends React.Component {
  constructor(props) {
    super(props);
    console.log(this.props.location.state)
    this.state = {usr:'', pwd:''}
  }
  render() {
    return (
      <Grommet plain className="App">
        <header className="App-header">
          <Box>
            <Heading margin="none" color='accent-1' size="large" id="Fonter">Baking . . .</Heading>
          </Box>
          <br/>
          <Box height="small" width="small">
            <Image fit="cover"  src={Cookie} />
          </Box>
          <br/>
          <Clock type="digital" alignSelf="center" size="xlarge" id="Time"/>
        </header>
      </Grommet>
    );
  }
}
export default Home;
