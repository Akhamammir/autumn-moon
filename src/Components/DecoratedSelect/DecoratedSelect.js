import React from 'react';
import './DecoratedSelect.css';
import { Box, Select, Text } from 'grommet';
import { Icon } from 'rsuite';
import { StatusCritical } from 'grommet-icons';
class DecoratedSelect extends React.Component {
  constructor(props) {
    super(props);
    console.log(props);
    this.state = { value:this.props.value }
  }
  handleChange = (e) => {
    console.log(e)
    this.setState({value:e.value}, () => {
      this.props.onChange(this.state.value)
    });
  }
  render() {
    return(
      <Box
        width = {this.props.width}
        height="30px"
        direction="row"
        round="small"
        style={{
          marginRight:"15px",
          backgroundColor: "#F2F3F4"
        }}
        elevation="small"
        overflow ="hidden"
      >
        <Box
          direction="row"
          alignContent="start"
          width={{min:"118px"}}
          background="#00AB9B"
          style={{borderRadius:"11px 0px 0px 11px"}}
        >
          <Icon
                icon={this.props.icon}
                size="lg"
                style={{
                  transform: "translate(0%, 12%)",
                  marginLeft:"7%", marginRight:"10px",
                  height:50, color:"#F5F0F6"
                }}
              />
          <Text
            size="small"
            style={{marginTop:"6px"}}
            color="#F5F0F6"
          >
            {this.props.area}
          </Text>
        </Box>
        <Box>
          <Select
            plain
            style={{padding:5, height:"100%", marginTop:"1px"}}
            value={this.props.value}
            onChange = { (e) => { this.handleChange(e) } }
            options = { this.props.options ? this.props.options : ['You forgot', 'options', 'fuckface']}
          ></Select>  
        </Box>
      </Box>
    );
  }
}
export default DecoratedSelect;