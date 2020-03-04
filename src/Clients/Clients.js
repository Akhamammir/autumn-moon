import React from 'react';
//import './User.css';
import UsrBar from './../UsrBar/UsrBar';
import NavBar from './../NavBar/NavBar';
import './Clients.css'
import DecoratedInput from './../Components/DecoratedInput/DecoratedInput';
import DecoratedSelect from './../Components/DecoratedSelect/DecoratedSelect';
import DecoratedCalendar from './../Components/DecoratedCalendar/DecoratedCalendar';
import { Grommet, Box, Grid, Heading } from 'grommet';
import { Table, Toggle, Icon, Button, Modal, Input, IconButton, 
  Alert, Progress, List, Steps } from 'rsuite';
import axios from 'axios';
const { Line } = Progress;
const { Column, HeaderCell, Cell, Pagination } = Table;
const miliPerYear = 31536000000;
class ClientReg extends React.Component {
  constructor(props) {
    super(props);
    console.log(props)
    this.state = {usr:this.props.location.state, usrlist:[],
      name:'', nameFather:'', nameMother:'', birthday:'', gender:'',
      curp:'', rfc:'', Pphys: false, Branch:false, Step:0, Extran:false, 
      dateHire:'', position:'', phoneNum:'', emergencyNum:'', academic:'',
      password:'', "_id":'', show:false,
      BranchAdd:[
        'Roses are red',
        'Violets are blue',
        'Sugar is sweet',
        'And so are you',
       ]
    }
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
  forward = () =>{
    this.setState({Step:this.state.Step+1})
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
              <Box gridArea="name">
                <Steps current={this.state.Step}>
                  <Steps.Item title="Datos Generales" />
                  <Steps.Item title="Datos de Contacto" />
                  <Steps.Item title="Car. Fiscales" />
                  <Steps.Item title="Documentacion" />
                </Steps>
                <br/>
                <Heading
                  level="2"
                  margin="none"
                  style = {{
                    left:"50%",
                  }}
                  className = "GreenLetter"
                  textAlign="center"
                >
                  { this.state.name[0] ? (this.state.name + ' ' + this.state.nameFather + ' ' + this.state.nameMother) 
                  : 'Ingrese un nombre o seleccione a un usuario' }
                  </Heading>
                <br/>
                <Heading level="3" margin="none" style = {{left:"60%", marginLeft:"20px"}} textAlign="center">{this.state.curPos}</Heading>
                <br/>
              </Box>
              { this.state.Step === 0 ? <this.StepOne/> : <span></span> }
              { this.state.Step === 1 ? <this.StepTwo/> : <span></span> }
            </Grid>
          </Box>
        </Grid>
      </Grommet>
    );
  }
  StepOne = () => {
    return(
      <Box gridArea="info">
      <Box direction="row">
          <DecoratedInput
            area="Razon"
            value={this.state.name}
            onChange={ (e) => {this.handleChange(e, 'name') } }
            width = "85%"
            boxw = "90px"
            textw = "medium"
            icon = "id-mapping"
          />
          <Toggle 
            size="lg"
            checkedChildren="P. Moral"
            unCheckedChildren="P. Fisica"
            checked= {this.state.Pphys}
            onChange = { () => { this.setState({Pphys:!this.state.Pphys}) } }
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
          />
        </Box>
        <br/>
        <Box direction="row">
        { !this.state.Pphys ? 
        <DecoratedInput
            area="Curp"
            value={this.state.curp}
            onChange={ (e) => {this.handleChange(e, 'curp') } }
            width = "60%"
            icon = "id-card"
            display = { this.state.Pphys }
          />
          : 
          <DecoratedInput
            area="RINE"
            value={this.state.position}
            onChange={ (e) => {this.handleChange(e, 'position') } }
            width = "60%"
            icon = "peoples-map"
          />
        }
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
          
          <DecoratedInput
            area="Numero Tel."
            value={this.state.phoneNum}
            onChange={ (e) => {this.handleChange(e, 'phoneNum') } }
            width = "60%"
            type="number"
            icon = "mobile"
          />
        </Box>
        <br/>
        <Box>
            <Box direction="row">
              <Heading
                margin="small"
                level={5}
                className = "GreenLetter"
              >
                El cliente cuenta con sucursales?
              </Heading>
              <Toggle
                size="lg"
                checkedChildren="Si"
                unCheckedChildren="No"
                className = "PushDown"
                checked= {this.state.Branch}
                onChange = { () => { this.setState({Branch:!this.state.Branch}) } }
              />
            </Box>
            {this.state.Branch ? 
              <Box>
                <List hover className = 'ListColor'>
                  {this.state.BranchAdd.map((item,index)=>
                    <List.Item key={index} index={index} className="Pad">
                      <Box direction="row">
                        <Input className="ListInput" placeholder="Col." />
                        <Input className="ListInput" placeholder="Calle y Numero" />
                        <Input className="ListInput" placeholder="C.P." />
                        <Input className="ListInput" placeholder="Estado" />
                      </Box>
                    </List.Item>
                  )}
                </List>
                <br/>
                <IconButton icon={<Icon icon="plus" />} circle size="md" className="" />
              </Box> 
            : 
              <span></span>
            }
            <br/>
            <br/>
          </Box>
        { !this.state.Pphys ? 
          <span></span>
          :
          <Box>
            <Box direction="row">
              <Heading
                margin="small"
                level={5}
                className = "GreenLetter"
              >
                El cliente cuenta con socios en el extranejro?
              </Heading>
              <Toggle
                size="lg"
                checkedChildren="Si"
                unCheckedChildren="No"
                className = "PushDown"
                checked= {this.state.Extran}
                onChange = { () => { this.setState({Extran:!this.state.Extran}) } }
              />
            </Box>
            <br/>
            <br/>
          </Box>
        }
        <Button
          style={{
            backgroundColor:"#6FFFB0",
            width:"120px",
            fontFamily:"'Manjari', sans-serif",
            boxShadow: "0px 2px 4px rgba(0,0,0,0.20)"
          }}
          onClick = { () => this.forward() }
        >
          Siguiente&nbsp;&nbsp;<Icon icon="hand-o-right"  />
        </Button>
      </Box>
    );
  }
  StepTwo = () =>{
    return(
      //
      <span></span>
    );
  }
}
export default ClientReg;
