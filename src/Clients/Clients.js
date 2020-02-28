import React from 'react';
//import './User.css';
import UsrBar from './../UsrBar/UsrBar';
import NavBar from './../NavBar/NavBar';
import DecoratedInput from './../Components/DecoratedInput/DecoratedInput';
import DecoratedSelect from './../Components/DecoratedSelect/DecoratedSelect';
import DecoratedCalendar from './../Components/DecoratedCalendar/DecoratedCalendar';
import { Grommet, Box, Grid, Heading } from 'grommet';
import { Table, Avatar, Icon, Button, Modal, Alert, Progress  } from 'rsuite';
import axios from 'axios';
const { Line } = Progress;
const { Column, HeaderCell, Cell, Pagination } = Table;
const miliPerYear = 31536000000;
class ClientReg extends React.Component {
  constructor(props) {
    super(props);
    console.log(props)
    this.state = {usr:this.props.location.state, usrlist:[],
      name:'', nameFather:'', nameMother:'', birthday:'', gender:'', curp:'', rfc:'',
    dateHire:'', position:'', phoneNum:'', emergencyNum:'', academic:'', password:'', "_id":'', show:false}
  }
  componentDidMount() {
    axios.post('http://35.232.231.98:3001/userslist', {team:this.state.usr.Team}).then(res => {
      console.log(res)
      //this.setState({clients:res.data.User})
      let users = [];
      res.data.Users.forEach((I,J)=>{
        I.place = J;
        users.push(I)
      });
      this.setState({usrlist:users})
      console.log(this.state.usrlist);
      
    });
  }
  handleChange = (value, field) => {
    console.log(value, field)
    this.setState( {[field]:value}, ()=>{
      console.log(this.state);
    } )
    
  }
  handleUpload = () => {
    console.log("Hi");
    this.setState({
      show2:true
    })
    axios.post('http://35.232.231.98:3001/upUsr', {state: { name:this.state.name, nameFather:this.state.nameFather, nameMother:this.state.nameMother,
       birthday:this.state.birthday, gender:this.state.gender, curp:this.state.curp, rfc:this.state.rfc, dateHire:this.state.dateHire,
       position:this.state.position, phoneNum:this.state.phoneNum, emergencyNum:this.state.emergencyNum, academic:this.state.academic,
       password:this.state.password, "_id":this.state._id ? this.state._id : '0' } }).then(res => {
      console.log(res)
      Alert.success('Registro actualizado exitosamente.')
      this.setState({
        name:'', nameFather:'', nameMother:'', birthday:'', gender:'', curp:'', rfc:'',
        dateHire:'', position:'', phoneNum:'', emergencyNum:'', academic:'', password:'', "_id":'', show:false
      });
      this.componentDidMount();
      this.setState({
        show2:false
      })
    });
  }
  delete = () => {
    axios.post('http://35.232.231.98:3001/rmUsr', {_id:this.state._idDel}).then( res => {
      console.log(res)
      Alert.success('Registro eliminado exitosamente.')
      this.setState({
        name:'', nameFather:'', nameMother:'', birthday:'', gender:'', curp:'', rfc:'',
        dateHire:'', position:'', phoneNum:'', emergencyNum:'', academic:'', password:'', "_id":'', show:false
      });
      this.componentDidMount();
    } );
  }
  swap = () =>{
    this.setState({ show: !this.state.show })
  }
  render() {
    return (
      <Grommet plain className="App">
        <UsrBar usr={this.state.usr}/>


        <Modal show={this.state.show} onHide={ this.swap } >
          <Modal.Header>
            <Modal.Title>Eliminar usuario</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            Esta Usted seguro que desea eliminar al usuario?
            ATENCION NO SE PUEDE DESHACER ESTA OPERACION
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.delete} appearance="primary">
              Ok
            </Button>
            <Button onClick={ this.swap } appearance="subtle">
              Cancel
            </Button>
          </Modal.Footer>
        </Modal>



        <Modal show={this.state.show2}>
          <Modal.Header>
            <Modal.Title>Realizando Operacion</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            Subiendo
            <Line percent={30} status='active' showInfo={false} />
          </Modal.Body>
        </Modal>



        <Grid
          rows={[process.env.REACT_APP_SCREEN_WIDTH]}
          columns={[process.env.REACT_APP_NAVBAR_WIDTH, process.env.REACT_APP_MAIN_WIDTH]}
          gap="3px"
          areas={[
            { name: 'nav', start: [0, 0], end: [0, 0] },
            { name: 'main', start: [1, 0], end: [1, 0] },
          ]}
        >
          <Box gridArea="nav" height="100vh" background={process.env.REACT_APP_NAVBAR_COLOR} width={process.env.REACT_APP_NAVBAR_WIDTH} elevation="small">
            <NavBar usr={this.state.usr} history = {this.props.history}/>
          </Box>
          <Box gridArea="main">
            <br/>
            <Grid
              rows={['small', 'large']}
              columns={['small', '70%']}
              gap="3px"
              areas={[
                { name: 'avatar', start: [0, 0], end: [0, 0] },
                { name: 'name', start: [1, 0], end: [1,0] },
                { name: 'info', start: [1, 1], end: [1,1] }
              ]}
            >
              <Box gridArea="avatar">
                
              </Box>
              <Box gridArea="name">
                <Heading
                  level="2"
                  margin="none"
                  style = {{
                    left:"50%",
                    color: "#323435"
                  }}
                  textAlign="center"
                >
                  { this.state.name[0] ? (this.state.name + ' ' + this.state.nameFather + ' ' + this.state.nameMother) 
                  : 'Ingrese un nombre o seleccione a un usuario' }
                  </Heading>
                <br/>
                <Heading level="3" margin="none" style = {{left:"60%", marginLeft:"20px"}} textAlign="center">{this.state.curPos}</Heading>
                <br/>
                
              </Box>
              <Box gridArea="info">
              <Box direction="row">
                  <DecoratedInput
                    area="Razon"
                    value={this.state.name}
                    onChange={ (e) => {this.handleChange(e, 'name') } }
                    width = "100%"
                    boxw = "90px"
                    textw = "medium"
                    icon = "id-mapping"
                  />
                </Box>
                <br/>
                <Box direction="row">
                  <DecoratedInput
                    area="Nombre Comercial"
                    value={this.state.nameMother}
                    onChange={ (e) => {this.handleChange(e, 'nameMother') } }
                    width = "100%"
                    boxw = "170px"
                    textw = "medium"
                    icon = "id-mapping"
                  />
                </Box>
                <br/>
                <Box direction="row">
                  <DecoratedInput
                    area="Domicilio Fiscal"
                    value = {this.state.Fiscal}
                    width = "100%"
                    boxw = "140px"
                    textw = "medium"
                    icon = "hourglass-2"
                    display = {true}
                  />
                </Box>
                <br/>
                <Box direction="row">
                <DecoratedInput
                    area="Curp"
                    value={this.state.curp}
                    onChange={ (e) => {this.handleChange(e, 'curp') } }
                    width = "60%"
                    icon = "id-card"
                  />
                  <DecoratedInput
                    area="RFC"
                    value={this.state.rfc}
                    onChange={ (e) => {this.handleChange(e, 'rfc') } }
                    width = "60%"
                    icon = "id-card"
                  />
                </Box>
                <br/>
                <Box direction="row">
                  <DecoratedCalendar
                    area="Fecha Ing."
                    value={this.state.dateHire}
                    onChange={ (e) => {this.handleChange(e, 'dateHire') } }
                    width = "60%"
                    icon = "Gift"
                  />
                  <DecoratedInput
                    area="Puesto"
                    value={this.state.position}
                    onChange={ (e) => {this.handleChange(e, 'position') } }
                    width = "60%"
                    icon = "peoples-map"
                  />
                </Box>
                <br/>
                <Box direction="row">
                  <DecoratedInput
                    area="Numero Tel."
                    value={this.state.phoneNum}
                    onChange={ (e) => {this.handleChange(e, 'phoneNum') } }
                    width = "60%"
                    type="number"
                    icon = "mobile"
                  />
                  <DecoratedInput
                    area="Tel. Emer"
                    value={this.state.emergencyNum}
                    onChange={ (e) => {this.handleChange(e, 'emergencyNum') } }
                    width = "60%"
                    type="number"
                    icon = "phone"
                  />
                </Box>
                <br/>
                <Box direction="row">
                  <DecoratedInput
                    area="Nivel Acad."
                    value={this.state.academic}
                    onChange={ (e) => {this.handleChange(e, 'academic') } }
                    width = "60%"
                    icon = "mortar-board"
                  />
                  <DecoratedInput
                    area="Password"
                    onChange={ (e) => {this.handleChange(e, 'password') } }
                    width = "60%"
                    icon = "key"
                    type = "password"
                  />
                </Box>
                <br/>
                <Button
                  style={{
                    backgroundColor:"#6FFFB0",
                    width:"120px",
                    fontFamily:"'Manjari', sans-serif",
                    boxShadow: "0px 2px 4px rgba(0,0,0,0.20)"
                  }}
                  onClick = { () => this.handleUpload() }
                >
                  <Icon icon="user-plus"  />&nbsp;&nbsp;Add User
                </Button>
              </Box>
            </Grid>
          </Box>
        </Grid>
      </Grommet>
    );
  }
}
export default ClientReg;
