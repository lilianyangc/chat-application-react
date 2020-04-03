import React, {Component} from 'react';
// import { NavTab } from "react-router-tabs";

// class Navigation extends Component {
//     state = {  }
//     render() { 
//         return (
         
//             <>
//             <NavTab to="/admin">Event History</NavTab> &nbsp;
//             <NavTab to="/chathistory">Chat History</NavTab>&nbsp;
//             <NavTab to="/rooms">Rooms</NavTab>
//             </>

//           );
//     }
// }

// export default Navigation;


import { Tabs, Tab } from 'react-bootstrap';
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
          <EventHistory/>
        </Tab>
        <Tab eventKey="chatHistory" title="Message History">
          <ChatHistory/>
        </Tab>
        <Tab eventKey="rooms" title="Rooms">
          <Rooms/>
        </Tab>
      </Tabs>
      </> 
    );
  }
}

export default Navigation;