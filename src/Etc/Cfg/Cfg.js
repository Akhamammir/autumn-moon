import React from 'react';
import './Cfg.css';
import { Grommet, Image, Box, Heading, Clock } from 'grommet';
import { Button } from 'primereact/button';
import axios from 'axios';
class Cfg extends React.Component {
  constructor(props) {
    super(props);
    //console.log(this.props.match.params)
    axios.post('/unlock', { pwd: this.props.match.params.pwd }).then((res) => {
      console.log(res.data);
      if (res.data.unlock) this.setState({lock:res.data.unlock})
      //this.setState({ clients: res.data.Clients, clientsListStore: res.data.Clients });
    });
    this.state = { clients: [], lock:false }
  }
  uuidShort = () => {
    return (([1e7]) + -1e3 + -4e3).replace(/[018]/g, c =>
      (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
    );
  }
  summon = () => {
    let temp=[];
    axios.post('/clients', { team: 'E' }).then((res) => {
      console.log(res.data);
      this.setState({ clients: res.data.Clients}, () => {
        this.state.clients.forEach(I=>{
          //
          I.tasks = [
            {
              Name: 'Recepción de documentos', _id: this.uuidShort(), Date: new Date(), 
              Status: 1,  key: this.uuidShort(),
              children: [
                {
                  Area: 'Recepción de documentos', Name: 'Envío de correo', Priori: 2, Advent: 30,
                  Date: new Date(), Status: 1, Files: [''], key: this.uuidShort(),
                  children: [
                    {Area: 'Recepción de documentos', Name: 'Estados de cuenta', Priori: 1, Advent: 20,
                  Date: new Date(), Status: 0, Files: [''], key: this.uuidShort(),},
                  {Area: 'Recepción de documentos', Name: 'Reportes internos-1', Priori: '0', Advent: 40,
                  Date: new Date(), Status: 2, Files: [''], key: this.uuidShort(),},
                  {Area: 'Recepción de documentos', Name: 'Movimientos bancarios', Priori: '0', Advent: 40,
                  Date: new Date(), Status: 2, Files: [''], key: this.uuidShort(),},
                  ]
                }
              ]
            },
            {Name: 'Contabilidad Terminada', _id: this.uuidShort(), Date: new Date(), 
            Status: 1,  key: this.uuidShort(),
            children: [
              {
                Area: 'Contable Terminada', Name: 'Conciliación bancaria', Priori: 2, Advent: 30,
                Date: new Date(), Status: 1, Files: [''], key: this.uuidShort(),
                children: [
                  {Area: 'Contable Terminada', Name: 'Papel de trabajo', Priori: 1, Advent: 20,
                Date: new Date(), Status: 0, Files: [''], key: this.uuidShort(),},
                {Area: 'Contable Terminada', Name: 'CM-1', Priori: '0', Advent: 40,
                Date: new Date(), Status: 2, Files: [''], key: this.uuidShort(),}
                ]
              }
            ]},
            {Name: 'Impuestos Estatales', _id: this.uuidShort(), Date: new Date(), 
            Status: 1, key: this.uuidShort(),
            children: [
              {
                Area: 'Impuestos Estatales', Name: 'ISN PT (PDF) (CB)', Priori: 2, Advent: 30,
                Date: new Date(), Status: 1, Files: [''], key: this.uuidShort(),
                children: [
                  {Area: 'Impuestos Estatales', Name: 'ISN Correo envío Línea de captura', Priori: 1, Advent: 20,
                Date: new Date(), Status: 0, Files: [''], key: this.uuidShort(),},
                {Area: 'Impuestos Estatales', Name: 'ISN Correo envío Línea de captura (CB) ', Priori: '0', Advent: 40,
                Date: new Date(), Status: 2, Files: [''], key: this.uuidShort(),},
                {Area: 'Impuestos Estatales', Name: 'RTP PT (PDF) (CB)', Priori: '0', Advent: 40,
                Date: new Date(), Status: 2, Files: [''], key: this.uuidShort(),},
                {Area: 'Impuestos Estatales', Name: 'RTP  Correo envío Línea de captura', Priori: '0', Advent: 40,
                Date: new Date(), Status: 2, Files: [''], key: this.uuidShort(),},
                {Area: 'Impuestos Estatales', Name: 'RTP Comprobante de pago (PDF)', Priori: '0', Advent: 40,
                Date: new Date(), Status: 2, Files: [''], key: this.uuidShort(),},
                {Area: 'Impuestos Estatales', Name: 'ISH PT (PDF) (CB)', Priori: '0', Advent: 40,
                Date: new Date(), Status: 2, Files: [''], key: this.uuidShort(),},
                {Area: 'Impuestos Estatales', Name: 'ISH  Correo envío Línea de captura ', Priori: '0', Advent: 40,
                Date: new Date(), Status: 2, Files: [''], key: this.uuidShort(),},
                {Area: 'Impuestos Estatales', Name: 'RTP Comprobante de pago (PDF)', Priori: '0', Advent: 40,
                Date: new Date(), Status: 2, Files: [''], key: this.uuidShort(),}
                ]
              }
            ]},
            {Name: 'Seguridad Social', _id: this.uuidShort(), Date: new Date(), 
            Status: 1, key: this.uuidShort(),
            children: [
              {
                Area: 'Seguridad Social', Name: 'Conciliación bancaria', Priori: 2, Advent: 30,
                Date: new Date(), Status: 1, Files: [''], key: this.uuidShort(),
                children: [
                  {Area: 'Seguridad Social', Name: 'Confronta IDSE - SUA- PT', Priori: 1, Advent: 20,
                  Date: new Date(), Status: 0, Files: [''], key: this.uuidShort(),},
                  {Area: 'Seguridad Social', Name: 'Correo envío Línea de captura', Priori: '0', Advent: 40,
                  Date: new Date(), Status: 2, Files: [''], key: this.uuidShort(),},
                  {Area: 'Seguridad Social', Name: 'Comprobante de pago (PDF/JPG)', Priori: 1, Advent: 20,
                  Date: new Date(), Status: 0, Files: [''], key: this.uuidShort(),},
                  {Area: 'Seguridad Social', Name: 'Opinión de cumplimiento IMSS (PDF)', Priori: '0', Advent: 40,
                  Date: new Date(), Status: 2, Files: [''], key: this.uuidShort(),},
                  {Area: 'Seguridad Social', Name: 'Opinión de cumplimiento INFONAVIT (PDF)', Priori: '0', Advent: 40,
                  Date: new Date(), Status: 2, Files: [''], key: this.uuidShort(),}
                ]
              }
            ]},
            {Name: 'D y P', _id: this.uuidShort(), Date: new Date(), 
            Status: 1, key: this.uuidShort(),
            children: [
              {
                Area: 'D y P', Name: 'Línea de Captura (PDF)', Priori: 2, Advent: 30,
                Date: new Date(), Status: 1, Files: [''], key: this.uuidShort(),
                children: [
                  {Area: 'D y P', Name: 'Papel de trabajo', Priori: 1, Advent: 20,
                  Date: new Date(), Status: 0, Files: [''], key: this.uuidShort(),},
                  {Area: 'D y P', Name: 'Declaración (PDF)', Priori: '0', Advent: 40,
                  Date: new Date(), Status: 2, Files: [''], key: this.uuidShort(),},
                  {Area: 'D y P', Name: 'Informe mensual (PDF)', Priori: 1, Advent: 20,
                  Date: new Date(), Status: 0, Files: [''], key: this.uuidShort(),},
                  {Area: 'D y P', Name: 'Opinión de cumplimiento (PDF)', Priori: '0', Advent: 40,
                  Date: new Date(), Status: 2, Files: [''], key: this.uuidShort(),},
                  {Area: 'D y P', Name: 'Correo envío Línea de captura (CB)', Priori: 1, Advent: 20,
                  Date: new Date(), Status: 0, Files: [''], key: this.uuidShort(),},
                  {Area: 'D y P', Name: 'Comprobante de pago', Priori: '0', Advent: 40,
                  Date: new Date(), Status: 2, Files: [''], key: this.uuidShort(),},
                ]
              }
            ]},
            {Name: 'DIOT/ DPIVA', _id: this.uuidShort(), Date: new Date(), 
            Status: 1, key: this.uuidShort(),
            children: [
              {
                Area: 'DIOT/ DPIVA', Name: 'Acuse de aceptación (PDF) ', Priori: 2, Advent: 30,
                Date: new Date(), Status: 1, Files: [''], key: this.uuidShort(),
                children: [
                  {Area: 'DIOT/ DPIVA', Name: 'Detalle de declaración (PDF)', Priori: 1, Advent: 20,
                  Date: new Date(), Status: 0, Files: [''], key: this.uuidShort(),},
                  {Area: 'DIOT/ DPIVA', Name: 'Reporte A-29 /CONTPAQi (PDF) ', Priori: '0', Advent: 40,
                  Date: new Date(), Status: 2, Files: [''], key: this.uuidShort(),},
                ]
              }
            ]},
            {Name: 'Estados Financieros', _id: this.uuidShort(), Date: new Date(), 
            Status: 1, key: this.uuidShort(),
            children: [
              {
                Area: 'Estados financieros', Name: 'Estados financieros', Priori: 2, Advent: 30,
                Date: new Date(), Status: 1, Files: [''], key: this.uuidShort(),
                children: [
                  {Area: 'Estados financieros', Name: 'Informe Ejecutivo', Priori: 1, Advent: 20,
                  Date: new Date(), Status: 0, Files: [''], key: this.uuidShort(),},
                  {Area: 'Estados financieros', Name: 'Junta de resultados', Priori: '0', Advent: 40,
                  Date: new Date(), Status: 2, Files: [''], key: this.uuidShort(),},
                ]
              }
            ]},
            {Name: 'Pre-cierre', _id: this.uuidShort(), Date: new Date(), 
            Status: 1, key: this.uuidShort(),
            children: [
              {
                Area: 'Pre-cierre', Name: 'Informe pre-cierre', Priori: 2, Advent: 30,
                Date: new Date(), Status: 1, Files: [''], key: this.uuidShort(),
              }
            ]}
          ];
          temp.push(I)
        });
      });
    }).then(()=>{
      this.state.clients = temp;
    });
  }
  render() {
    return (
      <Grommet plain className="App">
        <header className="App-header">
          {this.state.lock ? 
          <React.Fragment>
            <Box>
              <Heading margin="none" color='accent-1' size="large" id="Fonter">Baking . . .</Heading>
            </Box>
            <br />
            <Box height="small" width="small">
              <Button
                className="p-button-raised p-button-help"
                size="lg"
                label="Config Tasks"
                onClick={this.summon}
              >
              </Button>
            </Box>
          </React.Fragment> : 
          <Box>
            <Heading margin="none" color='accent-1' size="large" id="Fonter">Hour is . . .</Heading>
          </Box>
          }
          <br />
          <Clock type="digital" alignSelf="center" size="xlarge" id="Time" />
        </header>
      </Grommet>
    );
  }
}
export default Cfg;
