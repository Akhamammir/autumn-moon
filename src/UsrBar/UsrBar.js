import React from 'react';
import './UsrBar.css';
import Manager from './../Manager/Manager';
import { Sidenav, Nav, Dropdown, Icon } from 'rsuite';
import { Grommet, Box, Grid, Text, Image } from 'grommet';
const fallback = 'https://clinicforspecialchildren.org/wp-content/uploads/2016/08/avatar-placeholder.gif';
class UsrBar extends React.Component {
    constructor(props) {
        super(props);
        console.log(this.props);
        this.state = {usr:this.props.usr,pic:'',expanded:false}
    }
    render() {
        return (
            <span>
              <Box
              direction="row"
              background = "accent-1"
              height="2.5rem"
              elevation="small"
              pad="xsmall"
              style={{position:"fixed", width:"100vw", zIndex:10}}
            >
              <Box
                gridArea="1st"
                pad="xsmall"
              >
                <Text
                  style={{ color: "#424344",fontFamily: "'Manjari', sans-serif", fontWeight:600 }}
                >
                  Hola {this.state.usr.Name.First + ' ' + this.state.usr.Name.Last}!
                </Text>
              </Box>
              <Box
                size ="xxsmall"
                round="full"
                width="xxsmall"
                height="xxsmall"
                overflow="hidden"
                elevation="small"
                style={{position:"fixed", right:"1vw"}}
              >
                <Image
                  fit="cover"
                  src={this.state.pic}
                  fallback={fallback}
                />
              </Box>
            </Box>
            <Box
              direction="row"
              height="2.5rem"
              pad="xsmall"
            ></Box>
            </span>
        );
    }
}
export default UsrBar;