import React, { Component } from 'react'
import UsrBar from './../UsrBar/UsrBar';
import NavBar from './../NavBar/NavBar';
import { Grommet, Box, Grid, Heading, Text, Calendar, Table } from 'grommet';
import { DataTable } from 'primereact/datatable';
import { TreeTable } from 'primereact/treetable';
import { Column, Column as _Column } from 'primereact/column';
import { Toast } from 'primereact/toast';
import { SelectPicker, Icon, Button, Input, DateRangePicker, IconButton, DatePicker, Header } from 'rsuite';
import { Dialog } from 'primereact/dialog';
import axios from 'axios';
import './ToDo.css';
import {ArrowCircleRight, DownOne} from '@icon-park/react';
import { IntlProvider } from 'rsuite';
import esES from 'rsuite/lib/IntlProvider/locales/';


const miliPerYear = 31536000000;
export default class ToDo extends Component {
  data = [
    {
      "label": "Baja",
      "value": "0",
      "role": "Master"
    }, {
      "label": "Media",
      "value": "1",
      "role": "Master"
    }, {
      "label": "Alta",
      "value": "2",
      "role": "Master"
    }
  ]
  statusData = [
    {
      "label": "Incompleta",
      "value": "0",
      "role": "Master"
    }, {
      "label": "Pendiente",
      "value": "1",
      "role": "Master"
    }, {
      "label": "Completa",
      "value": "2",
      "role": "Master"
    }
  ]
  category = [
    {
      "label": "Contable",
      "value": "Contable",
      "role": "Contabilidad"
    }, {
      "label": "Fiscal",
      "value": "Fiscal",
      "role": "Master"
    }, {
      "label": "Laboral",
      "value": "Laboral",
      "role": "Master"
    }, {
      "label": "Financiero",
      "value": "Financiero",
      "role": "Master"
    }
  ]
  toast = {}
  constructor(props) {
    super(props);
    console.log(props);
    this.state = {
      usr: this.props.location.state,
      clientsList: [],
      dateList: [],
      current: {},
      expandedRows: false,
      selectedEditRow: [],
      does: 'Nothing',
      new: {
        name: '', status: '', priori: '', cat: '', date: ['', ''],
        subtask: [{ name: '', status: '', _id: this.uuidShort() }]
      }
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

  calcAdv = () => {
    let adv = 0, J = 0;
    if (this.state.selectedEditRow.children) {
      this.state.selectedEditRow.children.forEach((i, j) => {
        adv += i.Advent; J++;
      })
    }
    if (this.state.selectedEditRow.children) return (Math.trunc((adv / J) * 100) / 100)
    else return (Math.trunc(this.state.selectedEditRow.Advent * 100) / 100)
  }

  componentDidMount() {
    //Fetching Clients List
    console.log(this.props.location);
    this.setState({
      clientsList: [
        {
          Name: 'Contable', key: this.uuidShort(), children: [
            {
              Name: 'Recepción de documentos', Date: new Date(),
              Status: 1, key: this.uuidShort(), Area: 'Contable',
              children: [
                {
                  Area: 'Recepción de documentos', Name: 'Envío de correo', Priori: 2, Advent: 30,
                  Date: new Date(), Status: 1, Files: [''], key: this.uuidShort(), _id: this.uuidShort(),
                  domain: 'Contable',
                  children: [
                    {
                      Area: 'Envío de correo', Name: 'Estados de cuenta', Priori: 1, Advent: 20,
                      Date: new Date(), Status: 0, Files: [''], key: this.uuidShort(),
                    },
                    {
                      Area: 'Envío de correo', Name: 'Reportes internos-1', Priori: '0', Advent: 40,
                      Date: new Date(), Status: 2, Files: [''], key: this.uuidShort(),
                    },
                    {
                      Area: 'Envío de correo', Name: 'Movimientos bancarios', Priori: '0', Advent: 40,
                      Date: new Date(), Status: 2, Files: [''], key: this.uuidShort(),
                    },
                  ]
                }
              ]
            }, {
              Name: 'Contabilidad Terminada', Date: new Date(),
              Status: 1, key: this.uuidShort(), Area: 'Contable',
              children: [
                {
                  Area: 'Contabilidad Terminada', Name: 'Conciliación bancaria', Priori: 2, Advent: 30,
                  Date: new Date(), Status: 1, Files: [''], key: this.uuidShort(), _id: this.uuidShort(),
                  domain: 'Contable',
                  children: [
                    {
                      Area: 'Conciliación bancaria', Name: 'Papel de trabajo', Priori: 1, Advent: 20,
                      Date: new Date(), Status: 0, Files: [''], key: this.uuidShort(),
                    },
                    {
                      Area: 'Conciliación bancaria', Name: 'CM-1', Priori: '0', Advent: 40,
                      Date: new Date(), Status: 2, Files: [''], key: this.uuidShort(),
                    }
                  ]
                }
              ]
            }, {
              Name: 'Pre-cierre', Date: new Date(),
              Status: 1, key: this.uuidShort(), Area: 'Contable',
              children: [
                {
                  Area: 'Pre-cierre', Name: 'Informe pre-cierre', Priori: 2, Advent: 30,
                  domain: 'Contable',
                  Date: new Date(), Status: 1, Files: [''], key: this.uuidShort(), _id: this.uuidShort(),
                }
              ]
            }
          ]
        }, {
          Name: 'Fiscal', key: this.uuidShort(), children: [
            {
              Name: 'D y P', Date: new Date(),
              Status: 1, key: this.uuidShort(), Area: 'Fiscal',
              children: [
                {
                  Area: 'D y P', Name: 'Línea de Captura (PDF)', Priori: 2, Advent: 30,
                  Date: new Date(), Status: 1, Files: [''], key: this.uuidShort(), _id: this.uuidShort(),
                  domain: 'Fiscal',
                  children: [
                    {
                      Area: 'Línea de Captura (PDF)', Name: 'Papel de trabajo', Priori: 1, Advent: 20,
                      domain: 'Fiscal',
                      Date: new Date(), Status: 0, Files: [''], key: this.uuidShort(),
                    },
                    {
                      Area: 'Línea de Captura (PDF)', Name: 'Declaración (PDF)', Priori: '0', Advent: 40,
                      domain: 'Fiscal',
                      Date: new Date(), Status: 2, Files: [''], key: this.uuidShort(),
                    },
                    {
                      Area: 'Línea de Captura (PDF)', Name: 'Informe mensual (PDF)', Priori: 1, Advent: 20,
                      domain: 'Fiscal',
                      Date: new Date(), Status: 0, Files: [''], key: this.uuidShort(),
                    },
                    {
                      Area: 'Línea de Captura (PDF)', Name: 'Opinión de cumplimiento (PDF)', Priori: '0', Advent: 40,
                      domain: 'Fiscal',
                      Date: new Date(), Status: 2, Files: [''], key: this.uuidShort(),
                    },
                    {
                      Area: 'Línea de Captura (PDF)', Name: 'Correo envío Línea de captura (CB)', Priori: 1, Advent: 20,
                      domain: 'Fiscal',
                      Date: new Date(), Status: 0, Files: [''], key: this.uuidShort(),
                    },
                    {
                      Area: 'Línea de Captura (PDF)', Name: 'Comprobante de pago', Priori: '0', Advent: 40,
                      domain: 'Fiscal',
                      Date: new Date(), Status: 2, Files: [''], key: this.uuidShort(),
                    },
                  ]
                }
              ]
            },
            {
              Name: 'DIOT/ DPIVA', Date: new Date(),
              Status: 1, key: this.uuidShort(), Area: 'Fiscal',
              children: [
                {
                  Area: 'DIOT/ DPIVA', Name: 'Acuse de aceptación (PDF)', Priori: 2, Advent: 30,
                  Date: new Date(), Status: 1, Files: [''], key: this.uuidShort(), _id: this.uuidShort(),
                  domain: 'Fiscal',
                  children: [
                    {
                      Area: 'Acuse de aceptación (PDF)', Name: 'Detalle de declaración (PDF)', Priori: 1, Advent: 20,
                      domain: 'Fiscal',
                      Date: new Date(), Status: 0, Files: [''], key: this.uuidShort(),
                    },
                    {
                      Area: 'Acuse de aceptación (PDF)', Name: 'Reporte A-29 /CONTPAQi (PDF) ', Priori: '0', Advent: 40,
                      domain: 'Fiscal',
                      Date: new Date(), Status: 2, Files: [''], key: this.uuidShort(),
                    },
                  ]
                }
              ]
            },
          ]
        }, {
          Name: 'Laboral', key: this.uuidShort(), children: [

            {
              Name: 'Impuestos Estatales', Date: new Date(),
              Status: 1, key: this.uuidShort(), Area: 'Laboral',
              children: [
                {
                  Area: 'Impuestos Estatales', Name: 'ISN PT (PDF) (CB)', Priori: 2, Advent: 30,
                  Date: new Date(), Status: 1, Files: [''], key: this.uuidShort(), _id: this.uuidShort(),
                  domain: 'Laboral',
                  children: [
                    {
                      Area: 'ISN PT (PDF) (CB)', Name: 'ISN Correo envío Línea de captura', Priori: 1, Advent: 20,
                      Date: new Date(), Status: 0, Files: [''], key: this.uuidShort(),
                    },
                    {
                      Area: 'ISN PT (PDF) (CB)', Name: 'ISN Correo envío Línea de captura (CB) ', Priori: '0', Advent: 40,
                      domain: 'Laboral',
                      Date: new Date(), Status: 2, Files: [''], key: this.uuidShort(),
                    },
                    {
                      Area: 'ISN PT (PDF) (CB)', Name: 'RTP PT (PDF) (CB)', Priori: '0', Advent: 40,
                      domain: 'Laboral',
                      Date: new Date(), Status: 2, Files: [''], key: this.uuidShort(),
                    },
                    {
                      Area: 'ISN PT (PDF) (CB)', Name: 'RTP  Correo envío Línea de captura', Priori: '0', Advent: 40,
                      domain: 'Laboral',
                      Date: new Date(), Status: 2, Files: [''], key: this.uuidShort(),
                    },
                    {
                      Area: 'ISN PT (PDF) (CB)', Name: 'RTP Comprobante de pago (PDF)', Priori: '0', Advent: 40,
                      domain: 'Laboral',
                      Date: new Date(), Status: 2, Files: [''], key: this.uuidShort(),
                    },
                    {
                      Area: 'ISN PT (PDF) (CB)', Name: 'ISH PT (PDF) (CB)', Priori: '0', Advent: 40,
                      domain: 'Laboral',
                      Date: new Date(), Status: 2, Files: [''], key: this.uuidShort(),
                    },
                    {
                      Area: 'ISN PT (PDF) (CB)', Name: 'ISH  Correo envío Línea de captura ', Priori: '0', Advent: 40,
                      domain: 'Laboral',
                      Date: new Date(), Status: 2, Files: [''], key: this.uuidShort(),
                    },
                    {
                      Area: 'ISN PT (PDF) (CB)', Name: 'RTP Comprobante de pago (PDF)', Priori: '0', Advent: 40,
                      domain: 'Laboral',
                      Date: new Date(), Status: 2, Files: [''], key: this.uuidShort(),
                    }
                  ]
                }
              ]
            },
            {
              Name: 'Seguridad Social', Date: new Date(),
              Status: 1, key: this.uuidShort(), Area: 'Laboral',
              children: [
                {
                  Area: 'Seguridad Social', Name: 'Conciliación bancaria', Priori: 2, Advent: 30,
                  Date: new Date(), Status: 1, Files: [''], key: this.uuidShort(), _id: this.uuidShort(),
                  domain: 'Laboral',
                  children: [
                    {
                      Area: 'Conciliación bancaria', Name: 'Confronta IDSE - SUA- PT', Priori: 1, Advent: 20,
                      Date: new Date(), Status: 0, Files: [''], key: this.uuidShort(),
                    },
                    {
                      Area: 'Conciliación bancaria', Name: 'Correo envío Línea de captura', Priori: '0', Advent: 40,
                      Date: new Date(), Status: 2, Files: [''], key: this.uuidShort(),
                    },
                    {
                      Area: 'Conciliación bancaria', Name: 'Comprobante de pago (PDF/JPG)', Priori: 1, Advent: 20,
                      Date: new Date(), Status: 0, Files: [''], key: this.uuidShort(),
                    },
                    {
                      Area: 'Conciliación bancaria', Name: 'Opinión de cumplimiento IMSS (PDF)', Priori: '0', Advent: 40,
                      Date: new Date(), Status: 2, Files: [''], key: this.uuidShort(),
                    },
                    {
                      Area: 'Conciliación bancaria', Name: 'Opinión de cumplimiento INFONAVIT (PDF)', Priori: '0', Advent: 40,
                      Date: new Date(), Status: 2, Files: [''], key: this.uuidShort(),
                    }
                  ]
                }
              ]
            },
          ]
        }, {
          Name: 'Financiero', key: this.uuidShort(), children: [
            {
              Name: 'Estados Financieros', Date: new Date(),
              Status: 1, key: this.uuidShort(), Area: 'Financiero',
              children: [
                {
                  Area: 'Estados Financieros', Name: 'Estados financieros', Priori: 2, Advent: 30,
                  Date: new Date(), Status: 1, Files: [''], key: this.uuidShort(), _id: this.uuidShort(),
                  domain: 'Financiero',
                  children: [
                    {
                      Area: 'Estados financieros', Name: 'Informe Ejecutivo', Priori: 1, Advent: 20,
                      Date: new Date(), Status: 0, Files: [''], key: this.uuidShort(),
                    },
                    {
                      Area: 'Estados financieros', Name: 'Junta de resultados', Priori: '0', Advent: 40,
                      Date: new Date(), Status: 2, Files: [''], key: this.uuidShort(),
                    },
                  ]
                }
              ]
            },
          ]
        }
      ],

      dateList: [
        {
          Name: '2017', key: this.uuidShort(),
          children: [
            {
              Area: 'Contable', Name: 'Enero', key: this.uuidShort(),
              children: [

                {
                  Area: 'Contable', Name: 'CONTABLE', key: this.uuidShort(),
                  children: [
                    {
                      Area: 'Contable', Name: 'CONCILIACIONES', key: this.uuidShort(),
                    }, {
                      Area: 'Contable', Name: 'DEPRECIACIONES', key: this.uuidShort(),
                    }, {
                      Area: 'Contable', Name: 'DOCS ENTREGA', key: this.uuidShort(),
                    }, {
                      Area: 'Contable', Name: 'FACTURACIÓN', key: this.uuidShort(),
                    }, {
                      Area: 'Contable', Name: 'PÓLIZAS \nCONTABLES', key: this.uuidShort(),
                    }, {
                      Area: 'Contable', Name: 'PRECIERRE', key: this.uuidShort(),
                    },
                  ],
                }, {
                  Area: 'Contable', Name: 'FISCAL', key: this.uuidShort(),
                }, {
                  Area: 'Contable', Name: 'LABORAL', key: this.uuidShort(),
                }, {
                  Area: 'Contable', Name: 'FINANCIEROS', key: this.uuidShort(),
                },
              ]

            },
            {
              Area: 'Contable', Name: 'Febrero', key: this.uuidShort(),
              children: [
                {
                  Area: 'Contable', Name: 'Contable', key: this.uuidShort(),
                  children: [
                    {
                      Area: 'Contable', Name: 'Conciliaciones', key: this.uuidShort(),
                    },
                    {
                      Area: 'Contable', Name: 'Depreciaciones', key: this.uuidShort(),
                    },
                    {
                      Area: 'Contable', Name: 'Documentación de entrega', key: this.uuidShort(),
                    },
                    {
                      Area: 'Contable', Name: 'Facturación-XML', key: this.uuidShort(),
                    },
                    {
                      Area: 'Contable', Name: 'Pólizas Contables', key: this.uuidShort(),
                    },
                    {
                      Area: 'Contable', Name: 'Precierre', key: this.uuidShort(),
                    },
                  ],
                },
                {
                  Area: 'Contable', Name: 'Fiscal', key: this.uuidShort(),
                },
                {
                  Area: 'Contable', Name: 'Laboral', key: this.uuidShort(),
                },
                {
                  Area: 'Contable', Name: 'Financieros', key: this.uuidShort(),
                },
              ]

            },
            {
              Area: 'Contable', Name: 'Marzo', key: this.uuidShort(),
              children: [

                {
                  Area: 'Contable', Name: 'Contable', key: this.uuidShort(),
                  children: [
                    {
                      Area: 'Contable', Name: 'Conciliaciones', key: this.uuidShort(),
                    },
                    {
                      Area: 'Contable', Name: 'Depreciaciones', key: this.uuidShort(),
                    },
                    {
                      Area: 'Contable', Name: 'Documentación de entrega', key: this.uuidShort(),
                    },
                    {
                      Area: 'Contable', Name: 'Facturación-XML', key: this.uuidShort(),
                    },
                    {
                      Area: 'Contable', Name: 'Pólizas Contables', key: this.uuidShort(),
                    },
                    {
                      Area: 'Contable', Name: 'Precierre', key: this.uuidShort(),
                    },
                  ],
                },
                {
                  Area: 'Contable', Name: 'Fiscal', key: this.uuidShort(),
                },
                {
                  Area: 'Contable', Name: 'Laboral', key: this.uuidShort(),
                },
                {
                  Area: 'Contable', Name: 'Financieros', key: this.uuidShort(),
                },
              ]

            },
            {
              Area: 'Contable', Name: 'Abril', key: this.uuidShort(),
              children: [

                {
                  Area: 'Contable', Name: 'Contable', key: this.uuidShort(),
                  children: [
                    {
                      Area: 'Contable', Name: 'Conciliaciones', key: this.uuidShort(),
                    },
                    {
                      Area: 'Contable', Name: 'Depreciaciones', key: this.uuidShort(),
                    },
                    {
                      Area: 'Contable', Name: 'Documentación de entrega', key: this.uuidShort(),
                    },
                    {
                      Area: 'Contable', Name: 'Facturación-XML', key: this.uuidShort(),
                    },
                    {
                      Area: 'Contable', Name: 'Pólizas Contables', key: this.uuidShort(),
                    },
                    {
                      Area: 'Contable', Name: 'Precierre', key: this.uuidShort(),
                    },
                  ],
                },
                {
                  Area: 'Contable', Name: 'Fiscal', key: this.uuidShort(),
                },
                {
                  Area: 'Contable', Name: 'Laboral', key: this.uuidShort(),
                },
                {
                  Area: 'Contable', Name: 'Financieros', key: this.uuidShort(),
                },
              ]

            },
            {
              Area: 'Contable', Name: 'Mayo', key: this.uuidShort(),
              children: [

                {
                  Area: 'Contable', Name: 'Contable', key: this.uuidShort(),
                  children: [
                    {
                      Area: 'Contable', Name: 'Conciliaciones', key: this.uuidShort(),
                    },
                    {
                      Area: 'Contable', Name: 'Depreciaciones', key: this.uuidShort(),
                    },
                    {
                      Area: 'Contable', Name: 'Documentación de entrega', key: this.uuidShort(),
                    },
                    {
                      Area: 'Contable', Name: 'Facturación-XML', key: this.uuidShort(),
                    },
                    {
                      Area: 'Contable', Name: 'Pólizas Contables', key: this.uuidShort(),
                    },
                    {
                      Area: 'Contable', Name: 'Precierre', key: this.uuidShort(),
                    },
                  ],
                },
                {
                  Area: 'Contable', Name: 'Fiscal', key: this.uuidShort(),
                },
                {
                  Area: 'Contable', Name: 'Laboral', key: this.uuidShort(),
                },
                {
                  Area: 'Contable', Name: 'Financieros', key: this.uuidShort(),
                },
              ]

            },
            {
              Area: 'Contable', Name: 'Junio', key: this.uuidShort(),
              children: [

                {
                  Area: 'Contable', Name: 'Contable', key: this.uuidShort(),
                  children: [
                    {
                      Area: 'Contable', Name: 'Conciliaciones', key: this.uuidShort(),
                    },
                    {
                      Area: 'Contable', Name: 'Depreciaciones', key: this.uuidShort(),
                    },
                    {
                      Area: 'Contable', Name: 'Documentación de entrega', key: this.uuidShort(),
                    },
                    {
                      Area: 'Contable', Name: 'Facturación-XML', key: this.uuidShort(),
                    },
                    {
                      Area: 'Contable', Name: 'Pólizas Contables', key: this.uuidShort(),
                    },
                    {
                      Area: 'Contable', Name: 'Precierre', key: this.uuidShort(),
                    },
                  ],
                },
                {
                  Area: 'Contable', Name: 'Fiscal', key: this.uuidShort(),
                },
                {
                  Area: 'Contable', Name: 'Laboral', key: this.uuidShort(),
                },
                {
                  Area: 'Contable', Name: 'Financieros', key: this.uuidShort(),
                },
              ]

            },
            {
              Area: 'Contable', Name: 'Julio', key: this.uuidShort(),
              children: [

                {
                  Area: 'Contable', Name: 'Contable', key: this.uuidShort(),
                  children: [
                    {
                      Area: 'Contable', Name: 'Conciliaciones', key: this.uuidShort(),
                    },
                    {
                      Area: 'Contable', Name: 'Depreciaciones', key: this.uuidShort(),
                    },
                    {
                      Area: 'Contable', Name: 'Documentación de entrega', key: this.uuidShort(),
                    },
                    {
                      Area: 'Contable', Name: 'Facturación-XML', key: this.uuidShort(),
                    },
                    {
                      Area: 'Contable', Name: 'Pólizas Contables', key: this.uuidShort(),
                    },
                    {
                      Area: 'Contable', Name: 'Precierre', key: this.uuidShort(),
                    },
                  ],
                },
                {
                  Area: 'Contable', Name: 'Fiscal', key: this.uuidShort(),
                },
                {
                  Area: 'Contable', Name: 'Laboral', key: this.uuidShort(),
                },
                {
                  Area: 'Contable', Name: 'Financieros', key: this.uuidShort(),
                },
              ]

            },
            {
              Area: 'Contable', Name: 'Agosto', key: this.uuidShort(),
              children: [

                {
                  Area: 'Contable', Name: 'Contable', key: this.uuidShort(),
                  children: [
                    {
                      Area: 'Contable', Name: 'Conciliaciones', key: this.uuidShort(),
                    },
                    {
                      Area: 'Contable', Name: 'Depreciaciones', key: this.uuidShort(),
                    },
                    {
                      Area: 'Contable', Name: 'Documentación de entrega', key: this.uuidShort(),
                    },
                    {
                      Area: 'Contable', Name: 'Facturación-XML', key: this.uuidShort(),
                    },
                    {
                      Area: 'Contable', Name: 'Pólizas Contables', key: this.uuidShort(),
                    },
                    {
                      Area: 'Contable', Name: 'Precierre', key: this.uuidShort(),
                    },
                  ],
                },
                {
                  Area: 'Contable', Name: 'Fiscal', key: this.uuidShort(),
                },
                {
                  Area: 'Contable', Name: 'Laboral', key: this.uuidShort(),
                },
                {
                  Area: 'Contable', Name: 'Financieros', key: this.uuidShort(),
                },
              ]

            },
            {
              Area: 'Contable', Name: 'Septiembre', key: this.uuidShort(),
              children: [

                {
                  Area: 'Contable', Name: 'Contable', key: this.uuidShort(),
                  children: [
                    {
                      Area: 'Contable', Name: 'Conciliaciones', key: this.uuidShort(),
                    },
                    {
                      Area: 'Contable', Name: 'Depreciaciones', key: this.uuidShort(),
                    },
                    {
                      Area: 'Contable', Name: 'Documentación de entrega', key: this.uuidShort(),
                    },
                    {
                      Area: 'Contable', Name: 'Facturación-XML', key: this.uuidShort(),
                    },
                    {
                      Area: 'Contable', Name: 'Pólizas Contables', key: this.uuidShort(),
                    },
                    {
                      Area: 'Contable', Name: 'Precierre', key: this.uuidShort(),
                    },
                  ],
                },
                {
                  Area: 'Contable', Name: 'Fiscal', key: this.uuidShort(),
                },
                {
                  Area: 'Contable', Name: 'Laboral', key: this.uuidShort(),
                },
                {
                  Area: 'Contable', Name: 'Financieros', key: this.uuidShort(),
                },
              ]

            },
            {
              Area: 'Contable', Name: 'Octubre', key: this.uuidShort(),
              children: [

                {
                  Area: 'Contable', Name: 'Contable', key: this.uuidShort(),
                  children: [
                    {
                      Area: 'Contable', Name: 'Conciliaciones', key: this.uuidShort(),
                    },
                    {
                      Area: 'Contable', Name: 'Depreciaciones', key: this.uuidShort(),
                    },
                    {
                      Area: 'Contable', Name: 'Documentación de entrega', key: this.uuidShort(),
                    },
                    {
                      Area: 'Contable', Name: 'Facturación-XML', key: this.uuidShort(),
                    },
                    {
                      Area: 'Contable', Name: 'Pólizas Contables', key: this.uuidShort(),
                    },
                    {
                      Area: 'Contable', Name: 'Precierre', key: this.uuidShort(),
                    },
                  ],
                },
                {
                  Area: 'Contable', Name: 'Fiscal', key: this.uuidShort(),
                },
                {
                  Area: 'Contable', Name: 'Laboral', key: this.uuidShort(),
                },
                {
                  Area: 'Contable', Name: 'Financieros', key: this.uuidShort(),
                },
              ]

            },
            {
              Area: 'Contable', Name: 'Noviembre', key: this.uuidShort(),
              children: [

                {
                  Area: 'Contable', Name: 'Contable', key: this.uuidShort(),
                  children: [
                    {
                      Area: 'Contable', Name: 'Conciliaciones', key: this.uuidShort(),
                    },
                    {
                      Area: 'Contable', Name: 'Depreciaciones', key: this.uuidShort(),
                    },
                    {
                      Area: 'Contable', Name: 'Documentación de entrega', key: this.uuidShort(),
                    },
                    {
                      Area: 'Contable', Name: 'Facturación-XML', key: this.uuidShort(),
                    },
                    {
                      Area: 'Contable', Name: 'Pólizas Contables', key: this.uuidShort(),
                    },
                    {
                      Area: 'Contable', Name: 'Precierre', key: this.uuidShort(),
                    },
                  ],
                },
                {
                  Area: 'Contable', Name: 'Fiscal', key: this.uuidShort(),
                },
                {
                  Area: 'Contable', Name: 'Laboral', key: this.uuidShort(),
                },
                {
                  Area: 'Contable', Name: 'Financieros', key: this.uuidShort(),
                },
              ]

            },
            {
              Area: 'Contable', Name: 'Diciembre', key: this.uuidShort(),
              children: [

                {
                  Area: 'Contable', Name: 'Contable', key: this.uuidShort(),
                  children: [
                    {
                      Area: 'Contable', Name: 'Conciliaciones', key: this.uuidShort(),
                    },
                    {
                      Area: 'Contable', Name: 'Depreciaciones', key: this.uuidShort(),
                    },
                    {
                      Area: 'Contable', Name: 'Documentación de entrega', key: this.uuidShort(),
                    },
                    {
                      Area: 'Contable', Name: 'Facturación-XML', key: this.uuidShort(),
                    },
                    {
                      Area: 'Contable', Name: 'Pólizas Contables', key: this.uuidShort(),
                    },
                    {
                      Area: 'Contable', Name: 'Precierre', key: this.uuidShort(),
                    },
                  ],
                },
                {
                  Area: 'Contable', Name: 'Fiscal', key: this.uuidShort(),
                },
                {
                  Area: 'Contable', Name: 'Laboral', key: this.uuidShort(),
                },
                {
                  Area: 'Contable', Name: 'Financieros', key: this.uuidShort(),
                },
              ]

            },
            {
              Area: 'Contable', Name: 'Anual', key: this.uuidShort(),
              children: [

                {
                  Area: 'Contable', Name: 'Contable', key: this.uuidShort(),
                  children: [
                    {
                      Area: 'Contable', Name: 'Conciliaciones', key: this.uuidShort(),
                    },
                    {
                      Area: 'Contable', Name: 'Depreciaciones', key: this.uuidShort(),
                    },
                    {
                      Area: 'Contable', Name: 'Documentación de entrega', key: this.uuidShort(),
                    },
                    {
                      Area: 'Contable', Name: 'Facturación-XML', key: this.uuidShort(),
                    },
                    {
                      Area: 'Contable', Name: 'Pólizas Contables', key: this.uuidShort(),
                    },
                    {
                      Area: 'Contable', Name: 'Precierre', key: this.uuidShort(),
                    },
                  ],
                },
                {
                  Area: 'Contable', Name: 'Fiscal', key: this.uuidShort(),
                },
                {
                  Area: 'Contable', Name: 'Laboral', key: this.uuidShort(),
                },
                {
                  Area: 'Contable', Name: 'Financieros', key: this.uuidShort(),
                },
              ]

            },
            {
              Area: 'Contable', Name: 'Papeles de trabajo', key: this.uuidShort(),
              children: [

                {
                  Area: 'Contable', Name: 'Contable', key: this.uuidShort(),
                  children: [
                    {
                      Area: 'Contable', Name: 'Conciliaciones', key: this.uuidShort(),
                    },
                    {
                      Area: 'Contable', Name: 'Depreciaciones', key: this.uuidShort(),
                    },
                    {
                      Area: 'Contable', Name: 'Documentación de entrega', key: this.uuidShort(),
                    },
                    {
                      Area: 'Contable', Name: 'Facturación-XML', key: this.uuidShort(),
                    },
                    {
                      Area: 'Contable', Name: 'Pólizas Contables', key: this.uuidShort(),
                    },
                    {
                      Area: 'Contable', Name: 'Precierre', key: this.uuidShort(),
                    },
                  ],
                },
                {
                  Area: 'Contable', Name: 'Fiscal', key: this.uuidShort(),
                },
                {
                  Area: 'Contable', Name: 'Laboral', key: this.uuidShort(),
                },
                {
                  Area: 'Contable', Name: 'Financieros', key: this.uuidShort(),
                },
              ]

            },

          ]
        },
        {
          Name: '2018', key: this.uuidShort(),
          children: [
            {
              Area: 'Contable', Name: 'Enero', key: this.uuidShort(),
              children: [

                {
                  Area: 'Contable', Name: 'CONTABLE', key: this.uuidShort(),
                  children: [
                    {
                      Area: 'Contable', Name: 'CONCILIACIONES', key: this.uuidShort(),
                    },
                    {
                      Area: 'Contable', Name: 'DEPRECIACIONES', key: this.uuidShort(),
                    },
                    {
                      Area: 'Contable', Name: 'DOCS ENTREGA', key: this.uuidShort(),
                    },
                    {
                      Area: 'Contable', Name: 'FACTURACIÓN', key: this.uuidShort(),
                    },
                    {
                      Area: 'Contable', Name: 'PÓLIZAS \nCONTABLES', key: this.uuidShort(),
                    },
                    {
                      Area: 'Contable', Name: 'PRECIERRE', key: this.uuidShort(),
                    },
                  ],
                },
                {
                  Area: 'Contable', Name: 'FISCAL', key: this.uuidShort(),
                },
                {
                  Area: 'Contable', Name: 'LABORAL', key: this.uuidShort(),
                },
                {
                  Area: 'Contable', Name: 'FINANCIEROS', key: this.uuidShort(),
                },
              ]

            },
            {
              Area: 'Contable', Name: 'Febrero', key: this.uuidShort(),
              children: [
                {
                  Area: 'Contable', Name: 'Contable', key: this.uuidShort(),
                  children: [
                    {
                      Area: 'Contable', Name: 'Conciliaciones', key: this.uuidShort(),
                    },
                    {
                      Area: 'Contable', Name: 'Depreciaciones', key: this.uuidShort(),
                    },
                    {
                      Area: 'Contable', Name: 'Documentación de entrega', key: this.uuidShort(),
                    },
                    {
                      Area: 'Contable', Name: 'Facturación-XML', key: this.uuidShort(),
                    },
                    {
                      Area: 'Contable', Name: 'Pólizas Contables', key: this.uuidShort(),
                    },
                    {
                      Area: 'Contable', Name: 'Precierre', key: this.uuidShort(),
                    },
                  ],
                },
                {
                  Area: 'Contable', Name: 'Fiscal', key: this.uuidShort(),
                },
                {
                  Area: 'Contable', Name: 'Laboral', key: this.uuidShort(),
                },
                {
                  Area: 'Contable', Name: 'Financieros', key: this.uuidShort(),
                },
              ]

            },
            {
              Area: 'Contable', Name: 'Marzo', key: this.uuidShort(),
              children: [

                {
                  Area: 'Contable', Name: 'Contable', key: this.uuidShort(),
                  children: [
                    {
                      Area: 'Contable', Name: 'Conciliaciones', key: this.uuidShort(),
                    },
                    {
                      Area: 'Contable', Name: 'Depreciaciones', key: this.uuidShort(),
                    },
                    {
                      Area: 'Contable', Name: 'Documentación de entrega', key: this.uuidShort(),
                    },
                    {
                      Area: 'Contable', Name: 'Facturación-XML', key: this.uuidShort(),
                    },
                    {
                      Area: 'Contable', Name: 'Pólizas Contables', key: this.uuidShort(),
                    },
                    {
                      Area: 'Contable', Name: 'Precierre', key: this.uuidShort(),
                    },
                  ],
                },
                {
                  Area: 'Contable', Name: 'Fiscal', key: this.uuidShort(),
                },
                {
                  Area: 'Contable', Name: 'Laboral', key: this.uuidShort(),
                },
                {
                  Area: 'Contable', Name: 'Financieros', key: this.uuidShort(),
                },
              ]

            },
            {
              Area: 'Contable', Name: 'Abril', key: this.uuidShort(),
              children: [

                {
                  Area: 'Contable', Name: 'Contable', key: this.uuidShort(),
                  children: [
                    {
                      Area: 'Contable', Name: 'Conciliaciones', key: this.uuidShort(),
                    },
                    {
                      Area: 'Contable', Name: 'Depreciaciones', key: this.uuidShort(),
                    },
                    {
                      Area: 'Contable', Name: 'Documentación de entrega', key: this.uuidShort(),
                    },
                    {
                      Area: 'Contable', Name: 'Facturación-XML', key: this.uuidShort(),
                    },
                    {
                      Area: 'Contable', Name: 'Pólizas Contables', key: this.uuidShort(),
                    },
                    {
                      Area: 'Contable', Name: 'Precierre', key: this.uuidShort(),
                    },
                  ],
                },
                {
                  Area: 'Contable', Name: 'Fiscal', key: this.uuidShort(),
                },
                {
                  Area: 'Contable', Name: 'Laboral', key: this.uuidShort(),
                },
                {
                  Area: 'Contable', Name: 'Financieros', key: this.uuidShort(),
                },
              ]

            },
            {
              Area: 'Contable', Name: 'Mayo', key: this.uuidShort(),
              children: [

                {
                  Area: 'Contable', Name: 'Contable', key: this.uuidShort(),
                  children: [
                    {
                      Area: 'Contable', Name: 'Conciliaciones', key: this.uuidShort(),
                    },
                    {
                      Area: 'Contable', Name: 'Depreciaciones', key: this.uuidShort(),
                    },
                    {
                      Area: 'Contable', Name: 'Documentación de entrega', key: this.uuidShort(),
                    },
                    {
                      Area: 'Contable', Name: 'Facturación-XML', key: this.uuidShort(),
                    },
                    {
                      Area: 'Contable', Name: 'Pólizas Contables', key: this.uuidShort(),
                    },
                    {
                      Area: 'Contable', Name: 'Precierre', key: this.uuidShort(),
                    },
                  ],
                },
                {
                  Area: 'Contable', Name: 'Fiscal', key: this.uuidShort(),
                },
                {
                  Area: 'Contable', Name: 'Laboral', key: this.uuidShort(),
                },
                {
                  Area: 'Contable', Name: 'Financieros', key: this.uuidShort(),
                },
              ]

            },
            {
              Area: 'Contable', Name: 'Junio', key: this.uuidShort(),
              children: [

                {
                  Area: 'Contable', Name: 'Contable', key: this.uuidShort(),
                  children: [
                    {
                      Area: 'Contable', Name: 'Conciliaciones', key: this.uuidShort(),
                    },
                    {
                      Area: 'Contable', Name: 'Depreciaciones', key: this.uuidShort(),
                    },
                    {
                      Area: 'Contable', Name: 'Documentación de entrega', key: this.uuidShort(),
                    },
                    {
                      Area: 'Contable', Name: 'Facturación-XML', key: this.uuidShort(),
                    },
                    {
                      Area: 'Contable', Name: 'Pólizas Contables', key: this.uuidShort(),
                    },
                    {
                      Area: 'Contable', Name: 'Precierre', key: this.uuidShort(),
                    },
                  ],
                },
                {
                  Area: 'Contable', Name: 'Fiscal', key: this.uuidShort(),
                },
                {
                  Area: 'Contable', Name: 'Laboral', key: this.uuidShort(),
                },
                {
                  Area: 'Contable', Name: 'Financieros', key: this.uuidShort(),
                },
              ]

            },
            {
              Area: 'Contable', Name: 'Julio', key: this.uuidShort(),
              children: [

                {
                  Area: 'Contable', Name: 'Contable', key: this.uuidShort(),
                  children: [
                    {
                      Area: 'Contable', Name: 'Conciliaciones', key: this.uuidShort(),
                    },
                    {
                      Area: 'Contable', Name: 'Depreciaciones', key: this.uuidShort(),
                    },
                    {
                      Area: 'Contable', Name: 'Documentación de entrega', key: this.uuidShort(),
                    },
                    {
                      Area: 'Contable', Name: 'Facturación-XML', key: this.uuidShort(),
                    },
                    {
                      Area: 'Contable', Name: 'Pólizas Contables', key: this.uuidShort(),
                    },
                    {
                      Area: 'Contable', Name: 'Precierre', key: this.uuidShort(),
                    },
                  ],
                },
                {
                  Area: 'Contable', Name: 'Fiscal', key: this.uuidShort(),
                },
                {
                  Area: 'Contable', Name: 'Laboral', key: this.uuidShort(),
                },
                {
                  Area: 'Contable', Name: 'Financieros', key: this.uuidShort(),
                },
              ]

            },
            {
              Area: 'Contable', Name: 'Agosto', key: this.uuidShort(),
              children: [

                {
                  Area: 'Contable', Name: 'Contable', key: this.uuidShort(),
                  children: [
                    {
                      Area: 'Contable', Name: 'Conciliaciones', key: this.uuidShort(),
                    },
                    {
                      Area: 'Contable', Name: 'Depreciaciones', key: this.uuidShort(),
                    },
                    {
                      Area: 'Contable', Name: 'Documentación de entrega', key: this.uuidShort(),
                    },
                    {
                      Area: 'Contable', Name: 'Facturación-XML', key: this.uuidShort(),
                    },
                    {
                      Area: 'Contable', Name: 'Pólizas Contables', key: this.uuidShort(),
                    },
                    {
                      Area: 'Contable', Name: 'Precierre', key: this.uuidShort(),
                    },
                  ],
                },
                {
                  Area: 'Contable', Name: 'Fiscal', key: this.uuidShort(),
                },
                {
                  Area: 'Contable', Name: 'Laboral', key: this.uuidShort(),
                },
                {
                  Area: 'Contable', Name: 'Financieros', key: this.uuidShort(),
                },
              ]

            },
            {
              Area: 'Contable', Name: 'Septiembre', key: this.uuidShort(),
              children: [

                {
                  Area: 'Contable', Name: 'Contable', key: this.uuidShort(),
                  children: [
                    {
                      Area: 'Contable', Name: 'Conciliaciones', key: this.uuidShort(),
                    },
                    {
                      Area: 'Contable', Name: 'Depreciaciones', key: this.uuidShort(),
                    },
                    {
                      Area: 'Contable', Name: 'Documentación de entrega', key: this.uuidShort(),
                    },
                    {
                      Area: 'Contable', Name: 'Facturación-XML', key: this.uuidShort(),
                    },
                    {
                      Area: 'Contable', Name: 'Pólizas Contables', key: this.uuidShort(),
                    },
                    {
                      Area: 'Contable', Name: 'Precierre', key: this.uuidShort(),
                    },
                  ],
                },
                {
                  Area: 'Contable', Name: 'Fiscal', key: this.uuidShort(),
                },
                {
                  Area: 'Contable', Name: 'Laboral', key: this.uuidShort(),
                },
                {
                  Area: 'Contable', Name: 'Financieros', key: this.uuidShort(),
                },
              ]

            },
            {
              Area: 'Contable', Name: 'Octubre', key: this.uuidShort(),
              children: [

                {
                  Area: 'Contable', Name: 'Contable', key: this.uuidShort(),
                  children: [
                    {
                      Area: 'Contable', Name: 'Conciliaciones', key: this.uuidShort(),
                    },
                    {
                      Area: 'Contable', Name: 'Depreciaciones', key: this.uuidShort(),
                    },
                    {
                      Area: 'Contable', Name: 'Documentación de entrega', key: this.uuidShort(),
                    },
                    {
                      Area: 'Contable', Name: 'Facturación-XML', key: this.uuidShort(),
                    },
                    {
                      Area: 'Contable', Name: 'Pólizas Contables', key: this.uuidShort(),
                    },
                    {
                      Area: 'Contable', Name: 'Precierre', key: this.uuidShort(),
                    },
                  ],
                },
                {
                  Area: 'Contable', Name: 'Fiscal', key: this.uuidShort(),
                },
                {
                  Area: 'Contable', Name: 'Laboral', key: this.uuidShort(),
                },
                {
                  Area: 'Contable', Name: 'Financieros', key: this.uuidShort(),
                },
              ]

            },
            {
              Area: 'Contable', Name: 'Noviembre', key: this.uuidShort(),
              children: [

                {
                  Area: 'Contable', Name: 'Contable', key: this.uuidShort(),
                  children: [
                    {
                      Area: 'Contable', Name: 'Conciliaciones', key: this.uuidShort(),
                    },
                    {
                      Area: 'Contable', Name: 'Depreciaciones', key: this.uuidShort(),
                    },
                    {
                      Area: 'Contable', Name: 'Documentación de entrega', key: this.uuidShort(),
                    },
                    {
                      Area: 'Contable', Name: 'Facturación-XML', key: this.uuidShort(),
                    },
                    {
                      Area: 'Contable', Name: 'Pólizas Contables', key: this.uuidShort(),
                    },
                    {
                      Area: 'Contable', Name: 'Precierre', key: this.uuidShort(),
                    },
                  ],
                },
                {
                  Area: 'Contable', Name: 'Fiscal', key: this.uuidShort(),
                },
                {
                  Area: 'Contable', Name: 'Laboral', key: this.uuidShort(),
                },
                {
                  Area: 'Contable', Name: 'Financieros', key: this.uuidShort(),
                },
              ]

            },
            {
              Area: 'Contable', Name: 'Diciembre', key: this.uuidShort(),
              children: [

                {
                  Area: 'Contable', Name: 'Contable', key: this.uuidShort(),
                  children: [
                    {
                      Area: 'Contable', Name: 'Conciliaciones', key: this.uuidShort(),
                    },
                    {
                      Area: 'Contable', Name: 'Depreciaciones', key: this.uuidShort(),
                    },
                    {
                      Area: 'Contable', Name: 'Documentación de entrega', key: this.uuidShort(),
                    },
                    {
                      Area: 'Contable', Name: 'Facturación-XML', key: this.uuidShort(),
                    },
                    {
                      Area: 'Contable', Name: 'Pólizas Contables', key: this.uuidShort(),
                    },
                    {
                      Area: 'Contable', Name: 'Precierre', key: this.uuidShort(),
                    },
                  ],
                },
                {
                  Area: 'Contable', Name: 'Fiscal', key: this.uuidShort(),
                },
                {
                  Area: 'Contable', Name: 'Laboral', key: this.uuidShort(),
                },
                {
                  Area: 'Contable', Name: 'Financieros', key: this.uuidShort(),
                },
              ]

            },
            {
              Area: 'Contable', Name: 'Anual', key: this.uuidShort(),
              children: [

                {
                  Area: 'Contable', Name: 'Contable', key: this.uuidShort(),
                  children: [
                    {
                      Area: 'Contable', Name: 'Conciliaciones', key: this.uuidShort(),
                    },
                    {
                      Area: 'Contable', Name: 'Depreciaciones', key: this.uuidShort(),
                    },
                    {
                      Area: 'Contable', Name: 'Documentación de entrega', key: this.uuidShort(),
                    },
                    {
                      Area: 'Contable', Name: 'Facturación-XML', key: this.uuidShort(),
                    },
                    {
                      Area: 'Contable', Name: 'Pólizas Contables', key: this.uuidShort(),
                    },
                    {
                      Area: 'Contable', Name: 'Precierre', key: this.uuidShort(),
                    },
                  ],
                },
                {
                  Area: 'Contable', Name: 'Fiscal', key: this.uuidShort(),
                },
                {
                  Area: 'Contable', Name: 'Laboral', key: this.uuidShort(),
                },
                {
                  Area: 'Contable', Name: 'Financieros', key: this.uuidShort(),
                },
              ]

            },
            {
              Area: 'Contable', Name: 'Papeles de trabajo', key: this.uuidShort(),
              children: [

                {
                  Area: 'Contable', Name: 'Contable', key: this.uuidShort(),
                  children: [
                    {
                      Area: 'Contable', Name: 'Conciliaciones', key: this.uuidShort(),
                    },
                    {
                      Area: 'Contable', Name: 'Depreciaciones', key: this.uuidShort(),
                    },
                    {
                      Area: 'Contable', Name: 'Documentación de entrega', key: this.uuidShort(),
                    },
                    {
                      Area: 'Contable', Name: 'Facturación-XML', key: this.uuidShort(),
                    },
                    {
                      Area: 'Contable', Name: 'Pólizas Contables', key: this.uuidShort(),
                    },
                    {
                      Area: 'Contable', Name: 'Precierre', key: this.uuidShort(),
                    },
                  ],
                },
                {
                  Area: 'Contable', Name: 'Fiscal', key: this.uuidShort(),
                },
                {
                  Area: 'Contable', Name: 'Laboral', key: this.uuidShort(),
                },
                {
                  Area: 'Contable', Name: 'Financieros', key: this.uuidShort(),
                },
              ]

            },

          ]
        },
        {
          Name: '2019', key: this.uuidShort(),
          children: [
            {
              Area: 'Contable', Name: 'Enero', key: this.uuidShort(),
              children: [

                {
                  Area: 'Contable', Name: 'CONTABLE', key: this.uuidShort(),
                  children: [
                    {
                      Area: 'Contable', Name: 'CONCILIACIONES', key: this.uuidShort(),
                    },
                    {
                      Area: 'Contable', Name: 'DEPRECIACIONES', key: this.uuidShort(),
                    },
                    {
                      Area: 'Contable', Name: 'DOCS ENTREGA', key: this.uuidShort(),
                    },
                    {
                      Area: 'Contable', Name: 'FACTURACIÓN', key: this.uuidShort(),
                    },
                    {
                      Area: 'Contable', Name: 'PÓLIZAS \nCONTABLES', key: this.uuidShort(),
                    },
                    {
                      Area: 'Contable', Name: 'PRECIERRE', key: this.uuidShort(),
                    },
                  ],
                },
                {
                  Area: 'Contable', Name: 'FISCAL', key: this.uuidShort(),
                },
                {
                  Area: 'Contable', Name: 'LABORAL', key: this.uuidShort(),
                },
                {
                  Area: 'Contable', Name: 'FINANCIEROS', key: this.uuidShort(),
                },
              ]

            },
            {
              Area: 'Contable', Name: 'Febrero', key: this.uuidShort(),
              children: [
                {
                  Area: 'Contable', Name: 'Contable', key: this.uuidShort(),
                  children: [
                    {
                      Area: 'Contable', Name: 'Conciliaciones', key: this.uuidShort(),
                    },
                    {
                      Area: 'Contable', Name: 'Depreciaciones', key: this.uuidShort(),
                    },
                    {
                      Area: 'Contable', Name: 'Documentación de entrega', key: this.uuidShort(),
                    },
                    {
                      Area: 'Contable', Name: 'Facturación-XML', key: this.uuidShort(),
                    },
                    {
                      Area: 'Contable', Name: 'Pólizas Contables', key: this.uuidShort(),
                    },
                    {
                      Area: 'Contable', Name: 'Precierre', key: this.uuidShort(),
                    },
                  ],
                },
                {
                  Area: 'Contable', Name: 'Fiscal', key: this.uuidShort(),
                },
                {
                  Area: 'Contable', Name: 'Laboral', key: this.uuidShort(),
                },
                {
                  Area: 'Contable', Name: 'Financieros', key: this.uuidShort(),
                },
              ]

            },
            {
              Area: 'Contable', Name: 'Marzo', key: this.uuidShort(),
              children: [

                {
                  Area: 'Contable', Name: 'Contable', key: this.uuidShort(),
                  children: [
                    {
                      Area: 'Contable', Name: 'Conciliaciones', key: this.uuidShort(),
                    },
                    {
                      Area: 'Contable', Name: 'Depreciaciones', key: this.uuidShort(),
                    },
                    {
                      Area: 'Contable', Name: 'Documentación de entrega', key: this.uuidShort(),
                    },
                    {
                      Area: 'Contable', Name: 'Facturación-XML', key: this.uuidShort(),
                    },
                    {
                      Area: 'Contable', Name: 'Pólizas Contables', key: this.uuidShort(),
                    },
                    {
                      Area: 'Contable', Name: 'Precierre', key: this.uuidShort(),
                    },
                  ],
                },
                {
                  Area: 'Contable', Name: 'Fiscal', key: this.uuidShort(),
                },
                {
                  Area: 'Contable', Name: 'Laboral', key: this.uuidShort(),
                },
                {
                  Area: 'Contable', Name: 'Financieros', key: this.uuidShort(),
                },
              ]

            },
            {
              Area: 'Contable', Name: 'Abril', key: this.uuidShort(),
              children: [

                {
                  Area: 'Contable', Name: 'Contable', key: this.uuidShort(),
                  children: [
                    {
                      Area: 'Contable', Name: 'Conciliaciones', key: this.uuidShort(),
                    },
                    {
                      Area: 'Contable', Name: 'Depreciaciones', key: this.uuidShort(),
                    },
                    {
                      Area: 'Contable', Name: 'Documentación de entrega', key: this.uuidShort(),
                    },
                    {
                      Area: 'Contable', Name: 'Facturación-XML', key: this.uuidShort(),
                    },
                    {
                      Area: 'Contable', Name: 'Pólizas Contables', key: this.uuidShort(),
                    },
                    {
                      Area: 'Contable', Name: 'Precierre', key: this.uuidShort(),
                    },
                  ],
                },
                {
                  Area: 'Contable', Name: 'Fiscal', key: this.uuidShort(),
                },
                {
                  Area: 'Contable', Name: 'Laboral', key: this.uuidShort(),
                },
                {
                  Area: 'Contable', Name: 'Financieros', key: this.uuidShort(),
                },
              ]

            },
            {
              Area: 'Contable', Name: 'Mayo', key: this.uuidShort(),
              children: [

                {
                  Area: 'Contable', Name: 'Contable', key: this.uuidShort(),
                  children: [
                    {
                      Area: 'Contable', Name: 'Conciliaciones', key: this.uuidShort(),
                    },
                    {
                      Area: 'Contable', Name: 'Depreciaciones', key: this.uuidShort(),
                    },
                    {
                      Area: 'Contable', Name: 'Documentación de entrega', key: this.uuidShort(),
                    },
                    {
                      Area: 'Contable', Name: 'Facturación-XML', key: this.uuidShort(),
                    },
                    {
                      Area: 'Contable', Name: 'Pólizas Contables', key: this.uuidShort(),
                    },
                    {
                      Area: 'Contable', Name: 'Precierre', key: this.uuidShort(),
                    },
                  ],
                },
                {
                  Area: 'Contable', Name: 'Fiscal', key: this.uuidShort(),
                },
                {
                  Area: 'Contable', Name: 'Laboral', key: this.uuidShort(),
                },
                {
                  Area: 'Contable', Name: 'Financieros', key: this.uuidShort(),
                },
              ]

            },
            {
              Area: 'Contable', Name: 'Junio', key: this.uuidShort(),
              children: [

                {
                  Area: 'Contable', Name: 'Contable', key: this.uuidShort(),
                  children: [
                    {
                      Area: 'Contable', Name: 'Conciliaciones', key: this.uuidShort(),
                    },
                    {
                      Area: 'Contable', Name: 'Depreciaciones', key: this.uuidShort(),
                    },
                    {
                      Area: 'Contable', Name: 'Documentación de entrega', key: this.uuidShort(),
                    },
                    {
                      Area: 'Contable', Name: 'Facturación-XML', key: this.uuidShort(),
                    },
                    {
                      Area: 'Contable', Name: 'Pólizas Contables', key: this.uuidShort(),
                    },
                    {
                      Area: 'Contable', Name: 'Precierre', key: this.uuidShort(),
                    },
                  ],
                },
                {
                  Area: 'Contable', Name: 'Fiscal', key: this.uuidShort(),
                },
                {
                  Area: 'Contable', Name: 'Laboral', key: this.uuidShort(),
                },
                {
                  Area: 'Contable', Name: 'Financieros', key: this.uuidShort(),
                },
              ]

            },
            {
              Area: 'Contable', Name: 'Julio', key: this.uuidShort(),
              children: [

                {
                  Area: 'Contable', Name: 'Contable', key: this.uuidShort(),
                  children: [
                    {
                      Area: 'Contable', Name: 'Conciliaciones', key: this.uuidShort(),
                    },
                    {
                      Area: 'Contable', Name: 'Depreciaciones', key: this.uuidShort(),
                    },
                    {
                      Area: 'Contable', Name: 'Documentación de entrega', key: this.uuidShort(),
                    },
                    {
                      Area: 'Contable', Name: 'Facturación-XML', key: this.uuidShort(),
                    },
                    {
                      Area: 'Contable', Name: 'Pólizas Contables', key: this.uuidShort(),
                    },
                    {
                      Area: 'Contable', Name: 'Precierre', key: this.uuidShort(),
                    },
                  ],
                },
                {
                  Area: 'Contable', Name: 'Fiscal', key: this.uuidShort(),
                },
                {
                  Area: 'Contable', Name: 'Laboral', key: this.uuidShort(),
                },
                {
                  Area: 'Contable', Name: 'Financieros', key: this.uuidShort(),
                },
              ]

            },
            {
              Area: 'Contable', Name: 'Agosto', key: this.uuidShort(),
              children: [

                {
                  Area: 'Contable', Name: 'Contable', key: this.uuidShort(),
                  children: [
                    {
                      Area: 'Contable', Name: 'Conciliaciones', key: this.uuidShort(),
                    },
                    {
                      Area: 'Contable', Name: 'Depreciaciones', key: this.uuidShort(),
                    },
                    {
                      Area: 'Contable', Name: 'Documentación de entrega', key: this.uuidShort(),
                    },
                    {
                      Area: 'Contable', Name: 'Facturación-XML', key: this.uuidShort(),
                    },
                    {
                      Area: 'Contable', Name: 'Pólizas Contables', key: this.uuidShort(),
                    },
                    {
                      Area: 'Contable', Name: 'Precierre', key: this.uuidShort(),
                    },
                  ],
                },
                {
                  Area: 'Contable', Name: 'Fiscal', key: this.uuidShort(),
                },
                {
                  Area: 'Contable', Name: 'Laboral', key: this.uuidShort(),
                },
                {
                  Area: 'Contable', Name: 'Financieros', key: this.uuidShort(),
                },
              ]

            },
            {
              Area: 'Contable', Name: 'Septiembre', key: this.uuidShort(),
              children: [

                {
                  Area: 'Contable', Name: 'Contable', key: this.uuidShort(),
                  children: [
                    {
                      Area: 'Contable', Name: 'Conciliaciones', key: this.uuidShort(),
                    },
                    {
                      Area: 'Contable', Name: 'Depreciaciones', key: this.uuidShort(),
                    },
                    {
                      Area: 'Contable', Name: 'Documentación de entrega', key: this.uuidShort(),
                    },
                    {
                      Area: 'Contable', Name: 'Facturación-XML', key: this.uuidShort(),
                    },
                    {
                      Area: 'Contable', Name: 'Pólizas Contables', key: this.uuidShort(),
                    },
                    {
                      Area: 'Contable', Name: 'Precierre', key: this.uuidShort(),
                    },
                  ],
                },
                {
                  Area: 'Contable', Name: 'Fiscal', key: this.uuidShort(),
                },
                {
                  Area: 'Contable', Name: 'Laboral', key: this.uuidShort(),
                },
                {
                  Area: 'Contable', Name: 'Financieros', key: this.uuidShort(),
                },
              ]

            },
            {
              Area: 'Contable', Name: 'Octubre', key: this.uuidShort(),
              children: [

                {
                  Area: 'Contable', Name: 'Contable', key: this.uuidShort(),
                  children: [
                    {
                      Area: 'Contable', Name: 'Conciliaciones', key: this.uuidShort(),
                    },
                    {
                      Area: 'Contable', Name: 'Depreciaciones', key: this.uuidShort(),
                    },
                    {
                      Area: 'Contable', Name: 'Documentación de entrega', key: this.uuidShort(),
                    },
                    {
                      Area: 'Contable', Name: 'Facturación-XML', key: this.uuidShort(),
                    },
                    {
                      Area: 'Contable', Name: 'Pólizas Contables', key: this.uuidShort(),
                    },
                    {
                      Area: 'Contable', Name: 'Precierre', key: this.uuidShort(),
                    },
                  ],
                },
                {
                  Area: 'Contable', Name: 'Fiscal', key: this.uuidShort(),
                },
                {
                  Area: 'Contable', Name: 'Laboral', key: this.uuidShort(),
                },
                {
                  Area: 'Contable', Name: 'Financieros', key: this.uuidShort(),
                },
              ]

            },
            {
              Area: 'Contable', Name: 'Noviembre', key: this.uuidShort(),
              children: [

                {
                  Area: 'Contable', Name: 'Contable', key: this.uuidShort(),
                  children: [
                    {
                      Area: 'Contable', Name: 'Conciliaciones', key: this.uuidShort(),
                    },
                    {
                      Area: 'Contable', Name: 'Depreciaciones', key: this.uuidShort(),
                    },
                    {
                      Area: 'Contable', Name: 'Documentación de entrega', key: this.uuidShort(),
                    },
                    {
                      Area: 'Contable', Name: 'Facturación-XML', key: this.uuidShort(),
                    },
                    {
                      Area: 'Contable', Name: 'Pólizas Contables', key: this.uuidShort(),
                    },
                    {
                      Area: 'Contable', Name: 'Precierre', key: this.uuidShort(),
                    },
                  ],
                },
                {
                  Area: 'Contable', Name: 'Fiscal', key: this.uuidShort(),
                },
                {
                  Area: 'Contable', Name: 'Laboral', key: this.uuidShort(),
                },
                {
                  Area: 'Contable', Name: 'Financieros', key: this.uuidShort(),
                },
              ]

            },
            {
              Area: 'Contable', Name: 'Diciembre', key: this.uuidShort(),
              children: [

                {
                  Area: 'Contable', Name: 'Contable', key: this.uuidShort(),
                  children: [
                    {
                      Area: 'Contable', Name: 'Conciliaciones', key: this.uuidShort(),
                    },
                    {
                      Area: 'Contable', Name: 'Depreciaciones', key: this.uuidShort(),
                    },
                    {
                      Area: 'Contable', Name: 'Documentación de entrega', key: this.uuidShort(),
                    },
                    {
                      Area: 'Contable', Name: 'Facturación-XML', key: this.uuidShort(),
                    },
                    {
                      Area: 'Contable', Name: 'Pólizas Contables', key: this.uuidShort(),
                    },
                    {
                      Area: 'Contable', Name: 'Precierre', key: this.uuidShort(),
                    },
                  ],
                },
                {
                  Area: 'Contable', Name: 'Fiscal', key: this.uuidShort(),
                },
                {
                  Area: 'Contable', Name: 'Laboral', key: this.uuidShort(),
                },
                {
                  Area: 'Contable', Name: 'Financieros', key: this.uuidShort(),
                },
              ]

            },
            {
              Area: 'Contable', Name: 'Anual', key: this.uuidShort(),
              children: [

                {
                  Area: 'Contable', Name: 'Contable', key: this.uuidShort(),
                  children: [
                    {
                      Area: 'Contable', Name: 'Conciliaciones', key: this.uuidShort(),
                    },
                    {
                      Area: 'Contable', Name: 'Depreciaciones', key: this.uuidShort(),
                    },
                    {
                      Area: 'Contable', Name: 'Documentación de entrega', key: this.uuidShort(),
                    },
                    {
                      Area: 'Contable', Name: 'Facturación-XML', key: this.uuidShort(),
                    },
                    {
                      Area: 'Contable', Name: 'Pólizas Contables', key: this.uuidShort(),
                    },
                    {
                      Area: 'Contable', Name: 'Precierre', key: this.uuidShort(),
                    },
                  ],
                },
                {
                  Area: 'Contable', Name: 'Fiscal', key: this.uuidShort(),
                },
                {
                  Area: 'Contable', Name: 'Laboral', key: this.uuidShort(),
                },
                {
                  Area: 'Contable', Name: 'Financieros', key: this.uuidShort(),
                },
              ]

            },
            {
              Area: 'Contable', Name: 'Papeles de trabajo', key: this.uuidShort(),
              children: [

                {
                  Area: 'Contable', Name: 'Contable', key: this.uuidShort(),
                  children: [
                    {
                      Area: 'Contable', Name: 'Conciliaciones', key: this.uuidShort(),
                    },
                    {
                      Area: 'Contable', Name: 'Depreciaciones', key: this.uuidShort(),
                    },
                    {
                      Area: 'Contable', Name: 'Documentación de entrega', key: this.uuidShort(),
                    },
                    {
                      Area: 'Contable', Name: 'Facturación-XML', key: this.uuidShort(),
                    },
                    {
                      Area: 'Contable', Name: 'Pólizas Contables', key: this.uuidShort(),
                    },
                    {
                      Area: 'Contable', Name: 'Precierre', key: this.uuidShort(),
                    },
                  ],
                },
                {
                  Area: 'Contable', Name: 'Fiscal', key: this.uuidShort(),
                },
                {
                  Area: 'Contable', Name: 'Laboral', key: this.uuidShort(),
                },
                {
                  Area: 'Contable', Name: 'Financieros', key: this.uuidShort(),
                },
              ]

            },

          ]
        },
        {
          Name: '2020', key: this.uuidShort(),
          children: [
            {
              Area: 'Contable', Name: 'Enero', key: this.uuidShort(),
              children: [

                {
                  Area: 'Contable', Name: 'CONTABLE', key: this.uuidShort(),
                  children: [
                    {
                      Area: 'Contable', Name: 'CONCILIACIONES', key: this.uuidShort(),
                    },
                    {
                      Area: 'Contable', Name: 'DEPRECIACIONES', key: this.uuidShort(),
                    },
                    {
                      Area: 'Contable', Name: 'DOCS ENTREGA', key: this.uuidShort(),
                    },
                    {
                      Area: 'Contable', Name: 'FACTURACIÓN', key: this.uuidShort(),
                    },
                    {
                      Area: 'Contable', Name: 'PÓLIZAS \nCONTABLES', key: this.uuidShort(),
                    },
                    {
                      Area: 'Contable', Name: 'PRECIERRE', key: this.uuidShort(),
                    },
                  ],
                },
                {
                  Area: 'Contable', Name: 'FISCAL', key: this.uuidShort(),
                },
                {
                  Area: 'Contable', Name: 'LABORAL', key: this.uuidShort(),
                },
                {
                  Area: 'Contable', Name: 'FINANCIEROS', key: this.uuidShort(),
                },
              ]

            },
            {
              Area: 'Contable', Name: 'Febrero', key: this.uuidShort(),
              children: [
                {
                  Area: 'Contable', Name: 'Contable', key: this.uuidShort(),
                  children: [
                    {
                      Area: 'Contable', Name: 'Conciliaciones', key: this.uuidShort(),
                    },
                    {
                      Area: 'Contable', Name: 'Depreciaciones', key: this.uuidShort(),
                    },
                    {
                      Area: 'Contable', Name: 'Documentación de entrega', key: this.uuidShort(),
                    },
                    {
                      Area: 'Contable', Name: 'Facturación-XML', key: this.uuidShort(),
                    },
                    {
                      Area: 'Contable', Name: 'Pólizas Contables', key: this.uuidShort(),
                    },
                    {
                      Area: 'Contable', Name: 'Precierre', key: this.uuidShort(),
                    },
                  ],
                },
                {
                  Area: 'Contable', Name: 'Fiscal', key: this.uuidShort(),
                },
                {
                  Area: 'Contable', Name: 'Laboral', key: this.uuidShort(),
                },
                {
                  Area: 'Contable', Name: 'Financieros', key: this.uuidShort(),
                },
              ]

            },
            {
              Area: 'Contable', Name: 'Marzo', key: this.uuidShort(),
              children: [

                {
                  Area: 'Contable', Name: 'Contable', key: this.uuidShort(),
                  children: [
                    {
                      Area: 'Contable', Name: 'Conciliaciones', key: this.uuidShort(),
                    },
                    {
                      Area: 'Contable', Name: 'Depreciaciones', key: this.uuidShort(),
                    },
                    {
                      Area: 'Contable', Name: 'Documentación de entrega', key: this.uuidShort(),
                    },
                    {
                      Area: 'Contable', Name: 'Facturación-XML', key: this.uuidShort(),
                    },
                    {
                      Area: 'Contable', Name: 'Pólizas Contables', key: this.uuidShort(),
                    },
                    {
                      Area: 'Contable', Name: 'Precierre', key: this.uuidShort(),
                    },
                  ],
                },
                {
                  Area: 'Contable', Name: 'Fiscal', key: this.uuidShort(),
                },
                {
                  Area: 'Contable', Name: 'Laboral', key: this.uuidShort(),
                },
                {
                  Area: 'Contable', Name: 'Financieros', key: this.uuidShort(),
                },
              ]

            },
            {
              Area: 'Contable', Name: 'Abril', key: this.uuidShort(),
              children: [

                {
                  Area: 'Contable', Name: 'Contable', key: this.uuidShort(),
                  children: [
                    {
                      Area: 'Contable', Name: 'Conciliaciones', key: this.uuidShort(),
                    },
                    {
                      Area: 'Contable', Name: 'Depreciaciones', key: this.uuidShort(),
                    },
                    {
                      Area: 'Contable', Name: 'Documentación de entrega', key: this.uuidShort(),
                    },
                    {
                      Area: 'Contable', Name: 'Facturación-XML', key: this.uuidShort(),
                    },
                    {
                      Area: 'Contable', Name: 'Pólizas Contables', key: this.uuidShort(),
                    },
                    {
                      Area: 'Contable', Name: 'Precierre', key: this.uuidShort(),
                    },
                  ],
                },
                {
                  Area: 'Contable', Name: 'Fiscal', key: this.uuidShort(),
                },
                {
                  Area: 'Contable', Name: 'Laboral', key: this.uuidShort(),
                },
                {
                  Area: 'Contable', Name: 'Financieros', key: this.uuidShort(),
                },
              ]

            },
            {
              Area: 'Contable', Name: 'Mayo', key: this.uuidShort(),
              children: [

                {
                  Area: 'Contable', Name: 'Contable', key: this.uuidShort(),
                  children: [
                    {
                      Area: 'Contable', Name: 'Conciliaciones', key: this.uuidShort(),
                    },
                    {
                      Area: 'Contable', Name: 'Depreciaciones', key: this.uuidShort(),
                    },
                    {
                      Area: 'Contable', Name: 'Documentación de entrega', key: this.uuidShort(),
                    },
                    {
                      Area: 'Contable', Name: 'Facturación-XML', key: this.uuidShort(),
                    },
                    {
                      Area: 'Contable', Name: 'Pólizas Contables', key: this.uuidShort(),
                    },
                    {
                      Area: 'Contable', Name: 'Precierre', key: this.uuidShort(),
                    },
                  ],
                },
                {
                  Area: 'Contable', Name: 'Fiscal', key: this.uuidShort(),
                },
                {
                  Area: 'Contable', Name: 'Laboral', key: this.uuidShort(),
                },
                {
                  Area: 'Contable', Name: 'Financieros', key: this.uuidShort(),
                },
              ]

            },
            {
              Area: 'Contable', Name: 'Junio', key: this.uuidShort(),
              children: [

                {
                  Area: 'Contable', Name: 'Contable', key: this.uuidShort(),
                  children: [
                    {
                      Area: 'Contable', Name: 'Conciliaciones', key: this.uuidShort(),
                    },
                    {
                      Area: 'Contable', Name: 'Depreciaciones', key: this.uuidShort(),
                    },
                    {
                      Area: 'Contable', Name: 'Documentación de entrega', key: this.uuidShort(),
                    },
                    {
                      Area: 'Contable', Name: 'Facturación-XML', key: this.uuidShort(),
                    },
                    {
                      Area: 'Contable', Name: 'Pólizas Contables', key: this.uuidShort(),
                    },
                    {
                      Area: 'Contable', Name: 'Precierre', key: this.uuidShort(),
                    },
                  ],
                },
                {
                  Area: 'Contable', Name: 'Fiscal', key: this.uuidShort(),
                },
                {
                  Area: 'Contable', Name: 'Laboral', key: this.uuidShort(),
                },
                {
                  Area: 'Contable', Name: 'Financieros', key: this.uuidShort(),
                },
              ]

            },
            {
              Area: 'Contable', Name: 'Julio', key: this.uuidShort(),
              children: [

                {
                  Area: 'Contable', Name: 'Contable', key: this.uuidShort(),
                  children: [
                    {
                      Area: 'Contable', Name: 'Conciliaciones', key: this.uuidShort(),
                    },
                    {
                      Area: 'Contable', Name: 'Depreciaciones', key: this.uuidShort(),
                    },
                    {
                      Area: 'Contable', Name: 'Documentación de entrega', key: this.uuidShort(),
                    },
                    {
                      Area: 'Contable', Name: 'Facturación-XML', key: this.uuidShort(),
                    },
                    {
                      Area: 'Contable', Name: 'Pólizas Contables', key: this.uuidShort(),
                    },
                    {
                      Area: 'Contable', Name: 'Precierre', key: this.uuidShort(),
                    },
                  ],
                },
                {
                  Area: 'Contable', Name: 'Fiscal', key: this.uuidShort(),
                },
                {
                  Area: 'Contable', Name: 'Laboral', key: this.uuidShort(),
                },
                {
                  Area: 'Contable', Name: 'Financieros', key: this.uuidShort(),
                },
              ]

            },
            {
              Area: 'Contable', Name: 'Agosto', key: this.uuidShort(),
              children: [

                {
                  Area: 'Contable', Name: 'Contable', key: this.uuidShort(),
                  children: [
                    {
                      Area: 'Contable', Name: 'Conciliaciones', key: this.uuidShort(),
                    },
                    {
                      Area: 'Contable', Name: 'Depreciaciones', key: this.uuidShort(),
                    },
                    {
                      Area: 'Contable', Name: 'Documentación de entrega', key: this.uuidShort(),
                    },
                    {
                      Area: 'Contable', Name: 'Facturación-XML', key: this.uuidShort(),
                    },
                    {
                      Area: 'Contable', Name: 'Pólizas Contables', key: this.uuidShort(),
                    },
                    {
                      Area: 'Contable', Name: 'Precierre', key: this.uuidShort(),
                    },
                  ],
                },
                {
                  Area: 'Contable', Name: 'Fiscal', key: this.uuidShort(),
                },
                {
                  Area: 'Contable', Name: 'Laboral', key: this.uuidShort(),
                },
                {
                  Area: 'Contable', Name: 'Financieros', key: this.uuidShort(),
                },
              ]

            },
            {
              Area: 'Contable', Name: 'Septiembre', key: this.uuidShort(),
              children: [

                {
                  Area: 'Contable', Name: 'Contable', key: this.uuidShort(),
                  children: [
                    {
                      Area: 'Contable', Name: 'Conciliaciones', key: this.uuidShort(),
                    },
                    {
                      Area: 'Contable', Name: 'Depreciaciones', key: this.uuidShort(),
                    },
                    {
                      Area: 'Contable', Name: 'Documentación de entrega', key: this.uuidShort(),
                    },
                    {
                      Area: 'Contable', Name: 'Facturación-XML', key: this.uuidShort(),
                    },
                    {
                      Area: 'Contable', Name: 'Pólizas Contables', key: this.uuidShort(),
                    },
                    {
                      Area: 'Contable', Name: 'Precierre', key: this.uuidShort(),
                    },
                  ],
                },
                {
                  Area: 'Contable', Name: 'Fiscal', key: this.uuidShort(),
                },
                {
                  Area: 'Contable', Name: 'Laboral', key: this.uuidShort(),
                },
                {
                  Area: 'Contable', Name: 'Financieros', key: this.uuidShort(),
                },
              ]

            },
            {
              Area: 'Contable', Name: 'Octubre', key: this.uuidShort(),
              children: [

                {
                  Area: 'Contable', Name: 'Contable', key: this.uuidShort(),
                  children: [
                    {
                      Area: 'Contable', Name: 'Conciliaciones', key: this.uuidShort(),
                    },
                    {
                      Area: 'Contable', Name: 'Depreciaciones', key: this.uuidShort(),
                    },
                    {
                      Area: 'Contable', Name: 'Documentación de entrega', key: this.uuidShort(),
                    },
                    {
                      Area: 'Contable', Name: 'Facturación-XML', key: this.uuidShort(),
                    },
                    {
                      Area: 'Contable', Name: 'Pólizas Contables', key: this.uuidShort(),
                    },
                    {
                      Area: 'Contable', Name: 'Precierre', key: this.uuidShort(),
                    },
                  ],
                },
                {
                  Area: 'Contable', Name: 'Fiscal', key: this.uuidShort(),
                },
                {
                  Area: 'Contable', Name: 'Laboral', key: this.uuidShort(),
                },
                {
                  Area: 'Contable', Name: 'Financieros', key: this.uuidShort(),
                },
              ]

            },
            {
              Area: 'Contable', Name: 'Noviembre', key: this.uuidShort(),
              children: [

                {
                  Area: 'Contable', Name: 'Contable', key: this.uuidShort(),
                  children: [
                    {
                      Area: 'Contable', Name: 'Conciliaciones', key: this.uuidShort(),
                    },
                    {
                      Area: 'Contable', Name: 'Depreciaciones', key: this.uuidShort(),
                    },
                    {
                      Area: 'Contable', Name: 'Documentación de entrega', key: this.uuidShort(),
                    },
                    {
                      Area: 'Contable', Name: 'Facturación-XML', key: this.uuidShort(),
                    },
                    {
                      Area: 'Contable', Name: 'Pólizas Contables', key: this.uuidShort(),
                    },
                    {
                      Area: 'Contable', Name: 'Precierre', key: this.uuidShort(),
                    },
                  ],
                },
                {
                  Area: 'Contable', Name: 'Fiscal', key: this.uuidShort(),
                },
                {
                  Area: 'Contable', Name: 'Laboral', key: this.uuidShort(),
                },
                {
                  Area: 'Contable', Name: 'Financieros', key: this.uuidShort(),
                },
              ]

            },
            {
              Area: 'Contable', Name: 'Diciembre', key: this.uuidShort(),
              children: [

                {
                  Area: 'Contable', Name: 'Contable', key: this.uuidShort(),
                  children: [
                    {
                      Area: 'Contable', Name: 'Conciliaciones', key: this.uuidShort(),
                    },
                    {
                      Area: 'Contable', Name: 'Depreciaciones', key: this.uuidShort(),
                    },
                    {
                      Area: 'Contable', Name: 'Documentación de entrega', key: this.uuidShort(),
                    },
                    {
                      Area: 'Contable', Name: 'Facturación-XML', key: this.uuidShort(),
                    },
                    {
                      Area: 'Contable', Name: 'Pólizas Contables', key: this.uuidShort(),
                    },
                    {
                      Area: 'Contable', Name: 'Precierre', key: this.uuidShort(),
                    },
                  ],
                },
                {
                  Area: 'Contable', Name: 'Fiscal', key: this.uuidShort(),
                },
                {
                  Area: 'Contable', Name: 'Laboral', key: this.uuidShort(),
                },
                {
                  Area: 'Contable', Name: 'Financieros', key: this.uuidShort(),
                },
              ]

            },
            {
              Area: 'Contable', Name: 'Anual', key: this.uuidShort(),
              children: [

                {
                  Area: 'Contable', Name: 'Contable', key: this.uuidShort(),
                  children: [
                    {
                      Area: 'Contable', Name: 'Conciliaciones', key: this.uuidShort(),
                    },
                    {
                      Area: 'Contable', Name: 'Depreciaciones', key: this.uuidShort(),
                    },
                    {
                      Area: 'Contable', Name: 'Documentación de entrega', key: this.uuidShort(),
                    },
                    {
                      Area: 'Contable', Name: 'Facturación-XML', key: this.uuidShort(),
                    },
                    {
                      Area: 'Contable', Name: 'Pólizas Contables', key: this.uuidShort(),
                    },
                    {
                      Area: 'Contable', Name: 'Precierre', key: this.uuidShort(),
                    },
                  ],
                },
                {
                  Area: 'Contable', Name: 'Fiscal', key: this.uuidShort(),
                },
                {
                  Area: 'Contable', Name: 'Laboral', key: this.uuidShort(),
                },
                {
                  Area: 'Contable', Name: 'Financieros', key: this.uuidShort(),
                },
              ]

            },
            {
              Area: 'Contable', Name: 'Papeles de trabajo', key: this.uuidShort(),
              children: [

                {
                  Area: 'Contable', Name: 'Contable', key: this.uuidShort(),
                  children: [
                    {
                      Area: 'Contable', Name: 'Conciliaciones', key: this.uuidShort(),
                    },
                    {
                      Area: 'Contable', Name: 'Depreciaciones', key: this.uuidShort(),
                    },
                    {
                      Area: 'Contable', Name: 'Documentación de entrega', key: this.uuidShort(),
                    },
                    {
                      Area: 'Contable', Name: 'Facturación-XML', key: this.uuidShort(),
                    },
                    {
                      Area: 'Contable', Name: 'Pólizas Contables', key: this.uuidShort(),
                    },
                    {
                      Area: 'Contable', Name: 'Precierre', key: this.uuidShort(),
                    },
                  ],
                },
                {
                  Area: 'Contable', Name: 'Fiscal', key: this.uuidShort(),
                },
                {
                  Area: 'Contable', Name: 'Laboral', key: this.uuidShort(),
                },
                {
                  Area: 'Contable', Name: 'Financieros', key: this.uuidShort(),
                },
              ]

            },

          ]
        },
        {
          Name: '2021', key: this.uuidShort(),
          children: [
            {
              Area: 'Contable', Name: 'Enero', key: this.uuidShort(),
              children: [

                {
                  Area: 'Contable', Name: 'CONTABLE', key: this.uuidShort(),
                  children: [
                    {
                      Area: 'Contable', Name: 'CONCILIACIONES', key: this.uuidShort(),
                    },
                    {
                      Area: 'Contable', Name: 'DEPRECIACIONES', key: this.uuidShort(),
                    },
                    {
                      Area: 'Contable', Name: 'DOCS ENTREGA', key: this.uuidShort(),
                    },
                    {
                      Area: 'Contable', Name: 'FACTURACIÓN', key: this.uuidShort(),
                    },
                    {
                      Area: 'Contable', Name: 'PÓLIZAS \nCONTABLES', key: this.uuidShort(),
                    },
                    {
                      Area: 'Contable', Name: 'PRECIERRE', key: this.uuidShort(),
                    },
                  ],
                },
                {
                  Area: 'Contable', Name: 'FISCAL', key: this.uuidShort(),
                },
                {
                  Area: 'Contable', Name: 'LABORAL', key: this.uuidShort(),
                },
                {
                  Area: 'Contable', Name: 'FINANCIEROS', key: this.uuidShort(),
                },
              ]

            },
            {
              Area: 'Contable', Name: 'Febrero', key: this.uuidShort(),
              children: [
                {
                  Area: 'Contable', Name: 'Contable', key: this.uuidShort(),
                  children: [
                    {
                      Area: 'Contable', Name: 'Conciliaciones', key: this.uuidShort(),
                    },
                    {
                      Area: 'Contable', Name: 'Depreciaciones', key: this.uuidShort(),
                    },
                    {
                      Area: 'Contable', Name: 'Documentación de entrega', key: this.uuidShort(),
                    },
                    {
                      Area: 'Contable', Name: 'Facturación-XML', key: this.uuidShort(),
                    },
                    {
                      Area: 'Contable', Name: 'Pólizas Contables', key: this.uuidShort(),
                    },
                    {
                      Area: 'Contable', Name: 'Precierre', key: this.uuidShort(),
                    },
                  ],
                },
                {
                  Area: 'Contable', Name: 'Fiscal', key: this.uuidShort(),
                },
                {
                  Area: 'Contable', Name: 'Laboral', key: this.uuidShort(),
                },
                {
                  Area: 'Contable', Name: 'Financieros', key: this.uuidShort(),
                },
              ]

            },
            {
              Area: 'Contable', Name: 'Marzo', key: this.uuidShort(),
              children: [

                {
                  Area: 'Contable', Name: 'Contable', key: this.uuidShort(),
                  children: [
                    {
                      Area: 'Contable', Name: 'Conciliaciones', key: this.uuidShort(),
                    },
                    {
                      Area: 'Contable', Name: 'Depreciaciones', key: this.uuidShort(),
                    },
                    {
                      Area: 'Contable', Name: 'Documentación de entrega', key: this.uuidShort(),
                    },
                    {
                      Area: 'Contable', Name: 'Facturación-XML', key: this.uuidShort(),
                    },
                    {
                      Area: 'Contable', Name: 'Pólizas Contables', key: this.uuidShort(),
                    },
                    {
                      Area: 'Contable', Name: 'Precierre', key: this.uuidShort(),
                    },
                  ],
                },
                {
                  Area: 'Contable', Name: 'Fiscal', key: this.uuidShort(),
                },
                {
                  Area: 'Contable', Name: 'Laboral', key: this.uuidShort(),
                },
                {
                  Area: 'Contable', Name: 'Financieros', key: this.uuidShort(),
                },
              ]

            },
            {
              Area: 'Contable', Name: 'Abril', key: this.uuidShort(),
              children: [

                {
                  Area: 'Contable', Name: 'Contable', key: this.uuidShort(),
                  children: [
                    {
                      Area: 'Contable', Name: 'Conciliaciones', key: this.uuidShort(),
                    },
                    {
                      Area: 'Contable', Name: 'Depreciaciones', key: this.uuidShort(),
                    },
                    {
                      Area: 'Contable', Name: 'Documentación de entrega', key: this.uuidShort(),
                    },
                    {
                      Area: 'Contable', Name: 'Facturación-XML', key: this.uuidShort(),
                    },
                    {
                      Area: 'Contable', Name: 'Pólizas Contables', key: this.uuidShort(),
                    },
                    {
                      Area: 'Contable', Name: 'Precierre', key: this.uuidShort(),
                    },
                  ],
                },
                {
                  Area: 'Contable', Name: 'Fiscal', key: this.uuidShort(),
                },
                {
                  Area: 'Contable', Name: 'Laboral', key: this.uuidShort(),
                },
                {
                  Area: 'Contable', Name: 'Financieros', key: this.uuidShort(),
                },
              ]

            },
            {
              Area: 'Contable', Name: 'Mayo', key: this.uuidShort(),
              children: [

                {
                  Area: 'Contable', Name: 'Contable', key: this.uuidShort(),
                  children: [
                    {
                      Area: 'Contable', Name: 'Conciliaciones', key: this.uuidShort(),
                    },
                    {
                      Area: 'Contable', Name: 'Depreciaciones', key: this.uuidShort(),
                    },
                    {
                      Area: 'Contable', Name: 'Documentación de entrega', key: this.uuidShort(),
                    },
                    {
                      Area: 'Contable', Name: 'Facturación-XML', key: this.uuidShort(),
                    },
                    {
                      Area: 'Contable', Name: 'Pólizas Contables', key: this.uuidShort(),
                    },
                    {
                      Area: 'Contable', Name: 'Precierre', key: this.uuidShort(),
                    },
                  ],
                },
                {
                  Area: 'Contable', Name: 'Fiscal', key: this.uuidShort(),
                },
                {
                  Area: 'Contable', Name: 'Laboral', key: this.uuidShort(),
                },
                {
                  Area: 'Contable', Name: 'Financieros', key: this.uuidShort(),
                },
              ]

            },
            {
              Area: 'Contable', Name: 'Junio', key: this.uuidShort(),
              children: [

                {
                  Area: 'Contable', Name: 'Contable', key: this.uuidShort(),
                  children: [
                    {
                      Area: 'Contable', Name: 'Conciliaciones', key: this.uuidShort(),
                    },
                    {
                      Area: 'Contable', Name: 'Depreciaciones', key: this.uuidShort(),
                    },
                    {
                      Area: 'Contable', Name: 'Documentación de entrega', key: this.uuidShort(),
                    },
                    {
                      Area: 'Contable', Name: 'Facturación-XML', key: this.uuidShort(),
                    },
                    {
                      Area: 'Contable', Name: 'Pólizas Contables', key: this.uuidShort(),
                    },
                    {
                      Area: 'Contable', Name: 'Precierre', key: this.uuidShort(),
                    },
                  ],
                },
                {
                  Area: 'Contable', Name: 'Fiscal', key: this.uuidShort(),
                },
                {
                  Area: 'Contable', Name: 'Laboral', key: this.uuidShort(),
                },
                {
                  Area: 'Contable', Name: 'Financieros', key: this.uuidShort(),
                },
              ]

            },
            {
              Area: 'Contable', Name: 'Julio', key: this.uuidShort(),
              children: [

                {
                  Area: 'Contable', Name: 'Contable', key: this.uuidShort(),
                  children: [
                    {
                      Area: 'Contable', Name: 'Conciliaciones', key: this.uuidShort(),
                    },
                    {
                      Area: 'Contable', Name: 'Depreciaciones', key: this.uuidShort(),
                    },
                    {
                      Area: 'Contable', Name: 'Documentación de entrega', key: this.uuidShort(),
                    },
                    {
                      Area: 'Contable', Name: 'Facturación-XML', key: this.uuidShort(),
                    },
                    {
                      Area: 'Contable', Name: 'Pólizas Contables', key: this.uuidShort(),
                    },
                    {
                      Area: 'Contable', Name: 'Precierre', key: this.uuidShort(),
                    },
                  ],
                },
                {
                  Area: 'Contable', Name: 'Fiscal', key: this.uuidShort(),
                },
                {
                  Area: 'Contable', Name: 'Laboral', key: this.uuidShort(),
                },
                {
                  Area: 'Contable', Name: 'Financieros', key: this.uuidShort(),
                },
              ]

            },
            {
              Area: 'Contable', Name: 'Agosto', key: this.uuidShort(),
              children: [

                {
                  Area: 'Contable', Name: 'Contable', key: this.uuidShort(),
                  children: [
                    {
                      Area: 'Contable', Name: 'Conciliaciones', key: this.uuidShort(),
                    },
                    {
                      Area: 'Contable', Name: 'Depreciaciones', key: this.uuidShort(),
                    },
                    {
                      Area: 'Contable', Name: 'Documentación de entrega', key: this.uuidShort(),
                    },
                    {
                      Area: 'Contable', Name: 'Facturación-XML', key: this.uuidShort(),
                    },
                    {
                      Area: 'Contable', Name: 'Pólizas Contables', key: this.uuidShort(),
                    },
                    {
                      Area: 'Contable', Name: 'Precierre', key: this.uuidShort(),
                    },
                  ],
                },
                {
                  Area: 'Contable', Name: 'Fiscal', key: this.uuidShort(),
                },
                {
                  Area: 'Contable', Name: 'Laboral', key: this.uuidShort(),
                },
                {
                  Area: 'Contable', Name: 'Financieros', key: this.uuidShort(),
                },
              ]

            },
            {
              Area: 'Contable', Name: 'Septiembre', key: this.uuidShort(),
              children: [

                {
                  Area: 'Contable', Name: 'Contable', key: this.uuidShort(),
                  children: [
                    {
                      Area: 'Contable', Name: 'Conciliaciones', key: this.uuidShort(),
                    },
                    {
                      Area: 'Contable', Name: 'Depreciaciones', key: this.uuidShort(),
                    },
                    {
                      Area: 'Contable', Name: 'Documentación de entrega', key: this.uuidShort(),
                    },
                    {
                      Area: 'Contable', Name: 'Facturación-XML', key: this.uuidShort(),
                    },
                    {
                      Area: 'Contable', Name: 'Pólizas Contables', key: this.uuidShort(),
                    },
                    {
                      Area: 'Contable', Name: 'Precierre', key: this.uuidShort(),
                    },
                  ],
                },
                {
                  Area: 'Contable', Name: 'Fiscal', key: this.uuidShort(),
                },
                {
                  Area: 'Contable', Name: 'Laboral', key: this.uuidShort(),
                },
                {
                  Area: 'Contable', Name: 'Financieros', key: this.uuidShort(),
                },
              ]

            },
            {
              Area: 'Contable', Name: 'Octubre', key: this.uuidShort(),
              children: [

                {
                  Area: 'Contable', Name: 'Contable', key: this.uuidShort(),
                  children: [
                    {
                      Area: 'Contable', Name: 'Conciliaciones', key: this.uuidShort(),
                    },
                    {
                      Area: 'Contable', Name: 'Depreciaciones', key: this.uuidShort(),
                    },
                    {
                      Area: 'Contable', Name: 'Documentación de entrega', key: this.uuidShort(),
                    },
                    {
                      Area: 'Contable', Name: 'Facturación-XML', key: this.uuidShort(),
                    },
                    {
                      Area: 'Contable', Name: 'Pólizas Contables', key: this.uuidShort(),
                    },
                    {
                      Area: 'Contable', Name: 'Precierre', key: this.uuidShort(),
                    },
                  ],
                },
                {
                  Area: 'Contable', Name: 'Fiscal', key: this.uuidShort(),
                },
                {
                  Area: 'Contable', Name: 'Laboral', key: this.uuidShort(),
                },
                {
                  Area: 'Contable', Name: 'Financieros', key: this.uuidShort(),
                },
              ]

            },
            {
              Area: 'Contable', Name: 'Noviembre', key: this.uuidShort(),
              children: [

                {
                  Area: 'Contable', Name: 'Contable', key: this.uuidShort(),
                  children: [
                    {
                      Area: 'Contable', Name: 'Conciliaciones', key: this.uuidShort(),
                    },
                    {
                      Area: 'Contable', Name: 'Depreciaciones', key: this.uuidShort(),
                    },
                    {
                      Area: 'Contable', Name: 'Documentación de entrega', key: this.uuidShort(),
                    },
                    {
                      Area: 'Contable', Name: 'Facturación-XML', key: this.uuidShort(),
                    },
                    {
                      Area: 'Contable', Name: 'Pólizas Contables', key: this.uuidShort(),
                    },
                    {
                      Area: 'Contable', Name: 'Precierre', key: this.uuidShort(),
                    },
                  ],
                },
                {
                  Area: 'Contable', Name: 'Fiscal', key: this.uuidShort(),
                },
                {
                  Area: 'Contable', Name: 'Laboral', key: this.uuidShort(),
                },
                {
                  Area: 'Contable', Name: 'Financieros', key: this.uuidShort(),
                },
              ]

            },
            {
              Area: 'Contable', Name: 'Diciembre', key: this.uuidShort(),
              children: [

                {
                  Area: 'Contable', Name: 'Contable', key: this.uuidShort(),
                  children: [
                    {
                      Area: 'Contable', Name: 'Conciliaciones', key: this.uuidShort(),
                    },
                    {
                      Area: 'Contable', Name: 'Depreciaciones', key: this.uuidShort(),
                    },
                    {
                      Area: 'Contable', Name: 'Documentación de entrega', key: this.uuidShort(),
                    },
                    {
                      Area: 'Contable', Name: 'Facturación-XML', key: this.uuidShort(),
                    },
                    {
                      Area: 'Contable', Name: 'Pólizas Contables', key: this.uuidShort(),
                    },
                    {
                      Area: 'Contable', Name: 'Precierre', key: this.uuidShort(),
                    },
                  ],
                },
                {
                  Area: 'Contable', Name: 'Fiscal', key: this.uuidShort(),
                },
                {
                  Area: 'Contable', Name: 'Laboral', key: this.uuidShort(),
                },
                {
                  Area: 'Contable', Name: 'Financieros', key: this.uuidShort(),
                },
              ]

            },
            {
              Area: 'Contable', Name: 'Anual', key: this.uuidShort(),
              children: [

                {
                  Area: 'Contable', Name: 'Contable', key: this.uuidShort(),
                  children: [
                    {
                      Area: 'Contable', Name: 'Conciliaciones', key: this.uuidShort(),
                    },
                    {
                      Area: 'Contable', Name: 'Depreciaciones', key: this.uuidShort(),
                    },
                    {
                      Area: 'Contable', Name: 'Documentación de entrega', key: this.uuidShort(),
                    },
                    {
                      Area: 'Contable', Name: 'Facturación-XML', key: this.uuidShort(),
                    },
                    {
                      Area: 'Contable', Name: 'Pólizas Contables', key: this.uuidShort(),
                    },
                    {
                      Area: 'Contable', Name: 'Precierre', key: this.uuidShort(),
                    },
                  ],
                },
                {
                  Area: 'Contable', Name: 'Fiscal', key: this.uuidShort(),
                },
                {
                  Area: 'Contable', Name: 'Laboral', key: this.uuidShort(),
                },
                {
                  Area: 'Contable', Name: 'Financieros', key: this.uuidShort(),
                },
              ]

            },
            {
              Area: 'Contable', Name: 'Papeles de trabajo', key: this.uuidShort(),
              children: [

                {
                  Area: 'Contable', Name: 'Contable', key: this.uuidShort(),
                  children: [
                    {
                      Area: 'Contable', Name: 'Conciliaciones', key: this.uuidShort(),
                    },
                    {
                      Area: 'Contable', Name: 'Depreciaciones', key: this.uuidShort(),
                    },
                    {
                      Area: 'Contable', Name: 'Documentación de entrega', key: this.uuidShort(),
                    },
                    {
                      Area: 'Contable', Name: 'Facturación-XML', key: this.uuidShort(),
                    },
                    {
                      Area: 'Contable', Name: 'Pólizas Contables', key: this.uuidShort(),
                    },
                    {
                      Area: 'Contable', Name: 'Precierre', key: this.uuidShort(),
                    },
                  ],
                },
                {
                  Area: 'Contable', Name: 'Fiscal', key: this.uuidShort(),
                },
                {
                  Area: 'Contable', Name: 'Laboral', key: this.uuidShort(),
                },
                {
                  Area: 'Contable', Name: 'Financieros', key: this.uuidShort(),
                },
              ]

            },

          ]
        },
        {
          Name: 'DOCUMENTOS', key: this.uuidShort(),
        },
        {
          Name: 'FIEL', key: this.uuidShort(),
        },
        {
          Name: 'IDSE', key: this.uuidShort(),
        },
        {
          Name: 'RELACIÓN DE ENTREGA', key: this.uuidShort(),
        },
        {
          Name: 'SELLO DIGITAL', key: this.uuidShort(),
        },
        {
          Name: 'TRAMITES-LEGAL', key: this.uuidShort(),
        },
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
    let adv = 0, J = 0;
    if (rowData.children) {
      rowData.children.forEach((i, j) => {
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
          {rowData.Advent ? rowData.Advent + ' %'
            :
            Number.isNaN(adv / J) ? '' : (adv / J) + ' %'}
        </Heading>
      </React.Fragment>
    );
  }

  dateBodyTemplate = (rowData) => {
    console.log(rowData)
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
            rowData.Date ? rowData.Date.toLocaleString('es-MX', { year: 'numeric', month: 'numeric', day: 'numeric' }) : ''

          }
        </Heading>
      </React.Fragment>
    );
  }

  statusBodyTemplate = (rowData) => {
    return (
      <React.Fragment>
        {rowData.Status ? <Button
          appearance="primary"
          className={"status" + rowData.Status + " statusDisp"}
          icon={<Icon icon="upload2" />}
          size="lg"
          placement="right"
          disabled={true}
        >
          {this.status(rowData.Status)}
        </Button> : <span></span>}
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
        {rowData._id ? <IconButton
          appearance="ghost"
          className={"ghost edit"}
          icon={<Icon icon="ellipsis-h" />}
          size="lg"
          circle
          onClick={() => {
            this.setState({ selectedEditRow: rowData }, () => {
              console.log(this.state.selectedEditRow)
              this.onClick('displayPosition', 'left', 'arrayRtpUsr', 'usrRtpList');
            });
          }
          }
        /> : <span></span>}
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

  newBodyTableone = (rowData) => {
    return (
      <React.Fragment>
        <Box direction="row">
          <Box>
            <button className="right-arrow-button"
              type="button" onClick={() => {
                this.state.new.subtask.push({ name: '', status: '', _id: this.uuidShort() });
                this.setState({ does: 'Nothing' });
              }}>
              <ArrowCircleRight size={35} />
            </button>
          </Box>
        </Box>
      </React.Fragment>
    )
  }

  newBodyTabletwo = (rowData) => {
    return (
      <React.Fragment>
        <Box margin='10px' className="editTareaBox">
          <Box className="boxText" style={{ width: '100%' }}>
            <Input className="editTareaInput" placeholder="Nombre de Subtarea"
              value={rowData.Name} onChange={e => {
                this.state.new.subtask.filter(S => S._id == rowData._id)[0].name = e
                this.setState({ does: 'Nothing' });
              }} />
          </Box>
        </Box>
      </React.Fragment>
    )
  }

  newBodytabletree(rowData) {
    let status = [
      {
        "label": "Incompleta",
        "value": "0",
        "role": "Master"
      }, {
        "label": "Pendiente",
        "value": "1",
        "role": "Master"
      }, {
        "label": "Completa",
        "value": "2",
        "role": "Master"
      }
    ]
    return (
      <React.Fragment><Box direction='row'>
        <SelectPicker
          appearance="default"
          placeholder="Selecciona Estatus"
          data={status} searchable={false}
          onChange={e => {
            this.state.new.subtask.filter(S => S._id == rowData._id)[0].status = e
            this.setState({ Does: 'nothing' })
          }}
          style={{ width: 200, marginTop: '13px' }}
          renderMenuItem={(label, item) => {
            return (
              <div style={{ padding: '10px' }}>
                {label}
              </div>
            );
          }}
        />
      </Box>
        {/*<button className="docButton" type="button"></button>
              <Box className="boxTextagregar">
              <p>Agregar</p>
              </Box>*/}
      </React.Fragment>
    )
  }

  newBodytablefour = (rowData) => {
    let data = [
      {
        "label": "Baja",
        "value": "0",
        "role": "Master"
      }, {
        "label": "Media",
        "value": "1",
        "role": "Master"
      }, {
        "label": "Alta",
        "value": "2",
        "role": "Master"
      }
    ]
    return (
      <React.Fragment>
        <Box margin='10px' className="editTareaBox">
          <SelectPicker data={data} style={{ width: 224 }}
            searchable={false}
            onChange={e => {
              //
            }}
            renderMenuItem={(label, item) => {
              return (
                <div className={'selectLabel' + label}>
                  {label}
                </div>
              );
            }} />
        </Box>
      </React.Fragment>
    )
  }

  bodyTableone = (rowData) => {
    return (
      <React.Fragment>
        <Box direction="row">
          <Box>
            <IconButton icon={<Icon icon='arrow-circle-right' />}
              size='lg' onClick={() => {
                this.state.clientsList.filter(S => S.Name == this.state.selectedEditRow.domain)[0]
                  .children.filter(S => S.Name == this.state.selectedEditRow.Area)[0]
                  .children.filter(S => S.Name == rowData.Area)[0].children.push({
                    Area: rowData.Area, Name: '', Priori: '0', Advent: 0,
                    domain: this.state.selectedEditRow.domain,
                    Date: new Date(), Status: 2, Files: [''], key: this.uuidShort(),
                  })
                this.setState({ Does: 'nothing' })
              }} />
          </Box>
          <Box margin='10px' className="editTareaBox">
            <Input className="editTareaInput" placeholder="Nombre de Tarea"
              value={rowData.Name} onChange={e => {
                console.log(rowData)
                rowData.Name = e
                console.log(
                  this.state.clientsList.filter(S => S.Name == this.state.selectedEditRow.domain)[0]
                    .children.filter(S => S.Name == this.state.selectedEditRow.Area)[0]
                    .children.filter(S => S.Name == rowData.Area)[0]
                    .children.filter(S => S.key == rowData.key)[0]
                );
                this.state.clientsList.filter(S => S.Name == this.state.selectedEditRow.domain)[0]
                  .children.filter(S => S.Name == this.state.selectedEditRow.Area)[0]
                  .children.filter(S => S.Name == rowData.Area)[0]
                  .children.filter(S => S.key == rowData.key)[0].name = e
                this.setState({ Does: 'nothing' })
              }} />
            {/*<Header level='4' style={{ textAlign: 'center', position: 'absolute', }}>{rowData.Name}</Header>*/}
          </Box>
        </Box>
      </React.Fragment>
    )
  }

  bodyTabletwo = (rowData) => {
    return (
      <React.Fragment>
        <Box margin='10px' className="editTareaBox">
          <Button
            appearance="primary"
            className={"status" + rowData.Status + " statusDisp"}
            style={{ width: '100%', }}
            icon={<Icon icon="upload2" />}
            size="lg"
            placement="right"
            disabled={true}
          >
            {this.status(rowData.Status)}
          </Button>
        </Box>
      </React.Fragment>
    )
  }

  bodytabletree(rowData) {
    return (
      <React.Fragment><Box direction='row'>
        <IconButton border-radiuius='50%' icon={<Icon icon='file-o' />} style={{ background: '#07AE4A' }} circle />
        <Heading direction='row' margin='10px' level='4' color='#00AB9B'>Ver
        </Heading>
      </Box>
      </React.Fragment>
    )
  }

  bodytablefour = (rowData) => {
    let data = [
      {
        "label": "Baja",
        "value": "0",
        "role": "Master"
      }, {
        "label": "Media",
        "value": "1",
        "role": "Master"
      }, {
        "label": "Alta",
        "value": "2",
        "role": "Master"
      }
    ]
    return (
      <React.Fragment>
        <Box margin='10px' className="editTareaBox">
          {/*<Button
            appearance="primary"
            className={"priori" + rowData.Priori + " priorityDisp"}
            icon={<Icon icon="upload2" />}
            size="lg"
            placement="right"
            disabled={true}
          >
            {this.priori(rowData.Priori)}
          </Button>*/}
          <SelectPicker data={data} style={{ width: 224 }}
            searchable={false}
            onChange={e => {
              console.log(e)
              this.state.clientsList.filter(S => S.Name == this.state.selectedEditRow.domain)[0]
                .children.filter(S => S.Name == this.state.selectedEditRow.Area)[0]
                .children.filter(S => S.Name == rowData.Area)[0]
                .children.filter(S => S.key == rowData.key)[0].Priori = e
              this.setState({ Does: 'nothing' })
            }}
            renderMenuItem={(label, item) => {
              return (
                <div className={'selectLabel' + label}>
                  {label}
                </div>
              );
            }} />
        </Box>
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

              <Box direction='row' className='gruopButt' style={{ top: '55px', right: '15px', color: '#084D68' }}>
                <Box>
                  <Text>
                    {this.state.usr.Name.First + ' ' + this.state.usr.Name.Last + ' / Equipo ' + (this.state.usr.Team ? this.state.usr.Team : this.state.usr.team) + ' / ' + (this.state.usr.Role ? this.state.usr.Role : this.state.usr.role)}
                  </Text>
                </Box>
              </Box>
              <Box direction='row' className='gruopButt' style={{ top: '90px', right: '10px', color: 'black' }}>
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
                      Estatus:55%
                </Button>

                  <IntlProvider locale={esES}>
                    <DatePicker 
                      className="topDate"
                      appearance="primary"
                      size="sm"
                      placement="bottomEnd"
                      value={this.state.value}
                      onChange={this.handleChange}
                      appearance = "subtle" 
                      style={{ width: "auto", height: 42}}
                      format="MM/YYYY"
                    ></DatePicker>
                  </IntlProvider>

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
            {/*DIS ONE*/}
            <Dialog
              header="Agregar Nueva Tarea"
              visible={this.state.displayadd}
              position={this.state.position}
              modal
              style={{ width: '55vw' }}
              onHide={() => this.onHide('displayadd')}
              dismissableMask={true}
            >
              <Grid
                className="grid"
                rows={['xxsmall', 'xxsmall', 'xxsmall', '30vh', 'xsmall', 'xsmall']}
                columns={['auto', 'auto', 'auto']}
                gap="xsmall"
                areas={[
                  { name: 'priority', start: [0, 0], end: [0, 0] },
                  { name: 'name', start: [0, 1], end: [1, 1] },
                  { name: 'selectStat1', start: [2, 1], end: [2, 1] },
                  { name: 'selectCat', start: [0, 2], end: [0, 2] },
                  { name: 'selectClient', start: [1, 2], end: [1, 2] },
                  { name: 'addSub', start: [0, 3], end: [2, 3] },
                  { name: 'selectDate1', start: [0, 4], end: [0, 4] },
                  { name: 'selectDate2', start: [1, 4], end: [1, 4] },
                  { name: 'saveRemove', start: [2, 5], end: [2, 5] },

                ]}
              >
                <Box direction='row' gridArea="priority" className="box">
                  <SelectPicker
                    appearance="default"
                    placeholder="Prioridad"
                    data={this.data} searchable={false}
                    onChange={e => {
                      this.state.new.priori = e;
                      this.setState({ Does: 'nothing' })
                    }}
                    style={{ width: 130 }}
                    renderMenuItem={(label, item) => {
                      return (
                        <div className={'selectLabel' + label}>
                          {label}
                        </div>
                      );
                    }}
                  />
                </Box>

                <Box direction='row' gridArea="name" className="box">
                  <Input className="editTareaInput" placeholder="Nombre de Tarea"
                    value={this.state.new.name} onChange={e => {
                      this.state.new.name = e;
                      this.setState({ does: 'Nothing' });
                    }} />
                </Box>

                <Box direction='row' gridArea="selectStat1" className="box">
                  <SelectPicker
                    appearance="default"
                    placeholder="Selecciona Estatus"
                    data={this.statusData} searchable={false}
                    onChange={e => {
                      this.state.new.status = e;
                      this.setState({ Does: 'nothing' })
                    }}
                    style={{ width: 200 }}
                    renderMenuItem={(label, item) => {
                      return (
                        <div style={{ padding: '10px' }}>
                          {label}
                        </div>
                      );
                    }}
                  />
                </Box>

                <Box direction='row' gridArea="selectCat" className="box">
                  <SelectPicker
                    appearance="default"
                    placeholder="Selecciona Categoría"
                    data={this.category} searchable={false}
                    onChange={e => {
                      this.state.new.cat = e;
                      this.setState({ Does: 'nothing' })
                    }}
                    style={{ width: 220 }}
                    renderMenuItem={(label, item) => {
                      return (
                        <div style={{ padding: '10px' }}>
                          {label}
                        </div>
                      );
                    }}
                  />
                </Box>

                <Box direction='row' gridArea="addSub" className="box" width='100%'>
                  <DataTable value={this.state.new.subtask} >
                    <Column style={{ width: '10%' }} body={this.newBodyTableone} />
                    <Column body={this.newBodyTabletwo} />
                    <Column style={{ width: '35%' }} body={this.newBodytabletree} />
                  </DataTable>

                </Box>

                {/*<Box gridArea="selectDate1" className="box">
                  <Box className="datebox">
                    <p>Selecciona una fecha de inicio :</p>

                    <DatePicker
                      className="Date"
                      value={this.state.new.dateStart}
                      appearance="subtle"
                      style={{ width: 240, height: 42 }}
                      format="DD / MM / YYYY"
                    ></DatePicker>
                  </Box>
                </Box>*/}

                <Box gridArea="selectDate2" className="box">
                  <Box className="datebox">
                    <p>Selecciona una fecha de fin :</p>
                    <DateRangePicker
                      value={this.state.new.Date}
                      onChange={value => {
                        this.state.new.Date = value
                        this.setState({ does:'Nothing' });
                      }}
                    />
                  </Box>
                </Box>
                <Box direction='row' gridArea="saveRemove" className="box">
                  <button className='guardar'
                   onClick={()=>{
                     //this.state.clientsList[this.state.new.cat]
                   }}
                  >Guardar</button>
                  <button className='eliminar'>Eliminar</button>
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
              style={{ width: '30vw' }}
              onHide={() => this.onHide('Visorde')}
              dismissableMask={true}
            >
              {/*
              visor de archivos grid
              */}
              <Grid
                rows={['xxsmall', 'xxsmall', 'xxsmall', 'xsmall', 'xxsmall', 'xxsmall', 'xsmall']}
                columns={['30%', '30%', '30%', '10%']}

                areas={[
                  { name: 'top', start: [0, 0], end: [1, 0] },
                  { name: 'line', start: [0, 1], end: [1, 1] },
                  { name: 'map', start: [0, 2], end: [2, 6] }


                ]}>
                <Box direction='row' gridArea="top">
                  <h1>Archivos</h1>
                  <IconButton direction='row' style={{ top: '15px', left: '20px', fontSize: '35px' }}
                    icon={<Icon icon='folder-open' style={{ padding: '0px 0', fontSize: '30px' }} />}
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
            <br />
          </Box>
        </Grid>
        {//DIS ONE
        }
        <Dialog
          visible={this.state.displayPosition}
          position={this.state.position}
          modal
          style={{ width: '50vw' }}
          onHide={() => this.onHide('displayPosition')}
          dismissableMask={true}
        >
          <Grid
            rows={['xxsmall', 'xxsmall', 'xxxsmall', 'xxsmall', 'xxsamall', 'xxsmall', 'xxsmall', 'xxsamall']}
            columns={['xsmall', 'small', 'xsmall', 'xxxsmall',]}
            gap='3px'
            areas={[
              { name: 'line1', start: [0, 0], end: [0, 0] },
              { name: 'line1a', start: [0, 1], end: [1, 1] },
              { name: 'line1b', start: [2, 1], end: [2, 1] },
              { name: 'line1c', start: [3, 1], end: [3, 1] },
              { name: 'line2', start: [0, 2], end: [3, 2] },
              { name: 'Line3', start: [0, 3], end: [3, 3] },
              { name: 'Line4', start: [0, 4], end: [1, 4] },
              { name: 'Line5', start: [0, 5], end: [0, 5] },
              { name: 'Line6', start: [0, 6], end: [0, 6] },
            ]}>
            <Box gridArea='line1'>
              <Button
                appearance="primary"
                className={"status" + this.state.selectedEditRow.Status + " statusDisp"}
                icon={<Icon icon="upload2" />}
                size="lg"
                placement="right"
                disabled={true}
              >
                {this.status(this.state.selectedEditRow.Status)}
              </Button>
            </Box>
            <Box gridArea='line1a' direction='row'>
              <h5 fontSize='18pt'>{this.state.selectedEditRow.Name}</h5>
            </Box>
            <Box gridArea='line1b' direction='row'>
              <Heading level='6'>Fecha de entrega:</Heading>
              <DatePicker
                className="Date"
                value={this.state.selectedEditRow.Date}
                onChange={(e) => {
                  this.state.selectedEditRow.Date = e;
                  this.setState({ does: 'Nothing' })
                }}
                placeholder="10/12/2020"
                appearance="subtle"
                block={true}
                style={{ width: 150, transform: "translate(0%, -7.5%)" }}
                border-radius='10px'
              ></DatePicker>
            </Box>
            <Box gridArea='line1c'>
              <Heading level='3' style={{ color: '#00AB9B' }}>{this.calcAdv() + ' %'}</Heading>
            </Box>
            <Box gridArea='line2'>
              <Heading level='6' alignSelf="start">Pase Usted S.A.P.I. / Contabilidad electrónica</Heading>
            </Box>
            <Box gridArea='Line3' >
              <DataTable value={this.state.selectedEditRow.children} >
                <Column body={this.bodyTableone} />
                <Column style={{ width: '20%' }} body={this.bodyTabletwo} />
                <Column style={{ width: '15%' }} body={this.bodytabletree} />
                <Column style={{ width: '20%' }} body={this.bodytablefour} />
              </DataTable>
            </Box>
            <Box gridArea='Line4'>
              <Button
                appearance="primary"
                className="first"
                icon={<Icon icon="upload2" />}
                size="sm"
                placement="right"
                onClick={() => {
                  this.onHide('displayPosition');
                  this.onClick('displayadd', 'right', 'arrayRtpUsr', 'usrRtpList');
                }}
              >
                Agregar nueva tarea
            </Button>
            </Box>
            <Box gridArea='Line5'>
            </Box>
            <Box gridArea='Line6'>
            </Box>
          </Grid>
        </Dialog>
      </Grommet>

    )
  }
}
