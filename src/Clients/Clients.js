import React from 'react';
import UsrBar from './../UsrBar/UsrBar';
import NavBar from './../NavBar/NavBar';
import './Clients.css';
import DecoratedInput from './../Components/DecoratedInput/DecoratedInput';
import { Grommet, Box, Grid, Heading, Text } from 'grommet';
import {
  Table, Toggle, Icon, Button, Modal, IconButton, Alert, Progress, List, Steps,
  CheckPicker, Input, InputGroup
} from 'rsuite';
import { Dialog } from 'primereact/dialog';
import { Button as ButtonPrime } from 'primereact/button';
import axios from 'axios';
const { Line } = Progress;
const { Column, HeaderCell, Cell } = Table;
class ClientReg extends React.Component {
  constructor(props) {
    super(props);
    console.log(props);
    console.log(this.uuidShort())
    this.state = {
      triggetCtaIsh: false,
      _id: undefined,
      usr: this.props.location.state,
      usrlist: [],
      usrlistStore: [],
      razon: '',
      cName: '',
      fiscal: '',
      rine: '',
      workers: false,
      assimWorkers: false,
      curp: '',
      rfc: '',
      pPhys: false,
      branch: false,
      step: 0,
      extran: false,
      phoneNum: '',
      show: false,
      Deep: false,
      RNIEUsr: { user: '', pwd: '' },
      RFCUsr: { user: '', pwd: '' },
      Resultado: '',
      assigned: [],
      branchAdd: ['Roses are red',],
      foreignPartner: ['Roses are red',],
      arrayCon: ['Roses are red',],
      arrayDatos: ['Roses are red',],
      arrayActF: ['Roses are red'],
      arrayFona: ['Roses are red'],
      arrayFonaUsr: ['Roses are red'],
      arrayRegPa: ['Roses are red'],
      arrayCtaIsn: ['Roses are red',], arrayCtaRtp: ['Roses are red',],
      arrayCtaCed: ['Roses are red',], arrayCtaIsh: ['Roses are red',],
      arrayIshUsr: ['Roses are red'], arrayIsnUsr: ['Roses are red'],
      arrayCedUsr: ['Roses are red'], arrayRtpUsr: ['Roses are red'],
      arrayBuzonT:['Roses are red'],
      regFiscal: [],
      isn: '',
      rtp: '',
      cedular: '',
      ish: '',
      currentArray: 'arrayIshUsr', currentList: 'usrIshList',
      regPaList: [
        {
          Registro: '', _id: this.uuidShort(),
          IDSE: { user: '', pwd: '' },
          SIPARE: { user: '', pwd: '' },
          INFO: { user: '', pwd: '' },
        },
      ],
      succList: [
        { col: '', calle: '', cp: '', estado: '', _id: this.uuidShort() },
      ],
      foreignList: [
        { name: '', rfc: '', _id: this.uuidShort() },
      ],
      contactList: [
        { nombre: '', email: '', telefono: '', _id: this.uuidShort() }
      ],
      repList: [
        { nombre: '', rfc: '', curp: '', email: '', telefono: '', _id: this.uuidShort() },
      ],
      ctaIsnList: [{ cta: '', _id: this.uuidShort() }], ctaRtpList: [{ cta: '', _id: this.uuidShort() }],
      ctaCedList: [{ cta: '', _id: this.uuidShort() }], ctaIshList: [{ cta: '', _id: this.uuidShort() }],
      usrIshList: [{ user: '', pwd: '', _id: this.uuidShort() }], usrIsnList: [{ user: '', pwd: '', _id: this.uuidShort() }],
      usrCedList: [{ user: '', pwd: '', _id: this.uuidShort() }], usrRtpList: [{ user: '', pwd: '', _id: this.uuidShort() }],
      fonaList: [{ cta: '', _id: this.uuidShort() }], fonaUsrList: [{ user: '', pwd: '', _id: this.uuidShort() }],
      buzonT: [{ cta: '', _id: this.uuidShort() }],
      rowSelected: "",
      team: "",
      assimNomina: [], nomina:[],
      searchT: ''
    };
  }
  componentDidMount() {
    console.log(this.props)
    axios.post('/userslist', { team: this.state.usr.Team }).then((res) => {

      //this.setState({clients:res.data.User})
      let users = [];
      res.data.Users.forEach((I, J) => {
        I.place = J;
        users.push(I);
      });
      this.setState({ usrlist: users, usrlistStore: users });
      console.log(this.state.usrlist);
    });

    if (this.props.match.params.id) {
      try {
        axios.post(`/clients/client`, { team: this.state.usr.Team, id: this.props.match.params.id }).then((res) => {
          this.setState(res.data.Client)
          this.setState({ step: 0 })
        })
      } catch (err) {
        console.log(err.message)
      }
    } else {
      console.log('No hay id en los params')

    }
    this.handleChange = this.handleChange.bind(this);
  }
  uuid = () => {
    return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, c =>
      (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
    );
  }
  uuidShort = () => {
    return ([1e7] + -1e3 + -4e3).replace(/[018]/g, c =>
      (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
    );
  }
  handleChange = (value, field) => {
    console.log(value, field);
    this.setState({ [field]: value }, () => {
      console.log(this.state);
    });
  };
  handleChangeLimit = (value, field) => {
    console.log(value, field);
    if( value.length < ( this.state.pPhys ? 13 : 14 ) ){
      console.log(value.length)
      this.setState({ [field]: value }, () => {
        console.log(this.state);
      });
    }
  };
  handleChangeList = (value, collection, index, name, depth1) => {
    if (depth1) {
      this.state[collection][index][depth1][name] = value;
      this.setState({ step: this.state.step }, () => {
        //console.log(this.state);
      });
    } else {
      //console.log(value, collection, index, name);
      this.state[collection][index][name] = value;
      //console.log( this.state[collection][index][name] );
      this.setState({ step: this.state.step }, () => {
        //console.log(this.state);
      });
    }
  };
  handleUpload = () => {
  };
  delete = () => {
    axios
      .post('/rmUsr', { _id: this.state._idDel })
      .then((res) => {
        console.log(res);
        Alert.success('Registro eliminado exitosamente.');
        this.setState({
          name: '',
          nameFather: '',
          nameMother: '',
          birthday: '',
          gender: '',
          curp: '',
          rfc: '',
          dateHire: '',
          position: '',
          phoneNum: '',
          emergencyNum: '',
          academic: '',
          password: '',
          _id: '',
          show: false,
        });
        this.componentDidMount();
      });
  };
  swap = () => {
    this.setState({ show: !this.state.show });
  };
  forward = () => {
    this.setState({ step: this.state.step + 1 });
  };
  forwardback = () => {
    this.setState({ step: this.state.step - 1 });
  };
  MetodoPush = (VariableX, VariableY, push) => {
    let valorA = this.state[VariableY];
    valorA.push(push);
    this.setState({ [VariableY]: valorA }, () => {
      valorA = this.state[VariableX];
      valorA.push(['']);
      this.setState({ [VariableX]: valorA });
    });
  };
  MetodoPop = (VariableX, VariableY, _uuid) => {
    let valorA = this.state[VariableX];
    valorA.pop();
    this.setState({ [VariableX]: valorA }, () => {
      valorA = this.state[VariableY];
      valorA = valorA.filter(v => v._id != _uuid);
      console.log(_uuid)
      console.log(valorA)
      this.setState({ [VariableY]: valorA });
    });
  }
  Register = () => {
    console.log(this.state)
    axios.post('/clients/upload', { state: this.state }).then((res) => {
      console.log(res);
      const { status } = res;
      if (status == 200) Alert.success('Cliente guardado exitosamente.', 5000);
    });
  };
  CAMBIOS = (VALORche) => {
    this.setState(
      {
        regFiscal: VALORche,
      },
      () => {
        this.setState({
          Resultado: this.state.regFiscal.join(', '),
        });
        console.log(this.state.regFiscal);
      }
    );
  };
  metNomina = (nominavalue) => {
    this.setState(
      {
        nomina: nominavalue,
      },
      () => {
        this.setState({
          Resultado2: this.state.nomina.join(', '),
        });
        console.log(this.state.nomina);
      }
    );
  };
  metNomina2 = (nominavalue) => {
    this.setState(
      {
        assimNomina: nominavalue,
      },
      () => {
        this.setState({
          Resultado3: this.state.assimNomina.join(', '),
        });
        console.log(this.state.assimNomina);
      }
    );
  };
  filteruser = () => {
    console.log(this.state.searchT);
    console.log(this.state.usrlist);
    this.setState({
      //
      usrlist: this.state.searchT.length == 0 ? this.state.usrlistStore : this.state.usrlistStore.filter(S => S.Name.First.includes(this.state.searchT) ||
        S.Team.includes(this.state.searchT) ||
        S.Name.Last.includes(this.state.searchT) || S.Name.Last2.includes(this.state.searchT))
    })
    console.log(this.state.usrlistStore.filter(S => S.Name.First.includes(this.state.searchT) ||
      S.Team.includes(this.state.searchT) ||
      S.Name.Last.includes(this.state.searchT) || S.Name.Last2.includes(this.state.searchT)))
  }
  nomBox = (props) => {
    let nomina = [
      { label: 'Semanal', value: 'Semanal', role: 'Master' },
      { label: 'Catorcenal', value: 'Catorcenal', role: 'Master' },
      { label: 'Quincenal', value: 'Quincenal', role: 'Master' },
    ];
    let nominaAsalariados = [
      { label: 'Quincenal', value: 'Quincenal', role: 'Master' },
      { label: 'Mensual', value: 'Mensual', role: 'Master' },
    ];
    let datum = props.assim ? nominaAsalariados : nomina;
    let key = props.assim ? 'assimWorkers' : 'workers';
    let value = props.assim ? 'assimNomina' : 'nomina';
    return (
      <Box>
        <Box direction='row'>
          <Heading margin='small' level={5} className='GreenLetter'>
            {props.mark}
          </Heading>
          <Toggle
            size='lg'
            checkedChildren='Si'
            unCheckedChildren='No'
            className='PushDown'
            checked={this.state[key]}
            onChange={() => {
              this.setState({ [key]: !this.state[key] });
            }}
          />
        </Box>
        <br />
        {this.state[key] ? (
          <Box>
            <Box direction='row'>
              <Heading margin='small' level={5} className='GreenLetter'>
                Periocidad de nómina
                </Heading>
              <CheckPicker
                value={this.state[value]}
                onChange={this[props.assim ? 'metNomina2' :'metNomina']}
                data={datum}
                style={{ width: 224 }}
              />
            </Box>
            <br />
            <Box direction='row'>
              <Text className='GreenLetter'>{this.state[props.assim ? 'Resultado3':'Resultado2']}</Text>
            </Box>
            <br />
            <br />
          </Box>
        ) : (
            <span></span>
          )}
        <br />
      </Box>
    );
  }
  render() {
    return (
      <Grommet plain className='App'>
        <UsrBar usr={this.state.usr} />

        <Modal show={this.state.show} onHide={this.swap}>
          <Modal.Header>
            <Modal.Title>Eliminar usuario</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            Esta Usted seguro que desea eliminar al usuario? ATENCION NO SE
            PUEDE DESHACER ESTA OPERACION
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.delete} appearance='primary'>
              Ok
            </Button>
            <Button onClick={this.swap} appearance='subtle'>
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
            <Grid
              rows={['small', 'xlarge']}
              columns={['small', '70%']}
              gap='3px'
              areas={[
                { name: 'avatar', start: [0, 0], end: [0, 0] },
                { name: 'name', start: [1, 0], end: [1, 0] },
                { name: 'info', start: [1, 1], end: [1, 1] },
              ]}
            >
              <Box gridArea='name'>
                <Steps current={this.state.step}>
                  <Steps.Item title='Datos Generales' />
                  <Steps.Item title='Datos de Contacto' />
                  <Steps.Item title='Caracteristicas Fiscales' />
                  <Steps.Item title='Documentacion' />
                </Steps>
                <br />
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
                  {this.state.cname == ''
                    ? this.state.cname
                    : 'Ingrese el cliente'}
                </Heading>
                <br />
                <Heading
                  level='3'
                  margin='none'
                  style={{ left: '60%', marginLeft: '20px' }}
                  textAlign='center'
                >
                  {this.state.curPos}
                </Heading>
                <br />
              </Box>
              {this.state.step === 0 ? <this.StepOne /> : <span></span>}
              {this.state.step === 1 ? <this.StepTwo /> : <span></span>}
              {this.state.step === 2 ? <this.StepTree /> : <span></span>}
            </Grid>
          </Box>
        </Grid>
      </Grommet>
    );
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
  onHide(name) {
    this.setState({
      [`${name}`]: false
    });
  }
  renderFooter(name, array, list) {
    return (
      <div>
        { this.state.Deep ?
          <span></span>
          :
          <ButtonPrime
            icon="pi pi-plus"
            className="p-button-rounded p-button-success p-button-outlined adder"
            onClick={() => this.MetodoPush(array, list, {
              user: '', pwd: '', _id: this.uuidShort()
            })}
            autoFocus
          />
        }
      </div>
    );
  }
  StepOne = () => {
    return (
      <Box gridArea='info'>
        <Box direction='row'>
          <DecoratedInput
            area='Razon'
            value={this.state.razon}
            onChange={(e) => {
              this.handleChange(e, 'razon');
            }}
            width='85%'
            boxw='90px'
            textw='medium'
            icon='id-mapping'
          />
          <Toggle
            size='lg'
            checkedChildren='P. Moral'
            unCheckedChildren='P. Fisica'
            checked={this.state.pPhys}
            onChange={() => {
              this.setState({ pPhys: !this.state.pPhys });
            }}
          />
        </Box>
        <br />
        <Box direction='row'>
          <DecoratedInput
            area='Nombre Comercial'
            value={this.state.cName}
            onChange={(e) => {
              this.handleChange(e, 'cName');
            }}
            width='100%'
            boxw='170px'
            textw='medium'
            icon='id-mapping'
          />
        </Box>
        <br />
        <Box direction='row'>
          <DecoratedInput
            area='Domicilio Fiscal'
            value={this.state.fiscal}
            width='100%'
            boxw='140px'
            textw='medium'
            icon='hourglass-2'
            onChange={(e) => {
              this.handleChange(e, 'fiscal');
            }}
          />
        </Box>
        <br />
        <Box direction='row'>
          {!this.state.pPhys ? (
            <DecoratedInput
              area='Curp'
              value={this.state.curp}
              onChange={(e) => {
                this.handleChange(e, 'curp');
              }}
              width='60%'
              icon='id-card'
              display={this.state.pPhys}
            />
          ) : (
              <DecoratedInput
                area='RNIE'
                value={this.state.rine}
                onChange={(e) => {
                  this.handleChange(e, 'rine');
                }}
                width='60%'
                icon='peoples-map'
              />
            )}
          <DecoratedInput
            area='RFC'
            value={this.state.rfc}
            onChange={(e) => {
              this.handleChangeLimit(e, 'rfc');
            }}
            width='60%'
            icon='id-card'
          />
        </Box>
        <br />
        <Box direction='row'>
          <DecoratedInput
            area='Numero Tel.'
            value={this.state.phoneNum}
            onChange={(e) => {
              this.handleChange(e, 'phoneNum');
            }}
            width='60%'
            type='number'
            icon='mobile'
          />
        </Box>
        <br />
        <Box>
          <Box direction='row'>
            <Heading margin='small' level={5} className='GreenLetter'
              style={{
                color: '#515253',
              }}
            >
              El cliente cuenta con sucursales?
            </Heading>
            <Toggle
              size='lg'
              checkedChildren='Si'
              unCheckedChildren='No'
              className='PushDown'
              checked={this.state.branch}
              onChange={() => {
                this.setState({ branch: !this.state.branch });
              }}
            />
          </Box>
          {this.state.branch ? (
            <Box>
              <List hover className='ListColor'>
                {this.state.branchAdd.map((item, index) => (
                  <List.Item key={index} index={index} className='Pad'>
                    <Box direction='row'>
                      <DecoratedInput
                        area='Col.'
                        value={this.state.succList[index].col}
                        onChange={(e) => {
                          this.handleChangeList(e, 'succList', index, 'col');
                        }}
                        width='300px'
                        boxw='65px'
                        textw='medium'
                        icon='id-mapping'
                      />
                      <DecoratedInput
                        area='Calle y N.'
                        value={this.state.succList[index].calle}
                        onChange={(e) => {
                          this.handleChangeList(e, 'succList', index, 'calle');
                        }}
                        width='550px'
                        boxw='100px'
                        textw='medium'
                        icon='id-mapping'
                      />
                      <DecoratedInput
                        area='C.P.'
                        value={this.state.succList[index].cp}
                        onChange={(e) => {
                          this.handleChangeList(e, 'succList', index, 'cp');
                        }}
                        width='200px'
                        boxw='60px'
                        textw='medium'
                        icon='id-mapping'
                      />
                      <DecoratedInput
                        area='Estado'
                        value={this.state.succList[index].estado}
                        onChange={(e) => {
                          this.handleChangeList(e, 'succList', index, 'estado');
                        }}
                        width='250px'
                        boxw='80px'
                        textw='medium'
                        icon='id-mapping'
                      />
                      <IconButton
                        icon={<Icon icon='close' />}
                        circle
                        size='md'
                        onClick={() => {
                          this.MetodoPop('branchAdd', 'succList', this.state.succList[index]._id);
                        }}
                      />
                    </Box>
                  </List.Item>
                ))}
              </List>
              <br />
              <IconButton
                icon={<Icon icon='plus' />}
                circle
                size='md'
                onClick={() => {
                  this.MetodoPush('branchAdd', 'succList', {
                    col: '',
                    calle: '',
                    cp: '',
                    estado: '', _id: this.uuidShort()
                  });
                }}
              />
            </Box>
          ) : (
              <span></span>
            )}
          <br />
          <br />
        </Box>
        {!this.state.pPhys ? (
          <span></span>
        ) : (
            <Box>
              <Box direction='row'>
                <Heading margin='small' level={5} className='GreenLetter'
                  style={{
                    color: '#515253',
                  }}
                >
                  ¿El cliente cuenta con socios extranjeros?
              </Heading>
                <Toggle
                  size='lg'
                  checkedChildren='Si'
                  unCheckedChildren='No'
                  className='PushDown'
                  checked={this.state.extran}
                  onChange={() => {
                    this.setState({ extran: !this.state.extran });
                  }}
                />
              </Box>
              <br />
              {this.state.extran ?
                <Box>
                  <List hover className='ListColor'>
                    {this.state.foreignPartner.map((item, index) => (
                      <List.Item key={index} index={index} className='Pad'>
                        <Box direction='row'>
                          <DecoratedInput
                            area='Nombre'
                            value={this.state.foreignList[index].name}
                            onChange={(e) => {
                              this.handleChangeList(e, 'foreignList', index, 'name');
                            }}
                            width='300px'
                            boxw='90px'
                            textw='medium'
                            icon='id-mapping'
                          />
                          <DecoratedInput
                            area='RFC'
                            value={this.state.foreignList[index].rfc}
                            onChange={(e) => {
                              this.handleChangeList(e, 'foreignList', index, 'rfc');
                            }}
                            width='250px'
                            boxw='80px'
                            textw='medium'
                            icon='id-mapping'
                          />
                          <IconButton
                            icon={<Icon icon='close' />}
                            circle
                            size='md'
                            onClick={() => {
                              this.MetodoPop('foreignPartner', 'foreignList', this.state.foreignList[index]._id);
                            }}
                          />
                        </Box>
                      </List.Item>
                    ))}
                  </List>
                  <br />
                  <IconButton
                    icon={<Icon icon='plus' />}
                    circle
                    size='md'
                    onClick={() => {
                      this.MetodoPush('foreignPartner', 'foreignList', {
                        name: '',
                        rfc: '', _id: this.uuidShort()
                      });
                    }}
                  />
                </Box>
                : <span></span>
              }
              <br />
            </Box>
          )}
        <Button
          style={{
            backgroundColor: "#06554C",
            color: '#F5F0F6',
            width: '120px',
            fontFamily: "'Manjari', sans-serif",
            boxShadow: '0px 2px 4px rgba(0,0,0,0.20)',
          }}
          disabled={
            !(this.state.razon.length != 0 &&
              this.state.fiscal.length != 0 &&
              this.state.rfc.length != 0 &&
              this.state.phoneNum.length != 0)
          }
          onClick={() => this.forward()}
        >
          Siguiente&nbsp;&nbsp;
          <Icon icon='hand-o-right' />
        </Button>
      </Box>
    );
  };
  StepTwo = () => {
    return (
      <Box gridArea='info'>
        <Box direction='row'>
          <Heading margin='small' level={5} className='GreenLetter'>
            Contacto empresa
          </Heading>
          <br />
        </Box>
        <Box direction='row'>
          <List hover className='ListColor'>
            {this.state.arrayCon.map((item, index) => (
              <List.Item key={index} index={index} className='Pad'>
                <Box direction='row'>
                  <DecoratedInput
                    area='Nombre'
                    value={this.state.contactList[index].nombre}
                    onChange={(e) => {
                      this.handleChangeList(e, 'contactList', index, 'nombre');
                    }}
                    width='380px'
                    boxw='100px'
                    textw='medium'
                    icon='user-o'
                  />
                  <DecoratedInput
                    area='Email'
                    value={this.state.contactList[index].email}
                    onChange={(e) => {
                      this.handleChangeList(e, 'contactList', index, 'email');
                    }}
                    width='380px'
                    boxw='100px'
                    textw='medium'
                    icon='user-o'
                  />
                  <DecoratedInput
                    area='Telefono'
                    value={this.state.contactList[index].telefono}
                    onChange={(e) => {
                      this.handleChangeList(
                        e,
                        'contactList',
                        index,
                        'telefono'
                      );
                    }}
                    width='250px'
                    boxw='100px'
                    textw='medium'
                    icon='mobile'
                    type='number'
                  />
                  <IconButton
                    icon={<Icon icon='close' />}
                    circle
                    size='md'
                    onClick={() => {
                      this.MetodoPop('arrayCon', 'contactList', this.state.contactList[index]._id);
                    }}
                  />
                </Box>
              </List.Item>
            ))}
          </List>
        </Box>
        <br />
        <Box>
          <IconButton
            icon={<Icon icon='plus' />}
            circle
            size='md'
            className=''
            onClick={() => {
              this.MetodoPush('arrayCon', 'contactList', {
                nombre: '',
                email: '',
                telefono: '', _id: this.uuidShort()
              });
            }}
          />
        </Box>
        <br />
        <br />
        <Box direction='row'>
          <Heading margin='small' level={5} className='GreenLetter'>
            Datos del representante legal
          </Heading>
        </Box>
        <br />
        <Box direction='row'>
          <List hover className='ListColor'>
            {this.state.arrayDatos.map((item, index) => (
              <List.Item key={index} index={index} className='Pad'>
                <Box direction='row'>
                  <DecoratedInput
                    area='Nombre'
                    value={this.state.repList[index].nombre}
                    onChange={(e) => {
                      this.handleChangeList(e, 'repList', index, 'nombre');
                    }}
                    width='350px'
                    boxw='100px'
                    textw='medium'
                    icon='id-mapping'
                  />
                  <DecoratedInput
                    area='Email'
                    value={this.state.repList[index].email}
                    onChange={(e) => {
                      this.handleChangeList(e, 'repList', index, 'email');
                    }}
                    boxw='100px'
                    width='350px'
                    textw='medium'
                    icon='user-o'
                  />
                  <DecoratedInput
                    area='Telefono'
                    value={this.state.repList[index].telefono}
                    onChange={(e) => {
                      this.handleChangeList(e, 'repList', index, 'telefono');
                    }}
                    width='250px'
                    boxw='100px'
                    textw='medium'
                    icon='mobile'
                    type='number'
                  />
                  <br />
                  <br />
                </Box>
                <Box direction='row'>
                  <DecoratedInput
                    area='RFC'
                    value={this.state.repList[index].rfc}
                    onChange={(e) => {
                      this.handleChangeList(e, 'repList', index, 'rfc');
                    }}
                    width='350px'
                    boxw='100px'
                    textw='medium'
                    icon='id-card'
                  />
                  <DecoratedInput
                    area='Curp'
                    value={this.state.repList[index].curp}
                    onChange={(e) => {
                      this.handleChangeList(e, 'repList', index, 'curp');
                    }}
                    width='350px'
                    boxw='100px'
                    textw='medium'
                    icon='id-card'
                  />
                  <IconButton
                    icon={<Icon icon='close' />}
                    circle
                    size='md'
                    onClick={() => {
                      this.MetodoPop('arrayDatos', 'repList', this.state.repList[index]._id);
                    }}
                  />
                </Box>
              </List.Item>
            ))}
          </List>
        </Box>
        <br />
        <IconButton
          icon={<Icon icon='plus' />}
          circle
          size='md'
          onClick={() => {
            this.MetodoPush('arrayDatos', 'repList', {
              nombre: '',
              rfc: '',
              curp: '',
              email: '',
              telefono: '', _id: this.uuidShort()
            });
          }}
        />
        <br />
        <br />
        <Box direction='row'>
          <Heading margin='small' level={5} className='GreenLetter'>
            Responsables
          </Heading>
        </Box>
        <br />
        <InputGroup
          style={{
            width: 270,
            overflow: 'visible',
            border: 'none',
            borderRadius: '90px'
          }} >
          <Input
            style={{ boxShadow: 'none', width: 240, paddingRight: '11px' }}
            placeholder="Usuario"
            className="inputLog"
            value={this.state.searchT}
            onChange={(e) => {
              this.setState({ searchT: e });
            }}
          />
          <InputGroup.Button
            style={{
              paddingLeft: '25px',
              paddingRight: '11px',
              top: '0.2px',
              backgroundColor: '#00AB9B',
              color: '#F2F3F4',
              borderRadius: '0px 100px 100px 0px',
              right: '20px'
            }}
            onClick={this.filteruser}
          >
            <Icon icon="search" />
          </InputGroup.Button>
        </InputGroup>
        <br />
        <br />
        <Table
          className='TableColor'
          height={200}
          data={this.state.usrlist}
          style={{ zIndex: 0 }}
          onRowClick={(data) => {
            console.log(data);
            this.state._idDel = data._id;
            this.setState({
              rowSelected: data._id,
              team: data.Team
            })
          }}
          rowClassName={(rowData) => {
            //return (rowData ? (rowData._id === this.state.assigned._id ? 'rowSelected' : '') : '')
            return (rowData ? (this.state.assigned.find(usr => usr._id === rowData._id) !== undefined ? 'rowSelected' : '') : '')
          }}
        >
          <Column width={50} align='center' fixed>
            <HeaderCell>Usuario</HeaderCell>
            <Cell dataKey='place' />
          </Column>
          <Column flexGrow={2} align='center' fixed>
            <HeaderCell>Nombre</HeaderCell>
            <Cell dataKey='Name.First' />
          </Column>
          <Column flexGrow={2} fixed>
            <HeaderCell>Apellido Paterno</HeaderCell>
            <Cell dataKey='Name.Last' />
          </Column>
          <Column flexGrow={2}>
            <HeaderCell>Apellido Materno</HeaderCell>
            <Cell dataKey='Name.Last2' />
          </Column>
          <Column flexGrow={1}>
            <HeaderCell>Puesto</HeaderCell>
            <Cell dataKey='Pos' />
          </Column>
          <Column flexGrow={1}>
            <HeaderCell>Rol</HeaderCell>
            <Cell dataKey='Role' />
          </Column>
          <Column flexGrow={2} fixed='right'>
            <HeaderCell>Action</HeaderCell>
            <Cell>
              {(rowData) => {
                this.showUser = () => {
                  let _assigned = this.state.assigned;
                  _assigned.push({
                    name: rowData.Name.First,
                    nameFather: rowData.Name.Last,
                    nameMother: rowData.Name.Last2,
                    pos: rowData.Pos,
                    team: rowData.team,
                    _id: rowData._id,
                  })
                  this.setState({
                    assigned: _assigned,
                  });
                };
                this.removeUser = () => {
                  let _assigned = this.state.assigned;
                  _assigned = _assigned.filter(usr => usr._id !== rowData._id);
                  this.setState({
                    assigned:_assigned
                  })
                };
                return (
                  (rowData ?
                    (this.state.assigned.find(usr => usr._id === rowData._id) !== undefined ?
                      <span>
                        <ButtonPrime
                          label="Borrar"
                          className="p-button-text p-button-plain usrTblBut"
                          onClick={this.removeUser}/>
                      </span> 
                      :
                      <span>
                        <ButtonPrime
                          label="Seleccionar"
                          className="p-button-text p-button-plain usrTblBut standby"
                          onClick={this.showUser}/>
                      </span>
                    )
                    :
                      <span>
                        <ButtonPrime
                          label="Seleccionar"
                          className="p-button-text p-button-plain usrTblBut standby"
                          onClick={this.showUser}/>
                      </span>
                    )
                );
              }}
            </Cell>
          </Column>
        </Table>
        {this.state.assigned._id ? (
          <>
            <Box direction='row'>
              <Heading margin='small' level={5} className='GreenLetter'>
                Detalles del responsable seleccionado
              </Heading>
              <br />
            </Box>
            <Box direction='row'>
              <DecoratedInput
                area='Nombre'
                value={`${this.state.assigned.name} ${this.state.assigned.nameFather} ${this.state.assigned.nameMother}`}
                width='380px'
                boxw='100px'
                textw='medium'
                icon='user-o'
                display
              />

              <DecoratedInput
                area='Puesto'
                value={this.state.assigned.pos == null ? "NA" : this.state.assigned.pos}
                width='380px'
                boxw='100px'
                textw='medium'
                icon='user-o'
                display
              />
              <DecoratedInput
                area='Equipo'
                value={this.state.assigned.team == null ? "NA" : this.state.assigned.team}
                width='250px'
                boxw='100px'
                textw='medium'
                icon='group'
                display
              />
            </Box>
          </>
        ) : null}
        <br />
        <Box direction='row'>
          <Button
            style={{
              backgroundColor: "#06554C",
              color: '#F5F0F6',
              width: '120px',
              fontFamily: "'Manjari', sans-serif",
              boxShadow: '0px 2px 4px rgba(0,0,0,0.20)',
            }}
            onClick={() => this.forwardback()}
          >
            <Icon icon='hand-o-left' /> Atras&nbsp;&nbsp;
          </Button>
          <Button
            style={{
              position: 'absolute',
              left: '75vw',
              backgroundColor: "#06554C",
              color: '#F5F0F6',
              width: '120px',
              fontFamily: "'Manjari', sans-serif",
              boxShadow: '0px 2px 4px rgba(0,0,0,0.20)',
            }}
            disabled={
              (this.state.assigned.length === 0)
            }
            onClick={

              () => this.forward()
            }
          >
            Siguiente&nbsp;&nbsp;
            <Icon icon='hand-o-right' />
          </Button>
        </Box>
      </Box>
    );
  };
  StepTree = () => {
    let RegFis = [
      {
        label: 'Régimen de Sueldos y Salarios e Ingresos Asimilados a Salarios',
        value: 'RSySIAS', role: 'Master'
      },
      {
        label: 'Régimen de las Personas Físicas con Actividades Empresariales y Profesionales',
        value: 'RPFAEP', role: 'Master'
      },
      {
        label: 'Régimen de Incorporación Fiscal',
        value: 'RIF', role: 'Master'
      },
      {
        label: 'Regimen de Ingresos por la enajenación de bienes o la prestación de servicios a través de Internet, mediante plataformas tecnológicas, aplicaciones informáticas y similares',
        value: 'RIEBPSI', role: 'Master'
      },
      {
        label: 'Régimen de Arrendamiento',
        value: 'RDA', role: 'Master'
      },
      {
        label: 'Régimen de Actividades Agrícolas, Ganaderas, Silvícolas y Pesqueras',
        value: 'RAAGSP', role: 'Master'
      },
      {
        label: 'Régimen de Enajenación de bienes Regimen General',
        value: 'RG', role: 'Master'
      },
      {
        label: 'Régimen de Ingresos por Dividendos (socios y accionistas)',
        value: 'RID', role: 'Master'
      },
      {
        label: 'Régimen de los demás ingresos',
        value: 'RDI', role: 'Master'
      },
    ];
    let RegMor = [
      {
        label: 'Régimen General de Ley Personas Morales',
        value: 'RGLPM', role: 'Master'
      },
      {
        label: 'Régimen de Personas Morales con Fines no Lucrativos',
        value: 'RPMFL', role: 'Master'
      },
      {
        label: 'Régimen de Actividades Agrícolas, Ganaderas, Silvícolas y Pesqueras',
        value: 'RAAGSP', role: 'Master'
      },
    ];
    return (
      <Box gridArea='info'>
        <Box direction='row'>
          {this.state.pPhys ?
            <span>
              <Heading margin='small' level={5} className='GreenLetter'>
                Regímen Fiscal(P. Morales):
          </Heading>
              <CheckPicker
                value={this.state.regFiscal}
                onChange={this.CAMBIOS}
                data={RegMor}
                style={{ width: 224 }}
              />
            </span>
            :
            <span>
              <Heading margin='small' level={5} className='GreenLetter'>
                Regímen Fiscal(P. Fisicas):
            </Heading>
              <CheckPicker
                value={this.state.regFiscal}
                onChange={this.CAMBIOS}
                data={RegFis}
                style={{ width: 224 }}
              />
            </span>
          }


        </Box>
        <br />
        <Box direction='row'>
          <Text className='GreenLetter'>{this.state.Resultado}</Text>
        </Box>
        <br />
        <Box direction='row'>
          <Box>
          <Heading margin='small' level={4} style={{textAlign:'start'}}>SAT:</Heading>
            <Box direction='row'>
              <DecoratedInput
                area='RFC'
                value={this.state.rfc}
                width='85%'
                boxw='65px'
                textw='medium'
                icon='id-mapping'
              />
              <DecoratedInput
                area='Contraseña'
                value={this.state.RFCUsr.pwd}
                onChange={(e) => {
                  this.setState({ RFCUsr: { pwd: e, user: this.state.RFCUsr.user } }, () => {
                    console.log(this.state);
                  });
                }}
                width='85%'
                boxw='110px'
                textw='medium'
                icon='id-mapping'
              />
            </Box>
          </Box>
          <Box>
            {this.state.rine.length !== 0 ?
              <span>
                <Box direction='row'>
                  <Heading margin="none" level="4">RNIE: {this.state.rine}</Heading>
                </Box>
                <Box direction='row'>
                  <DecoratedInput
                    area='Usr'
                    value={this.state.RNIEUsr.user}
                    onChange={(e) => {
                      this.setState({ RNIEUsr: { user: e, pwd: this.state.RNIEUsr.pwd } }, () => {
                        console.log(this.state);
                      });
                    }}
                    width='85%'
                    boxw='60px'
                    textw='medium'
                    icon='id-mapping'
                  />  
                  <DecoratedInput
                    area='Contraseña'
                    value={this.state.RNIEUsr.pwd}
                    onChange={(e) => {
                      this.setState({ RNIEUsr: { pwd: e, user: this.state.RNIEUsr.user } }, () => {
                        console.log(this.state);
                      });
                    }}
                    width='85%'
                    boxw='95px'
                    textw='medium'
                    icon='id-mapping'
                  />
                </Box>
              </span>
              :
              <span></span>
            }
          </Box>
        </Box>
        <br />
        <Dialog
          header="Lista de Cuentas"
          visible={this.state.displayPosition}
          position={this.state.position}
          modal
          style={{ width: '50vw' }}
          footer={this.renderFooter('displayPosition', this.state.currentArray, this.state.currentList)}
          onHide={() => this.onHide('displayPosition')}
          dismissableMask={true}
        >
          <List hover className='ListColor'>
            {this.state[this.state.currentArray].map((item, index) => (
              <List.Item key={index} index={index} className='Pad'>
                { this.state.Deep ?
                  <span>
                    <Box direction='row'>
                      <DecoratedInput
                        area='IDSE'
                        value={this.state.regPaList[index].IDSE.user}
                        onChange={(e) => {
                          this.handleChangeList(e, 'regPaList', index, 'user', 'IDSE');
                        }}
                        width='300px'
                        boxw='100px'
                        textw='medium'
                        icon='id-mapping'
                      />
                      <DecoratedInput
                        area='Contraseña'
                        value={this.state.regPaList[index].IDSE.pwd}
                        onChange={(e) => {
                          this.handleChangeList(e, 'regPaList', index, 'pwd', 'IDSE');
                        }}
                        width='300px'
                        boxw='120px'
                        textw='medium'
                        icon='id-mapping'
                      />
                    </Box>
                    <br />
                    <Box direction='row'>
                      <DecoratedInput
                        area='SIPARE'
                        value={this.state.regPaList[index].SIPARE.user}
                        onChange={(e) => {
                          this.handleChangeList(e, 'regPaList', index, 'user', 'SIPARE');
                        }}
                        width='300px'
                        boxw='100px'
                        textw='medium'
                        icon='id-mapping'
                      />
                      <DecoratedInput
                        area='Contraseña'
                        value={this.state.regPaList[index].SIPARE.pwd}
                        onChange={(e) => {
                          this.handleChangeList(e, 'regPaList', index, 'pwd', 'SIPARE');
                        }}
                        width='300px'
                        boxw='120px'
                        textw='medium'
                        icon='id-mapping'
                      />
                    </Box>
                    <br />
                    <Box direction='row'>
                      <DecoratedInput
                        area='INFO'
                        value={this.state.regPaList[index].INFO.user}
                        onChange={(e) => {
                          this.handleChangeList(e, 'regPaList', index, 'user', 'INFO');
                        }}
                        width='300px'
                        boxw='100px'
                        textw='medium'
                        icon='id-mapping'
                      />
                      <DecoratedInput
                        area='Contraseña'
                        value={this.state.regPaList[index].INFO.pwd}
                        onChange={(e) => {
                          this.handleChangeList(e, 'regPaList', index, 'pwd', 'INFO');
                        }}
                        width='300px'
                        boxw='120px'
                        textw='medium'
                        icon='id-mapping'
                      />
                    </Box>
                  </span>
                  :
                  <Box direction='row'>
                    <DecoratedInput
                      area='Usuario'
                      value={this.state[this.state.currentList][index].user}
                      onChange={(e) => {
                        this.handleChangeList(e, this.state.currentList, index, 'user');
                      }}
                      width='300px'
                      boxw='100px'
                      textw='medium'
                      icon='id-mapping'
                    />
                    <DecoratedInput
                      area='Contraseña'
                      value={this.state[this.state.currentList][index].pwd}
                      onChange={(e) => {
                        this.handleChangeList(e, this.state.currentList, index, 'pwd');
                      }}
                      width='300px'
                      boxw='120px'
                      textw='medium'
                      icon='id-mapping'
                    />
                    <IconButton
                      icon={<Icon icon='close' />}
                      circle
                      size='md'
                      onClick={() => {
                        this.MetodoPop(this.state.currentArray, this.state.currentList, this.state[this.state.currentList][index]._id);
                      }}
                    />
                  </Box>}
              </List.Item>
            ))}
          </List>
        </Dialog>
        <this.nomBox mark="¿Cuenta con Trabajadores?" />
        <this.nomBox mark="¿Cuenta con Asimilados a Salarios?" assim={true} />
        <Box>
          <Grid
            rows={['small', 'small', 'small', 'small']}
            columns={['30vw', '30vw']}
            gap='small'
            areas={[
              { name: 'topIz', start: [0, 0], end: [0, 0] },
              { name: 'topDer', start: [1, 0], end: [1, 0] },
              { name: 'ArrIz', start: [0, 1], end: [0, 1] },
              { name: 'AbaiZ', start: [0, 2], end: [0, 2] },
              { name: 'ArrDer', start: [1, 1], end: [1, 1] },
              { name: 'AbaDer', start: [1, 2], end: [1, 2] },
              { name: 'botIz', start: [0, 3], end: [0, 3] },
              { name: 'botDer', start: [1, 3], end: [1, 3] },
            ]}
          >
            <Box gridArea='topIz' >
              <List hover className='ListColor'>
                {this.state.arrayRegPa.map((item, index) => (
                  <List.Item key={index} index={index} className='Pad'>
                    <Box direction='row'>
                      <DecoratedInput
                        area='R. Pat.'
                        value={this.state.regPaList[index].Registro}
                        onChange={(e) => {
                          this.handleChangeList(e, 'regPaList', index, 'Registro');
                        }}
                        width='300px'
                        boxw='90px'
                        textw='medium'
                        icon='id-mapping'
                        tooltip={true}
                        tooltiptxt="Registro Patronal"
                      />
                      <IconButton
                        icon={<Icon icon='close' />}
                        circle
                        size='md'
                        onClick={() => {
                          this.MetodoPop('arrayRegPa', 'regPaList', this.state.regPaList[index]._id);
                        }}
                      />
                    </Box>
                  </List.Item>
                ))}
              </List>
              <br />
              <Box direction='row' align="stretch" style={{ position: "relative" }}>
                <IconButton
                  icon={<Icon icon='plus' />}
                  circle
                  size='md'
                  onClick={() => {
                    this.MetodoPush('arrayRegPa', 'regPaList', {
                      Registro: '',
                      IDSE: { user: '', pwd: '' },
                      SIPARE: { user: '', pwd: '' },
                      INFO: { user: '', pwd: '' }, _id: this.uuidShort()
                    });
                  }}
                />
                <ButtonPrime
                  icon="pi pi-angle-right"
                  style={{ position: "absolute", right: 0 }}
                  onClick={() =>
                    this.onClick('displayPosition', 'left', 'arrayRegPa', 'usrIsnList', true)
                  }
                  className="p-button-rounded p-button-text p-button-plain"
                />
              </Box>
            </Box>
            <Box gridArea='topDer' >
              <List hover className='ListColor'>
                {this.state.arrayFona.map((item, index) => (
                  <List.Item key={index} index={index} className='Pad'>
                    <Box direction='row'>
                      <DecoratedInput
                        area='Fonacot'
                        value={this.state.fonaList[index].cta}
                        onChange={(e) => {
                          this.handleChangeList(e, 'fonaList', index, 'cta');
                        }}
                        width='300px'
                        boxw='90px'
                        textw='medium'
                        icon='id-mapping'
                      />
                      <IconButton
                        icon={<Icon icon='close' />}
                        circle
                        size='md'
                        onClick={() => {
                          this.MetodoPop('arrayFona', 'fonaList', this.state.fonaList[index]._id);
                        }}
                      />
                    </Box>
                  </List.Item>
                ))}
              </List>
              <br />
              <Box direction='row' align="stretch" style={{ position: "relative" }}>
                <IconButton
                  icon={<Icon icon='plus' />}
                  circle
                  size='md'
                  onClick={() => {
                    this.MetodoPush('arrayFona', 'fonaList', {
                      cta: '', _id: this.uuidShort()
                    });
                  }}
                />
                <ButtonPrime
                  icon="pi pi-angle-right"
                  style={{ position: "absolute", right: 0 }}
                  onClick={() =>
                    this.onClick('displayPosition', 'left', 'arrayFonaUsr', 'fonaUsrList')
                  }
                  className="p-button-rounded p-button-text p-button-plain"
                />
              </Box>
            </Box>
            <Box gridArea='ArrIz' >
              <List hover className='ListColor'>
                {this.state.arrayCtaIsn.map((item, index) => (
                  <List.Item key={index} index={index} className='Pad'>
                    <Box direction='row'>
                      <DecoratedInput
                        area='Cta. Isn'
                        value={this.state.ctaIsnList[index].cta}
                        onChange={(e) => {
                          this.handleChangeList(e, 'ctaIsnList', index, 'cta');
                        }}
                        width='300px'
                        boxw='90px'
                        textw='medium'
                        icon='id-mapping'
                        tooltip={true}
                        tooltiptxt="Cuenta Estatal Impuesto Sobre Nómina"
                      />
                      <IconButton
                        icon={<Icon icon='close' />}
                        circle
                        size='md'
                        onClick={() => {
                          this.MetodoPop('arrayCtaIsn', 'ctaIsnList', this.state.ctaIsnList[index]._id);
                        }}
                      />
                    </Box>
                  </List.Item>
                ))}
              </List>
              <br />
              <Box direction='row' align="stretch" style={{ position: "relative" }}>
                <IconButton
                  icon={<Icon icon='plus' />}
                  circle
                  size='md'
                  onClick={() => {
                    this.MetodoPush('arrayCtaIsn', 'ctaIsnList', {
                      cta: '', _id: this.uuidShort()
                    });
                  }}
                />
                <ButtonPrime
                  icon="pi pi-angle-right"
                  style={{ position: "absolute", right: 0 }}
                  onClick={() =>
                    this.onClick('displayPosition', 'left', 'arrayIsnUsr', 'usrIsnList')
                  }
                  className="p-button-rounded p-button-text p-button-plain"
                />
              </Box>
            </Box>
            <Box gridArea='AbaiZ'>
              <List hover className='ListColor'>
                {this.state.arrayCtaCed.map((item, index) => (
                  <List.Item key={index} index={index} className='Pad'>
                    <Box direction='row'>
                      <DecoratedInput
                        area='Cedular'
                        value={this.state.ctaCedList[index].cta}
                        onChange={(e) => {
                          this.handleChangeList(e, 'ctaCedList', index, 'cta');
                        }}
                        width='300px'
                        boxw='90px'
                        textw='medium'
                        icon='id-mapping'
                      />
                      <IconButton
                        icon={<Icon icon='close' />}
                        circle
                        size='md'
                        onClick={() => {
                          this.MetodoPop('arrayCtaCed', 'ctaCedList', this.state.ctaCedList[index]._id);
                        }}
                      />
                    </Box>
                  </List.Item>
                ))}
              </List>
              <br />
              <Box direction='row' align="stretch" style={{ position: "relative" }}>
                <IconButton
                  icon={<Icon icon='plus' />}
                  circle
                  size='md'
                  onClick={() => {
                    this.MetodoPush('arrayCtaCed', 'ctaCedList', {
                      cta: '', _id: this.uuidShort()
                    });
                  }}
                />
                <ButtonPrime
                  icon="pi pi-angle-right"
                  style={{ position: "absolute", right: 0 }}
                  onClick={() =>
                    this.onClick('displayPosition', 'left', 'arrayCedUsr', 'usrCedList')
                  }
                  className="p-button-rounded p-button-text p-button-plain"
                />
              </Box>
            </Box>
            <Box gridArea='ArrDer'>
              <List hover className='ListColor'>
                {this.state.arrayCtaRtp.map((item, index) => (
                  <List.Item key={index} index={index} className='Pad'>
                    <Box direction='row'>
                      <DecoratedInput
                        area='RTP'
                        value={this.state.ctaRtpList[index].cta}
                        onChange={(e) => {
                          this.handleChangeList(e, 'ctaRtpList', index, 'cta');
                        }}
                        width='300px'
                        boxw='90px'
                        textw='medium'
                        icon='id-mapping'
                        tooltip={true}
                        tooltiptxt="Cuenta estatal de impuesto a la Remuneración Personal de Trabajo No Subordinado"
                      />
                      <IconButton
                        icon={<Icon icon='close' />}
                        circle
                        size='md'
                        onClick={() => {
                          this.MetodoPop('arrayCtaRtp', 'ctaRtpList', this.state.ctaRtpList[index]._id);
                        }}
                      />
                    </Box>
                  </List.Item>
                ))}
              </List>
              <br />
              <Box direction='row' align="stretch" style={{ position: "relative" }}>
                <IconButton
                  icon={<Icon icon='plus' />}
                  circle
                  size='md'
                  onClick={() => {
                    this.MetodoPush('arrayCtaRtp', 'ctaRtpList', {
                      cta: '', _id: this.uuidShort()
                    });
                  }}
                />
                <ButtonPrime
                  icon="pi pi-angle-right"
                  style={{ position: "absolute", right: 0 }}
                  onClick={() =>
                    this.onClick('displayPosition', 'left', 'arrayRtpUsr', 'usrRtpList')
                  }
                  className="p-button-rounded p-button-text p-button-plain"
                />
              </Box>
            </Box>
            <Box gridArea='AbaDer'>
              <List hover className='ListColor'>
                {this.state.arrayCtaIsh.map((item, index) => (
                  <List.Item key={index} index={index} className='Pad'>
                    <Box direction='row'>
                      <DecoratedInput
                        area='ISH'
                        value={this.state.ctaIshList[index].cta}
                        onChange={(e) => {
                          this.handleChangeList(e, 'ctaIshList', index, 'cta');
                        }}
                        width='300px'
                        boxw='90px'
                        textw='medium'
                        icon='id-mapping'
                        tooltip={true}
                        tooltiptxt="Impuesto Sobre Hospedaje"
                      />
                      <IconButton
                        icon={<Icon icon='close' />}
                        circle
                        size='md'
                        onClick={() => {
                          this.MetodoPop('arrayCtaIsh', 'ctaIshList', this.state.ctaIshList[index]._id);
                        }}
                      />
                    </Box>
                  </List.Item>
                ))}
              </List>
              <br />
              <Box direction='row' align="stretch" style={{ position: "relative" }}>
                <IconButton
                  icon={<Icon icon='plus' />}
                  circle
                  size='md'
                  onClick={() => {
                    this.MetodoPush('arrayCtaIsh', 'ctaIshList', {
                      cta: '', _id: this.uuidShort()
                    });
                  }}
                />
                <ButtonPrime
                  icon="pi pi-angle-right"
                  style={{ position: "absolute", right: 0 }}
                  onClick={() =>
                    this.onClick('displayPosition', 'left', 'arrayIshUsr', 'usrIshList')
                  }
                  className="p-button-rounded p-button-text p-button-plain"
                />
              </Box>
            </Box>
            <Box gridArea='botDer'>
            <List hover className='ListColor'>
                {this.state.arrayBuzonT.map((item, index) => (
                  <List.Item key={index} index={index} className='Pad'>
                    <Box direction='row'>
                      <DecoratedInput
                        area='Buzon T.'
                        value={this.state.buzonT[index].cta}
                        onChange={(e) => {
                          this.handleChangeList(e, 'buzonT', index, 'cta');
                        }}
                        width='300px'
                        boxw='100px'
                        textw='medium'
                        icon='id-mapping'
                        tooltip={true}
                        tooltiptxt={"Direccion de Buzon Tributario "+ (index+1)}
                      />
                      <IconButton
                        icon={<Icon icon='close' />}
                        circle
                        size='md'
                        onClick={() => {
                            this.MetodoPop('arrayBuzonT', 'buzonT', this.state.buzonT[index]._id);
                        }}
                      />
                    </Box>
                  </List.Item>
                ))}
              </List>
              <br />
            <Box direction='row' align="stretch" style={{ position: "relative" }}>
                <IconButton
                  icon={<Icon icon='plus' />}
                  circle
                  size='md'
                  onClick={() => {
                    if(this.state.arrayBuzonT.length >= 5){
                      Alert.error('Maximo 5 campos', 3000)
                    }
                    else {
                      this.MetodoPush('arrayBuzonT', 'buzonT', {
                        cta: '', _id: this.uuidShort()
                      });
                    }
                  }}
                />
              </Box>
            </Box>
            <Box gridArea='botIz'>

            </Box>
          </Grid>
        </Box>
        <br />
        <br />
        <Box direction='row' className="actionButtons">
          <Button
            style={{
              backgroundColor: "#06554C",
              color: '#F5F0F6',
              width: '120px',
              fontFamily: "'Manjari', sans-serif",
              boxShadow: '0px 2px 4px rgba(0,0,0,0.20)',
            }}
            onClick={() => this.forwardback()}
          >
            <Icon icon='hand-o-left' /> Atras&nbsp;&nbsp;
        </Button>
          <Button
            style={{
              backgroundColor: "#06554C",
              color: '#F5F0F6',
              width: '120px',
              fontFamily: "'Manjari', sans-serif",
              boxShadow: '0px 2px 4px rgba(0,0,0,0.20)',
            }}
            className='leftie'
            onClick={() => this.Register()}
          >
            Siguiente&nbsp;&nbsp;
          <Icon icon='hand-o-right' />
          </Button>
        </Box>
      </Box>
    );
  };
}
export default ClientReg;
