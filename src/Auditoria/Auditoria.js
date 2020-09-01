import React, { Component } from 'react'
import UsrBar from './../UsrBar/UsrBar';
import NavBar from './../NavBar/NavBar';
import { Grommet, Box, Grid, Heading, Text } from 'grommet';
import { DataTable } from 'primereact/datatable';
import { Column as _Column } from 'primereact/column';
import { Button as _Button } from 'primereact/button';
import axios from 'axios';

export default class Auditoria extends Component {
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
    console.log(this.props.location);
    axios.post('/clients', { team: this.state.usr.Team }).then((res) => {
      console.log(res.data);
      this.setState({ clientsList: res.data.Clients });
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
            <DataTable value={this.state.clientsList} rowHover selectionMode="single" onRowSelect={({data}) => {
                this.setState({ current: data });
              }}>
              <_Column field='razon' header='Razon Social' />
              <_Column field='' header='Recepcion de Documentos' />
              <_Column field='' header='Contabilidad Terminada' />
              <_Column field='' header='IMMS(enviado)' />
              <_Column field='' header='IMMS(pagado)' />
              <_Column field='' header='Confronta IMMS' />
              <_Column field='' header='Emision' />
              <_Column field='' header='Confronta Sua-Nominas' />
              <_Column field='' header='Confronta Sua-Nominas' />
              <_Column field='' header='2% ISN(Hoja de Trabajo)' />
              <_Column field='' header='2% S/Nomina(Pagado)' />
              <_Column field='' header='3%(Pagado)' />
              <_Column field='' header='DIOT' />
              <_Column field='' header='D y P' />
              <_Column field='' header='Pago D y p' />
              <_Column field='' header='Balanza Aceptada' />
              <_Column field='' header='Catalogo Aceptado' />
              <_Column field='' header='Estados Financieros' />
              <_Column field='' header='Junta de Resultados' />
              <_Column field='' header='Pre-Cierre' />
            </DataTable>
            <br/>
            </Box>
        </Grid>
      </Grommet>
        
    )
  }
}
