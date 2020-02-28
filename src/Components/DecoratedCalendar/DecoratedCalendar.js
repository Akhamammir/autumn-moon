import React from 'react';
import './DecoratedCalendar.css';
import { Box, Text } from 'grommet';
import { DatePicker, Icon } from 'rsuite';
const miliPerYear = 31536000000;
class DecoratedCalendar extends React.Component {
  constructor(props) {
    super(props);
    console.log(props);
    switch(this.props.icon){
      case "Gift":
        this.state = {value:this.props.value, 
          Doodle:function() {
            return(
              <Icon
                icon="birthday-cake"
                size="lg"
                style={{
                  transform: "translate(0%, 12%)",
                  marginLeft:"7%", marginRight:"10px",
                  height:50, color:"#6C6C70"
                }}
              />
            );
          }
        }
      break;
    }
    console.log(this.Icon)
  }
  handleChange = (e) => {
    console.log(e)
    console.log( Math.floor( ( new Date() - new Date(e) ) / miliPerYear ) );
    
    this.setState({value:e}, () => {
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
        elevation="small"
        overflow ="hidden"
        className="DecorBox"
      >
        <Box
          direction="row"
          alignContent="start"
          width={{min:"118px"}}
          background="#AFDFFF"
        >
          <this.state.Doodle/>
          <Text
            size="small"
            style={{transform: "translate(0%, -5%)", marginTop:"6px"}}
            color="#6C6C70"
          >
            {this.props.area}
          </Text>
        </Box>
        <Box>
          <DatePicker
            value={this.props.value}
            onChange = { (e) => { this.handleChange(e) } }
            placeholder="Select Date"
            appearance = "subtle"
            block = {true}
            style={{ width: 200, transform: "translate(0%, -7.5%)" }}
          ></DatePicker>  
        </Box>
      </Box>
    );
  }
}
export default DecoratedCalendar;