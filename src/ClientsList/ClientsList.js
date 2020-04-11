import React from 'react';
import './ClientsList.css';
import UsrBar from './../UsrBar/UsrBar';
import NavBar from './../NavBar/NavBar';
import DecoratedInput from './../Components/DecoratedInput/DecoratedInput';
import { Grommet, Box, Grid, Heading } from 'grommet';
import { Table, Avatar, Icon, Button } from 'rsuite';
import axios from 'axios';
const { Column, HeaderCell, Cell } = Table;
const miliPerYear = 31536000000;

const List = [
  {
    _id: '5e85889915eb07e4706978fb',
    razon: 'Hilary Duke',
    cName: 'MICRONAUT',
    fiscal: '790 Arion Place, Wells, Georgia, 5157',
    curp: 'XAXX010101000',
    rfc: 'XAXX010101000',
    phoneNum: '+52 (859) 463-3020',
  },
  {
    _id: '5e858899767235f939e25ce3',
    razon: 'Conway French',
    cName: 'TINGLES',
    fiscal: '117 Chester Street, Allamuchy, North Carolina, 6558',
    curp: 'CFR910412ARF',
    rfc: 'XAXX010101000',
    phoneNum: '+52 (857) 575-3036',
  },
  {
    _id: '5e8588996e702d0522ba68a0',
    razon: 'Rosella Kemp',
    cName: 'ICOLOGY',
    fiscal: '335 Maple Street, Gila, Mississippi, 7308',
    curp: 'RKR123456ASD',
    rfc: 'XAXX010101000',
    phoneNum: '+52 (945) 506-2665',
  },
  {
    _id: '5e8588995a59260b88b2b966',
    razon: 'Reed Crane',
    cName: 'OBLIQ',
    fiscal: '196 Orient Avenue, Tioga, Delaware, 9763',
    curp: 'EXP134233EDS',
    rfc: 'XAXX010101000',
    phoneNum: '+52 (831) 534-3381',
  },
];

class ClientsList extends React.Component {
  constructor(props) {
    super(props);
    console.log(props);
    this.state = {
      usr: this.props.location.state,
      clientsList: [],
      current: {},
    };
  }
  componentDidMount() {
    //Fetching Clients List
console.log(this.props.location)
    axios.post('/clients', { team: this.state.usr.Team }).then((res) => {
      console.log(res.data)
      this.setState({clientsList:res.data.Clients})
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
            <Table
              height={300}
              data={this.state.clientsList}
              style={{ zIndex: 0 }}
              onRowClick={(data) => {
                this.setState({ current: data });
              }}
            >
              <Column flexGrow={1} align='center' fixed>
                <HeaderCell>Razon Social</HeaderCell>
                <Cell dataKey='razon' />
              </Column>
              <Column flexGrow={1} fixed>
                <HeaderCell>Nombre Comercial</HeaderCell>
                <Cell dataKey='cName' />
              </Column>
              <Column flexGrow={2}>
                <HeaderCell>Domicilio Fiscal</HeaderCell>
                <Cell dataKey='fiscal' />
              </Column>
              <Column flexGrow={1}>
                <HeaderCell>RFC</HeaderCell>
                <Cell dataKey='rfc' />
              </Column>
              <Column flexGrow={1}>
                <HeaderCell>Telefono</HeaderCell>
                <Cell dataKey='phoneNum' />
              </Column>
            </Table>
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
                    color: '#6FFFB0',
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
                    backgroundColor: '#6FFFB0',
                    width: '120px',
                    fontFamily: "'Manjari', sans-serif",
                    boxShadow: '0px 2px 4px rgba(0,0,0,0.20)',
                  }}
                  onClick={() => {
                    this.props.history.push(`/clientedit/${this.state.usr.Usr}/${this.state.current._id}`, {...this.state.usr})
                    // this.props.history.push(`/clientreg/${this.state.usr.Usr}`,
                    //   {
                    //       usr:this.state.usr,
                    //       client:this.state.current,
                          
                    //   })
                    }
                  }
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
