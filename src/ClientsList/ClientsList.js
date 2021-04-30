import React from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { ContextMenu } from 'primereact/contextmenu';
import { Menu } from 'primereact/menu';
import './ClientsList.css';
import UsrBar from './../UsrBar/UsrBar';
import NavBar from './../NavBar/NavBar';
import DecoratedInput from './../Components/DecoratedInput/DecoratedInput';
import { OverlayPanel } from 'primereact/overlaypanel';
import { Grommet, Box, Grid, Heading } from 'grommet';
import { Avatar, Icon, InputGroup, Input, Button, IconButton } from 'rsuite';
import axios from 'axios';
import ProgressLine from 'rsuite/lib/Progress/ProgressLine';

class ClientsList extends React.Component {
  constructor(props) {
    super(props);
    console.log(props);
    this.state = {
      usr: this.props.location.state,
      clientsList: [], clientsListStore: [],
      current: {},
      searchT: ''
    };
    this.menuModel = [
      { 
        label: 'View', 
        icon: 'pi pi-fw pi-search',
        command: () => {
          this.props.history.push(
            `/clientedit/${this.state.usr.Usr}/${this.state.current._id}`,
            { ...this.state.usr }
          );
        }
      }, { 
        label: 'Delete',
        icon: 'pi pi-fw pi-times',
        command: () => this.kill(this.state.current._id)
      }
    ];
  }
  componentDidMount() {
    this.setState({ clientsList: [] });
    //Fetching Clients List
    console.log(this.state.usr.Team);
    axios.post('/clients', { team: this.state.usr.Team }).then((res) => {
      console.log(res.data);
      this.setState({ clientsList: res.data.Clients, clientsListStore: res.data.Clients });
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
  kill = (_id) => {
    axios
      .post('/clients/delete', { '_id': _id })
      .then((res) => {
        console.log(res);
        //Alert.success('Registro eliminado exitosamente.');
        this.componentDidMount();
      });
  }
  filteruser = () => {
    console.log(this.state.searchT);
    console.log(this.state.clientsList);
    this.setState({
      //
      clientsList: this.state.searchT.length === 0 ?
       this.state.clientsListStore : 
       this.state.clientsListStore.filter(S => S.curp.includes(this.state.searchT) ||
        S.rfc.includes(this.state.searchT) ||
        S.cName.includes(this.state.searchT) || S.razon.includes(this.state.searchT))
    })
    console.log(this.state.clientsListStore.filter(S => S.curp.includes(this.state.searchT) ||
      S.rfc.includes(this.state.searchT) ||
      S.cName.includes(this.state.searchT) || S.razon.includes(this.state.searchT)))
  }
  representativeBodyTemplate = (rowData) => {
    const src = "https://www.primefaces.org/primereact/showcase/showcase/demo/images/avatar/ionibowcher.png";

    return (
        <React.Fragment>
            <img alt={rowData.representative} src={src} onError={(e) => e.target.src='https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png'} width="32" style={{verticalAlign: 'middle'}} />
            <span className="p-column-title"> {rowData.usr.Name.First}</span>
            <span style={{verticalAlign: 'middle', marginLeft: '.5em'}}>{rowData.representative}</span>
        </React.Fragment>
    );
}
dateBodyTemplate = (rowData) => {
  return (
      <React.Fragment>
          <span className="p-column-title">{rowData.razon}</span><br/>
          <span>{new Date().toLocaleString('es-MX', {year: 'numeric', month: 'numeric', day: 'numeric'} )}</span>
          <span>{rowData.date}</span>
      </React.Fragment>
  );
}
progressBodyTemplate = () => {
  return (
    <React.Fragment>
      <span >{<ProgressLine 
      className="taskprogress"
      percent='50'
      />}</span>
    </React.Fragment>
  );
}
statusBodyTemplate = () => {
  return (
      <React.Fragment>
          <span >{<Button className='statuscss'>Completada</Button>}</span>
      </React.Fragment>
  );
}
opccionBodyTeemple=(rowData) =>{
  return(
    <React.Fragment>
          
          <IconButton
            icon={<Icon icon="more" />}
            circle size="lg"
            onClick={e=>{
              this.state.current = {_id:rowData._id}
              this.op.toggle(e);
            }}
          />
      </React.Fragment>
  );
}
deadlineBodynose =() =>{
  return(
    <React.Fragment>
      <span className="p-column-title">Dead Line</span><br/>
      <span >{<Icon  icon = 'bolt' size="lg"/>}</span>
      <span>{new Date().toLocaleString('es-MX', {year: 'numeric', month: 'numeric', day: 'numeric'} )}</span>
      </React.Fragment>
  );
}
  render() {
    return (
      <Grommet plain className='App'>
        <UsrBar usr={this.state.usr} />
        <ContextMenu model={this.menuModel} ref={el => this.cm = el} onHide={() => this.setState({ selectedProduct: null })} />
        <OverlayPanel ref={el => this.op = el} dismissable>
          <Menu model={this.menuModel} />
        </OverlayPanel>
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
            <Box gridArea='main'>
              <br />
              
              <Box direction='row'>
                <Box direction='row' margin='xsmall'>
                  <Box direction='column' margin='small'>
                    <Button className='statuscss2'>Pendiente</Button>
                  </Box>
                  <Box direction='column' margin='small'>
                    <Button className='statuscss'>Completada</Button>
                  </Box>
                  <Box direction='column' margin='small'>
                   <Button className='statuscss3'>Incompleta</Button>
                  </Box>
                </Box>
                <Box margin='small'>
                 <InputGroup
                  style={{
                    width: 270,
                    overflow: 'visible',
                    border: 'none',
                    borderRadius: '90px',
                    backgroundColor: '#00AB9B'
                  }} >
                  <Input
                    style={{ boxShadow: 'none', width: 270, paddingRight: '11px' }}
                    placeholder="Usuario"
                    className="inputLog"
                    value={this.state.searchT}
                    onChange={(e) => {
                      this.setState({ searchT: e });
                    }}
                  />
                  <InputGroup.Button
                    style={{
                      paddingRight: '11px',
                      top: '0.2px',
                      backgroundColor: '#00AB9B',
                      color: '#F2F3F4',
                      borderRadius: '0px 100px 100px 0px',
                    }}
                    onClick={this.filteruser}
                  >
                    <Icon icon="search" />
                  </InputGroup.Button>
                </InputGroup>
              </Box>
              <Box margin='small'>
                <IconButton className='statuscss1'   
                icon={<Icon icon='long-arrow-right' style={{backgroundColor:"#00AB9B"}}/>}
                placement="right"
                onClick={()=>{
                  this.props.history.push(
                    `/clientreg/${this.state.usr.Usr}`,
                    { ...this.state.usr })
                }
              }
                >
                  Agregar nuevo cliente</IconButton>
              </Box>
            </Box>
            <br />
            <DataTable value={this.state.clientsList}>
              <Column field='razon' body={this.dateBodyTemplate} />
              <Column field='deadline' body={this.deadlineBodynose} />
              <Column field='Name' body={this.representativeBodyTemplate }/>
              <Column field='option' body={this.progressBodyTemplate} />
              <Column field='Status' body={this.statusBodyTemplate}/>
              <Column field='option' body={this.opccionBodyTeemple} />
            </DataTable>
            <br />
            <Grid
              rows={['small', 'large']}
              columns={['small', '70%']}
              gap='3px'
              areas={[
                { name: 'avatar', start: [0, 0], end: [0, 0] },
                { name: 'name', start: [1, 0], end: [1, 0] },
                { name: 'info', start: [1, 1], end: [1, 1] },
              ]}
            >
              <Box gridArea='avatar'>
                <Avatar
                  classPrefix='avatar'
                  circle
                  src='https://avatars2.githubusercontent.com/u/12592949?s=460&v=4'
                />
              </Box>
              <Box gridArea='name'>
                <Heading
                  level='2'
                  margin='none'
                  style={{
                    height: '100px',
                    left: '50%',
                    color: '#515253',
                  }}
                  textAlign='center'
                >
                  {this.state.current.razon
                    ? this.state.current.razon
                    : 'Seleccione un Cliente'}
                </Heading>
                <br />
              </Box>
              <Box gridArea='info'>
                <Box direction='row'>
                  <DecoratedInput
                    area='Razon Social'
                    value={this.state.current.razon || ''}
                    width='100%'
                    icon='id-mapping'
                  />
                </Box>
                <br />
                <Box direction='row'>
                  <DecoratedInput
                    area='Nombre Comercial'
                    value={this.state.current.cName || ''}
                    width='100%'
                    boxw='170px'
                    textw='medium'
                    icon='id-mapping'
                    display
                  />
                </Box>
                <br />
                <Box direction='row'>
                  <DecoratedInput
                    area='Domicilio Fiscal'
                    value={this.state.current.fiscal || ''}
                    width='100%'
                    boxw='140px'
                    textw='medium'
                    icon='hourglass-2'
                    display
                  />
                </Box>
                <br />
                <Box direction='row'>
                  <DecoratedInput
                    area='RFC'
                    value={this.state.current.rfc || ''}
                    width='100%'
                    icon='id-card'
                  />
                </Box>
                <br />
                <Box direction='row'>
                  <DecoratedInput
                    area='Numero Tel.'
                    value={this.state.current.phoneNum || ''}
                    width='100%'
                    icon='mobile'
                  />
                </Box>
                <br />
              </Box>
            </Grid>
          </Box>
        </Grid>
      </Grommet>
    );
  }
}
export default ClientsList;
