import React from 'react';
import './DecoratedInput.css';
import { Box, TextInput, Text } from 'grommet';
import { Icon } from 'rsuite';
class DecoratedInput extends React.Component {
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
        className = "DecorBox"
        elevation="small"
        overflow ="hidden"
      >
        <Box
          direction="row"
          alignContent="start"
          width={{min: this.props.boxw ? this.props.boxw : "118px"}}
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
            color="#414141"
          >
            {this.props.area}
          </Text>
        </Box>
        <Box width={this.props.textw ? this.props.textw : 'small'} >
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
export default DecoratedInput;