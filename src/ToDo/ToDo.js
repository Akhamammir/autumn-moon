import React, { Component } from 'react'
import UsrBar from './../UsrBar/UsrBar';
import NavBar from './../NavBar/NavBar';
import { Grommet, Box, Grid, Heading, Text } from 'grommet';
import { DataTable } from 'primereact/datatable';
import { TreeTable } from 'primereact/treetable';
import { Column, Column as _Column } from 'primereact/column';
import { Toast } from 'primereact/toast';
import { Avatar, Icon, Button, Modal, Alert, Progress, IconButton } from 'rsuite';
import { Dialog } from 'primereact/dialog';
import { Button as ButtonPrime } from 'primereact/button';
import axios from 'axios';
import './ToDo.css';
export default class ToDo extends Component {
  toast = {}
  constructor(props) {
    super(props);
    console.log(props);
    this.state = {
      usr: this.props.location.state,
      clientsList: [],
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
      ]
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
                size="lg"
                placement="right"
              >
                Folder de cliente
              </IconButton>
              <IconButton
                className="clear"
                icon={<Icon icon="upload2" />}
                size="lg"
                placement="right"
                >
                  Perfil de cliente
              </IconButton>
                <Button
                  appearance="primary"
                  className="first2"
                  size="lg"
                  placement="right"
                >
                  Panel de control
                </Button>
              <Box direction='row' className='gruopButt'>
                <Button
                  appearance="primary"
                    className="first2"
                    size="lg"
                    placement="right"
                  >
                      Estatus:55%
                </Button>
                  <Button
                    appearance="primary"
                    className="first2"
                    size="lg"
                    placement="right"
                  >
                    04/02/2021
                  </Button>
                  <Button
                    appearance="primary"
                    className="first2"
                    size="lg"
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
                size="lg"
                placement="right"
              >
                Agregar nueva tarea
            </Button>
            </Box>
            <Dialog
              header="Lista de Cuentas"
              visible={this.state.displayPosition}
              position={this.state.position}
              modal
              style={{ width: '50vw' }}
              onHide={() => this.onHide('displayPosition')}
              dismissableMask={true}
            >
                <Grid 
                rows={['xxsmall', 'xsmall', 'xxsmall', 'xsmall', 'xxsmall', 'xxsmall', 'xsmall']}
                columns={['xsmall', 'xsmall', 'xsmall', 'xsmall']}
                gap='3px'
                areas={[
                  { name: 'top', start: [0, 0], end: [0, 0] },
                  { name: 'line', start: [0,1], end: [3,1] },
                  { name: 'texline', start: [0,2], end: [2,2] },
                  { name: 'tableline', start: [0,3], end: [3,3] }
                ]}>
                  <Box gridArea='top'>
                    <Button style={{background:'#EB5757', color:'White'}}>High</Button>
                  </Box>
                  <Box gridArea='line' direction='row'>
                    <Box>
                      <h5 font-size='16pt'>Catalogo aceptado</h5>
                    </Box>
                    <Box>
                      <Button className='priori1'>Pendiente</Button>
                    </Box>
                    <h5 color='#00AB9B'>85%</h5>
                  </Box>
                  <Box gridArea='tableline'>
                    <h5 >Pase Usted S.A.P.I. / Contabilidad electrónica</h5>
                  </Box>
                  <Box>
                    <DataTable>
                      <_Column><Icon icon='arrow-circle-o-right'></Icon></_Column>
                      <_Column></_Column>
                    </DataTable>
                  </Box>
                </Grid>
            </Dialog>
            <br />
            <TreeTable value={this.state.clientsList} >
              <_Column expander field="Name" body={this.nameBodyTemplate} header="Nombre de la Tarea"></_Column>
              <_Column field="Advent" body={this.advBodyTemplate} header="% de Avance" headerStyle={{ width: '5%' }}></_Column>
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
      </Grommet>

    )
  }
}
