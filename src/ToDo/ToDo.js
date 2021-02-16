import React, { Component } from 'react'
import UsrBar from './../UsrBar/UsrBar';
import NavBar from './../NavBar/NavBar';
import { Grommet, Box, Grid, Heading, Text, Calendar } from 'grommet';
import { DataTable } from 'primereact/datatable';
import { TreeTable } from 'primereact/treetable';
import { Column, Column as _Column } from 'primereact/column';
import { Toast } from 'primereact/toast';
import { Avatar, Icon, Button, Modal, Alert, Progress, IconButton, DatePicker } from 'rsuite';
import { Dialog } from 'primereact/dialog';
import { Button as ButtonPrime } from 'primereact/button';
import axios from 'axios';
import {SplitButton} from 'primereact/splitbutton';
import './ToDo.css';
const miliPerYear = 31536000000;
export default class ToDo extends Component {
  
  toast = {}
  constructor(props) {
    super(props);
    console.log(props);
    this.state = {
      usr: this.props.location.state,
      clientsList: [],
      dateList:[],
      current: {},
      expandedRows: false
    };
  }
  
  
  uuidShort = () => {
    return (([1e7]) + -1e3 + -4e3).replace(/[018]/g, c =>
      (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
    );
  }
  calculateCustomerTotal = (name) => {
    let total = 0;

    if (this.state.clientsList) {
      for (let customer of this.state.clientsList) {
        if (customer.name === name) {
          total++;
        }
      }
    }

    return total;
  }
  
  priori = (Priority) => {
    return Priority === '0' ? 'Baja' :
      Priority === 1 ? 'Media' :
        Priority === 2 ? 'Alta' : '???'
  }
  status = (Status) => {
    return Status === 0 ? 'Incompleta' :
      Status === 1 ? 'Pendiente' :
        Status === 2 ? 'Completa' : '???'
  }
  componentDidMount() {
    //Fetching Clients List
    console.log(this.props.location);
    this.setState({
      clientsList: [
        {
          Name: 'Contable', _id: this.uuidShort(), Date: new Date(), 
          Status: 1,
          children: [
            {
              Area: 'Contable', Name: 'PreCierre', Priori: 2, Advent: 30,
              Date: new Date(), Status: 1, Files: [''], key: this.uuidShort(),
              children: [
                {Area: 'Contable', Name: 'PreCierre', Priori: 1, Advent: 20,
              Date: new Date(), Status: 0, Files: [''], key: this.uuidShort(),},
              {Area: 'Contable', Name: 'PreCierre', Priori: '0', Advent: 40,
              Date: new Date(), Status: 2, Files: [''], key: this.uuidShort(),}
              ]
            }
          ]
        }
      ],


      
      dateList:[
        {
          Name: '2020', key:this.uuidShort(),
          children: [
            {
              Area: 'Contable', Name: 'Enero', key: this.uuidShort(),
              children: [
                {
                  Area:'Contable', Name:'Laboral', key: this.uuidShort(),
                  children:[
                    {
                    Area: 'Contable', Name: 'Documentos.rar', key: this.uuidShort(),
                      }] 
                },
                {
                Area:'Contable', Name:'Contable', key: this.uuidShort(),
                children:[
                  {
                  Area: 'Contable', Name: 'IMSS-enviado.pdf', key: this.uuidShort(),
                    }]
                }]
            },
            {Name: 'Febrero', key:this.uuidShort(),
            children: [
              {
                Area: 'Contable', Name: 'Laboral', key: this.uuidShort(),
                children: [
                  {
                    Area:'Contable', Name:'Documentos.rar', key: this.uuidShort(), 
                  }
                  ]
              },{
                Area:'Contable', Name:'Contable', key: this.uuidShort(),
                children:[
                  {
                  Area: 'Contable', Name: 'IMSS-enviado.pdf', key: this.uuidShort(),
                    }]
                }
              ]},
              {Name: 'Marzo', key:this.uuidShort(),
            children: [
              {
                Area: 'Contable', Name: 'Laboral', key: this.uuidShort(),
                children: [
                  {
                    Area:'Contable', Name:'Documentos.rar', key: this.uuidShort(), 
                  }
                  ]
              },{
                Area:'Contable', Name:'Contable', key: this.uuidShort(),
                children:[
                  {
                  Area: 'Contable', Name: 'IMSS-enviado.pdf', key: this.uuidShort(),
                    }]
                }
              ]},
              {Name: 'Abril', key:this.uuidShort(),
            children: [
              {
                Area: 'Contable', Name: 'Laboral', key: this.uuidShort(),
                children: [
                  {
                    Area:'Contable', Name:'Documentos.rar', key: this.uuidShort(), 
                  }
                  ]
              },{
                Area:'Contable', Name:'Contable', key: this.uuidShort(),
                children:[
                  {
                  Area: 'Contable', Name: 'IMSS-enviado.pdf', key: this.uuidShort(),
                    }]
                }
              ]},
              {Name: 'Mayo', key:this.uuidShort(),
            children: [
              {
                Area: 'Contable', Name: 'Laboral', key: this.uuidShort(),
                children: [
                  {
                    Area:'Contable', Name:'Documentos.rar', key: this.uuidShort(), 
                  }
                  ]
              },{
                Area:'Contable', Name:'Contable', key: this.uuidShort(),
                children:[
                  {
                  Area: 'Contable', Name: 'IMSS-enviado.pdf', key: this.uuidShort(),
                    }]
                }
              ]},
              {Name: 'Junio', key:this.uuidShort(),
            children: [
              {
                Area: 'Contable', Name: 'Laboral', key: this.uuidShort(),
                children: [
                  {
                    Area:'Contable', Name:'Documentos.rar', key: this.uuidShort(), 
                  }
                  ]
              },{
                Area:'Contable', Name:'Contable', key: this.uuidShort(),
                children:[
                  {
                  Area: 'Contable', Name: 'IMSS-enviado.pdf', key: this.uuidShort(),
                    }]
                }
              ]},
              {Name: 'Julio', key:this.uuidShort(),
            children: [
              {
                Area: 'Contable', Name: 'Laboral', key: this.uuidShort(),
                children: [
                  {
                    Area:'Contable', Name:'Documentos.rar', key: this.uuidShort(), 
                  }
                  ]
              },{
                Area:'Contable', Name:'Contable', key: this.uuidShort(),
                children:[
                  {
                  Area: 'Contable', Name: 'IMSS-enviado.pdf', key: this.uuidShort(),
                    }]
                }
              ]},
              {Name: 'Agosto', key:this.uuidShort(),
            children: [
              {
                Area: 'Contable', Name: 'Laboral', key: this.uuidShort(),
                children: [
                  {
                    Area:'Contable', Name:'Documentos.rar', key: this.uuidShort(), 
                  }
                  ]
              },{
                Area:'Contable', Name:'Contable', key: this.uuidShort(),
                children:[
                  {
                  Area: 'Contable', Name: 'IMSS-enviado.pdf', key: this.uuidShort(),
                    }]
                }
              ]},
              {Name: 'Septiembre', key:this.uuidShort(),
            children: [
              {
                Area: 'Contable', Name: 'Laboral', key: this.uuidShort(),
                children: [
                  {
                    Area:'Contable', Name:'Documentos.rar', key: this.uuidShort(), 
                  }
                  ]
              },{
                Area:'Contable', Name:'Contable', key: this.uuidShort(),
                children:[
                  {
                  Area: 'Contable', Name: 'IMSS-enviado.pdf', key: this.uuidShort(),
                    }]
                }
              ]},
              {Name: 'Octubre', key:this.uuidShort(),
            children: [
              {
                Area: 'Contable', Name: 'Laboral', key: this.uuidShort(),
                children: [
                  {
                    Area:'Contable', Name:'Documentos.rar', key: this.uuidShort(), 
                  }
                  ]
              },{
                Area:'Contable', Name:'Contable', key: this.uuidShort(),
                children:[
                  {
                  Area: 'Contable', Name: 'IMSS-enviado.pdf', key: this.uuidShort(),
                    }]
                }
              ]},
              {Name: 'Noviembre', key:this.uuidShort(),
            children: [
              {
                Area: 'Contable', Name: 'Laboral', key: this.uuidShort(),
                children: [
                  {
                    Area:'Contable', Name:'Documentos.rar', key: this.uuidShort(), 
                  }
                  ]
              },{
                Area:'Contable', Name:'Contable', key: this.uuidShort(),
                children:[
                  {
                  Area: 'Contable', Name: 'IMSS-enviado.pdf', key: this.uuidShort(),
                    }]
                }
              ]},
              {Name: 'Diciembre', key:this.uuidShort(),
            children: [
              {
                Area: 'Contable', Name: 'Laboral', key: this.uuidShort(),
                children: [
                  {
                    Area:'Contable', Name:'Documentos.rar', key: this.uuidShort(), 
                  }
                  ]
              },{
                Area:'Contable', Name:'Contable', key: this.uuidShort(),
                children:[
                  {
                  Area: 'Contable', Name: 'IMSS-enviado.pdf', key: this.uuidShort(),
                    }]
                }
              ]}
          ]
        }]
      });
    axios.post('/clients', { team: this.state.usr.Team }).then((res) => {
      console.log(res.data);
      //this.setState({ clientsList: res.data.Clients });
    });
    // axios
    //   .post('http://35.232.231.98:3001/clients', {
    //     team: this.state.usr.Team
    //   })
    //   .then(res => {
    //     console.log(res);
    //     //this.setState({clientsList:res.data})
    //   });
  }
  onRowGroupExpand = (event) => {
    this.toast.show({ severity: 'info', summary: 'Row Group Expanded', detail: 'Value: ' + 'hi variable goes here', life: 3000 });
  }
  onRowGroupCollapse = (event) => {
    //this.toast.current.show({ severity: 'success', summary: 'Row Group Collapsed', detail: 'Value: ' + event.data.representative.name, life: 3000 });
  }
  headerTemplate = (data) => {
    console.log(data)
    let src = "https://www.primefaces.org/primereact/showcase/showcase/demo/images/avatar/amyelsner.png";
    return (
      <React.Fragment>
        <Heading
          level='3'
          margin='none'
          style={{
            color: '#515253',
            display: "inline-block",
            marginLeft: "1em"
          }}
          alignSelf="center"
          className='GreenLetter'
        >
          {data.Area}
        </Heading>
      </React.Fragment>
    );
  }
  footerTemplate = (data) => {
    return (
      <React.Fragment>
        <td colSpan="4" style={{ textAlign: 'right' }}>Total Customers</td>
        <td>{this.calculateCustomerTotal(data.name)}</td>
      </React.Fragment>
    );
  }
  nameBodyTemplate = (rowData) => {
    return (
      <React.Fragment>
        <Heading
          level='4'
          margin='none'
          style={{
            color: '#515253',
            display: "inline-block",
            marginLeft: "1em"
          }}
          alignSelf="center"
          className='GreenLetter'
        >
          {rowData.Name}
        </Heading>
        {rowData.Priori ?
          <Button
            appearance="primary"
            className={"priori" + rowData.Priori + " priorityDisp"}
            icon={<Icon icon="upload2" />}
            size="lg"
            placement="right"
            disabled={true}
          >
            {this.priori(rowData.Priori)}
          </Button> :
          <span></span>
        }

      </React.Fragment>
    );
  }
  advBodyTemplate = (rowData) => {
    let adv = 0, J=0;
    if (rowData.children) {
      rowData.children.forEach((i,j)=>{
        adv += i.Advent; J++;
      })
    }
    return (
      <React.Fragment>
        <Heading
          level='4'
          margin='none'
          style={{
            color: '#515253',
            display: "inline-block",
            marginLeft: "1em"
          }}
          alignSelf="center"
          className='tableAdvPer'
        >
          { rowData.Advent ?  rowData.Advent + ' %'
          :
           (adv/J) + ' %'}
        </Heading>
      </React.Fragment>
    );
  }
  dateBodyTemplate = (rowData) => {
    return (
      <React.Fragment>
        <Heading
          level='4'
          margin='none'
          style={{
            color: '#515253',
            display: "inline-block",
            marginLeft: "1em"
          }}
          alignSelf="center"
          className='GreenLetter'
        >
          {
              rowData.Date.toLocaleString('es-MX', { year: 'numeric', month: 'numeric', day: 'numeric' })

          }
        </Heading>
      </React.Fragment>
    );
  }
  statusBodyTemplate = (rowData) => {
    return (
      <React.Fragment>
        <Button
          appearance="primary"
          className={"status" + rowData.Status + " statusDisp"}
          icon={<Icon icon="upload2" />}
          size="lg"
          placement="right"
          disabled={true}
        >
          {this.status(rowData.Status)}
        </Button>
      </React.Fragment>
    );
  }
  filesBodyTemplate = (rowData) => {
    return (
      <React.Fragment>
        {
          rowData.Files ?
            rowData.Files.length === 0 ?
              <Button
                appearance="ghost"
                className={"ghost noFiles"}
                size="lg"
                placement="right"
              >
                Ver
            </Button>
              :
              <Button
                appearance="ghost"
                className={"ghost withFiles"}
                size="lg"
                placement="right"
              >
                Ver
            </Button>
            : <span></span>
        }
      </React.Fragment>
    );
  }
  editBodyTemplate = (rowData) => {
    return (
      <React.Fragment>
        <IconButton
          appearance="ghost"
          className={"ghost edit"}
          icon={<Icon icon="ellipsis-h" />}
          size="lg"
          circle
          onClick={() =>
            this.onClick('displayPosition', 'left', 'arrayRtpUsr', 'usrRtpList')
          }
        />
      </React.Fragment>
    );
  }
  onHide(name) {
    this.setState({
      [`${name}`]: false
    });
  }
  onClick(name, position, array, list, deep) {
    let state = {
      [`${name}`]: true,
      currentArray: array,
      currentList: list,
      Deep: deep ? deep : false
    };

    if (position) {
      state = {
        ...state,
        position
      }
    }

    this.setState(state, () => {
      console.log(this.state)
    });
  }

  bodyTableone(){
    return(
    <React.Fragment>
      <Box direction="row">
      <Icon icon='angle-right' size='3x'/> <Heading level='4'>Sub Tarea 1</Heading>
      </Box>
    </React.Fragment>
    )
  }

  bodyTabletwo=()=>{
    return(
      <React.Fragment>
        <Button style= {{background:'#00AB9B', color:'#000'}}>Completa</Button>
      </React.Fragment>
    )
  }
  bodytabletree(){
    return(
      <React.Fragment><Box direction='row'>
        <Icon icon='file-o'></Icon>
        <Heading level='4' color='#00AB9B'
        >Ver</Heading>
        </Box>
      </React.Fragment>
    )
  }
  bodytablefour(){
    return(
      <React.Fragment>
        <Button style={{background:'#EB5757', color:'White'}}>High</Button>
        <IconButton
          appearance="ghost"
          className={"ghost edit"}
          icon={<Icon icon="ellipsis-h" />}
          size="lg"
          circle
        />
      </React.Fragment>
    )
  }
  render() {
    return (
      <Grommet plain className='App'>
        <UsrBar usr={this.state.usr} />
        <Toast ref={(el) => this.toast = el} />
        <Grid
          rows={[process.env.REACT_APP_SCREEN_WIDTH]}
          columns={[
            process.env.REACT_APP_NAVBAR_WIDTH,
            process.env.REACT_APP_MAIN_WIDTH,
          ]}
          gap='3px'
          areas={[
            { name: 'nav', start: [0, 0], end: [0, 0] },
            { name: 'main', start: [1, 0], end: [1, 0] },
          ]}
        >
          <Box
            gridArea='nav'
            height='100vh'
            background={process.env.REACT_APP_NAVBAR_COLOR}
            width={process.env.REACT_APP_NAVBAR_WIDTH}
            elevation='small'
          >
            <NavBar usr={this.state.usr} history={this.props.history} />
          </Box>
          <Box gridArea='main' style={{ marginLeft: "50px" }}>
            <br />
            <Box direction="row" width="90%" alignContent="between">
              <Heading
                level='2'
                margin='none'
                style={{
                  left: '50%',
                  color: '#515253',
                }}
                className='GreenLetter'
                textAlign='center'
                >
                  Pase Usted S.A.P.I
              </Heading>
              <IconButton
                className="clear first"
                icon={<Icon icon="upload2" />}
                size="sm"
                placement="right"
                onClick={() => this.onClick('Visorde', 'right', 'arrayRtpUsr', 'usrRtpList')}
              >
                Folder de cliente
              </IconButton>
              <IconButton
                className="clear"
                icon={<Icon icon="upload2" />}
                size="sm"
                placement="right"
                >
                  Perfil de cliente
              </IconButton>
                <Button
                  appearance="primary"
                  className="first2"
                  size="sm"
                  placement="right"
                >
                  Panel de control
                </Button>
                
                <Box direction='row' className='gruopButt' style={{top:'55px', right:'15px',color:'blue'}}>               
                <Box>
                <Text>
                {this.state.usr.Name.First + ' ' + this.state.usr.Name.Last + ' /equipo ' + this.state.usr.Team + ' / '+ this.state.usr.Role} 
                </Text>
                </Box>
                </Box>
              <Box direction='row' className='gruopButt' style={{top:'90px', right:'10px',color:'black'}}> 
                <Button
                  appearance="primary"
                    className="first2"
                    size="sm"
                    placement="right"
                  >
                      Estatus:55%
                </Button>
                  <Button
                    appearance="primary"
                    className="first2"
                    size="sm"
                    placement="right"
                  >
                    04/02/2021
                  </Button>
                  <Button
                    appearance="primary"
                    className="first2"
                    size="sm"
                    placement="right"
                  >
                    02:04:55
                  </Button>
                </Box>
              </Box>
              <br />
            <Box width="300px">
              <Button
                appearance="primary"
                className="first"
                icon={<Icon icon="upload2" />}
                size="sm"
                placement="right"
                onClick={() => this.onClick('displayadd', 'right', 'arrayRtpUsr', 'usrRtpList')}
              >
                Agregar nueva tarea
            </Button>
            </Box>
            <Dialog               
              header="Agregar Nueva Tarea"
              visible={this.state.displayadd}
              position={this.state.position}
              modal
              style={{ width: '50vw'}}
              onHide={() => this.onHide('displayadd')}
              dismissableMask={true}
            >
             <Grid
             
              rows={['xxsmall', 'xxsmall', 'xxsmall', 'xsmall', 'xsmall', 'xsmall']}
              columns={['small', 'small', 'small']}
              gap="small"
              areas={[
                { name: 'priority', start: [0,0], end: [0,0] },
                { name: 'name', start: [0, 1], end: [1, 1] },
                { name: 'selectStat1', start: [2, 1], end: [2, 1] },
                { name: 'selectCat', start: [0, 2], end: [0, 2] },
                { name: 'selectClient', start: [1,2], end: [1,2] },
                { name: 'addSub', start: [0,3], end: [0,3] },
                { name: 'selectStat2', start: [1,3], end: [1,3] },
                { name: 'add', start: [2,3], end: [2,3] },
                { name: 'selectDate1', start: [0,4], end: [0,4] },
                { name: 'selectDate2', start: [2,4], end: [2,4] },
                { name: 'saveRemove', start: [2,5], end: [2,5] },
                
              ]}
            >
              <Box direction='row' gridArea="priority">
                <p>Prioridad</p>
              
              <IconButton style={{ padding: '15px'}}
              icon={<Icon icon='caret-down' style={{padding:'0px 0'}}/>}
              /> 
              
              </Box>
              <Box direction='row' gridArea="name">
                <h2>Nombre de la Tarea</h2>
              </Box>
              <Box direction='row' gridArea="selectStat1">
                <p>Selecciona estatus</p>
                <IconButton style={{ padding: '15px'}}
              icon={<Icon icon='caret-down' style={{padding:'0px 0'}}/>}
              /> 
              </Box>
              <Box direction='row' gridArea="selectCat">
              <p>Selecciona categoria</p>
              <IconButton style={{ padding: '15px'}}
              icon={<Icon icon='caret-down' style={{padding:'0px 0'}}/>}
              /> 
              </Box>
              <Box direction='row' gridArea="selectClient">
              <p>Selecciona Cliente</p>
              <IconButton style={{ padding: '15px'}}
              icon={<Icon icon='caret-down' style={{padding:'0px'}}/>}
              /> 
              </Box>
              <Box direction='row'gridArea="addSub">
              <IconButton
              icon={<Icon icon='arrow-circle-right'/>}
              /> 
              <p direction='row'>Agregar una subtarea</p>
              </Box>
              <Box direction='row' gridArea="selectStat2" >
              <p>Selecciona estatus</p>
              <IconButton style={{ padding: '15px'}}
              icon={<Icon icon='caret-down' style={{padding:'0px 0'}}/>}
              /> 
              </Box>
              <Box direction='row' gridArea="add" className="agregar">
              <IconButton
              icon={<Icon icon='file' style={{padding:'0px 0'}} />}
              /> 
                <p>Agregar</p>
              </Box>
              <Box gridArea="selectDate1">
              <p>Selecciona una Fecha de inicio:</p>
              <DatePicker
            className="Date" 
            value={this.props.value}
            onChange = { (e) => { this.handleChange(e) } }
            placeholder="10/12/2020"
            appearance = "subtle" 
            block = {true}
            style={{ width: 150, transform: "translate(0%, -7.5%)"}}
            ></DatePicker> 

              </Box>
              <Box gridArea="selectDate2">
              <p>Selecciona una Fecha de fin:</p>
            <DatePicker
            className="Date"
            value={this.props.value}
            onChange = { (e) => { this.handleChange(e) } }
            placeholder="10/12/2020"
            appearance = "subtle"
            block = {true}
            
            style={{ width: 150, transform: "translate(0%, -7.5%)"}}
            ></DatePicker> 
              
              </Box>
              <Box  direction='row' gridArea="saveRemove" >
              <Box direction='column' margin='xxsmall'>
                    <Button className='guardar'>Guardar</Button>
                  </Box>
                  <Box direction='column' margin='xxsmall'>
                    <Button className='eliminar'>Eliminar</Button>
                  </Box>
              </Box>
            </Grid>
            </Dialog>
              {/*
              visor de archivos dialog
              */}
            <Dialog               
              header="Visor de Archivos"
              visible={this.state.Visorde}
              position={this.state.position}
              modal
              style={{ width: '25vw'}}
              onHide={() => this.onHide('Visorde')}
              dismissableMask={true}
            >
             {/*
              visor de archivos grid
              */} 
              <Grid
              rows={['xxsmall', 'xxsmall', 'xxsmall', 'xsmall', 'xxsmall', 'xxsmall', 'xsmall']}
              columns={['xsmall', 'xsmall', 'xsmall', 'xsmall']}
              
              areas={[
                  { name: 'top', start: [0, 0], end: [1, 0] },
                  { name: 'line', start: [0,1], end: [1,1] },
                  { name: 'map', start: [0,2], end: [2,6] }

    
                    ]}>
              <Box direction='row' gridArea="top">
              <h1>Archivos</h1>
              <IconButton direction='row' style={{top:'15px',left:'20px', fontSize:'35px'}}
              icon={<Icon icon='folder-open' style={{padding:'0px 0',fontSize:'30px'}} />}
              /> 
              </Box>
              <Box direction='row' gridArea="line">
                <p>Pase usted S.A. P.I.</p>
                </Box>
                <Box direction='row' gridArea="map">
                <TreeTable value={this.state.dateList}  >
                <_Column expander field="Name" body={this.nameBodyTemplate} header={
                  <Box>
                    
                  </Box>
                } ></_Column>
                 </TreeTable>
                </Box>
              </Grid>
            </Dialog>
            	   {/*
              termina visor de archivos grid
              */}       
            
            <br />
            <TreeTable value={this.state.clientsList} >
              <_Column expander field="Name" body={this.nameBodyTemplate} header="Nombre de la Tarea"></_Column>
              <_Column field="Advent" body={this.advBodyTemplate} header="% de Avance" headerStyle={{ width: '6%' }}></_Column>
              <_Column field="Date" body={this.dateBodyTemplate} header="Fecha de Entrega" headerStyle={{ width: '10%' }}></_Column>
              <_Column field="Status" body={this.statusBodyTemplate} header="Status" headerStyle={{ width: '10%' }}></_Column>
              <_Column field="Files" body={this.filesBodyTemplate} header="Archivos Adjuntos" headerStyle={{ width: '10%' }}></_Column>
              <_Column field="_id" body={this.editBodyTemplate} header="Editar" headerStyle={{ width: '5%' }}></_Column>
            </TreeTable>
            {/*<DataTable value={this.state.clientsList} rowGroupMode="subheader" groupField="representative.name"
              sortMode="single" sortField="representative.name" sortOrder={1}
              expandableRowGroups expandedRows={this.state.expandedRows} onRowToggle={(e) => this.setState({ expandedRows: e.data })}
              onRowExpand={this.onRowGroupExpand} onRowCollapse={this.onRowGroupCollapse}
              rowGroupHeaderTemplate={this.headerTemplate} rowGroupFooterTemplate={this.footerTemplate}>
              <_Column field="Name" body={this.nameBodyTemplate} header="Nombre de la Tarea"></_Column>
              <_Column field="Advent" body={this.advBodyTemplate} header="% de Avance" headerStyle={{ width: '5%' }}></_Column>
              <_Column field="Date" body={this.dateBodyTemplate} header="Fecha de Entrega" headerStyle={{ width: '10%' }}></_Column>
              <_Column field="Status" body={this.statusBodyTemplate} header="Status" headerStyle={{ width: '10%' }}></_Column>
              <_Column field="Files" body={this.filesBodyTemplate} header="Archivos Adjuntos" headerStyle={{ width: '10%' }}></_Column>
              <_Column field="_id" body={this.editBodyTemplate} header="Editar" headerStyle={{ width: '5%' }}></_Column>
            </DataTable>
            <DataTable value={this.state.clientsList} rowHover selectionMode="single" onRowSelect={({ data }) => {
              this.setState({ current: data });
            }}>
              <_Column field='razon' body={this.representativeBodyTemplate} header='Razon Social' />
              <_Column field='' header='Recepcion de Documentos' />
              <_Column field='' header='Contabilidad Terminada' />
              <_Column field='' header='Confronta IMMS' />
              <_Column field='' header='Emision' />
              <_Column field='' header='Confronta Sua-Nominas' />
          </DataTable>*/}
            <br />
          </Box>
        </Grid>
        <Dialog
          visible={this.state.displayPosition}
          position={this.state.position}
          modal
          style={{ width: '40vw' }}
          onHide={() => this.onHide('displayPosition')}
          dismissableMask={true}
          >
            <Grid 
              rows={['xxsmall', 'xxsmall', 'xxxsmall','xxsmall','xxsamall','xxsmall','xxsmall', 'xxsamall']}
              columns={['xsmall', 'small', 'xsmall', 'xxxsmall', ]}
              gap='3px'
              areas={[
                { name: 'line1', start: [0, 0], end: [0, 0] },
                { name: 'line1a', start: [0,1], end: [1,1] },
                { name: 'line1b', start: [2,1], end: [2,1] },
                { name: 'line1c', start: [3,1], end: [3,1] },
                { name: 'line2', start: [0,2], end: [3,2] },
                { name: 'Line3', start: [0,3], end: [3,3] },
                { name: 'Line4', start: [0,4], end: [1,4] },
                { name: 'Line5', start: [0,5], end: [0,5] },
                { name: 'Line6', start: [0,6], end: [0,6] },
              ]}>
                <Box gridArea='line1'>
                  <Button style={{background:'#EB5757', color:'White'}}>High</Button>
                </Box>
                <Box gridArea='line1a' direction='row'>
                    <h5 font-size='16pt'>Catalogo aceptado</h5>
                </Box>
                <Box gridArea='line1b' direction='row'>

                  <Box><Button className='priori1'>Pendiente</Button></Box>
                </Box>
                <Box gridArea='line1c'>
                  <h5 color='#00AB9B'>85%</h5>
                </Box>
                <Box gridArea='line2'>
                  <Heading level='6' alignSelf="start">Pase Usted S.A.P.I. / Contabilidad electrónica</Heading>
                </Box>
                <Box gridArea='Line3' >
                  <DataTable value={this.state.clientsList} >
                    <Column body={this.bodyTableone} style={{width:'30%'}}/>
                    <Column body={this.bodyTabletwo} />
                    <Column body={this.bodytabletree}/>
                    <Column body={this.bodytablefour}/>
                  </DataTable>
                </Box>
                <Box gridArea='Line4'>
                <IconButton appearance="primary"
                    className="first"
                    icon={<Icon icon="long-arrow-right" style={{background:'#00AB9B'}}/>}
                    size="lg"
                    placement="right" >Agregar nueva tarea</IconButton>
                </Box>
                <Box gridArea='Line5'>
                  <Heading level='6'>Fecha de entrega:</Heading>
                </Box>
                <Box gridArea='Line6'>
                <DatePicker
            className="Date" 
            value={this.props.value}
            onChange = { (e) => { this.handleChange(e) } }
            placeholder="10/12/2020"
            appearance = "subtle" 
            block = {true}
            style={{ width: 150, transform: "translate(0%, -7.5%)"}}
            ></DatePicker> 
                  
                </Box>
              </Grid>
          </Dialog>
      </Grommet>

    )
  }
}
