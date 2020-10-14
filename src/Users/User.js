import React from 'react';
import './User.css';
import UsrBar from './../UsrBar/UsrBar';
import NavBar from './../NavBar/NavBar';
import DecoratedInput from './../Components/DecoratedInput/DecoratedInput';
import DecoratedSelect from './../Components/DecoratedSelect/DecoratedSelect';
import DecoratedCalendar from './../Components/DecoratedCalendar/DecoratedCalendar';
import { Grommet, Box, Grid, Heading } from 'grommet';
import { Table, Avatar, Icon, Button, Modal, Alert, Progress  } from 'rsuite';
import axios from 'axios';
import { DataTable } from 'primereact/datatable';
import { Column  } from 'primereact/column';

const { Line } = Progress;
const miliPerYear = 31536000000;
class User extends React.Component {
  constructor(props) {
    super(props);
    console.log(props)
    this.state = {usr:this.props.location.state, usrlist:[], name:'',
     nameFather:'', nameMother:'', birthday:'', gender:'', curp:'',
       rfc:'', dateHire:'', position:'', phoneNum:'', emergencyNum:'', 
        academic:'', password:'', "_id":'', show:false, Team:''}
  }
  componentDidMount() {
    axios.post('/userslist', {team:this.state.usr.Team}).then(res => {
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
    axios.post('/upUsr', {state: { name:this.state.name, nameFather:this.state.nameFather, nameMother:this.state.nameMother,
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
    axios.post('/rmUsr', {_id:this.state._idDel}).then( res => {
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
          <br />
            <DataTable value={this.state.usrlist} rowHover={true}>
              <Column field='place' header='Usuario' />
              <Column field='Name.First' header='Nombre' />
              <Column field='Name.Last' header='Apellido Paterno' />
              <Column field='Name.Last2' header='Apellido Materno' />
              <Column field='Pos' header='Puesto' />
              <Column field='Role' header='Rol' />
              <Column header='Action' body={()=>(
                <span>  
                <a onClick={this.showUser}> Edit </a> | {' '}
                <a onClick={ this.swap }> Delete </a>
              </span>)
              }>                
              </Column>
            </DataTable>
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
                <Avatar classPrefix="avatar" circle src="https://avatars2.githubusercontent.com/u/12592949?s=460&v=4" />
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
                  : 'Ingrese un nombre o seleccione a un empleado' }
                  </Heading>
                <br/>
                <Heading level="3" margin="none" style = {{left:"60%", marginLeft:"20px"}} textAlign="center">{this.state.curPos}</Heading>
                <br/>

              </Box>
              <Box gridArea="info">
              <Box direction="row">
                  <DecoratedInput
                    area="Nombre(s)"
                    value={this.state.name}
                    onChange={ (e) => {this.handleChange(e, 'name') } }
                    width = "60%"
                    icon = "id-mapping"
                  />
                  <DecoratedInput
                    area="Apellido P."
                    value={this.state.nameFather}
                    onChange={ (e) => {this.handleChange(e, 'nameFather') } }
                    width = "60%"
                    icon = "id-mapping"
                  />
                </Box>
                <br/>
                <Box direction="row">
                  <DecoratedInput
                    area="Apellido M."
                    value={this.state.nameMother}
                    onChange={ (e) => {this.handleChange(e, 'nameMother') } }
                    width = "60%"
                    icon = "id-mapping"
                  />
                  <DecoratedCalendar
                    area="Fecha Nac."
                    value={this.state.birthday}
                    onChange={ (e) => {this.handleChange(e, 'birthday') } }
                    width = "60%"
                    icon = "Gift"
                  />
                </Box>
                <br/>
                <Box direction="row">
                  <DecoratedSelect
                    area="Genero"
                    value={this.state.gender}
                    onChange={ (e) => {this.handleChange(e, 'gender') } }
                    width = "60%"
                    icon = "venus-mars"
                    options={['Hombre', 'Mujer', 'Otro']}
                  />
                  <DecoratedInput
                    area="Edad"
                    value = {this.state.birthday ?  Math.floor( ( new Date() - new Date(this.state.birthday) ) / miliPerYear ) : 0}
                    width = "60%"
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
                  <DecoratedSelect
                    area="Puesto"
                    value={this.state.position}
                    onChange={ (e) => {this.handleChange(e, 'position') } }
                    width = "60%"
                    icon = "peoples-map"
                    options={['Asesor Sr', 'Asesor Jr', 'C. Aux.', 'Pract.', 'Direccion', 'Admin.']}
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
                <Box direction="row">
                  <DecoratedSelect
                    area="Equipo"
                    value={this.state.Team}
                    onChange={ (e) => {this.handleChange(e, 'Team') } }
                    width = "60%"
                    icon = "black-tie"
                    options={['Admin', 'A', 'B', 'C', 'D', 'E']}
                  />
                  <DecoratedInput
                    area="E-Mail"
                    onChange={ (e) => {this.handleChange(e, 'email') } }
                    width = "60%"
                    icon = "envelope-open-o"
                  />
                </Box>
                <br/>
                <Box direction="row">
                  
                </Box>
                <br/>
                <Button
                  style={{
                    backgroundColor:"#06554C",
                    color: '#F5F0F6',
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
export default User;
