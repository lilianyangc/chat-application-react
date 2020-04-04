import React from 'react';
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
      <Container>
        <Tabs className="tabs" defaultActiveKey="rooms" id="uncontrolled-tab-example">
          <Tab className="tab" eventKey="rooms" title="Rooms">
              <br /><Rooms/>
          </Tab>
          <Tab className="tab" eventKey="eventHistory" title="Event History">
              <br /><EventHistory/>
          </Tab>
          <Tab className="tab" eventKey="chatHistory" title="Chat History">
             <br /><ChatHistory/>
          </Tab>
        </Tabs>
      </Container>
      </> 
    );
  }
}

export default Navigation;