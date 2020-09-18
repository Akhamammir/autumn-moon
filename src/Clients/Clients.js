import React from 'react';
//import './User.css';
import UsrBar from './../UsrBar/UsrBar';
import NavBar from './../NavBar/NavBar';
import './Clients.css';
import DecoratedInput from './../Components/DecoratedInput/DecoratedInput';
import { Grommet, Box, Grid, Heading, Text } from 'grommet';
import { Input, InputGroup } from 'rsuite';
import {
  Table,
  Toggle,
  Icon,
  Button,
  Modal,
  IconButton,
  Alert,
  Progress,
  List,
  Steps,
  CheckPicker,
  SelectPicker,
  Divider
} from 'rsuite';
import axios from 'axios';
const { Line } = Progress;
const { Column, HeaderCell, Cell, Pagination } = Table;
const miliPerYear = 31536000000;
class ClientReg extends React.Component {
  constructor(props) {
    super(props);
    console.log(props);
    this.state = {
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
      Resultado: '',
      assigned: {_id:"",team:''},
      branchAdd: ['Roses are red',],
      foreignPartner: ['Roses are red',],
      arrayCon: ['Roses are red',],
      arrayDatos: ['Roses are red',],
      arrayActF: ['Roses are red'],
      regFiscal: [],
      isn: '',
      rtp: '',
      cedular: '',
      ish: '',
      succList: [
        { col: '', calle: '', cp: '', estado: '' },
        { col: '', calle: '', cp: '', estado: '' },
      ],
      foreignList: [
        { name:'', rfc:'' },
      ],
      contactList: [
        { nombre: '', email: '', telefono: '' },
        { nombre: '', email: '', telefono: '' },
      ],
      repList: [
        { nombre: '', rfc: '', curp: '', email: '', telefono: '' },
        { nombre: '', rfc: '', curp: '', email: '', telefono: '' },
      ],
      rowSelected:"",
      team:"",
      Nominas:[],
      searchT:''
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
      this.setState({ usrlist: users, usrlistStore:users });
      console.log(this.state.usrlist);
    });

    if (this.props.match.params.id ) {
      try {
        axios.post(`/clients/client`, { team: this.state.usr.Team,id:this.props.match.params.id }).then((res) => {
          this.setState(res.data.Client)
          this.setState({step:0})
        })
      } catch (err) {
        console.log(err.message)
        }
      }else{
        console.log('No hay id en los params')

      }
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange = (value, field) => {
    console.log(value, field);
    this.setState({ [field]: value }, () => {
      console.log(this.state);
    });
  };
  handleChangeList = (value, collection, index, name) => {
    //console.log(value, collection, index, name);
    this.state[collection][index][name] = value;
    //console.log( this.state[collection][index][name] );
    this.setState({ step: this.state.step }, () => {
      //console.log(this.state);
    });
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
  Register = () => {
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
        Nominas: nominavalue,
      },
      () => {
        this.setState({
          Resultado2: this.state.Nominas.join(', '),
        });
        console.log(this.state.Nominas);
      }
    );
  };
  filteruser = () => {
    console.log(this.state.searchT);
    console.log(this.state.usrlist);
    this.setState({
      //
      usrlist: this.state.searchT.length == 0 ? this.state.usrlistStore : this.state.usrlistStore.filter( S => S.Name.First.includes(this.state.searchT) ||
      S.Team.includes(this.state.searchT) ||
      S.Name.Last.includes(this.state.searchT) || S.Name.Last2.includes(this.state.searchT) )
    })
    console.log(this.state.usrlistStore.filter( S => S.Name.First.includes(this.state.searchT) ||
     S.Team.includes(this.state.searchT) ||
     S.Name.Last.includes(this.state.searchT) || S.Name.Last2.includes(this.state.searchT) ) )
  }
  nomBox = (props) =>{
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
    return(
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
                  value={this.state.Nominas}
                  onChange={this.metNomina}
                  data={datum}
                  style={{ width: 224 }}
                />
              </Box>
              <br />
              <Box direction='row'>
                <Text className='GreenLetter'>{this.state.Resultado2}</Text>
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
              this.handleChange(e, 'rfc');
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
                    estado: '',
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
                    rfc:''
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
            backgroundColor:"#06554C",
            color: '#F5F0F6',
            width: '120px',
            fontFamily: "'Manjari', sans-serif",
            boxShadow: '0px 2px 4px rgba(0,0,0,0.20)',
          }}
          disabled = {
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
                telefono: '',
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
                  <br/>
                  <br/>
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
              telefono: '',
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
            overflow:'visible',
            border:'none',
            borderRadius: '90px'
          }} >
        <Input
          style= {{ boxShadow: 'none', width:240, paddingRight:'11px' }}
          placeholder="Usuario"
          className="inputLog"
          value={this.state.searchT}
          onChange={(e) => {
            this.setState({ searchT: e } );
          } }
        />
        <InputGroup.Button
          style={{
            paddingLeft:'25px',
            paddingRight:'11px',
            top:'0.2px',
            backgroundColor:'#00AB9B',
            color:'#F2F3F4',
            borderRadius:'0px 100px 100px 0px',
            right: '20px'
          }}
          onClick = { this.filteruser }
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
              rowSelected:data._id,
              team:data.Team
            })
          }}
          rowClassName={(rowData)=>{
            return (rowData ? (rowData._id === this.state.assigned._id ? 'rowSelected':''):'')
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
                  this.setState({
                    assigned: {
                      name: rowData.Name.First,
                      nameFather: rowData.Name.Last,
                      nameMother: rowData.Name.Last2,
                      pos: rowData.Pos,
                      team: rowData.Team,
                      _id: rowData._id,
                    },
                  });
                };
                this.removeUser = () => {
                  //
                };
                return (
                  <span>
                    <a className='actionLink' onClick={this.showUser}> Seleccionar </a>
                  </span>
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
                value={this.state.assigned.pos == null ? "NA":this.state.assigned.pos}
                width='380px'
                boxw='100px'
                textw='medium'
                icon='user-o'
                display
              />
              <DecoratedInput
                area='Equipo'
                value={this.state.assigned.team == null ? "NA": this.state.assigned.team}
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
              backgroundColor:"#06554C",
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
              backgroundColor:"#06554C",
              color: '#F5F0F6',
              width: '120px',
              fontFamily: "'Manjari', sans-serif",
              boxShadow: '0px 2px 4px rgba(0,0,0,0.20)',
            }}
            disabled = {
              !(this.state.assigned.pos != null &&
                // this.state.assigned.team[0].nombre.length != 0 &&
                this.state.assigned.team != '' )
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
      { label: 'Régimen de Sueldos y Salarios e Ingresos Asimilados a Salarios',
       value: 'RSySIAS', role: 'Master' },
       { label: 'Régimen de las Personas Físicas con Actividades Empresariales y Profesionales',
       value: 'RPFAEP', role: 'Master' },
       { label: 'Régimen de Incorporación Fiscal',
       value: 'RIF', role: 'Master' },
       { label: 'Regimen de Ingresos por la enajenación de bienes o la prestación de servicios a través de Internet, mediante plataformas tecnológicas, aplicaciones informáticas y similares',
       value: 'RIEBPSI', role: 'Master' },
       { label: 'Régimen de Arrendamiento',
       value: 'RDA', role: 'Master' },
       { label: 'Régimen de Actividades Agrícolas, Ganaderas, Silvícolas y Pesqueras',
       value: 'RAAGSP', role: 'Master' },
       { label: 'Régimen de Enajenación de bienes Regimen General',
       value: 'RG', role: 'Master' },
       { label: 'Régimen de Ingresos por Dividendos (socios y accionistas)',
       value: 'RID', role: 'Master' },
       { label: 'Régimen de los demás ingresos',
       value: 'RDI', role: 'Master' },
    ];
    let RegMor = [
      { label: 'Régimen General de Ley Personas Morales',
       value: 'RGLPM', role: 'Master' },
       { label: 'Régimen de Personas Morales con Fines no Lucrativos',
       value: 'RPMFL', role: 'Master' },
       { label: 'Régimen de Actividades Agrícolas, Ganaderas, Silvícolas y Pesqueras',
       value: 'RAAGSP', role: 'Master' },
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
        <br />
        <this.nomBox mark="¿Cuenta con Trabajadores?" />
        <this.nomBox mark="¿Cuenta con Asimilados a Salarios?" assim = {true} />
        <Box>
          <Grid
            rows={['xxsmall', 'xxsmall']}
            columns={['medium', 'medium']}
            gap='small'
            areas={[
              { name: 'ArrIz', start: [0, 0], end: [0, 0] },
              { name: 'AbaiZ', start: [0, 1], end: [0, 1] },
              { name: 'ArrDer', start: [1, 0], end: [1, 0] },
              { name: 'AbaDer', start: [1, 1], end: [1, 1] },
            ]}
          >
            <Box gridArea='ArrIz'>
              <DecoratedInput
                area='ISN'
                value={this.state.isn}
                onChange={(e) => {
                  this.handleChange(e, 'isn');
                }}
                width='100%'
                type=''
                icon='percent'
                tooltip={true}
                tooltiptxt="Cuenta Estatal Impuesto Sobre Nómina"
              />
            </Box>
            <Box gridArea='AbaiZ'>
              <DecoratedInput
                area='Cedular'
                value={this.state.cedular}
                onChange={(e) => {
                  this.handleChange(e, 'cedular');
                }}
                width='100%'
                type=''
                icon='percent'
              />
            </Box>
            <Box gridArea='ArrDer'>
              <DecoratedInput
                area='RTP'
                value={this.state.rtp}
                onChange={(e) => {
                  this.handleChange(e, 'rtp');
                }}
                width='100%'
                type=''
                icon='percent'
                tooltip={true}
                tooltiptxt="Cuenta estatal de impuesto a la Remuneración Personal de Trabajo No Subordinado"
              />
            </Box>
            <Box gridArea='AbaDer'>
              <DecoratedInput
                area='ISH'
                value={this.state.ish}
                onChange={(e) => {
                  this.handleChange(e, 'ish');
                }}
                width='100%'
                type=''
                icon='percent'
                tooltip={true}
                tooltiptxt="Impuesto Sobre Hospedaje"
              />
            </Box>
          </Grid>
        </Box>
        <br />
        <br />
        <Box direction='row' className="actionButtons">
        <Button
          style={{
            backgroundColor:"#06554C",
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
            backgroundColor:"#06554C",
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
