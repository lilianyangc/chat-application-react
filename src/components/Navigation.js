import React, {Component} from 'react';
import { Tabs, Tab, Container } from 'react-bootstrap';
import  EventHistory  from './EventHistory';
import ChatHistory from './ChatHistory';
import Rooms from './Rooms';

class Navigation extends React.Component {
  constructor(props) {
    super(props);
    this.wrapper = React.createRef();
  }
  state = {};
  render() {
    return (
      <>
      <Tabs className="myTabs" defaultActiveKey="rooms" id="uncontrolled-tab-example">
        
        <Tab className="myTab" eventKey="eventHistory" title="Event History">
            <Container>
                <br />
                <EventHistory/>
             </Container>
        </Tab>
        <Tab eventKey="chatHistory" title="Chat History">
            <Container>
                <br />
                <ChatHistory/>
            </Container>
        </Tab>
        <Tab eventKey="rooms" title="Rooms">
            <Container>
                <br />
                <Rooms/>
            </Container>
        </Tab>
      </Tabs>
      </> 
    );
  }
}

export default Navigation;