import React from 'react';
import './Manager.css';
import { Grommet, Accordion, AccordionPanel, Box, Grid, Text, Heading, Image, Button } from 'grommet';
import { List, FlexboxGrid } from 'rsuite';
import { DocumentUpdate } from 'grommet-icons';
import axios from 'axios';
const fallback = 'https://clinicforspecialchildren.org/wp-content/uploads/2016/08/avatar-placeholder.gif';
const styleCenter = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '15px',
  fontFamily:'Manjari'
};
const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
const months = ['', 'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
class Manager extends React.Component {
  constructor(props) {
    super(props);
    console.log(this.props)
    this.state = {usr:this.props, m_clients:[], f_clients:[]}
  }
  componentDidMount() {
    axios.post('/clients', {team:this.state.usr.Team}).then(res => {
      console.log(res)
      //this.setState({clients:res.data.User})
      let Place = '', moral = [], fisico = [];
      res.data.User.forEach(I=>{
        I.Type=="Moral" ? moral.push(I) : fisico.push(I)
      });
      this.setState({m_clients:moral, f_clients:fisico})
        console.log(this.state.f_clients);
    });
  }
  clients = (args) => {
    let label="Loading . . .", arr='f_clients';
    if (args.type === 0 ){
      label = "Personas Fisicas";
    } else {
      console.log(this.state)
      label = "Personas Morales";
      arr='m_clients'
    }
    return (
      <AccordionPanel label={label}>
              <Box pad="small">
              <Accordion>
                {this.state[arr].map ((item, i) =>
                  <AccordionPanel label={item.Name} key={item._id}>
                    <Box pad="small">
                      <Accordion>
                        {item.Operations.map ( (operation, index) =>
                          <AccordionPanel label={operation.Year} key={operation._id}>
                            <Box pad="small">
                              <Accordion>
                                {operation.Month.map( (month, m_index) =>
                                    <AccordionPanel label={months[+month.Number]} key={operation._id}>
                                    <Box pad="small">
                                      <Accordion>
                                        {month.Areas.map( (area, a_index) =>
                                          <AccordionPanel label={area.Name} key={operation._id}>
                                            <List>
                                              {area.Content.map((content,c_index)=>
                                                <List.Item key={c_index} index={c_index}>
                                                  <FlexboxGrid>
                                                    <FlexboxGrid.Item colspan={2} style={styleCenter}>
                                                      <Heading level="5" margin="none">{content.Name}</Heading>
                                                    </FlexboxGrid.Item>
                                                    <FlexboxGrid.Item colspan={4} style={styleCenter}>
                                                    <Heading level="5" margin="none" style={{color: content.Upload ? '#00C781' : '#FF4040'}}>{ content.Upload ? new Date(content.Date).toLocaleDateString('es-MX', options) : 'No acabado aun' }</Heading>
                                                    </FlexboxGrid.Item>
                                                    <FlexboxGrid.Item colspan={10} style={styleCenter}>

                                                    </FlexboxGrid.Item>
                                                    <FlexboxGrid.Item colspan={4} style={styleCenter}>

                                                    </FlexboxGrid.Item>
                                                    <FlexboxGrid.Item colspan={3} style={styleCenter}>
                                                      <Button
                                                        icon={<DocumentUpdate />}
                                                        label="Subir"
                                                        color="accent-1"
                                                        primary={true}
                                                        onClick={() => {}}
                                                      />
                                                    </FlexboxGrid.Item>
                                                  </FlexboxGrid>
                                                </List.Item>
                                              )}
                                            </List>
                                          </AccordionPanel>
                                        )}
                                      </Accordion>
                                    </Box>
                                    </AccordionPanel>
                                )}
                              </Accordion>
                            </Box>
                          </AccordionPanel>
                        )}
                      </Accordion>
                    </Box>
                  </AccordionPanel>
                )}
              </Accordion>
              </Box>
            </AccordionPanel>
    )
  }
  render() {
    return (
      <Grommet plain className="App">
      <br/><br/>
        <Box
          alignContent="center"
          orientation="row"
        >
          <Heading alignSelf="center" style={{ fontFamily: "'Manjari', sans-serif"}}>Equipo {this.state.usr.Team}</Heading>
        </Box>
          <Accordion>
            <this.clients 
              type={0}
            />
            <this.clients 
              type={1}
            />
          </Accordion>
      </Grommet>
    );
  }
}
export default Manager;
//I.Type=="Moral" ? moral.push(I) : fisico.push(I)