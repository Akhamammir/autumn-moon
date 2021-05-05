import { Sidenav, Nav, Dropdown, Icon } from 'rsuite';
import React from 'react';
import './NavBar.css';
class NavBar extends React.Component {
    constructor(props) {
        super(props);
        console.log(this.props)
        this.state = {expanded:false, usr:this.props.usr}
    }
    Users =  (param) => {
      if (true) {
        console.log(this)
        this.props.history.push("/"+param+"/"+this.state.usr.Usr, {...this.state.usr})
      }
    }
    Logout =  () => {
        this.state.usr.Usr = 0
        this.props.history.push("/")

    }
    render() {
        return (
            <Sidenav
              expanded={this.state.expanded}
              defaultOpenKeys={['3', '4']}
              activeKey={this.state.activeKey}
              onSelect={this.handleSelect}
              style={{position:"fixed",zIndex:10}}
            >
              <Sidenav.Body>
                <Nav>
                  <Nav.Item eventKey="1" icon={<Icon icon="dashboard" />} onClick={() => this.Users('home')} >
                    Dashboard
                  </Nav.Item>
                  
                  <Dropdown
                    placement="rightStart"
                    eventKey="3"
                    title="Advanced"
                    icon={<Icon icon="magic" />}
                  >
                    <Dropdown.Item eventKey="2" icon={<Icon icon="group" />} onClick={() => this.Users('users')} >
                      Usuarios
                    </Dropdown.Item>
                    <Dropdown.Item eventKey="2" icon={<Icon icon="group" />} onClick={() => this.Users('clientreg')} >
                      Registro de clientes
                    </Dropdown.Item>
                    <Dropdown.Item eventKey="2" icon={<Icon icon="group" />} onClick={() => this.Users('clients')} >
                      Listado de clientes
                    </Dropdown.Item>
                  </Dropdown>
                  <Dropdown
                    placement="rightStart"
                    eventKey="3"
                    title="Advanced"
                    icon={<Icon icon="magic" />}
                  >
                    <Dropdown.Item eventKey="3-1" onClick={() => this.Users('auditoria')}>Auditoria</Dropdown.Item>
                    <Dropdown.Item eventKey="3-2" onClick={() => this.Users('ToDo')}>ToDo</Dropdown.Item>
                    <Dropdown.Item eventKey="3-3">Loyalty</Dropdown.Item>
                    <Dropdown.Item eventKey="3-4">Visit Depth</Dropdown.Item>
                  </Dropdown>
                  <Dropdown
                    placement="rightStart"
                    eventKey="4"
                    title="Settings"
                    icon={<Icon icon="gear-circle" />}
                  >
                    <Dropdown.Item eventKey="4-1">Applications</Dropdown.Item>
                    <Dropdown.Item eventKey="4-2">Channels</Dropdown.Item>
                    <Dropdown.Item eventKey="4-3">Versions</Dropdown.Item>
                    <Dropdown.Menu eventKey="4-5" title="Custom Action">
                      <Dropdown.Item eventKey="4-5-1">Action Name</Dropdown.Item>
                      <Dropdown.Item eventKey="4-5-2">Action Params</Dropdown.Item>

                    </Dropdown.Menu>
                  </Dropdown>
                  <Dropdown
                    placement="rightStart"
                    eventKey="5"
                    title="Logout"
                    icon={<Icon icon="sign-out" />}
                  >
                    <Dropdown.Item eventKey="5" icon={<Icon icon="group" />} onClick={() => this.Logout()} >
                      Cerrar Sesion
                    </Dropdown.Item>
                  </Dropdown>
                </Nav>
              </Sidenav.Body>
            </Sidenav>
        );
    }
}
export default NavBar;