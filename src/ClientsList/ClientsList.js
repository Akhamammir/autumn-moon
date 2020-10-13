import React from 'react';
import { DataTable } from 'primereact/datatable';
import { Column as _Column } from 'primereact/column';
import './ClientsList.css';
import UsrBar from './../UsrBar/UsrBar';
import NavBar from './../NavBar/NavBar';
import DecoratedInput from './../Components/DecoratedInput/DecoratedInput';
import { Grommet, Box, Grid, Heading } from 'grommet';
import { Avatar, Icon, Button, InputGroup, Input } from 'rsuite';
import axios from 'axios';
const miliPerYear = 31536000000;


class ClientsList extends React.Component {
  constructor(props) {
    super(props);
    console.log(props);
    this.state = {
      usr: this.props.location.state,
      clientsList: [], clientsListStore: [],
      current: {},
      searchT:''
    };
  }
  componentDidMount() {
    //Fetching Clients List
    console.log(this.state.usr.Team);
    axios.post('/clients', { team: this.state.usr.Team }).then((res) => {
      console.log(res.data);
      this.setState({ clientsList: res.data.Clients, clientsListStore: res.data.Clients  });
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
  filteruser = () => {
    console.log(this.state.searchT);
    console.log(this.state.clientsList);
    this.setState({
      //
      clientsList: this.state.searchT.length == 0 ? this.state.clientsListStore : this.state.clientsListStore.filter(S => S.curp.includes(this.state.searchT) ||
        S.RFC.includes(this.state.searchT) ||
        S.cName.includes(this.state.searchT) || S.Razon.includes(this.state.searchT))
    })
    console.log(this.state.clientsListStore.filter(S => S.curp.includes(this.state.searchT) ||
    S.RFC.includes(this.state.searchT) ||
    S.cName.includes(this.state.searchT) || S.Razon.includes(this.state.searchT)))
  }
  render() {
    return (
      <Grommet plain className='App'>
        <UsrBar usr={this.state.usr} />

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
            <br/>
            <DataTable value={this.state.clientsList} rowHover selectionMode="single" onRowSelect={({ data }) => {
              this.setState({ current: data });
            }}>
              <_Column field='razon' header='Razon Social' />
              <_Column field='cName' header='Nombre Comercial' />
              <_Column field='fiscal' header='Domicilio Fiscal' />
              <_Column field='rfc' header='RFC' />
              <_Column field='phoneNum' header='Teléfono' />
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
                <Button
                  style={{
                    backgroundColor: '#06554C',
                    color: '#F5F0F6',
                    width: '120px',
                    fontFamily: "'Manjari', sans-serif",
                    boxShadow: '0px 2px 4px rgba(0,0,0,0.20)',
                  }}
                  onClick={() => {
                    this.props.history.push(
                      `/clientedit/${this.state.usr.Usr}/${this.state.current._id}`,
                      { ...this.state.usr }
                    );
                  }}
                >
                  <Icon icon='edit' />
                  &nbsp;&nbsp;Edit
                </Button>
              </Box>
            </Grid>
          </Box>
        </Grid>
      </Grommet>
    );
  }
}
export default ClientsList;
