import React from 'react';
import './DecoratedMask.css';
import { Box, TextInput, Text } from 'grommet';
import { Icon } from 'rsuite';
class DecoratedMask extends React.Component {
  constructor(props) {
    super(props);
    console.log(props);
    this.state = {value:this.props.value}
  }
  handleChange = (e) => {
    console.log(e.target.name)
    this.setState({value:e.target.value}, () => {
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
        style={{marginRight:"15px"}}
        elevation="small"
        overflow ="hidden"
      >
        <Box
          direction="row"
          alignContent="start"
          width={{min:"118px"}}
          background="#AFDFFF"
          style={{borderRadius:"11px 0px 0px 11px"}}
        >
          <Icon
                icon={this.props.icon}
                size="lg"
                style={{
                  transform: "translate(0%, 18%)",
                  marginLeft:"7%", marginRight:"10px",
                  height:50, color:"#6C6C70"
                }}
              />
          <Text
            size="small"
            style={{marginTop:"6px"}}
            color="#6C6C70"
          >
            {this.props.area}
          </Text>
        </Box>
        <Box>
          <TextInput
            plain
            style={{padding:5, height:"100%", marginTop:"1px", opacity:1}}
            value={this.props.value}
            onChange = { this.props.onChange ?  (e) => { this.handleChange(e) } :false }
            type = { this.props.type ? this.props.type : 'text' }
            disabled = { this.props.display }
          ></TextInput>  
        </Box>
      </Box>
    );
  }
}
export default DecoratedMask;